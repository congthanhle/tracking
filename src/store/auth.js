import { db } from "@/services/firebase";
import { doc, getDoc } from "firebase/firestore";

/**
 * @param {string} email
 * @returns {Promise<boolean>}
 */
export async function isApprovedEmail(email) {
  const userRef = doc(db, "approved_users", email);
  const userSnap = await getDoc(userRef);
  return userSnap.exists();
}
