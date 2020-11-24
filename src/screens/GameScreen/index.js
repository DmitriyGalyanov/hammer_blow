import React, {useRef} from 'react';

import {
	TouchableOpacity,
	StyleSheet,
	ImageBackground,
	Vibration,
	Dimensions,
	Text,
	Image,
	View,
	Animated,
} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';
import {
	selectScoreData,
	increaseScore,
} from 'state_slices/scoreSlice';
import {selectSettingsData} from 'state_slices/settingsSlice';

import background from 'images/mainBackground.jpg';
import gameImage from 'images/gameImage.png';
import hammer_init from 'images/hammer_init.png';
import hammer_mid from 'images/hammer_mid.png';
import hammer_down from 'images/hammer_down.png';


export function changeValueAnim(target, toValue, duration) {
	Animated.timing(target, {
		toValue: toValue,
		duration: duration,
		useNativeDriver: false,
	}).start();
};

export default function GameScreen() {
	const dispatch = useDispatch();

	const {value: scoreCount} = useSelector(selectScoreData);

	const {
		vibration: vibrationData,
		sound: soundData,
	} = useSelector(selectSettingsData);

	const {width: gameWidth} = Dimensions.get('window');
	const gameHeight = gameWidth * 1.96;

	const hammer_init_height = gameHeight * 0.24;
	const hammer_init_width = hammer_init_height * 0.79;

	const hammer_mid_height = gameHeight * 0.19;
	const hammer_md_width = hammer_mid_height * 1.2;

	const hammer_down_height = gameHeight * 0.14;
	const hammer_down_width = hammer_down_height * 1.2;

	const handleSuccess = () => {
		dispatch(increaseScore({amount: 1}));
	};

	//hammer anim
	const hammer_init_opacity = useRef(new Animated.Value(1)).current;
	const hammer_mid_opacity = useRef(new Animated.Value(0)).current;
	const hammer_down_opacity = useRef(new Animated.Value(0)).current;

	const animHammerBlow = (animStep) => {
		
		changeValueAnim(hammer_init_opacity, 0, animStep);
		setTimeout(() => changeValueAnim(hammer_mid_opacity, 1, animStep), animStep);
		setTimeout(() => changeValueAnim(hammer_mid_opacity, 0, animStep), animStep * 2);
		setTimeout(() => changeValueAnim(hammer_down_opacity, 1, animStep), animStep * 3);
		
	};
	const animHammerRevert = (animStep) => {
		changeValueAnim(hammer_init_opacity, 1, animStep);
		changeValueAnim(hammer_mid_opacity, 0, animStep);
		changeValueAnim(hammer_down_opacity, 0, animStep * 2);
	};

	const handleSmash = () => {
		const animStep = 200;
		animHammerBlow(animStep);
		if (vibrationData.isActive) {
			setTimeout(() => {
				Vibration.vibrate();
				//check if the line hits the coin
			}, animStep * 3.5);
		}


		setTimeout(() => animHammerRevert(animStep), animStep * 8)

	};

	return (
		<TouchableOpacity
			style={styles.wrap}
			activeOpacity={0.9}
			onPress={handleSmash}
		>
			<ImageBackground
				source={background}
				style={styles.background}
			>
				<ImageBackground
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
				<View
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

	gameImage: {
	}
});