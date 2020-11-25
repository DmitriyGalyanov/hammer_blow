/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React from 'react';

import store from 'app_redux/store';
import {Provider} from 'react-redux';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import MainMenuScreen from 'screens/MainMenuScreen';
import SecondaryMenuScreen from 'screens/SecondaryMenuScreen';
import GameScreen from 'screens/GameScreen';


const Stack = createStackNavigator();

const App = () => {

	return (
		<Provider store={store}>
			<NavigationContainer>
				<Stack.Navigator
					initialRouteName='MainMenu'

					screenOptions={{
						header: () => null,
						
					}}
				>
					<Stack.Screen
						name="MainMenu"
						component={MainMenuScreen}
						options={{

						}}
					/>
					<Stack.Screen
						name="SecondaryMenu"
						component={SecondaryMenuScreen}
						options={{

						}}
					/>
					<Stack.Screen
						name="Game"
						component={GameScreen}
						options={{

						}}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</Provider>
	);
};
export default App;
