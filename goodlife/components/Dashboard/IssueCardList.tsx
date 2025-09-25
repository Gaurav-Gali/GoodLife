import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { Building2 } from 'lucide-react-native';
import Card from './Card';
import IssueCardSkeleton from './IssueCardSkeleton';
import { getAllIssues, IssuesType } from "@/actions/IssueActions";
import { useAtom } from 'jotai';
import { IssueTypeAtom } from '@/store/IssueStore';
import {MobileNumberAtom} from "@/store/MobileNumberStore";

const IssueCardList = () => {
    const [issueType] = useAtom(IssueTypeAtom);
    const [mobile,setMobile] = useAtom(MobileNumberAtom);

    const [issues, setIssues] = useState<IssuesType[]>([]);
    const [loading, setLoading] = useState(true);

    // Fetch issues from Firestore
    useEffect(() => {
        const fetchIssues = async () => {
            setLoading(true);
            try {
                const data = await getAllIssues();
                setIssues(data);
            } catch (err) {
                console.error('Failed to fetch issues:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchIssues();
    }, []);

    // Filter & sort issues based on issueType and priority
    const filtered = issues
        .filter(i => (i.status !== 'resolved' && issueType === 1) || (i.status === 'resolved' && issueType === 2))
        .sort((a, b) => {
            const order = { high: 3, medium: 2, low: 1 } as const;
            return order[b.priority] - order[a.priority];
        });

    if (loading) {
        return <IssueCardSkeleton />;
    }

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
            contentContainerStyle={{ padding: 16, paddingBottom: 120, paddingTop: 5 }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => <Card currentUserPhone={mobile} item={item} isResolved={issueType === 2} />}
        />
    );
};

export default IssueCardList;
