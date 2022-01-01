import React from 'react';
import { Text, View, Dimensions, Image } from 'react-native';
import colors from './assets/colors';
import RootNav from './src/navigation';

export default class App extends React.Component {

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: colors.white }}>
                <RootNav />

            </View>
        );
    }
}