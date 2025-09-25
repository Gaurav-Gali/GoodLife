import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { useAtom } from 'jotai';
import { Building2 } from 'lucide-react-native';
import { IssuesAtom, IssueTypeAtom } from '@/store/IssueStore';
import Card from './Card';
import IssueCardSkeleton from './IssueCardSkeleton';

const IssueCardList = () => {
    const [issues] = useAtom(IssuesAtom);
    const [issueType] = useAtom(IssueTypeAtom);

    const [loading, setLoading] = React.useState(false);

    const filtered = issues
        .filter(i => (!i.resolved && issueType === 1) || (i.resolved && issueType === 2))
        .sort((a, b) => {
            const order = { high: 3, medium: 2, low: 1 } as const;
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

    if (loading) {
        return (
            <IssueCardSkeleton/>
        );
    }

    return (
        <FlatList
            data={filtered}
            keyExtractor={i => i.id.toString()}
            contentContainerStyle={{ padding: 16, paddingBottom: 120, paddingTop: 5 }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => <Card item={item} isResolved={issueType === 2} />}
        />
    );
};

export default IssueCardList;
