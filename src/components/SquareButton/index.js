import React from 'react';

import {
	TouchableOpacity,
	ImageBackground,
	Image,
} from 'react-native';


export default function SquareButton({isActive, parameterName, onPress}) {
	const background = isActive
		? require('images/squareButtonOn.png')
		: require('images/squareButtonOff.png');

	const isVibration = parameterName === 'vibration';

	const image = isVibration
		? require('images/vibrationImage.png')
		: require('images/soundImage.png');

	return (
		<TouchableOpacity
			onPress={onPress}
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