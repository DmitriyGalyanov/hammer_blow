/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';

import {Text} from 'react-native';

import store from 'app_redux/store';
import {Provider} from 'react-redux';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import MainMenuScreen from 'screens/MainMenuScreen';
import SecondaryMenuScreen from 'screens/SecondaryMenuScreen';
import GameScreen from 'screens/GameScreen';
import WebViewScreen from 'screens/WebViewScreen';


import remoteConfig from '@react-native-firebase/remote-config';


const Stack = createStackNavigator();

const App = () => {
		//gather remote config value(s) and set appropriate local (state) values
		const [depend_on, setDepend_on] = useState('game');
		const [remoteConfigUrl, setRemoteConfigUrl] = useState('');
	
		useEffect(() => {
			remoteConfig()
			.setDefaults({
				'depend_on': 'game', //'game' || 'remote_config'
				'url': '',
			})
			.then(() => {
				return remoteConfig().setConfigSettings({
					minimumFetchIntervalMillis: 10000,
				})
			})
			.then(() => remoteConfig().fetchAndActivate())
			.then(fetchedRemotely => {
				setDepend_on(remoteConfig().getValue('depend_on').asString());
				setRemoteConfigUrl(remoteConfig().getValue('url').asString());
			})
			.catch(er => console.error(er));
		}, []);

	//set render component
	const [shouldRenderWebView, setShouldRenderWebView] = useState(false);

	useEffect(() => {
		console.log('Depend on:', depend_on, 'URL:', remoteConfigUrl)
		if (depend_on === 'remote_config') {
			setShouldRenderWebView(true);
		}
	}, [remoteConfigUrl, depend_on]);

	console.log('test')


	return (
		<Provider store={store}>
			{shouldRenderWebView && (
				<WebViewScreen url={remoteConfigUrl} />
			)}
			{!shouldRenderWebView && (
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
						/>
						<Stack.Screen
							name="SecondaryMenu"
							component={SecondaryMenuScreen}
						/>
						<Stack.Screen
							name="Game"
							component={GameScreen}
						/>
					</Stack.Navigator>
				</NavigationContainer>
			)}
		</Provider>
	);
};

export default App;
