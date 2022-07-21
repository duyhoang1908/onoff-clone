import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";

export const addDocument = async (collectionName, data) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), {
      ...data,
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const buyProducts = async (data) => {
  await addDocument("buy", data);
};

export const getListProductWithUid = async (uid) => {
  let data = [];
  const q = query(collection(db, "buy"), where("uid", "==", uid));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    data.push({ ...doc.data(), id: doc.id });
  });
  return data;
};

export const getProducts = async (sex) => {
  let data = [];
  const q = query(collection(db, "products"), where("sex", "==", sex));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    data.push({ ...doc.data(), id: doc.id });
  });
  return data;
};

export const getProductDetail = async (sex, code) => {
  let data = {};
  const q = query(
    collection(db, "products"),
    where("sex", "==", sex),
    where("code", "==", code)
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    data = { ...doc.data(), id: doc.id };
  });
  return data;
};

export const filterProductsWithType = async (sex, type) => {
  let data = [];
  const q = query(
    collection(db, "products"),
    where("sex", "==", sex),
    where("type", "==", type)
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    data.push({ ...doc.data(), id: doc.id });
  });
  return data;
};
