// src/firebaseTest.js
import { db } from "./firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export async function testWrite() {
  try {
    const ref = await addDoc(collection(db, "test_collection"), {
      mensagem: "Hello Firebase",
      criadoEm: serverTimestamp(),
    });
    console.log("Documento salvo com ID:", ref.id);
  } catch (err) {
    console.error("Erro ao salvar no Firestore:", err);
  }
}
