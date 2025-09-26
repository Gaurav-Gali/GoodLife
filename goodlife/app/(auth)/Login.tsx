import React from 'react';
import {View,Text,Image} from "react-native";
import ScreenWrapper from "@/components/ScreenWapper";
import KeyPadInput from "@/components/AuthScreen/KeyPadInput";

import {useAtom} from "jotai";
import {MobileNumberAtom} from "@/store/MobileNumberStore";
import {OTPStore,OTPConfirm} from "@/store/OTPStore";
import Button from "@/components/Button";
import BlinkingCursor from '@/components/BlinkingCursor';
import {useRouter} from "expo-router";

const Login = () => {
    const router = useRouter();
    const [mobileNumber, setMobileNumber] = useAtom(MobileNumberAtom);
    const [otp, setOTP] = useAtom(OTPStore);
    const [confirm, setConfirm] = useAtom(OTPConfirm);

    function generateSixDigitCode(): string {
        const num = Math.floor(Math.random() * 1_000_000);
        return num.toString().padStart(6, "0");
    }

    const handleGetOTP = async () => {
        if (mobileNumber.length < 10) {
            alert("Please enter a valid mobile number");
        } else {
            try {
                setOTP("");
                setConfirm(generateSixDigitCode());
                router.push("/(auth)/OTP");
            } catch (err) {
                alert(err);
            }
        }
    }

    return (
        <ScreenWrapper className={"bg-white"}>
            <View className={"flex items-center bg-white justify-center"}>
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
                    {mobileNumber.length <10 && <BlinkingCursor />}
                </View>

                <View className={"flex items-center justify-center"}>
                    <KeyPadInput type={"mobile"}/>
                </View>

                <View id={"recaptcha"}></View>

                <View>
                    <Button onPress={() => handleGetOTP()}>
                        <Text className={"text-blue-50 font-medium text-xl m-3"}>Get OTP</Text>
                    </Button>
                </View>

            </View>
        </ScreenWrapper>
    );
};

export default Login;