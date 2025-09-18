import React from 'react';
import {View,Text,Image} from "react-native";
import ScreenWrapper from "@/components/ScreenWapper";

const Login = () => {
    return (
        <ScreenWrapper className={""}>
            <View className={"flex items-center justify-center"}>
                <Image
                    source={require("@/assets/images/couch.png")}
                    className={"h-32"}
                    resizeMode="cover"
                />
            </View>
            <View className={"rounded-t-3xl pt-6 px-6 bg-white shadow-md flex-1"}>
                <Text className={"text-3xl mb-3 text-zinc-800 tracking-wider font-semibold"}>{"Enter your\nmobile number"}</Text>
                <Text className={"text-zinc-400 font-normal text-lg"}>We will send you a confirmation code</Text>
            </View>
        </ScreenWrapper>
    );
};

export default Login;