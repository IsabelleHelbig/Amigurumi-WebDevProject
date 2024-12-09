import { db } from "../_utils/firebase";
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  doc,
  query,
  where,
} from "firebase/firestore";

//retrieve all items
export const getItems = async () => {
  // Reference to the shared 'items' collection
  const itemsCollectionRef = collection(db, "items");

  // Get all documents from the 'items' collection
  const querySnapshot = await getDocs(itemsCollectionRef);

  // Map through each document and create an array of items
  const items = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return items;
};

export const addItem = async (item) => {
  const docRef = await addDoc(collection(db, "items"), item);
  return docRef.id;
};

//retrieve one item by its id
export const getItem = async (id) => {
  const itemsRef = collection(db, "items");
  const q = query(itemsRef, where("id", "==", id)); // Query where "id" field matches the given id
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    // Get the first matching document
    const docSnap = querySnapshot.docs[0];
    const item = { id: docSnap.id, ...docSnap.data() };
    return item;
  } else {
    console.error("No document found with id field:", id);
    return null;
  }
};
