import React from "react";
import { persianNumber } from "../utils/persian";
import { leftArrow, rightArrow } from "../utils/assets";
import moment from "moment-jalaali";
import TimePicker from "./TimePicker";

interface Props {
    month: moment;
    styles?: any;
    nextMonth: (any) => void;
    prevMonth: (any) => void;
    setCalendarMode: (any) => void;
    setTime: (any) => void;
    timePicker?: boolean;
}

const Heading = ({
    month,
    styles,
    nextMonth,
    prevMonth,
    setCalendarMode,
    setTime,
    timePicker
}: Props) => {
    const handleMonthClick = event => {
        event.preventDefault();
        setCalendarMode("monthSelector");
    };

    return (
        <div className={styles.heading}>
            <button
                type="button"
                title="ماه قبل"
                className={styles.prev}
                onClick={prevMonth}
                dangerouslySetInnerHTML={rightArrow}
            />
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                {timePicker == true && (
                    <TimePicker
                        minuteStep={15}
                        onSet={value => setTime(value)}
                        value={month}
                        styles={styles}
                    />
                )}
                <button className={styles.title} onClick={handleMonthClick}>
                    {persianNumber(month.format("jMMMM jYYYY"))}
                </button>
            </div>
            <button
                type="button"
                title="ماه بعد"
                className={styles.next}
                onClick={nextMonth}
                dangerouslySetInnerHTML={leftArrow}
            />
        </div>
    );
};

export default Heading;
