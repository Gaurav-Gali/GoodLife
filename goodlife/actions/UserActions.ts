import { db } from "@/firebaseConfig";
import { collection, getDocs, addDoc } from "firebase/firestore";

const userCollectionRef = collection(db,"users");

export async function addUserIfNotExists(phone: string) {
    const phones = await getUsers();
    if (!phones.includes(phone)) {
        await addUser(phone);
    }
}

const getUsers = async () => {
    const snapshot = await getDocs(userCollectionRef);
    const phones = snapshot.docs.map(doc => doc.data().phone);
    return phones;
};

const addUser = async (phone: string) => {
    await addDoc(userCollectionRef, {phone: phone});
}