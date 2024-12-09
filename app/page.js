"use client";
import ItemList from "./components/item-list";
import { useState, useEffect } from "react";
import { getItems } from "./_services/amigurumi-service";
import Header from "./components/header";

export default function Page() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const loadItems = async () => {
      // Fetch all items
      const items = await getItems();
      // Update the state with the fetched items
      setItems(items);
    };
    loadItems();
  }, []);

  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      <div>
        <ItemList items={items} />
      </div>
    </main>
  );
}
