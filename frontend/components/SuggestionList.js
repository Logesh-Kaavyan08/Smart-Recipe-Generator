"use client";
import Link from "next/link";

export default function SuggestionList({ suggestions }) {
  if (!suggestions || suggestions.length === 0) return null;

  return (
    <ul className="absolute bg-white dark:bg-gray-800 shadow-md rounded-lg mt-1 w-full z-10 border border-gray-200 dark:border-gray-700">
      {suggestions.map((s, i) => (
        <li
  key={i}
  className="px-4 py-2 hover:bg-gradient-to-r from-[#660033] to-[#E673AC] hover:text-white cursor-pointer transition"
  onClick={() => onSelect(s)} // pass a callback to parent
>
  {s}
</li>
      ))}
    </ul>
  );
}
