import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";

const FilterCard = () => {
  const [selectedValues, setSelectedValues] = useState({
    Location: "",
    Industry: "",
    Salary: "",
  });
  const [locationQuery, setLocationQuery] = useState("");
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const dispatch = useDispatch();
  const suggestionBoxRef = useRef();

  // Update Redux state whenever filters change
  useEffect(() => {
    dispatch(setSearchedQuery(selectedValues));
  }, [selectedValues, dispatch]);

  // Fetch location suggestions using Nominatim API
  const fetchLocationSuggestions = async (query) => {
    if (!query.trim()) {
      setLocationSuggestions([]);
      return;
    }

    const normalizedQuery = query.trim().toLowerCase(); // Normalize input to lowercase
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
      query
    )}&format=json&addressdetails=1&limit=10`;

    try {
      console.log("Fetching data for query:", query); // Debug log for query
      const response = await fetch(url);
      const data = await response.json();
      console.log("API response:", data); // Debug log for API response

      // Filter suggestions case-insensitively and allow partial matches
      const filteredSuggestions = data
        .filter((item) => {
          const displayName = item.display_name.toLowerCase(); // Normalize display name to lowercase

          // Match if the query is a substring of the display name
          return displayName.includes(normalizedQuery);
        })
        .map((item) => item.display_name) // Map to original display names
        .filter((value, index, self) => self.indexOf(value) === index); // Remove duplicates

      console.log("Filtered suggestions:", filteredSuggestions); // Debug log for filtered suggestions

      setLocationSuggestions(filteredSuggestions);
    } catch (error) {
      console.error("Error fetching location suggestions:", error);
      setLocationSuggestions([]);
    }
  };

  // Debounce location query changes
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (locationQuery.trim()) {
        fetchLocationSuggestions(locationQuery);
      } else {
        setLocationSuggestions([]); // Clear suggestions when query is empty
      }
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [locationQuery]);

  const changeHandler = (filterType, value) => {
    setSelectedValues((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  // When a suggestion is clicked
  const handleSuggestionClick = (suggestion) => {
    setLocationQuery(suggestion);
    changeHandler("Location", suggestion);
    setLocationSuggestions([]); // Clear suggestions after selection
  };

  return (
    <div
      className="w-full p-5 rounded-lg shadow-md relative"
      style={{
        background: "linear-gradient(145deg, #101820, #2F4F4F)",
      }}
    >
      <h1 className="font-bold text-lg text-white">Filter Jobs</h1>
      <hr className="mt-3 border-gray-500" />
      <div className="mt-5 relative">
        <h1 className="font-bold text-lg text-gray-300">Location</h1>
        <input
          type="text"
          value={locationQuery}
          onChange={(e) => {
            const val = e.target.value;
            setLocationQuery(val);
            changeHandler("Location", val);
          }}
          placeholder="Enter Location"
          className="mt-2 w-full p-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-400"
          autoComplete="off"
        />
        {/* Suggestions Dropdown */}
        {locationSuggestions.length > 0 && (
          <ul
            ref={suggestionBoxRef}
            className="absolute z-10 w-full bg-gray-800 border border-gray-600 mt-1 rounded-md max-h-60 overflow-y-auto"
          >
            {locationSuggestions.map((suggestion, idx) => (
              <li
                key={idx}
                className="p-2 hover:bg-gray-700 cursor-pointer text-white"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* Additional Filters */}
      {[
        {
          filterType: "Industry",
          array: [
            "Blockchain Developer",
            "Smart-Contract Developer",
            "Solidity Developer",
            "Web3 Developer",
            "Blockchain Architect",
            "Cryptocurrency Analyst",
            "Project Manager",
            "Security Engineer",
            "UX/UI Designer",
            "Community Manager",
            "Blockchain Researcher",
            "Blockchain Tester",
            "Ethereum Developer",
            "NFT Developer",
            "Metaverse Developer",
            "DeFi Developer",
            "Crypto Compliance Officer",
            "Crypto Auditor",
            "Web Developer",
            "Frontend Developer",
            "Backend Developer",
            "Full Stack Developer",
            "DevOps Engineer",
            "Database Administrator",
            "Cloud Engineer",
            "Cybersecurity Specialist",
            "Data Scientist",
            "AI/ML Engineer",
            "Systems Administrator",
            "IT Support Specialist",
            "Network Engineer",
            "Software Engineer",
            "Game Developer",
            "Technical Writer",
            "Quality Assurance Engineer",
            "Product Manager",
            "DevOps Manager",
            "Blockchain Consultant",
            "Blockchain Developer",
            "Full Stack Web3 Engineer",
            "Principal Engineer",
            "Business Development Manager",
            "Marketing Coordinator",
            "Test Automation Engineer",
          ],
        },
        {
          filterType: "Salary",
          array: [
            "20k-30k",
            "30k-50k",
            "50k-100k",
            "1LPA-3LPA",
            "3LPA-5LPA",
            "5LPA-10LPA",
            "10LPA-30LPA"
          ],
        },
      ].map((data, index) => (
        <div key={index} className="mt-5">
          <h1 className="font-bold text-lg text-gray-300">{data.filterType}</h1>
          <select
            value={selectedValues[data.filterType] || ""}
            onChange={(e) => changeHandler(data.filterType, e.target.value)}
            className="mt-2 w-full p-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            <option value="">Select {data.filterType}</option>
            {data.array.map((item, idx) => (
              <option key={idx} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
};

export default FilterCard;
