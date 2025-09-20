import React, { useEffect, useRef } from 'react';
import { View, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function IssueCardSkeleton() {
    const shimmer = useRef(new Animated.Value(-1)).current;

    useEffect(() => {
        Animated.loop(
            Animated.timing(shimmer, {
                toValue: 1,
                duration: 1200,
                useNativeDriver: true,
            })
        ).start();
    }, [shimmer]);

    const translateX = shimmer.interpolate({
        inputRange: [-1, 1],
        outputRange: [-200, 200],
    });

    return (
        <View className="mb-6 bg-white border border-zinc-100 rounded-2xl p-5 overflow-hidden">
            {/* Title */}
            <View className="h-5 w-1/2 bg-zinc-200 rounded mb-3" />

            {/* Meta row */}
            <View className="flex-row mb-4 items-center justify-start gap-2">
                <View className="h-4 w-20 bg-zinc-200 rounded" />
                <View className="h-4 w-16 bg-zinc-200 rounded" />
                <View className="h-4 w-24 bg-zinc-200 rounded" />
            </View>

            {/* Priority + upvotes */}
            <View className="flex-row justify-between items-center mb-4">
                <View className="h-6 w-24 bg-zinc-200 rounded-full" />
                <View className="h-6 w-16 bg-zinc-200 rounded-full" />
            </View>

            {/* Image area */}
            <View className="h-48 w-full bg-zinc-200 rounded-xl mb-4" />

            {/* Description */}
            <View className="h-4 w-5/6 bg-zinc-200 rounded mb-2" />
            <View className="h-4 w-2/3 bg-zinc-200 rounded" />

            {/* Footer row */}
            <View className="flex-row justify-between items-center mt-4 border-t border-zinc-100 pt-3">
                <View className="h-6 w-24 bg-zinc-200 rounded-full" />
                <View className="h-4 w-10 bg-zinc-200 rounded" />
            </View>

            {/* Shimmer gradient overlay */}
            <Animated.View
                className="absolute top-0 left-0 right-0 bottom-0"
                style={{ transform: [{ translateX }] }}
            >
                <LinearGradient
                    colors={['transparent', 'rgba(255,255,255,0.35)', 'transparent']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    className="flex-1"
                />
            </Animated.View>
        </View>
    );
}
