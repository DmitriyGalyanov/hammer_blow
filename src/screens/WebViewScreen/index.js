import React from 'react';

import {View} from 'react-native';

import {WebView} from 'react-native-webview';


export default function WebViewScreen({url}) {
	console.log('WebViewScreen URL:', url);

	return (
		<View style={{flex: 1}}>
			<WebView
				source={{
					uri: url
				}}
			/>
		</View>
	)
}