"use client";
import NewItem from "../components/new-item";
import { addItem } from "../_services/amigurumi-service";
import Header from "../components/header";
import { useUserAuth } from "../_utils/auth-context";
import { useState } from "react";

export default function NewItemPage() {
  const { user } = useUserAuth();
  const [items, setItems] = useState([]);

  const handleAddItem = async (item) => {
    const itemWithUser = { ...item, userId: user.uid };

    // Pass the object to addItem
    const newItemId = await addItem(itemWithUser);

    // Create a new item object with the generated ID
    const newItem = { id: newItemId, ...itemWithUser };

    // Update the state
    setItems((prevItems) => [...prevItems, newItem]);
  };
  return (
    <div>
      <Header />

      <div className="flex justify-center items-center">
        <NewItem onAddItem={handleAddItem} />
      </div>
    </div>
  );
}
