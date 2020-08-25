import React, { useState, useEffect } from "react";
import moment from "moment-jalaali";
import classnames from "classnames";
import { persianNumber } from "../utils/persian";

interface Props {
    selectedYear: moment;
    styles?: any;
    setCalendarMode: (any) => void;
    setYear: (any) => void;
    min?: moment;
    max?: moment;
}
const YearSelector = ({ selectedYear, styles, setYear, setCalendarMode, min, max }: Props) => {
    const [years, setYears] = useState<any[]>([]);
    let yearsToSelect = [];

    useEffect(() => {
        const timePeriod = max.format("jYYYY") - min.format("jYYYY");

        if (years.length == 0) {
            for (let i = 0; i <= timePeriod; i++) {
                yearsToSelect = yearsToSelect.concat(max.clone().subtract(i, "year"));
            }
            setYears(yearsToSelect);
        }
    });

    const handleClick = key => {
        setYear(moment(key, "jYYYY"));
        setCalendarMode("monthSelector");
    };

    return (
        <div className="month-selector">
            <div className={styles.heading}>
                <span className={styles.title}>{persianNumber(selectedYear.format("jYYYY"))}</span>
            </div>
            <div className={styles.yearsList}>
                {years.map((name, key) => {
                    // const buttonFingerprint = key + 1 + "-" + name.format("jYYYY");
                    // const selectedMonthFingerprint = selectedYear.format("jYYYY");
                    const isCurrent = name.format("jYYYY") === selectedYear.format("jYYYY");

                    const className = classnames("year", {
                        [styles.selected]: isCurrent
                    });

                    return (
                        <div key={key} className={className}>
                            {/* <button onClick={() => handleClick(name.format("jYYYY"))}></button> */}
                            <button onClick={() => handleClick(name.format("jYYYY"))}>
                                {name.format("jYYYY")}
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default YearSelector;
