"use client";

import { useState, useEffect, useContext } from "react";
import classes from "./Calendar.module.css";
import Calendar from "react-calendar";

import formatDate from "@/utils/format-date";

function Calen({ className, onDateChange, dateValue }) {
  const [date, setDate] = useState("");

  const handleDateChange = (date) => {
    setDate(date);

    // Format the selected date to a human-readable format
    const formattedDate = formatDate(date);

    onDateChange(formattedDate);
  };

  return (
    <div className={`${classes.calendarDropdown} ${className}`}>
      <Calendar
        className={classes.calendar}
        onChange={handleDateChange}
        tileClassName={classes.tileClassName}
        value={date || dateValue}
        maxDate={new Date()}
        locale="ar"
      />
    </div>
  );
}

export default Calen;
