import React from 'react';
import {Dimensions, Platform, View} from "react-native";

const {height} = Dimensions.get("window");

const ScreenWrapper = ({children,className}:{children:React.ReactNode,className:string}) => {
    let paddingTop = Platform.OS === "ios" ? height*0.06 : 50;
    return (
        <View className={`${className} h-screen`} style={{paddingTop:paddingTop}}>
            {children}
        </View>
    );
};

export default ScreenWrapper;