import {Text, View} from "react-native";
import ScreenWapper from "@/components/ScreenWapper";

import { useRouter } from 'expo-router';
import {useEffect} from "react";

function Index() {
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            router.push('/(auth)/Login');
            // router.push('/(screens)/issues/45');
            // router.push('/(screens)/Dashboard');
        }, 2000);

        return () => clearTimeout(timer);
    }, [router]);

    return (
        <ScreenWapper className={"bg-white gap-5 flex items-center justify-between"}>
            <View className={"flex flex-1 flex-col items-center justify-center gap-1"}>
                <Text className={"font-bold text-zinc-800 text-4xl"}>GoodLife</Text>
                <Text className={"text-lg text-gray-700 italic text-center px-4"}>
                    “Live better, every day.”
                </Text>
            </View>
        </ScreenWapper>
    );
}

export default Index;