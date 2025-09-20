import React from 'react';
import { View } from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {router} from "expo-router";

export default function IssuesMap() {
    const baseLat = 37.78825;
    const baseLng = -122.4324;

    const markers = [
        {
            latitude: baseLat,
            longitude: baseLng,
            title: "Issue Spot 1",
            description: "Description for issue 1",
        },
        {
            latitude: baseLat + 0.02, // ~2.2 km north
            longitude: baseLng + 0.015, // ~1.5 km east
            title: "Issue Spot 2",
            description: "Description for issue 2",
        },
        {
            latitude: baseLat - 0.018, // ~2 km south
            longitude: baseLng - 0.012, // ~1.3 km west
            title: "Issue Spot 3",
            description: "Description for issue 3",
        },
        {
            latitude: baseLat + 0.01, // ~1.1 km north
            longitude: baseLng - 0.02, // ~2.2 km west
            title: "Issue Spot 4",
            description: "Description for issue 4",
        },
    ];
    return (
        <View className="h-full bg-white px-3 mt-1 mb-1">
            <MapView initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }} style={{flex:1, borderRadius:15}}>
                {markers.map((marker, index) => (
                    <Marker
                        key={index}
                        coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
                        title={marker.title}
                        description={marker.description}
                        onPress={() => router.push('/(screens)/issues/1')}
                    />
                ))}
            </MapView>
        </View>
    );
}
