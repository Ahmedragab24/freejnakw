"use client";

import { useState } from "react";
import classes from "./DateField.module.css";

import Calendar from "./Calendar";
import ClickOutsideWrapper from "../../../../general/ClickOutsideWrapper";

function DateField({ children, id, placeholder, onChange, value, error }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleToggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  const handleCalendarDateChange = (newDate) => {
    const e = {
      target: {
        id: "birthDate",
        value: newDate,
      },
    };

    onChange(e);
    setIsDropdownOpen(false);
  };

  const handlePreventInputting = (e) => {
    e.target.value += "";
  };

  return (
    <div className={`${classes.main} ${error ? classes.error : ""}`}>
      <ClickOutsideWrapper onClickOutside={() => setIsDropdownOpen(false)}>
        <label htmlFor={id}>{children}</label>
        <input
          id={id}
          type="text"
          placeholder={placeholder}
          onChange={handlePreventInputting}
          value={value}
          onClick={handleToggleDropdown}
          autoComplete="off"
        />

        {error ? <p className={classes.error}>{error}</p> : null}

        {isDropdownOpen ? (
          <Calendar
            onDateChange={handleCalendarDateChange}
            dateValue={value ? new Date(value) : new Date()}
          />
        ) : null}
      </ClickOutsideWrapper>
    </div>
  );
}

export default DateField;
