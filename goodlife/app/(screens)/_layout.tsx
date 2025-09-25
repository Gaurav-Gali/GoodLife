import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Slot, usePathname } from 'expo-router';
import ScreenWrapper from '@/components/ScreenWapper';
import NavBar from '@/components/NavBar';
import { OctagonAlert } from 'lucide-react-native';

const _Layout = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const pathname = usePathname();

    const nonScreens = ['/Dashboard'];
    const showNavBar = nonScreens.includes(pathname);

    return (
        <ScreenWrapper className="flex bg-white">
            {showNavBar && <NavBar />}

            <View className="flex-1">
                <Slot />

                <TouchableOpacity
                    className="absolute z-[1000] bottom-6 right-6 rounded-full bg-rose-500 px-5 py-3 gap-2 flex-row items-center justify-center active:opacity-90"
                    activeOpacity={0.8}
                    onPress={() => {
                        alert("Help is arriving");
                    }}
                >
                    <OctagonAlert size={18} color="white" />
                    <Text className="text-white text-base font-semibold tracking-wide">
                        SOS
                    </Text>
                </TouchableOpacity>
            </View>
        </ScreenWrapper>
    );
};

export default _Layout;
