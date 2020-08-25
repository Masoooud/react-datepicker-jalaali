import React from "react";
import { persianNumber } from "../utils/persian";
import { leftArrow, rightArrow } from "../utils/assets";
import moment from "moment-jalaali";

interface Props {
    year: moment;
    onNextYear: (any) => void;
    onPrevYear: (any) => void;
    styles: any;
    setCalendarMode: (string) => void;
}

const MonthsViewHeading = ({ year, onNextYear, onPrevYear, styles, setCalendarMode }: Props) => {
    return (
        <div className={styles.heading}>
            <button
                type="button"
                title="سال قبل"
                style={styles.navButton}
                className={styles.prev}
                onClick={onPrevYear}
                dangerouslySetInnerHTML={rightArrow}
            />
            <button
                onClick={() => {
                    setCalendarMode("yearSelector");
                }}>
                <span className={styles.title}>{persianNumber(year.format("jYYYY"))}</span>
            </button>
            <button
                type="button"
                title="سال بعد"
                style={styles.navButton}
                className={styles.next}
                onClick={onNextYear}
                dangerouslySetInnerHTML={leftArrow}
            />
        </div>
    );
};

export default MonthsViewHeading;
