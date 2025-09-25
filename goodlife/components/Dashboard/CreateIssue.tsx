import React from 'react';
import {Image,TextInput, TouchableOpacity, View} from "react-native";
import {Image as ImageIcon, MapPin, ArrowUp,X} from "lucide-react-native";

const CreateIssue = () => {
    return (
        <View className={""}>
            <View className={"relative"}>
                <TextInput
                    editable
                    multiline
                    className={"border border-zinc-200 text-zinc-600 font-normal text-md placeholder:text-zinc-400  rounded-3xl h-32 p-4"}
                    placeholder={"Describe your issue here"}
                />
                <View className={"absolute bg-transparent rounded-full bottom-3 right-4 flex-row items-center justify-center gap-3"}>
                    <View className={"flex-row items-center justify-center gap-3"}>
                        <TouchableOpacity
                            className="bg-zinc-100 border border-zinc-200 rounded-full h-10 w-10 flex items-center justify-center"
                            activeOpacity={0.7}
                        >
                            <MapPin color="#52525b" size={18} />
                        </TouchableOpacity>

                        <TouchableOpacity
                            className="bg-zinc-100 border border-zinc-200 rounded-full h-10 w-10 flex items-center justify-center"
                            activeOpacity={0.7}
                        >
                            <ImageIcon color="#52525b" size={18} />
                        </TouchableOpacity>

                        <TouchableOpacity
                            className="bg-blue-500 border border-blue-600 rounded-full h-10 w-10 flex items-center justify-center"
                            activeOpacity={0.7}
                        >
                            <ArrowUp color="white" size={18} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <ImageSelected/>
        </View>
    );
};

const ImageSelected = () => {
    const imageMap: Record<string, any> = {
        'issue1.png': require('@/assets/images/issue1.png'),
        'issue2.png': require('@/assets/images/issue2.png'),
        'issue3.png': require('@/assets/images/issue3.png'),
    };

    return (
        <View className={"flex-row items-center justify-start gap-2 mt-4 ml-1"}>
            {Object.values(imageMap).map((img, i) => (
                <View key={i} className="relative mr-2">
                    <Image
                        source={img}
                        style={{ width: 80, height: 80, borderRadius: 10 }}
                        resizeMode="cover"
                        className="border border-zinc-100"
                    />
                    <TouchableOpacity
                        className="absolute -top-2 -right-2 bg-white rounded-full p-1 border border-zinc-200"
                        activeOpacity={0.7}
                    >
                        <X size={14} color="#ef4444" />
                    </TouchableOpacity>
                </View>
            ))}
        </View>
    );
};

export default CreateIssue;