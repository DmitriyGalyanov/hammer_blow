import React from 'react';

import {
	StyleSheet,
	TouchableOpacity,
	ImageBackground,
	Text,
} from 'react-native';

import background from 'images/buttonBackground.png';


export default function SimpleButton({title, onPress}) {

	return (
		<TouchableOpacity
			style={styles.wrap}
			onPress={onPress}
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
		width: 193.5,
		height: 54,
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