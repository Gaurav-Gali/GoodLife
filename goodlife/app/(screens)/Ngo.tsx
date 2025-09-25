import React from 'react';
import {View, Text, TouchableOpacity} from "react-native";
import {ArrowLeft} from "lucide-react-native";
import {useRouter} from "expo-router";

const Ngo = () => {
    const router = useRouter();

    return (
        <View className={"h-screen bg-white"}>
            <TouchableOpacity onPress={() => router.back()} className={"flex-row gap-2 w-24 h-10 ml-5 items-center justify-center p-2 rounded-full bg-zinc-100"}>
                <ArrowLeft color={"#52525B"} size={16} />
                <Text className={"text-zinc-700"}>Back</Text>
            </TouchableOpacity>

            <View className={"pt-6 px-6 bg-white"}>
                <Text className={"text-black font-medium"}>NGO Screen</Text>
            </View>
        </View>
    );
};

export default Ngo;