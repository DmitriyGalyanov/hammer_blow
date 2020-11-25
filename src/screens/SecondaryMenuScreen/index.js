import React from 'react';

import {
	StyleSheet,
	ImageBackground,
	Text,
	View,
} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';
import {selectScoreData, resetScore} from 'state_slices/scoreSlice';

import {useNavigation} from '@react-navigation/native';

import SimpleButton from 'components/SimpleButton';

import background from 'images/mainBackground.jpg';
import coin from 'images/coin.png';


export default function SecondaryMenuScreen() {
	const dispatch = useDispatch();
	const navigation = useNavigation();

	const {value: scoreCount} = useSelector(selectScoreData);

	const handleRestart = () => {
		dispatch(resetScore());
		navigation.push('Game');
	};

	return (
		<ImageBackground
			source={background}
			style={styles.wrap}
		>
			<ImageBackground
				source={coin}
				style={styles.coinImage}
			>
				<Text style={styles.scoreCount}>
					{scoreCount}
				</Text>
			</ImageBackground>
			<View style={styles.buttonsWrap}>
				<View style={styles.buttonWrap}>
					<SimpleButton
						title='Меню'
						onPress={() => navigation.push('MainMenu')}
					/>
				</View>
				<View style={styles.buttonWrap}>
					<SimpleButton
						title='Рестарт'
						onPress={handleRestart}
					/>
				</View>
			</View>
		</ImageBackground>
	)
}

const styles = StyleSheet.create({
	wrap: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'space-evenly',
	},

	coinImage: {
		height: 120,
		width: 120,
		justifyContent: 'center',
		alignItems: 'center',
	},

	scoreCount: {
		color: '#fff',
		fontSize: 34,
	},

	buttonsWrap: {},

	buttonWrap: {
		marginBottom: 32,
	},
});