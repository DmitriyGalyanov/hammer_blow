import React from 'react';

import {
	StyleSheet,
	ImageBackground,
	Text,
	View,
} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';
import {selectScoreData} from 'state_slices/scoreSlice';
import {
	selectSettingsData,
	toggleVibration,
	toggleSound,
} from 'state_slices/settingsSlice';

import {useNavigation} from '@react-navigation/native';

import SimpleButton from 'components/SimpleButton';
import SquareButton from 'components/SquareButton';

import background from 'images/mainBackground.jpg';
import coin from 'images/coin.png';


export default function MainMenuScreen() {
	const dispatch = useDispatch();
	const navigation = useNavigation();

	const {value: scoreCount} = useSelector(selectScoreData);
	const {
		vibration: vibrationData,
		sound: soundData,
	} = useSelector(selectSettingsData);

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
				<View style={styles.settingsButtonsWrap}>
					<SquareButton
						isActive={vibrationData.isActive}
						parameterName='vibration'
						onPress={() => dispatch(toggleVibration())}
					/>
					<SquareButton
						isActive={soundData.isActive}
						parameterName='sound'
						onPress={() => dispatch(toggleSound())}
					/>
				</View>
				<SimpleButton
					title='Secondary Menu'
					onPress={() => {
						navigation.push('SecondaryMenu')
					}}
				/>
			</View>
		</ImageBackground>
	)
}

const styles = StyleSheet.create({
	wrap: {
		flex: 1,
		justifyContent: 'flex-end',
		alignItems: 'center',
		paddingBottom: 80,
	},

	coinImage: {
		width: 72,
		height: 72,
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 240,
		marginRight: 70,
	},

	scoreCount: {
		fontSize: 27,
		color: '#fff',
	},

	buttonsWrap: {},

	settingsButtonsWrap: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 70,
	},
});