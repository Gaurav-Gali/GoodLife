import React from 'react';
import {Text, TouchableOpacity} from "react-native";
import {useAtom} from "jotai";
import {MobileNumberAtom} from "@/store/MobileNumberStore";

const Keys = ({value}:{value:number}) => {
    const [_, setMobileNumber] = useAtom(MobileNumberAtom);

    const handleKeyPress = () => {
        setMobileNumber((prev) => prev.length<10 ? prev+String(value) : prev);
    }

    return (
        <TouchableOpacity onPress={() => handleKeyPress()} className={"bg-white rounded-xl active:bg-zinc-200 w-20 h-20 flex items-center justify-center"}>
            <Text className={"text-zinc-800  text-2xl bg-transparent font-semibold"}>{value}</Text>
        </TouchableOpacity>
    );
};

export default Keys;