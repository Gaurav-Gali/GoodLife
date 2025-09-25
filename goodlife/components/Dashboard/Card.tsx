import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Building2, Calendar, MapPin, TrendingUp } from 'lucide-react-native';
import ImageSlider from './ImageSlider';
import type { IssuesType } from '@/store/IssueStore';

type CardProps = {
    item: IssuesType;
    isResolved?: boolean; // 👈 new prop
};

const Card = ({ item, isResolved = false }: CardProps) => {
    // decide which images to show
    const imagesToShow = isResolved
        ? item.images.slice(0, 2).reverse() // after image first
        : item.images.length > 0
            ? [item.images[0]] // only one image
            : [];

    return (
        <View className="mb-6 bg-white border border-zinc-100 rounded-2xl p-5">
            <Text className="text-lg font-semibold text-blue-500 mb-3">{item.title}</Text>

            <View className="mb-4 flex-row items-center gap-3">
                <Meta icon={<Building2 size={16} color="#3B82F6" />} text={item.department} />
                <Meta icon={<MapPin size={16} color="#3B82F6" />} text={item.location} />
                <Meta icon={<Calendar size={16} color="#3B82F6" />} text={item.date} />
            </View>

            <View className="flex-row justify-between items-center mb-4">
                <PriorityChip priority={item.priority} />
                <TouchableOpacity className="flex-row items-center px-3 py-1 bg-blue-50 rounded-full">
                    <TrendingUp size={16} color="#3B82F6" />
                    <Text className="text-blue-600 font-semibold ml-1">{item.upvotes}</Text>
                </TouchableOpacity>
            </View>

            {imagesToShow.length > 0 && <ImageSlider images={imagesToShow} />}

            <Text className="text-md font-normal text-zinc-700 px-3 pt-3">{item.description}</Text>

            <View className="flex-row justify-between items-center mt-4 border-t border-zinc-100 pt-3">
                <StatusChip resolved={item.resolved} />
                <Text className="text-xs text-zinc-400">#{item.id}</Text>
            </View>
        </View>
    );
};

/* ---------- Shared sub-components ---------- */
const Meta = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
    <View className="flex-row items-center">
        {icon}
        <Text className="ml-2 text-zinc-600 text-sm">{text}</Text>
    </View>
);

const StatusChip = ({ resolved }: { resolved: boolean }) => (
    <View
        className={`flex-row items-center px-3 py-1 rounded-full ${
            resolved ? 'bg-blue-100' : 'bg-orange-100'
        }`}
    >
        <View
            className={`w-2 h-2 rounded-full mr-2 ${
                resolved ? 'bg-blue-500' : 'bg-orange-500'
            }`}
        />
        <Text
            className={`text-sm font-medium ${
                resolved ? 'text-blue-700' : 'text-orange-700'
            }`}
        >
            {resolved ? 'Resolved' : 'Pending'}
        </Text>
    </View>
);

const colors = {
    high: { bg: 'bg-red-100', text: 'text-red-700', dot: 'bg-red-500' },
    medium: { bg: 'bg-amber-100', text: 'text-amber-700', dot: 'bg-amber-500' },
    low: { bg: 'bg-emerald-100', text: 'text-emerald-700', dot: 'bg-emerald-500' },
};
const PriorityChip = ({ priority }: { priority: 'high' | 'medium' | 'low' }) => {
    const style = colors[priority];
    return (
        <View className={`flex-row items-center px-3 py-1 rounded-full ${style.bg}`}>
            <View className={`w-2 h-2 rounded-full mr-2 ${style.dot}`} />
            <Text className={`text-sm font-medium ${style.text}`}>
                {priority.toUpperCase()}
            </Text>
        </View>
    );
};

export default Card;
