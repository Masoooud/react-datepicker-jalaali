import React, { useState } from "react";
import { persianNumber } from "../utils/persian";
import { leftArrow, rightArrow } from "../utils/assets";
import moment from "moment-jalaali";

interface Props {
    value: moment;
    onSet: (any) => void;
    minuteStep?: number;
    styles?: any;
}

const TimePicker = ({ value, onSet, minuteStep, styles }: Props) => {
    const [min, setMin] = useState(moment(value).format("mm"));
    const [hour, setHour] = useState(moment(value).format("hh"));
    const [time, setTime] = useState(moment().format("HH:mm"));
    const [visible, setVisible] = useState(false);

    const handleSubmit = event => {
        event.preventDefault();
        setVisible(false);
        onSet(moment(time, "HH:mm"));
    };

    const list = [];
    for (let i = 0; i < 24; i++) {
        list.push(i);
    }
    const hours = list;

    const createMins = () => {
        const list = [];
        const step = minuteStep ? minuteStep : 1;
        for (let i = 0; i < 60; i += step) {
            list.push(i);
        }
        return list;
    };

    const mins = createMins();

    const setParam = (value, param) => {
        console.log("value", value);
        console.log("param", param);
        if (param == "m") {
            setMin(value);
        } else {
            setHour(value);
        }
        const m = param == "m" ? value : min;
        const h = param == "h" ? value : hour;

        setTime(`${h}:${m}`);
    };

    return (
        <div className={styles.timePicker}>
            <button className={styles.title} onClick={() => setVisible(!visible)}>
                {persianNumber(time ? time : value.format("HH:mm"))}
            </button>
            <div className={visible ? "tp" : "tp hidden"}>
                <input disabled value={time} />
                <div className="row">
                    <div>
                        {hours.map(item => {
                            return (
                                <button key={`h-${item}`} onClick={() => setParam(item, "h")}>
                                    {item}
                                </button>
                            );
                        })}
                    </div>
                    <div>
                        {mins.map(item => {
                            return (
                                <button key={`h-${item}`} onClick={() => setParam(item, "m")}>
                                    {item}
                                </button>
                            );
                        })}
                    </div>
                </div>
                <button className={"title done"} onClick={handleSubmit}>
                    تمام
                </button>
            </div>
        </div>
    );
};

export default TimePicker;
