import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Bell } from 'lucide-react-native';
import {useRouter} from "expo-router";

const NavBar = () => {
    const router = useRouter();
    return (
        <View className="flex-row bg-white items-center justify-between px-4 py-3">
            <Text className="text-zinc-800 text-3xl font-semibold">GoodLife</Text>

            <View className="flex-row bg-white items-center justify-center gap-4">
                <TouchableOpacity onPress={() => router.push('/(screens)/Ngo')} className={"bg-blue-500 py-3 rounded-full px-4 flex items-center justify-center"}>
                    <Text className={"text-white font-medium"}>
                        NGO
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity className={"bg-zinc-100 rounded-full h-11 w-11 flex items-center justify-center"}>
                    <Bell color="#71717a" size={24} />
                </TouchableOpacity>



                <TouchableOpacity onPress={() => router.push("/(screens)/Profile")} className={"border border-zinc-100 rounded-full"}>
                    <Image
                        source={require("@/assets/images/profile.png")}
                        className={"h-11 w-11 rounded-full"}
                        resizeMode="cover"
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default NavBar;
