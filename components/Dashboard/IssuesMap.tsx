import React from 'react';
import { View } from 'react-native';
import MapView from 'react-native-maps';

export default function IssuesMap() {
    return (
        <View className="h-[150px] bg-white px-3 mt-1 mb-1">
            <MapView style={{flex:1, borderRadius:15}} />
        </View>
    );
}
