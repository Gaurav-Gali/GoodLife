import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import { Expand, Minimize } from 'lucide-react-native';
import TabSwitcher from '@/components/Dashboard/TabSwitcher';
import IssuesMap from '@/components/Dashboard/IssuesMap';
import IssueCardList from "@/components/Dashboard/IssueCardList";

import {useAtom} from "jotai";
import {MapExpandedStore} from "@/store/MapStore";

const Dashboard = () => {
    const [expanded, setExpanded] = useAtom(MapExpandedStore);

    return (
        <View className="h-screen bg-white">
            <View className={`relative ${expanded ? 'h-[50vh]' : 'h-[150px]'}`}>
                <IssuesMap />

                <TouchableOpacity
                    onPress={() => setExpanded(!expanded)}
                    className="absolute top-3 right-6 bg-white rounded-full p-2 shadow"
                >
                    {expanded ? (
                        <Minimize size={18} color="#3B82F6" />
                    ) : (
                        <Expand size={18} color="#3B82F6" />
                    )}
                </TouchableOpacity>
            </View>
            <TabSwitcher />
            <IssueCardList/>
        </View>
    );
};

export default Dashboard;
