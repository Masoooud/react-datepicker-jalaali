import React from "react";
import classnames from "classnames";
import { persianNumber } from "../utils/persian";
import moment from "moment-jalaali";

interface Props {
    day: moment;
    isCurrentMonth?: boolean;
    disabled?: boolean;
    selected?: boolean;
    onClick?: (any) => void;
    styles?: any;
}

const Day = ({ day, isCurrentMonth, disabled, selected, onClick, styles, ...rest }: Props) => {
    const handleClick = event => {
        event.preventDefault();
        event.stopPropagation();
        event.nativeEvent.stopImmediatePropagation();

        if (onClick) {
            onClick(day);
        }
    };
    const className = classnames(styles.dayWrapper, {
        [styles.selected]: selected,
        [styles.currentMonth]: isCurrentMonth
    });

    return (
        <div className={className}>
            <button type="button" onClick={handleClick} disabled={disabled} {...rest}>
                {persianNumber(day.format("jD"))}
            </button>
        </div>
    );
};
export default Day;
