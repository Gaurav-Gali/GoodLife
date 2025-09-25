import React from 'react';
import {Text, TouchableOpacity, View} from "react-native";
import CreateIssue from "@/components/Dashboard/CreateIssue";
import IssueCardList from "@/components/Dashboard/IssueCardList";
import {ArrowLeft} from "lucide-react-native";

import {useRouter} from "expo-router";

const ReportIssue = () => {
    const router = useRouter();

    return (
            <View className={"h-screen bg-white"}>
                <TouchableOpacity onPress={() => router.back()} className={"flex-row gap-2 w-24 h-10 ml-5 items-center justify-center p-2 rounded-full bg-zinc-100"}>
                    <ArrowLeft color={"#52525B"} size={16} />
                    <Text className={"text-zinc-700"}>Back</Text>
                </TouchableOpacity>

                <View className={"px-6 bg-white py-6 border-b border-b-zinc-100"}>
                    <CreateIssue/>
                </View>

                <View className={"mt-4"}>
                    <IssueCardList/>
                </View>
            </View>
    );
};

export default ReportIssue;