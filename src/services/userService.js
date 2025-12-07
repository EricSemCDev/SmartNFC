// src/services/userService.js
import { db } from "../firebase";
import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

export async function ensureUserDocument(user) {
  const uid = user.uid;
  const email = user.email || "";
  const name = user.displayName || "Usuário";

  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    const initialBalance = 0;

    await setDoc(ref, {
      name,
      email,
      balance: initialBalance,
      createdAt: serverTimestamp(),
    });

    return {
      name,
      email,
      balance: initialBalance,
    };
  }

  return snap.data();
}
