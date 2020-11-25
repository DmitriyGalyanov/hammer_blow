import React from 'react';

import {
	StyleSheet,
	Vibration,
	TouchableOpacity,
	ImageBackground,
	Text,
} from 'react-native';

import Sound from 'react-native-sound';

import {useSelector} from 'react-redux';
import {selectSettingsData} from 'state_slices/settingsSlice';

import background from 'images/buttonBackground.png';

const menu_selection_click = new Sound(require('sounds/menu_selection_click.wav'));


export default function SimpleButton({title, onPress}) {
	const {
		vibration: vibrationData,
		sound: soundData,
	} = useSelector(selectSettingsData);

	const playSound = () => {
		if (menu_selection_click.isPlaying()) return;
		menu_selection_click.play();
	};

	const handlePress = () => {
		if (vibrationData.isActive) Vibration.vibrate(100);
		if (soundData.isActive) playSound();
		onPress();
	};

	return (
		<TouchableOpacity
			style={styles.wrap}
			onPress={handlePress}
		>
			<ImageBackground
				source={background}
				style={styles.background}
			>
				<Text style={styles.title}>
					{title}
				</Text>
			</ImageBackground>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	wrap: {
		width: 290,
		height: 81,
	},

	background: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},

	title: {
		color: '#fff',
		fontSize: 16,
	},
});