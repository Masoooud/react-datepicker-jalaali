import React, { useState } from "react";
import DaysViewHeading from "./DaysViewHeading";
import DaysOfWeek from "./DaysOfWeek";
import MonthSelector from "./MonthSelector";
import YearSelector from "./YearSelector";
import Day from "./Day";
import { getDaysOfMonth } from "../utils/moment-helper";
import moment from "moment-jalaali";

// Load Persian localisation
moment.loadPersian({ dialect: "persian-modern" });

interface Props {
    min?: moment;
    max?: moment;
    styles?: any;
    selectedDay?: moment;
    defaultMonth?: moment;
    onSelect: (any) => moment;
    onClickOutside: () => void;
    containerProps?: object;
    outsideClickIgnoreClass?: string;
    className?: object;
    timePicker?: boolean;
}

export const Calendar = ({
    min,
    max,
    styles = require("../styles/basic.scss"),
    selectedDay,
    defaultMonth,
    onSelect,
    onClickOutside,
    // containerProps = {},
    // outsideClickIgnoreClass,
    className,
    timePicker
}: Props) => {
    const [month, setMonth] = useState(defaultMonth || selectedDay || moment);
    const [selectedDayState, setSelectedDayState] = useState(selectedDay || null);
    const [mode, setMode] = useState("days");
    const [lastRenderedMonth, setLastRenderedMonth] = useState(null);
    const [days, setDays] = useState(null);
    const [year, setYear] = useState(selectedDay || max);
    const [time, setTime] = useState(selectedDay || moment);

    const nextMonth = () => {
        setMonth(month.clone().add(1, "jMonth"));
    };

    const prevMonth = () => {
        setMonth(month.clone().subtract(1, "jMonth"));
    };

    const selectDay = selectedDay => {
        // Because there's no `m1.isSame(m2, 'jMonth')`

        if (selectedDay.format("jYYYYjMM") != month.format("jYYYYjMM")) {
            setMonth(selectedDay);
        }

        setSelectedDayState(selectedDay);
    };

    const handleClickOnDay = selectedDay => {
        selectDay(selectedDay);

        const date = `${selectedDay.format("jYYYY-jMM-jDD")} ${time.format("HH:mm")}`;
        console.log("date", date);

        if (onSelect) {
            onSelect(moment(date, "jYYYY-jMM-jDD HH:mm"));
            onClickOutside();
        }
    };

    const renderMonthSelector = () => {
        return (
            <MonthSelector
                styles={styles}
                selectedMonth={year}
                setCalendarMode={setMode}
                setMonth={setMonth}
            />
        );
    };

    const renderYears = () => {
        return (
            <YearSelector
                selectedYear={year}
                min={min}
                max={max}
                styles={styles}
                setYear={setYear}
                setCalendarMode={setMode}
            />
        );
    };

    const renderDays = () => {
        let dayss;

        if (lastRenderedMonth === month) {
            dayss = days;
        } else {
            dayss = getDaysOfMonth(month);
            setDays(dayss);
            setLastRenderedMonth(month);
        }

        return (
            <div>
                <DaysViewHeading
                    styles={styles}
                    month={month}
                    prevMonth={prevMonth}
                    nextMonth={nextMonth}
                    setCalendarMode={setMode}
                    timePicker={timePicker}
                    setTime={setTime}
                />
                <DaysOfWeek styles={styles} />{" "}
                <div className={styles.dayPickerContainer}>
                    {dayss.map(day => {
                        const isCurrentMonth = day.format("jMM") === month.format("jMM");
                        const disabled =
                            (min ? day.isBefore(min) : false) || (max ? day.isAfter(max) : false);
                        const selected = selectedDayState
                            ? selectedDayState.isSame(day, "day")
                            : false;

                        return (
                            <Day
                                key={day.format("YYYYMMDD")}
                                onClick={handleClickOnDay}
                                day={day}
                                disabled={disabled}
                                selected={selected}
                                isCurrentMonth={isCurrentMonth}
                                styles={styles}
                            />
                        );
                    })}
                </div>
            </div>
        );
    };

    return (
        <div className={styles.calendarContainer + " " + className}>
            {mode === "monthSelector"
                ? renderMonthSelector()
                : mode === "yearSelector"
                    ? renderYears()
                    : renderDays()}
        </div>
    );
};
export default Calendar;
