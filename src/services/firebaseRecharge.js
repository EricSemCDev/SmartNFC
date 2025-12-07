import { doc, updateDoc, getDoc, arrayUnion } from "firebase/firestore";
import { db } from "./../firebase";

export async function rechargeBalance(uid, amount) {
  const userRef = doc(db, "users", uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    throw new Error("Usuário não encontrado no banco.");
  }

  const oldBalance = userSnap.data().balance || 0;
  const newBalance = oldBalance + amount;

  await updateDoc(userRef, {
    balance: newBalance,
    transactions: arrayUnion({
      id: Date.now(),
      type: "recarga",
      amount: amount,
      timestamp: Date.now(),
    }),
  });

  return newBalance;
}
