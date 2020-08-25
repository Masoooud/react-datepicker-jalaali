import React from "react";
// Day of week names for use in date-picker heading
const dayOfWeekNames = ["ش", "ی", "د", "س", "چ", "پ", "ج"];
interface Props {
    styles: any;
}

const DaysOfWeek = ({ styles }: Props) => {
    return (
        <div className={styles.daysOfWeek}>
            {dayOfWeekNames.map((name, key) => (
                <div key={key}>{name}</div>
            ))}
        </div>
    );
};
export default DaysOfWeek;
