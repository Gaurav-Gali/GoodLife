import React from 'react';
import {View} from "react-native";
import TabSwitcher from "@/components/Dashboard/TabSwitcher";
import {IssueCard} from "@/components/Dashboard/IssueCard";
import IssuesMap from "@/components/Dashboard/IssuesMap";

const Dashboard = () => {
    return (
        <View className={"h-screen"}>
            <IssuesMap/>
            <TabSwitcher/>
            <IssueCard/>
        </View>
    );
};

export default Dashboard;