import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/firebase/firebaseConfig";
import { UserPreferences } from "@/types/preferences";

export async function savePreferences(preferences: UserPreferences) {
  const user = auth.currentUser;
  if (!user) return;

  await setDoc(
    doc(db, "users", user.uid),
    {
      preferences: {
        ...preferences,
        updatedAt: serverTimestamp(),
      },
    },
    { merge: true }
  );
}

export async function getPreferences(): Promise<UserPreferences | null> {
  const user = auth.currentUser;
  if (!user) return null;

  const snap = await getDoc(doc(db, "users", user.uid));
  if (!snap.exists()) return null;

  return snap.data().preferences ?? null;
}

export async function updatePreference<K extends keyof UserPreferences>(
  key: K,
  value: UserPreferences[K]
) {
  const user = auth.currentUser;
  if (!user) return;

  await updateDoc(doc(db, "users", user.uid), {
    [`preferences.${key}`]: value,
    "preferences.updatedAt": serverTimestamp(),
  });
}