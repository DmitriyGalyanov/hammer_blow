import React from 'react';

import {
	StyleSheet,
	ImageBackground,
	Image,
	View,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import SimpleButton from 'components/SimpleButton';

import background from 'images/mainBackground.jpg';
import coin from 'images/coin.png';


export default function SecondaryMenuScreen() {
	const navigation = useNavigation();

	return (
		<ImageBackground
			source={background}
			style={styles.wrap}
		>
			<Image
				source={coin}
				style={styles.coinImage}
			/>
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
						onPress={() => navigation.push('Game')}
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
	},

	buttonsWrap: {},

	buttonWrap: {
		marginBottom: 32,
	},
});