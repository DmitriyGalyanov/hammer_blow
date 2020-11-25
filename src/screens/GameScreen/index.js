import React, {useEffect, useRef, useState} from 'react';

import {
	StyleSheet,
	Vibration,
	Dimensions,
	TouchableOpacity,
	ImageBackground,
	Text,
	View,
	Animated,
	Image,
} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';
import {
	selectScoreData,
	increaseScore,
} from 'state_slices/scoreSlice';
import {selectSettingsData} from 'state_slices/settingsSlice';

import {useNavigation} from '@react-navigation/native';

import background from 'images/mainBackground.jpg';
import gameImage from 'images/gameImage.png';
import hammer_init from 'images/hammer_init.png';
import hammer_mid from 'images/hammer_mid.png';
import hammer_down from 'images/hammer_down.png';
import coin from 'images/coin.png';


function changeValueAnim(target, toValue, duration) {
	Animated.timing(target, {
		toValue: toValue,
		duration: duration,
		useNativeDriver: false,
	}).start();
};

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

export default function GameScreen() {
	const dispatch = useDispatch();
	const navigation = useNavigation();

	const {width: gameWidth} = Dimensions.get('window');

	const {value: scoreCount} = useSelector(selectScoreData);

	const {
		vibration: vibrationData,
		sound: soundData,
	} = useSelector(selectSettingsData);

	//hammer dimensions
	const gameHeight = gameWidth * 1.96;

	const hammer_init_height = gameHeight * 0.24;
	const hammer_init_width = hammer_init_height * 0.79;

	const hammer_mid_height = gameHeight * 0.19;
	const hammer_md_width = hammer_mid_height * 1.2;

	const hammer_down_height = gameHeight * 0.14;
	const hammer_down_width = hammer_down_height * 1.2;

	//game area dimensions
	const coinDiameter = gameHeight / 10;

	const playableAreaDims = {
		top: (gameHeight * 0.71) - (coinDiameter * 0.5),
		bot: (gameHeight * 0.25) + (coinDiameter * 0.5),
		width: gameWidth * 0.314,
	};
	const playableAreaHeight = playableAreaDims.top - playableAreaDims.bot;

	const coinPosition = useRef(new Animated.Value(getRandomInt(0, playableAreaHeight))).current;
	const coinOpacity = useRef(new Animated.Value(1)).current;

	//green line appearance
	const greenLineHeight = coinDiameter * 0.5;
	const greenLineWidth = playableAreaDims.width;

	const greenLinePosition = useRef(new Animated.Value(0)).current;

	const [isStopped, setIsStopped] = useState(false);
	const [isBusy, setIsBusy] = useState(false);

	useEffect(() => {
		const greenLineAnimInterval = setInterval(() => {
			// console.log('Green Line Position: ', greenLinePosition, 'Coin Position:', coinPosition);
			if (isStopped) return;
			changeValueAnim(greenLinePosition, getRandomInt(0, playableAreaHeight), 300)
		}, 300);

		return () => {
			clearInterval(greenLineAnimInterval);
		};
	}, [isStopped, isBusy]);

	//check if the line hits the coin
	const checkIfSuccess = () => {
		return new Promise((resolve, _) => {
			setTimeout(() => {
				// console.log(`${coinPosition.__getValue()} - (${greenLineHeight} * 0.95) <= ${greenLinePosition.__getValue()} <= ${coinPosition.__getValue()} + (${coinDiameter} * 0.95)`);
				if (coinPosition.__getValue() - (greenLineHeight * 0.95) <= greenLinePosition.__getValue()
					&& greenLinePosition.__getValue() <= coinPosition.__getValue() + (coinDiameter * 0.95)) {
					console.log('success');
					resolve(true);
				} else {
					console.log('fail');
					resolve(false);
				};
			}, 100);
		})
	};

	//hammer anim
	const hammer_init_opacity = useRef(new Animated.Value(1)).current;
	const hammer_mid_opacity = useRef(new Animated.Value(0)).current;
	const hammer_down_opacity = useRef(new Animated.Value(0)).current;

	const animStep = 200;

	const animHammerBlow = () => {
		changeValueAnim(hammer_init_opacity, 0, animStep);
		setTimeout(() => changeValueAnim(hammer_mid_opacity, 1, animStep), animStep);
		setTimeout(() => changeValueAnim(hammer_mid_opacity, 0, animStep), animStep * 2);
		setTimeout(() => changeValueAnim(hammer_down_opacity, 1, animStep), animStep * 3);
	};
	const animHammerRevert = () => {
		setIsBusy(true);
		changeValueAnim(hammer_init_opacity, 1, animStep);
		changeValueAnim(hammer_mid_opacity, 0, animStep);
		changeValueAnim(hammer_down_opacity, 0, animStep * 2);
	};

	//
	const resetCoinPosition = () => {
		changeValueAnim(coinOpacity, 0, animStep);
		setTimeout(() => {
			changeValueAnim(coinPosition, getRandomInt(0, playableAreaHeight), 10);
			changeValueAnim(coinOpacity, 1, animStep);
		}, animStep);
	};

	//
	const startNextRound = () => {
		animHammerRevert();
		resetCoinPosition();
		setTimeout(() => {
			setIsStopped(false);
		}, animStep * 2);
		setTimeout(() => {
			setIsBusy(false);
		}, animStep * 4);
	};

	//handle fail
	const handleFail = () => {
		navigation.push('SecondaryMenu');
	};

	//smash handler
	const handleSmash = async () => {
		if (isBusy) return;
		if (isStopped) {
			startNextRound();
			return;
		};
		setIsBusy(true);

		animHammerBlow();
		setTimeout(() => {
			if (vibrationData.isActive) {
				Vibration.vibrate();
			};
			setIsStopped(true);
			// setIsBusy(false);
		}, animStep * 2.5);

		setTimeout(() => {
			// console.log('checking');
			checkIfSuccess().then(isSuccess => {
				if (isSuccess) dispatch(increaseScore({amount: 1}));
				else handleFail();
			});
			setIsBusy(false);
		}, animStep * 3);
	};

	return (
		<TouchableOpacity
			style={styles.wrap}
			activeOpacity={0.9}
			onPress={handleSmash}
			disabled={isBusy}
		>
			<ImageBackground
				source={background}
				style={styles.background}
			>
				<ImageBackground //game image
					source={gameImage}
					style={{
						position: 'absolute',
						width: gameWidth,
						height: gameHeight,
						flex: 1,
						alignItems: 'center',
						paddingTop: gameHeight * 0.2,
					}}
				>
					<Text
						style={{
							color: '#000',
							fontWeight: 'bold',
							fontSize: 32,
						}}
					>
					{scoreCount}
					</Text>
				</ImageBackground>
				<View //playable area
					style={[
						styles.playableArea,
						{
							position: 'absolute',
							bottom: playableAreaDims.bot,
							height: playableAreaHeight,
							width: playableAreaDims.width,
						}
					]}
				>
					<Animated.View
						style={[
							styles.greenLine,
							{
								height: greenLineHeight,
								width: greenLineWidth,
								backgroundColor: 'green',
								position: 'absolute',
								bottom: greenLinePosition,
							}
						]}
					/>
					<Animated.View
						style={{
							opacity: coinOpacity,
							position: 'absolute',
							bottom: coinPosition,
							width: playableAreaDims.width,
							alignItems: 'center',
						}}
					>
						<Image
							source={coin}
							style={{
								width: coinDiameter,
								height: coinDiameter,
							}}
						/>
					</Animated.View>
				</View>
				<View //hammer images
					style={{
						position: 'absolute',
						height: hammer_init_height,
						width: hammer_init_width,
						bottom: hammer_init_height + 40,
						left: 20,
					}}
				>
					<Animated.View
						style={{opacity: hammer_down_opacity}}
					>
						<Image
							source={hammer_down}
							style={{
								height: hammer_down_height,
								width: hammer_down_width,
								position: 'absolute',
								transform: [{scale: 1.3}],
								top: hammer_init_height * 0.58,
								left: 30,
							}}
						/>
					</Animated.View>
					<Animated.View
						style={{opacity: hammer_mid_opacity}}
					>
						<Image
							source={hammer_mid}
							style={{
								height: hammer_mid_height,
								width: hammer_md_width,
								position: 'absolute',
								top: hammer_init_height * 0.18,
							}}
						/>
					</Animated.View>
					<Animated.View
						style={{opacity: hammer_init_opacity}}
					>
						<Image
							source={hammer_init}
							style={{
								height: hammer_init_height,
								width: hammer_init_width,
								position: 'absolute',
							}}
						/>
					</Animated.View>
				</View>
			</ImageBackground>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	wrap: {
		flex: 1,
	},

	background: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'flex-end',
	},

	gameImage: {},
});