import React from 'react';
import {View,Text,Image} from "react-native";
import ScreenWrapper from "@/components/ScreenWapper";
import KeyPadInput from "@/components/AuthScreen/KeyPadInput";

import {useAtom} from "jotai";
import {MobileNumberAtom} from "@/store/MobileNumberStore";

const Login = () => {
    const [mobileNumber, _] = useAtom(MobileNumberAtom);
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

                <View className={"flex-row items-center justify-center gap-2 mt-10"}>
                    <Text className={"text-3xl font-semibold text-blue-600"}>+91</Text>
                    <Text className={"text-3xl font-semibold text-zinc-700"}>{mobileNumber}</Text>
                </View>

                <View className={"flex items-center justify-center"}>
                    <KeyPadInput/>
                </View>
            </View>
        </ScreenWrapper>
    );
};

export default Login;