import {
    collection,
    doc,
    getDoc,
    setDoc,
    runTransaction,
    getDocs,
    updateDoc,
    deleteDoc,
    query,
    where
} from "firebase/firestore";
import { db } from "@/firebaseConfig";

export type IssuesType = {
    id: number;
    userId: string;
    upvotes: string[];
    title: string;
    description: string;
    date: string;
    department: string;
    coordinates: number[];
    location: string;
    images: string[];
    priority: "high" | "medium" | "low";
    verified: boolean;
    status: "listed" | "progress" | "resolved";
};

const issuesCollection = collection(db, "issues");
const counterDoc = doc(db, "counters", "issues");

// ---------- Create with Auto-Increment ----------
export async function createIssue(issue: Omit<IssuesType, "id">) {
    const newId = await runTransaction(db, async (tx) => {
        const counterSnap = await tx.get(counterDoc);
        const current = counterSnap.exists()
            ? (counterSnap.data().lastId as number)
            : 0;
        const nextId = current + 1;
        tx.set(counterDoc, { lastId: nextId }, { merge: true });
        return nextId;
    });

    const issueWithId: IssuesType = { id: newId, ...issue };
    await setDoc(doc(issuesCollection, String(newId)), issueWithId);
    return newId;
}

// ---------- Read ----------
export async function getIssue(id: number): Promise<IssuesType | null> {
    const snap = await getDoc(doc(issuesCollection, String(id)));
    return snap.exists() ? (snap.data() as IssuesType) : null;
}

export async function getAllIssues(): Promise<IssuesType[]> {
    const snap = await getDocs(issuesCollection);
    return snap.docs.map((d) => d.data() as IssuesType);
}

// ---------- Update ----------
export async function updateIssue(id: number, data: Partial<IssuesType>) {
    await updateDoc(doc(issuesCollection, String(id)), data);
}

// ---------- Delete ----------
export async function deleteIssue(id: number) {
    await deleteDoc(doc(issuesCollection, String(id)));
}

export async function toggleUpvote(issueId: number, userPhone: string) {
    const q = query(collection(db, "issues"), where("id", "==", issueId));
    const snapshot = await getDocs(q);
    if (snapshot.empty) return;

    const issueDoc = snapshot.docs[0].ref;

    await runTransaction(db, async (transaction) => {
        const snap = await transaction.get(issueDoc);
        if (!snap.exists()) return;

        const upvotes: string[] = snap.data().upvotes || [];

        transaction.update(issueDoc, {
            upvotes: upvotes.includes(userPhone)
                ? upvotes.filter((p) => p !== userPhone)
                : [...upvotes, userPhone],
        });
    });
}