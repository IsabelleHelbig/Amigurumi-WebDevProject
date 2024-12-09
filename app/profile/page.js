"use client";

import Header from "../components/header";
import Login from "../components/login";
import { useUserAuth } from "../_utils/auth-context";
import Item from "../components/item";
import { getItems } from "../_services/amigurumi-service";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Profile() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useUserAuth();

  useEffect(() => {
    console.log("User object:", user); // Check the structure of user
    if (user) {
      const fetchItems = async () => {
        const allItems = await getItems();
        const userItems = allItems.filter((item) => item.userId === user.uid); // Make sure to use `uid`
        setItems(userItems);
        setLoading(false);
      };
      fetchItems();
    } else {
      setLoading(false); // Stop loading if user is not logged in
    }
  }, [user]);

  return (
    <main>
      <Header />
      {user ? (
        <div className="mt-36">
          <h2 className="text-white bg-slate-500 w-28 px-3 pt-3 rounded-t-md ml-5 font-bold">
            Your Posts
          </h2>
          <div className="bg-slate-500">
            {loading ? (
              <div className="flex justify-center items-center h-96">
                <p className="text-gray-500">Loading...</p>
              </div>
            ) : items.length === 0 ? (
              <div className="text-white bg-slate-500">
                <p className="p-5">You have no posts yet.</p>
              </div>
            ) : (
              <ul className="grid grid-cols-4 gap-4">
                {items.map((item) => (
                  <li key={item.id}>
                    <Link href={`/item-details/${item.id}`}>
                      <Item {...item} />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <Login />
        </div>
      ) : (
        <Login />
      )}
    </main>
  );
}
