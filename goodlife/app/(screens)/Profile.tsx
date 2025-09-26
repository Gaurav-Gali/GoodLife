import React from 'react';
import {Image, Text, TouchableOpacity, View} from "react-native";
import {ArrowLeft, LogOut} from "lucide-react-native";
import {useRouter} from "expo-router";
import TabSwitcher from "@/components/Dashboard/TabSwitcher";
import IssueCardList from "@/components/Dashboard/IssueCardList";
import {useAtom} from "jotai";
import {MobileNumberAtom} from "@/store/MobileNumberStore";

const Profile = () => {
    const router = useRouter();
    const [mobileNumber, setMobileNumber] = useAtom(MobileNumberAtom);
    return (
        <View className={"h-screen bg-white"}>
            <TouchableOpacity onPress={() => router.back()} className={"flex-row gap-2 w-24 h-10 ml-5 items-center justify-center p-2 rounded-full bg-zinc-100"}>
                <ArrowLeft color={"#52525B"} size={16} />
                <Text className={"text-zinc-700"}>Back</Text>
            </TouchableOpacity>

            <View className={"px-6 py-6 flex-row items-center justify-start gap-2"}>
                <Image
                    source={require("@/assets/images/profile.png")}
                    className={"h-20 w-20 rounded-full border border-zinc-100"}
                    resizeMode="cover"
                />
                <View className={"flex-col items-start justify-start gap-1"}>
                    <View className={"text-zinc-700 flex-row items-center justify-center gap-1"}>
                        <Text className={"text-blue-500 text-3xl font-medium"}>+91</Text>
                        <Text className={"text-3xl"}>{mobileNumber}</Text>
                    </View>
                    <TouchableOpacity onPress={() => {
                        setMobileNumber("");
                        router.replace('/');
                    }} className={"bg-rose-500 flex-row items-center gap-2 justify-center p-2 px-4 rounded-full"}>
                        <LogOut size={16} color={"white"}/>
                        <Text className={"text-white font-semibold"}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View>
                <TabSwitcher/>
                <IssueCardList/>
            </View>
        </View>
    );
};

export default Profile;