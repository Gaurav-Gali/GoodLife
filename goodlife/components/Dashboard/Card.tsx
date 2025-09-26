import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Building2, Calendar, MapPin, TrendingUp } from 'lucide-react-native';
import ImageSlider from './ImageSlider';
import type { IssuesType } from '@/store/IssueStore';
import { toggleUpvote, updateIssueStatus } from "@/actions/IssueActions";

type CardProps = {
    item: IssuesType;
    currentUserPhone: string;
    isResolved?: boolean;
};

const Card = ({ item, currentUserPhone, isResolved = false }: CardProps) => {
    const [upvotes, setUpvotes] = useState<string[]>(item.upvotes || []);
    const [status, setStatus] = useState<IssuesType["status"]>(item.status);

    useEffect(() => {
        setUpvotes(item.upvotes || []);
        setStatus(item.status);
    }, [item.upvotes, item.status]);

    const handleUpvote = async () => {
        if (status === "resolved") return;

        const currentlyUpvoted = upvotes.includes(currentUserPhone);
        setUpvotes(prev =>
            currentlyUpvoted
                ? prev.filter(phone => phone !== currentUserPhone)
                : [...prev, currentUserPhone]
        );

        try {
            await toggleUpvote(item.id, currentUserPhone);
        } catch (err) {
            console.error("Upvote failed:", err);
            setUpvotes(prev =>
                currentlyUpvoted
                    ? [...prev, currentUserPhone]
                    : prev.filter(phone => phone !== currentUserPhone)
            );
        }
    };

    // Cycle status: listed → progress → resolved
    const cycleStatus = async () => {
        const next =
            status === "listed"
                ? "progress"
                : status === "progress"
                    ? "resolved"
                    : "resolved";
        try {
            await updateIssueStatus(item.id, next);
            setStatus(next);
        } catch (e) {
            console.error("Status update failed:", e);
        }
    };

    const imagesToShow =
        status === "resolved"
            ? item.images.slice(0, 2).reverse()
            : item.images.length > 0
                ? [item.images[0]]
                : [];

    const hasUpvoted = upvotes.includes(currentUserPhone);

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

                {status === "resolved" ? (
                    <View className="flex-row items-center px-3 py-1 rounded-full bg-blue-100">
                        <TrendingUp size={16} color="#3B82F6" />
                        <Text className="ml-1 font-semibold text-blue-700">
                            {upvotes.length}
                        </Text>
                    </View>
                ) : (
                    <TouchableOpacity
                        onPress={handleUpvote}
                        className={`flex-row items-center px-3 py-1 rounded-full ${
                            hasUpvoted ? 'bg-blue-500' : 'bg-blue-50'
                        }`}
                    >
                        <TrendingUp size={16} color={hasUpvoted ? '#fff' : '#3B82F6'} />
                        <Text className={`ml-1 font-semibold ${hasUpvoted ? 'text-white' : 'text-blue-600'}`}>
                            {upvotes.length}
                        </Text>
                    </TouchableOpacity>
                )}
            </View>

            {imagesToShow.length > 0 ? (
                <ImageSlider images={imagesToShow} />
            ) : (
                <View className="w-full items-center py-8">
                    <ActivityIndicator size="small" />
                </View>
            )}

            <Text className="text-md font-normal text-zinc-700 px-3 pt-3">{item.description}</Text>

            <View className="flex-row justify-between items-center mt-4 border-t border-zinc-100 pt-3">
                <TouchableOpacity onPress={cycleStatus} disabled={status === "resolved"}>
                    <StatusChip status={status} />
                </TouchableOpacity>
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

const StatusChip = ({ status }: { status: "listed" | "progress" | "resolved" }) => {
    const styles =
        status === "resolved"
            ? { bg: 'bg-green-100', text: 'text-green-700', dot: 'bg-green-500' }
            : status === "progress"
                ? { bg: 'bg-amber-100', text: 'text-amber-700', dot: 'bg-amber-500' }
                : { bg: 'bg-orange-100', text: 'text-orange-700', dot: 'bg-orange-500' };

    return (
        <View className={`flex-row items-center px-3 py-1 rounded-full ${styles.bg}`}>
            <View className={`w-2 h-2 rounded-full mr-2 ${styles.dot}`} />
            <Text className={`text-sm font-medium ${styles.text}`}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </Text>
        </View>
    );
};

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
