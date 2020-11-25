import React from 'react';

import {
	Vibration,
	TouchableOpacity,
	ImageBackground,
	Image,
} from 'react-native';

import Sound from 'react-native-sound';

import {useSelector} from 'react-redux';
import {selectSettingsData} from 'state_slices/settingsSlice';

const menu_selection_click = new Sound(require('sounds/menu_selection_click.wav'));


export default function SquareButton({isActive, parameterName, onPress}) {
	const background = isActive
		? require('images/squareButtonOn.png')
		: require('images/squareButtonOff.png');

	const isVibration = parameterName === 'vibration';

	const image = isVibration
		? require('images/vibrationImage.png')
		: require('images/soundImage.png');

	const {
		vibration: vibrationData,
		sound: soundData,
	} = useSelector(selectSettingsData);

	const playSound = () => {
		if (menu_selection_click.isPlaying()) return;
		menu_selection_click.play();
	};

	const handlePress = () => {
		onPress();
		if (parameterName === 'vibration') {
			if (!vibrationData.isActive) Vibration.vibrate(100);
		} else {
			if (vibrationData.isActive) Vibration.vibrate(100);
		};
		if (parameterName !== 'vibration') {
			if (!soundData.isActive) playSound();
		} else {
			if (soundData.isActive) playSound();
		};
	};

	return (
		<TouchableOpacity
			onPress={handlePress}
		>
			<ImageBackground
				source={background}
				style={{
					height: 81,
					width: 81,
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<Image
					source={image}
					style={{
						width: 58,
						height: isVibration ? 45 : 52,
					}}
				/>
			</ImageBackground>
		</TouchableOpacity>
	)
}