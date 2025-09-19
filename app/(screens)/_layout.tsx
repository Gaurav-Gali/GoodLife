import React from 'react';
import {View} from "react-native";
import {Slot} from "expo-router";
import ScreenWrapper from "@/components/ScreenWapper";
import NavBar from "@/components/NavBar";

const _Layout = () => {
    return (
        <ScreenWrapper className={"flex"}>
            <NavBar/>
            <View className={"flex-1"}>
                <Slot />
            </View>
        </ScreenWrapper>
    );
};

export default _Layout;