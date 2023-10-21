import React, { useState } from 'react';
import "react-dates/initialize"; 
import { DateRangePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";

const DateFilter = ({ handleDateFilter }) => {
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [focusedInput, setFocusedInput] = useState();
    
    const isOutsideRange = (date) => {
        return date.isAfter(new Date());
    };

    return (
        <DateRangePicker
            startDate={startDate}
            startDateId="start-date"
            endDate={endDate}
            endDateId="end-date"
            onDatesChange={({ startDate, endDate }) => {
                setStartDate(startDate);
                setEndDate(endDate);

                handleDateFilter(startDate, endDate)
            }}
            focusedInput={focusedInput}
            onFocusChange={(focusedInput) => setFocusedInput(focusedInput)}
            numberOfMonths={1}
            firstDayOfWeek={1}
            hideKeyboardShortcutsPanel
            isOutsideRange={isOutsideRange}
            displayFormat="DD/MM/YYYY"
            small
        />
    )
}

export default DateFilter