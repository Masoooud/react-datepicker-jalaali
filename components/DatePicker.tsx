import React, { useState, useEffect, useImperativeHandle } from "react";
import moment from "moment-jalaali";
import { Calendar } from "./Calendar";
import classnames from "classnames";
import "../styles/basic.scss";
import OutsideClickHandler from "react-outside-click-handler";

export const outsideClickIgnoreClass = "ignore--click--outside";

interface Props {
    value?: moment;
    defaultValue?: moment;
    onChange: (any) => void;
    onFocus?: (any) => void;
    onBlur?: (any) => void;
    disabled?: boolean;
    min?: moment;
    max?: moment;
    defaultMonth?: moment;
    inputFormat?: string;
    calendarStyles?: any;
    inputStyle?: any;
    calendarContainerProps?: object;
    className?: string;
    timePicker?: boolean;
}

const styles = {
    inputStyle: "inputStyle",
    calendarContainer: "calendarContainer",
    dayPickerContainer: "dayPickerContainer",
    monthsList: "monthsList",
    yearsList: "yearsList",
    daysOfWeek: "daysOfWeek",
    dayWrapper: "dayWrapper",
    monthWrapper: "monthWrapper",
    currentMonth: "currentMonth",
    selected: "selected",
    heading: "heading",
    next: "next",
    prev: "prev",
    title: "title",
    timePicker: "timePicker"
};

const DatePicker = ({
    value,
    defaultValue,
    onChange,
    onBlur,
    disabled,
    min,
    max,
    defaultMonth,
    inputFormat,
    // calendarStyles,
    calendarContainerProps,
    className,
    timePicker
}: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [momentValue, setMomentValue] = useState(defaultValue || null);
    const [inputValue, setInputValue] = useState(
        value ? value : defaultValue ? defaultValue.format(inputFormat) : ""
    );

    // useImperativeHandle(ref, () => ({
    //     resetValue() {
    //         setMomentValue(moment());
    //     }
    // }));

    const setMomentVal = momentValue => {
        if (onChange) {
            onChange(momentValue);
        }

        let inputValue = "";
        if (momentValue) inputValue = momentValue.format(inputFormat);
        setMomentValue(momentValue);
        setInputValue(inputValue);
    };

    const handleFocus = () => {
        setIsOpen(true);
    };

    const handleBlur = event => {
        if (isOpen) {
            // setIsOpen(false);
        } else if (onBlur) {
            onBlur(event);
        }

        if (momentValue) {
            const inputValue = momentValue.format(inputFormat);
            setInputValue(inputValue);
        }
    };

    const handleClickOutsideCalendar = () => {
        setIsOpen(false);
    };

    const handleSelectDay = selectedDay => {
        const oldValue = momentValue;
        let momentVal = selectedDay.clone();

        if (oldValue && !timePicker) {
            momentVal = momentVal.set({
                hour: oldValue.hours(),
                minute: oldValue.minutes(),
                second: oldValue.seconds()
            });
        }

        setMomentVal(momentVal);
    };

    const handleInputChange = event => {
        const inputValue = event.target.value;
        const momentValue = moment(inputValue, inputFormat);

        if (momentValue.isValid()) {
            setMomentVal(momentValue);
        }

        setInputValue(inputValue);
    };

    const handleInputClick = () => {
        if (!disabled) {
            setIsOpen(true);
        }
    };

    useEffect(() => {
        if (value === null) setInputValue("");
    }, [value]);

    const renderInput = () => {
        const classNames = classnames(className, {
            [outsideClickIgnoreClass]: isOpen
        });
        return (
            <input
                className={classNames}
                type="text"
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={handleInputChange}
                onClick={handleInputClick}
                value={inputValue}
                readOnly={true}
                style={{ direction: "ltr" }}
            />
        );
    };

    const renderCalendar = () => {
        return (
            <OutsideClickHandler onOutsideClick={() => handleClickOutsideCalendar()}>
                <Calendar
                    min={min}
                    max={max}
                    selectedDay={momentValue}
                    defaultMonth={defaultMonth}
                    onSelect={handleSelectDay}
                    onClickOutside={handleClickOutsideCalendar}
                    outsideClickIgnoreClass={outsideClickIgnoreClass}
                    styles={styles}
                    containerProps={calendarContainerProps}
                    timePicker={timePicker}
                />
            </OutsideClickHandler>
        );
    };

    /* <TetherComponent
        attachment="top center"
        renderTarget={ref => renderInput(ref)}
        renderElement={ref => (isOpen ? renderCalendar(ref) : null)}
    /> */

    return (
        <>
            {renderInput()}
            {isOpen ? renderCalendar() : null}
            {/* <style jsx>{`
                ${basic}
            `}</style> */}
        </>
    );
};

export default DatePicker;
