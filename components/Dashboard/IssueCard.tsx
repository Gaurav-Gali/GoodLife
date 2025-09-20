import React, { useState } from 'react';
import {
    View,
    Text,
    FlatList,
    Image,
    ScrollView,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import { useAtom } from 'jotai';
import { Building2, Calendar, MapPin, TrendingUp } from 'lucide-react-native';
import { IssuesAtom, IssueTypeAtom } from '@/store/IssueStore';

const { width: screenWidth } = Dimensions.get('window');
const contentPadding = 16;
const cardInnerPadding = 20;
const slideWidth = screenWidth - contentPadding * 2 - cardInnerPadding * 2;
const imageInnerWidth = slideWidth - 12;

const imageMap: Record<string, any> = {
    'issue1.png': require('@/assets/images/issue1.png'),
    'issue2.png': require('@/assets/images/issue2.png'),
    'issue3.png': require('@/assets/images/issue3.png'),
};

const priorityChip: Record<'high' | 'medium' | 'low', { bg: string; text: string; dot: string }> = {
    high: { bg: 'bg-red-100', text: 'text-red-700', dot: 'bg-red-500' },
    medium: { bg: 'bg-amber-100', text: 'text-amber-700', dot: 'bg-amber-500' },
    low: { bg: 'bg-emerald-100', text: 'text-emerald-700', dot: 'bg-emerald-500' },
};

const ImageSlider = ({ images }: { images: string[] }) => {
    const [index, setIndex] = useState(0);
    if (!images?.length) return null;

    return (
        <View className="mt-3">
            <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={e => setIndex(Math.round(e.nativeEvent.contentOffset.x / slideWidth))}
            >
                {images.map((img, i) => (
                    <View key={i} style={{ width: slideWidth }}>
                        <Image
                            source={imageMap[img]}
                            style={{ width: imageInnerWidth, height: 192, borderRadius: 16, marginRight: 12 }}
                            resizeMode="cover"
                        />
                    </View>
                ))}
            </ScrollView>

            {images.length > 1 && (
                <View className="flex-row justify-center mt-2">
                    {images.map((_, i) => (
                        <View key={i} className={`w-2 h-2 mx-1 rounded-full ${i === index ? 'bg-blue-500' : 'bg-zinc-300'}`} />
                    ))}
                </View>
            )}
        </View>
    );
};

const IssueCard = () => {
    const [issues] = useAtom(IssuesAtom);
    const [issueType] = useAtom(IssueTypeAtom);

    const filtered = issues
        .filter(
            i => (!i.resolved && issueType === 1) || (i.resolved && issueType === 2)
        )
        .sort((a, b) => {
            const order: Record<'high' | 'medium' | 'low', number> = {
                high: 3,
                medium: 2,
                low: 1,
            };
            return order[b.priority] - order[a.priority];
        });


    if (!filtered.length) {
        return (
            <View className="flex-1 justify-center items-center p-8">
                <Building2 size={36} color="#9CA3AF" />
                <Text className="text-zinc-500 mt-4 text-center">No issues to display</Text>
            </View>
        );
    }

    return (
        <FlatList
            data={filtered}
            keyExtractor={i => i.id.toString()}
            contentContainerStyle={{ padding: 16, paddingBottom:120 }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
                const style = priorityChip[item.priority];
                return (
                    <View className="mb-6 bg-white border border-zinc-100  rounded-2xl p-5">
                        <Text className="text-lg font-semibold text-blue-500 mb-3">{item.title}</Text>

                        <View className="mb-4 flex-row items-center justify-start gap-3">
                            <Meta icon={<Building2 size={16} color="#3B82F6" />} text={item.department} />
                            <Meta icon={<MapPin size={16} color="#3B82F6" />} text={item.location} />
                            <Meta icon={<Calendar size={16} color="#3B82F6" />} text={item.date} />
                        </View>

                        <View className="flex-row justify-between items-center mb-4">
                            <View className={`flex-row items-center px-3 py-1 rounded-full ${style.bg}`}>
                                <View className={`w-2 h-2 rounded-full mr-2 ${style.dot}`} />
                                <Text className={`text-sm font-medium ${style.text}`}>{item.priority.toUpperCase()}</Text>
                            </View>

                            <TouchableOpacity className="flex-row items-center px-3 py-1 bg-blue-50 rounded-full">
                                <TrendingUp size={16} color="#3B82F6" />
                                <Text className="text-blue-600 font-semibold ml-1">{item.upvotes}</Text>
                            </TouchableOpacity>
                        </View>

                        <ImageSlider images={item.images} />

                        <Text className={"text-md font-normal text-zinc-700 px-3 pt-3"}>{item.description}</Text>

                        <View className="flex-row justify-between items-center mt-4 border-t border-zinc-100 pt-3">
                            <View className={`flex-row items-center px-3 py-1 rounded-full ${item.resolved ? 'bg-blue-100' : 'bg-orange-100'}`}>
                                <View className={`w-2 h-2 rounded-full mr-2 ${item.resolved ? 'bg-blue-500' : 'bg-orange-500'}`} />
                                <Text className={`text-sm font-medium ${item.resolved ? 'text-blue-700' : 'text-orange-700'}`}>
                                    {item.resolved ? 'Resolved' : 'Pending'}
                                </Text>
                            </View>

                            <Text className="text-xs text-zinc-400">#{item.id}</Text>
                        </View>
                    </View>
                );
            }}
        />
    );
};

const Meta = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
    <View className="flex-row items-center">
        {icon}
        <Text className="ml-2 text-zinc-600 text-sm">{text}</Text>
    </View>
);

export default IssueCard;
