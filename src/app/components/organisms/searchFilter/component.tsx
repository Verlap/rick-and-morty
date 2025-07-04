"use client";
import React, { useState } from "react";

import { SlidersHorizontal, Search, X } from "lucide-react";
import BackButton from "@/app/components/atoms/backButton/component";

export interface FilterState {
  searchTerm: string;
  characterType: "all" | "starred" | "regular";
  species: "all" | "human" | "alien";
}

interface SearchFilterProps {
  onFilterChange: (filters: FilterState) => void;
  currentFilters: FilterState;
}

const SearchFilter = ({
  onFilterChange,
  currentFilters,
}: SearchFilterProps) => {

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  /* function to handle state of search filter */
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({
      ...currentFilters,
      searchTerm: e.target.value,
    });
  };

  /* function to handle state of type filter */
  const handleCharacterTypeChange = (type: "all" | "starred" | "regular") => {
    onFilterChange({
      ...currentFilters,
      characterType: type,
    });
  };

  /* function to handle state of specie filter */
  const handleSpeciesChange = (species: "all" | "human" | "alien") => {
    onFilterChange({
      ...currentFilters,
      species: species,
    });
  };

  /* function to clear values of filter */
  const clearFilters = () => {
    onFilterChange({
      searchTerm: "",
      characterType: "all",
      species: "all",
    });
  };

  
  /* function to handle filter close */
  const handleBackFilter = () => {
    setIsFilterOpen(false);
  };

  const hasActiveFilters =
    currentFilters.searchTerm !== "" ||
    currentFilters.characterType !== "all" ||
    currentFilters.species !== "all";

  return (
    <div className="md:relative">
      <div className="bg-slate-100 flex items-center gap-2 !m-4 p-4 rounded-md">
        <Search className="text-slate-500" />
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search or filter characters."
            value={currentFilters.searchTerm}
            onChange={handleSearchChange}
            className="w-full px-4 py-2 outline-none"
          />
          {currentFilters.searchTerm && (
            <button
              onClick={() =>
                onFilterChange({ ...currentFilters, searchTerm: "" })
              }
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <X />
            </button>
          )}
        </div>

        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className={`p-2 rounded-md transition-colors ${
            isFilterOpen || hasActiveFilters ? "bg-primary-100/60" : ""
          }`}
        >
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="text-primary-600" />
            {hasActiveFilters && (
              <span className="bg-primary-700 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[18px] h-[18px] flex items-center justify-center">
                {
                  [
                    currentFilters.searchTerm !== "",
                    currentFilters.characterType !== "all",
                    currentFilters.species !== "all",
                  ].filter(Boolean).length
                }
              </span>
            )}
          </div>
        </button>
      </div>

      {isFilterOpen && (
        <div className="absolute bottom-0 md:top-full left-0 right-0 z-10 bg-white border border-slate-200 rounded-lg shadow-lg md:p-4 p-6 !m-0 md:!m-4 md:h-max h-[calc(100vh-4rem)]">
          <div className="md:hidden flex items-center justify-center py-2 relative">
            <div className="absolute left-0">
              <BackButton
                onBack={() => {
                  handleBackFilter();
                }}
              />
            </div>
            <p className="text-base leading-6 font-semibold">Filter</p>
          </div>
          <div className="flex justify-end items-center mb-4">
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-sm text-primary-600 hover:text-primary-700 cursor-pointer"
              >
                Clear all
              </button>
            )}
          </div>
          <div className="flex flex-col justify-between md:h-max h-full">
            <div>
              <div className="pb-6">
                <label className="text-sm leading-5 font-medium text-slate-500">
                  Character
                </label>
                <div className="flex gap-2">
                  {[
                    { value: "all", label: "All" },
                    { value: "starred", label: "Starred" },
                    { value: "regular", label: "Regular" },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() =>
                        handleCharacterTypeChange(option.value as any)
                      }
                      className={`px-[0.625rem] py-3 text-sm rounded-md transition-colors flex-1 ${
                        currentFilters.characterType === option.value
                          ? "bg-primary-100 text-primary-600"
                          : "bg-white text-slate-900 border border-slate-200 hover:bg-gray-50"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Species
                </label>
                <div className="flex gap-2">
                  {[
                    { value: "all", label: "All" },
                    { value: "human", label: "Human" },
                    { value: "alien", label: "Alien" },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleSpeciesChange(option.value as any)}
                      className={`px-[0.625rem] py-3 text-sm rounded-md transition-colors flex-1 ${
                        currentFilters.species === option.value
                          ? "bg-primary-100 text-primary-600"
                          : "bg-white text-slate-900 border border-slate-200 hover:bg-gray-50"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="!mb-6 md:hidden ">
              <button
                onClick={() => setIsFilterOpen(false)}
                className="w-full px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors cursor-pointer"
              >
                Filter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilter;
