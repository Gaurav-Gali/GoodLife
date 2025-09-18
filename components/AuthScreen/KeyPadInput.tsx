import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import Keys from '@/components/AuthScreen/Keys';
import { Undo2 } from 'lucide-react-native';
import {useAtom} from "jotai/index";
import {MobileNumberAtom} from "@/store/MobileNumberStore";

export default function Keypad() {
    const rows = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
    ];

    const [_, setMobileNumber] = useAtom(MobileNumberAtom);

    const handleUndoPress = () => {
        setMobileNumber((prev) => prev.slice(0,-1));
    }
    return (
        <View className="flex gap-6 p-10">
            {rows.map((row, i) => (
                <View key={i} className="flex-row justify-between gap-12">
                    {row.map(num => (
                        <Keys key={num} value={num} />
                    ))}
                </View>
            ))}

            <View className="flex-row justify-between">
                <View className="flex-1" />
                <View className="flex-1 items-center">
                    <Keys value={0} />
                </View>
                <TouchableOpacity onPress={() => handleUndoPress()} className="flex-1 items-center justify-center">
                    <Undo2 size={22} color={"#a1a1aa"}/>
                </TouchableOpacity>
            </View>
        </View>
    );
}