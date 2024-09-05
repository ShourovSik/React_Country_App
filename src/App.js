import React, { useState, useEffect } from "react";

import Search from "./components/search";
import "./App.css";
import Countries from "./components/countries";
const url = "https://restcountries.com/v3.1/all";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [countries, setCountries] = useState([]);
  const [filteredCountry, setFilteredCountry] = useState(countries);

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(url);
      const data = await response.json();
      setCountries(data);
      setFilteredCountry(data);
      setIsLoading(false);
      setError(null);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(url);
  }, []);

  const handleRemoveCountry = (name) => {
    const filter = filteredCountry.filter(
      (country) => country.name.common !== name
    );
    setFilteredCountry(filter);
  };

  const handleSearch = (searchValue) => {
    let value = searchValue.toLowerCase();
    const newCountries = countries.filter((country) => {
      const countryName = country.name.common.toLowerCase();
      return countryName.startsWith(value);
    });
    setFilteredCountry(newCountries);
  };

  return (
    <div>
      <h1>Country App</h1>
      <Search onSearch={handleSearch} />
      {isLoading && <h3>Loading...</h3>}
      {error && <h3>Error: {error.message}</h3>}
      {countries && (
        <Countries
          countries={filteredCountry}
          onRemoveCountry={handleRemoveCountry}
        />
      )}
    </div>
  );
};

export default App;
