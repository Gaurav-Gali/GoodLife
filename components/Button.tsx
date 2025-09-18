import React from 'react';
import {TouchableOpacity, View} from "react-native";

const Button = ({children, onPress}:{children:React.ReactNode, onPress:() => void}) => {
    return (
        <TouchableOpacity className={"bg-blue-500 rounded-2xl flex-row items-center justify-center gap-1"} onPress={onPress}>
            <View>
                {children}
            </View>
        </TouchableOpacity>
    );
};

export default Button;