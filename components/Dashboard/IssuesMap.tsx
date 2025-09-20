import React from 'react';
import { View } from 'react-native';
import MapView, {Marker} from 'react-native-maps';

export default function IssuesMap() {
    return (
        <View className="h-full bg-white px-3 mt-1 mb-1">
            <MapView initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }} style={{flex:1, borderRadius:15}}>
               <Marker coordinate={{latitude: 37.78825,
                   longitude: -122.4324}} title={"Issue Spot 1"} description={"Descrition for issue 1"}/>
            </MapView>
        </View>
    );
}
