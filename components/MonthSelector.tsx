import React, { useState } from "react";
import moment from "moment-jalaali";
import classnames from "classnames";
import MonthsViewHeading from "./MonthsViewHeading";

interface Props {
    selectedMonth: moment;
    styles?: any;
    setCalendarMode: (any) => void;
    setMonth: (any) => void;
}

// List of months
const months = [
    "فروردین",
    "اردیبهشت",
    "خرداد",
    "تیر",
    "مرداد",
    "شهریور",
    "مهر",
    "آبان",
    "آذر",
    "دی",
    "بهمن",
    "اسفند"
];

const MonthSelector = ({ selectedMonth, styles, setMonth, setCalendarMode }: Props) => {
    const [year, setYear] = useState(selectedMonth);

    const nextYear = () => {
        setYear(year.clone().add(1, "year"));
    };

    const prevYear = () => {
        setYear(year.clone().subtract(1, "year"));
    };

    const handleClick = key => {
        setMonth(moment(key, "jM-jYYYY"));
        setCalendarMode("days");
    };

    return (
        <div className="month-selector">
            <MonthsViewHeading
                styles={styles}
                year={year}
                onNextYear={nextYear}
                onPrevYear={prevYear}
                setCalendarMode={setCalendarMode}
            />
            <div className={styles.monthsList}>
                {months.map((name, key) => {
                    const buttonFingerprint = key + 1 + "-" + year.format("jYYYY");
                    const selectedMonthFingerprint = selectedMonth.format("jM-jYYYY");
                    const isCurrent = selectedMonthFingerprint === buttonFingerprint;

                    const className = classnames(styles.monthWrapper, {
                        [styles.selected]: isCurrent
                    });

                    return (
                        <div key={key} className={className}>
                            <button onClick={() => handleClick(buttonFingerprint)}>{name}</button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MonthSelector;
