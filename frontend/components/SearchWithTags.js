// components/SearchWithTags.js
"use client";
import { useState, useEffect } from "react";

export default function SearchWithTags({ onSearch }) {
  const [query, setQuery] = useState("");
  const [tags, setTags] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // ✅ fetch suggestions from backend
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.length < 2) {
        setSuggestions([]);
        return;
      }
      const res = await fetch(
        `http://127.0.0.1:8000/suggestions/?query=${query}`
      );
      const data = await res.json();
      setSuggestions(data.suggestions);
    };

    const timeout = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timeout);
  }, [query]);

  // ✅ Add tag when user clicks suggestion
  const addTag = (item) => {
    if (!tags.includes(item)) {
      setTags([...tags, item]);
    }
    setQuery(""); // clear input
    setSuggestions([]); // hide suggestions
  };

  // ✅ Remove tag by clicking X
  const removeTag = (item) => {
    setTags(tags.filter((t) => t !== item));
  };

  // ✅ Trigger Search
  const handleSearch = () => {
    if (tags.length === 0) return;
    onSearch(tags);
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-6 relative">
      {/* Selected Tags */}
      <div className="flex flex-wrap gap-2 mb-2">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="bg-indigo-600 text-white px-3 py-1 rounded-full flex items-center gap-2 shadow-sm"
          >
            {tag}
            <button
              onClick={() => removeTag(tag)}
              className="text-white hover:text-gray-200 font-bold"
            >
              ✕
            </button>
          </span>
        ))}
      </div>

      {/* Search Box */}
      <input
        type="text"
        value={query}
        placeholder="Type ingredients..."
        className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        onChange={(e) => {
          setQuery(e.target.value);
          setShowSuggestions(true);
        }}
      />

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute left-0 right-0 bg-white shadow-lg border border-gray-200 mt-1 rounded-lg z-10">
          {suggestions.map((item, idx) => (
            <li
              key={idx}
              onClick={() => addTag(item)}
              className="px-4 py-2 hover:bg-indigo-500 hover:text-white cursor-pointer transition"
            >
              {item}
            </li>
          ))}
        </ul>
      )}

      {/* Search Button */}
      <button
        onClick={handleSearch}
        className="mt-4 w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition shadow"
      >
        Search Recipes
      </button>
    </div>
  );
}