import classes from "./CountryCodeSelector.module.css";
import { useState, useEffect } from "react";
import { callingCountries } from "country-data";
import Image from "next/image";

import ClickOutsideWrapper from "../../../general/ClickOutsideWrapper";

import getCountries from "@/utils/countries";

const countriesWithCodes = callingCountries.all.map((country) => ({
  country: country.name,
  code: country.countryCallingCodes[0].replace(/\s+/g, ""),
}));

const CountryCodeSelector = ({ onChange, value }) => {
  const [selectedCountryObj, setSelectedCountryObj] = useState(
    countriesWithCodes[192]
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    if (value) {
      setSelectedCountryObj(countriesWithCodes.find((c) => c.code === value));
    }
  }, [value]);

  const handleDropdownToggle = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleChange = (selectedCountry) => {
    // Getting the selected country code
    const selectedCountryObj = countriesWithCodes.find(
      (country) => country.country === selectedCountry
    );

    setSelectedCountryObj(selectedCountryObj);

    // Exporting the country code to the parents to submit it
    onChange(selectedCountryObj.code);
    // ------------------------------------------------------

    handleDropdownToggle();
  };

  return (
    <div className={classes.main} data-countrycode={selectedCountryObj.code}>
      <ClickOutsideWrapper onClickOutside={() => setIsDropdownOpen(false)}>
        <div className={classes.selectionValue} onClick={handleDropdownToggle}>
          <Image
            src="/icons/chevron-bottom.svg"
            alt="Dropdown Icon"
            width="22"
            height="22"
          />
          {selectedCountryObj.code}
        </div>
        {isDropdownOpen ? (
          <div className={classes.countriesDropdown}>
            {Object.keys(getCountries("ar")).map((country) => (
              <span
                key={country}
                className={`${classes.option} ${
                  getCountries("ar")[country] === selectedCountryObj.country
                    ? classes.active
                    : ""
                }`}
                onClick={handleChange.bind(this, getCountries("ar")[country])}
              >
                {country}
              </span>
            ))}
          </div>
        ) : null}
      </ClickOutsideWrapper>
    </div>
  );
};

export default CountryCodeSelector;
