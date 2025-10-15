// components/FilterPanel.js

"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FilterPanel({ isOpen, onFilterChange }) {
    const [difficulty, setDifficulty] = useState("");
    const [maxTime, setMaxTime] = useState(60);
    const [dietary, setDietary] = useState([]);

    // This useEffect hook is crucial. It tells the parent component about any filter changes.
    useEffect(() => {
        // If all filters are default, send empty object to indicate no filter
        if (!difficulty && maxTime === 60 && dietary.length === 0) {
            onFilterChange({});
        } else {
            onFilterChange({ difficulty, maxTime, dietary });
        }
    }, [difficulty, maxTime, dietary, onFilterChange]);

    const toggleDietary = (item) => {
        setDietary(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);
    };
    
    // This function resets all the local filter states.
    const clearFilters = () => {
        setDifficulty("");
        setMaxTime(60);
        setDietary([]);
    };
    
    // This helper function styles the buttons based on whether they are selected or not.
    const activeGradientClass = (isActive, primaryGradient, neutralClass = "bg-transparent border border-[rgba(255,255,255,0.2)] text-gray-300 hover:bg-[rgba(255,255,255,0.05)] hover:border-[rgba(255,255,255,0.4)]") => 
        `px-4 py-2 rounded-full font-semibold text-sm transition-all duration-200 ease-in-out cursor-pointer 
         ${isActive ? primaryGradient + " text-white shadow-md border-transparent" : neutralClass}`;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    key="filter-panel"
                    initial={{ opacity: 0, y: -20, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    exit={{ opacity: 0, y: -20, height: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="w-full max-w-6xl mx-auto overflow-hidden"
                >
                    <div className="mt-6 px-8 md:px-16 py-8 md:py-12 rounded-3xl backdrop-filter backdrop-blur-xl bg-gradient-to-br from-[rgba(40,2,20,0.5)] to-[rgba(20,2,10,0.4)] border border-[rgba(255,255,255,0.08)] shadow-2xl">
                        
                        <div className="flex justify-between items-center mb-10">
                            <h2 className="text-3xl font-extrabold text-white tracking-wide drop-shadow-lg">Filters</h2>
                            <button
                                onClick={clearFilters}
                                className="px-6 py-2 rounded-full font-semibold text-base bg-gradient-to-r from-[#E673AC] to-[#99004C] text-white shadow-lg border-none hover:scale-105 hover:opacity-90 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#E673AC]"
                                style={{letterSpacing: '0.04em'}}
                            >
                                <span className="flex items-center gap-2">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 18L18 6M6 6l12 12" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                    Clear Filters
                                </span>
                            </button>
                        </div>
                        
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-10">
                            <div>
                                <label className="text-gray-100 text-lg font-semibold mb-4 block">Difficulty</label>
                                <div className="flex flex-wrap gap-3">
                                    {["Easy", "Medium", "Hard"].map(level => (
                                        <button key={level} className={activeGradientClass(difficulty === level, "bg-gradient-to-r from-[#99004C] to-[#E673AC]")} onClick={() => setDifficulty(level)}>
                                            {level}
                                        </button>
                                    ))}
                                </div>
                            </div>

                             <div className="lg:col-span-2 px-2">
                                <label className="text-gray-100 text-lg font-semibold mb-4 block">Max Cooking Time: <span className="text-[#E673AC] font-bold">{maxTime} mins</span></label>
                                <input
                                    type="range"
                                    min={10} max={180} step={5} value={maxTime}
                                    onChange={e => setMaxTime(Number(e.target.value))}
                                    className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-[linear-gradient(to_right,#E673AC_var(--range-progress),rgba(255,255,255,0.2)_var(--range-progress))] [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-xl [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#E673AC] [&::-webkit-slider-thumb]:-mt-[7px] [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-[#E673AC]"
                                    style={{ '--range-progress': `${((maxTime - 10) / 170) * 100}%` }}
                                />
                            </div>
                        </div>

                        <div className="mt-8">
                            <label className="text-gray-100 text-lg font-semibold mb-4 block">Dietary Restrictions</label>
                            <div className="flex flex-wrap gap-3">
                                {["Vegan", "Vegetarian", "Gluten-Free", "Keto", "Dairy-Free", "Nut-Free"].map(diet => (
                                    <button key={diet} className={activeGradientClass(dietary.includes(diet), "bg-gradient-to-r from-[#00520A] to-[#469110]")} onClick={() => toggleDietary(diet)}>
                                        {diet}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}