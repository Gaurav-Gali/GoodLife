import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Image, Text, TouchableOpacity, View} from "react-native";
import ScreenWrapper from "@/components/ScreenWapper";
import BlinkingCursor from "@/components/BlinkingCursor";
import KeyPadInput from "@/components/AuthScreen/KeyPadInput";
import Button from "@/components/Button";
import {useRouter} from "expo-router";
import {useAtom} from "jotai/index";
import {MobileNumberAtom} from "@/store/MobileNumberStore";
import {OTPStore,OTPConfirm} from "@/store/OTPStore";
import { ArrowLeft } from 'lucide-react-native';
import {addUserIfNotExists} from "@/actions/UserActions";

const Otp = () => {
    const router = useRouter();
    const [mobileNumber, setMobileNumber] = useAtom(MobileNumberAtom);
    const [otp, setOtp] = useAtom(OTPStore);
    const [confirm, setConfirm] = useAtom(OTPConfirm);
    const [loading,setLoading] = useState(false);

    const handleGetOTP = async () => {
        if (otp.length < 6) {
            alert("Incomplete OTP");
        } else if(otp === confirm) {
            setLoading(true);
            await addUserIfNotExists(mobileNumber);
            setLoading(false);

            router.push("/(screens)/Dashboard");
        } else {
            alert("Incorrect OTP");
        }
    }

    const handleBack = () => {
        router.push('/(auth)/Login');
    }

    useEffect(() => {
        alert(confirm);
    }, []);

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
                    {otp.length < 4 && <BlinkingCursor />}
                </View>

                <View className={"flex items-center justify-center"}>
                    <KeyPadInput type={"otp"}/>
                </View>

                <View>
                    <Button onPress={() => handleGetOTP()}>
                        {loading ? <ActivityIndicator className={"m-3"} size={20} color="white" /> : <Text className={"text-blue-50 font-medium text-xl m-3"}>Enter OTP</Text>}
                    </Button>
                </View>

            </View>
        </ScreenWrapper>
    );
};

export default Otp;