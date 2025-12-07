import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

export async function getUserTransactions(uid) {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) return [];

  const data = snap.data();
  return data.transactions ? data.transactions.sort((a, b) => b.timestamp - a.timestamp) : [];
}
