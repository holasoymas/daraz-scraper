"use client";

import { scrapeAndStoreProduct } from "@/lib/actions";
import { FormEvent, useState } from "react";

const Searchbar = () => {
  const isValidProductURL = (url: string) => {
    try {
      const parsedURL = new URL(url);
      return parsedURL.hostname.includes("daraz");
    } catch (err) {
      return false;
    }
  };

  const [searchPrompt, setSearchPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isValidProductURL(searchPrompt)) {
      return alert("Please provide a valid Daraz link");
    }

    try {
      setIsLoading(true);
      await scrapeAndStoreProduct(searchPrompt);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="flex items-center justify-center gap-4 mt-12 w-full" onSubmit={handleSubmit}>
      <input
        type="text"
        onChange={(e) => setSearchPrompt(e.target.value)}
        placeholder="Enter product link"
        className="w-4/5 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
      />

      <button
        type="submit"
        className="px-4 py-3 bg-black text-white rounded-md transition-opacity duration-200 disabled:opacity-50"
        disabled={searchPrompt === ''}
      >
        {isLoading ? 'Searching...' : 'Search'}
      </button>
    </form>
  );
};

export default Searchbar;
