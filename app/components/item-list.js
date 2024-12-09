"use client";
import { colors } from "./colors";
import Item from "./item";
import { hooks } from "./hooks";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function ItemList({ items }) {
  const [sortBy, setSortBy] = useState("name");

  const [filters, setFilters] = useState({
    skill: "",
    hook: "",
    color: "",
    weight: "",
  });

  const [isLoading, setIsLoading] = useState(true);

  // Apply filters
  const filteredList = items.filter((item) => {
    return (
      (!filters.skill || item.skill === filters.skill) &&
      (!filters.hook || item.hook === filters.hook) &&
      (!filters.color || item.color.includes(filters.color)) &&
      (!filters.weight || item.weight === filters.weight)
    );
  });

  // Sort filtered items
  const sortedList = [...filteredList].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "skill") {
      return a.skill.localeCompare(b.skill);
    }
    return 0;
  });

  // Reset filters to their initial state
  const resetFilters = () => {
    setFilters({
      skill: "",
      hook: "",
      color: "",
      weight: "",
    });
  };

  // Simulate loading delay on component mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // 1-second delay

    return () => clearTimeout(timer); // Cleanup timer
  }, []);

  return (
    <div>
      <div className="flex fixed items-center bg-slate-500 top-32 w-full p-3 justify-between overflow-auto shadow-md">
        {/* Sorting Options */}

        <div className="space-x-4 flex-shrink-0 flex">
          <img src="/icons/sort.png" className="w-10" />
          {["name", "skill"].map((option) => (
            <button
              key={option}
              onClick={() => setSortBy(option)}
              className={`${
                sortBy === option
                  ? "bg-red-400"
                  : "bg-white hover:bg-red-500 active:bg-red-500"
              } px-3 py-2 w-20 rounded-md`}
            >
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="flex-shrink-0">
          <select
            value={filters.skill}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, skill: e.target.value }))
            }
            className="p-2 rounded-md h-10 ml-3"
          >
            <option value="">All Skill Levels</option>
            <option value="Easy">Easy</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>

          <select
            value={filters.hook}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, hook: e.target.value }))
            }
            className="p-2 rounded-md mx-3 h-10"
          >
            <option value="">All Hooks</option>
            {hooks.map(({ metric, us }, index) => (
              <option key={index} value={`${metric} / ${us}`}>
                {`${metric} / ${us}`}
              </option>
            ))}
          </select>

          <select
            value={filters.color}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, color: e.target.value }))
            }
            className="p-2 rounded-md h-10"
          >
            <option value="">All Colors</option>
            {colors.map(({ name }, index) => (
              <option key={index} value={name}>
                {name}
              </option>
            ))}
          </select>

          <select
            value={filters.weight}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, weight: e.target.value }))
            }
            className="p-2 rounded-md mx-3 h-10"
          >
            <option value="">All Weights</option>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
          </select>

          {/* Reset Filters Button */}
          <button
            onClick={resetFilters}
            className="bg-red-400 px-4 py-2 rounded-md h-10 hover:bg-red-500 active:bg-red-500"
          >
            Reset Filters
          </button>
        </div>
      </div>
      <div className="mt-52">
        {isLoading ? (
          <div className="flex justify-center items-center h-96">
            <p className="text-gray-500">Loading...</p>
          </div>
        ) : sortedList.length === 0 ? (
          <div className="flex flex-col items-center mt-52">
            <p className="text-center text-red-400 font-bold">
              There are no projects that match your current filters.
            </p>
            <img src="./icons/sad.png" alt="No Results" className="mt-4 w-40" />
          </div>
        ) : (
          <ul className="grid grid-cols-4">
            {sortedList.map((item) => (
              <li key={item.id}>
                <Link href={`/item-details/${item.id}`}>
                  <Item {...item} />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
