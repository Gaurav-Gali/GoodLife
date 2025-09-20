import React from 'react';
import {Image, Text, TouchableOpacity, View} from "react-native";
import ScreenWrapper from "@/components/ScreenWapper";
import BlinkingCursor from "@/components/BlinkingCursor";
import KeyPadInput from "@/components/AuthScreen/KeyPadInput";
import Button from "@/components/Button";
import {useRouter} from "expo-router";
import {useAtom} from "jotai/index";
import {MobileNumberAtom} from "@/store/MobileNumberStore";
import {OTPStore} from "@/store/OTPStore";
import { ArrowLeft } from 'lucide-react-native';

const Otp = () => {
    const router = useRouter();
    const [mobileNumber, setMobileNumber] = useAtom(MobileNumberAtom);
    const [otp, setOTP] = useAtom(OTPStore);

    const handleGetOTP = () => {
        if (otp.length < 4) {
            alert("Incomplete OTP");
        } else if(otp === '1234') {
            // alert("Correct OTP");
            router.push("/(screens)/Dashboard");
        }
    }

    const handleBack = () => {
        router.push('/(auth)/Login');
    }

    return (
        <ScreenWrapper className={"bg-white"}>
            <View className="bg-white">
                <TouchableOpacity onPress={() => handleBack()} className="absolute z-50 top-0 left-4">
                    <ArrowLeft
                        size={28}
                        color="black"
                    />
                </TouchableOpacity>

                <View className={"flex items-center justify-center"}>
                    <Image
                        source={require("@/assets/images/couch.png")}
                        className="h-32"
                        resizeMode="cover"
                    />
                </View>
            </View>

            <View className={"rounded-t-3xl pt-6 px-6 bg-white shadow-md flex-1"}>
                <Text className={"text-3xl mb-3 text-zinc-800 tracking-wider font-semibold"}>{"Enter code sent\nto your phone"}</Text>
                <Text className={"text-zinc-400 font-normal text-lg"}>We sent the confirmation code to <Text className={"text-blue-600"}>+91 {mobileNumber}</Text></Text>

                <View className={"flex-row items-center justify-center gap-2 mt-10"}>
                    <Text className={"text-3xl font-semibold text-zinc-700"}>{otp}</Text>
                    {otp.length <4 && <BlinkingCursor />}
                </View>

                <View className={"flex items-center justify-center"}>
                    <KeyPadInput type={"otp"}/>
                </View>

                <View>
                    <Button onPress={() => handleGetOTP()}>
                        <Text className={"text-blue-50 font-medium text-xl m-3"}>Enter OTP</Text>
                    </Button>
                </View>

                {/*<View className="items-center mt-6">*/}
                {/*    <Text className="text-zinc-400 text-sm text-center">*/}
                {/*        By continuing, you agree to our{' '}*/}
                {/*        <Text className="text-blue-600">Terms of Service</Text> &{' '}*/}
                {/*        <Text className="text-blue-600">Privacy Policy</Text>.*/}
                {/*    </Text>*/}
                {/*    <Text className="text-zinc-400 text-xs mt-1 italic">*/}
                {/*        We respect your privacy—no spam, ever.*/}
                {/*    </Text>*/}
                {/*</View>*/}
            </View>
        </ScreenWrapper>
    );
};

export default Otp;