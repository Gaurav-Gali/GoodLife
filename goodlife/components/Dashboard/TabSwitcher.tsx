import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import {Plus} from 'lucide-react-native';
import {useAtom} from "jotai";
import {IssueTypeAtom} from "@/store/IssueStore";
import {useRouter} from "expo-router";

const TabSwitcher = () => {
    const router = useRouter();

    const tabs = [
        { id: 1, value: 'Listed Issues' },
        { id: 2, value: 'Resolved Issues' },
    ];

    const [curTab, setCurTab] = useAtom(IssueTypeAtom);

    return (
        <View className="flex-row items-center justify-center gap-3 py-3 pt-5 px-3">
            {tabs.map((tab) => (
                <TouchableOpacity
                    key={tab.id}
                    onPress={() => setCurTab(tab.id)}
                    className={`flex-1 ${
                        curTab === tab.id ? 'bg-blue-500' : 'bg-zinc-100'
                    } rounded-full flex items-center justify-center py-3`}
                >
                    <Text
                        className={`${
                            curTab === tab.id ? 'text-white' : 'text-zinc-800'
                        } text-md font-medium`}
                    >
                        {tab.value}
                    </Text>
                </TouchableOpacity>
            ))}

            <TouchableOpacity
                onPress={() => router.push("/(screens)/ReportIssue")}
                className="bg-zinc-100  rounded-full h-11 w-11 flex items-center justify-center"
                activeOpacity={0.7}
            >
                <Plus color="#52525b" size={20} />
            </TouchableOpacity>
        </View>
    );
};

export default TabSwitcher;
