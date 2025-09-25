import React from 'react';
import {Text, TouchableOpacity, View} from "react-native";
import {useLocalSearchParams,useRouter} from "expo-router";
import {ArrowLeft} from "lucide-react-native";
import Card from "@/components/Dashboard/Card";

const Issue = () => {
    const router = useRouter();

    const {id} = useLocalSearchParams();

    const mockIssue = {
        id: id,
        userId: 101,
        title: "Streetlight Not Working",
        description:
            "The streetlight on the corner of Main and 5th has been out for over a week, making the area unsafe at night.",
        date: "2025-09-20",
        department: "Electrical",
        location: "Main St & 5th Ave",
        images: ["issue1.png", "issue2.png","issue3.png"],
        upvotes: 27,
        priority: "high",
        verified: true,
        resolved: false,
    };

    return (
        <View className={"h-screen bg-white"}>
            <TouchableOpacity onPress={() => router.back()} className={"flex-row gap-2 w-24 h-10 ml-5 items-center justify-center p-2 rounded-full bg-zinc-100"}>
                <ArrowLeft color={"#52525B"} size={16} />
                <Text className={"text-zinc-700"}>Back</Text>
            </TouchableOpacity>

            <View className={"pt-6 px-4"}>
                <Card item={mockIssue}/>
            </View>
        </View>
    );
};

export default Issue;