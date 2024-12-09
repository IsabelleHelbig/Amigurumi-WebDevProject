"use client";

import { useState, useEffect } from "react";
import { getItem } from "@/app/_services/amigurumi-service";
import { use } from "react";
import Link from "next/link";
import Header from "@/app/components/header";

export default function ItemDetail({ params }) {
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  const { id } = use(params);

  useEffect(() => {
    const fetchItem = async () => {
      const itemData = await getItem(id);
      console.log("Fetched item:", itemData);
      setItem(itemData);

      setLoading(false);
    };
    if (id) fetchItem();
  }, [id]);

  return (
    <div>
      <Header />
      <div className="mt-36">
        {loading ? (
          <div className="flex justify-center items-center h-96">
            <p className="text-gray-500">Loading...</p>
          </div>
        ) : (
          <div className="m-4">
            <div className="bg-slate-500 p-3 rounded-md">
              <div className=" flex">
                {/* Photo */}
                <div className="rounded-md bg-slate-200 contain-content">
                  {item.photoUrl && (
                    <img
                      src={item.photoUrl}
                      alt={item.name}
                      className="w-96 h-96 object-contain"
                    />
                  )}
                </div>

                <div className="flex flex-col">
                  <div className="flex">
                    <Link href="/">
                      <img src="/icons/back.png" className="m-3" />
                    </Link>

                    {/* item name */}
                    {item.name && (
                      <div className=" text-red-400 font-bold text-3xl">
                        {item.name}
                      </div>
                    )}
                  </div>

                  {/* skill */}

                  {item.skill && (
                    <div className="text-white m-3">
                      Skill level: {item.skill}
                    </div>
                  )}

                  {/* hook */}
                  {item.hook && (
                    <div className="text-white m-3">Hook size: {item.hook}</div>
                  )}

                  {/* color */}
                  {item.color.length > 0 && (
                    <ul>
                      <li className="text-white m-3">
                        Colors: {item.color.join(", ")}
                      </li>
                    </ul>
                  )}

                  {/* weight */}
                  {item.weight && (
                    <div className="text-white m-3">
                      Yarn weight: {item.weight}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
