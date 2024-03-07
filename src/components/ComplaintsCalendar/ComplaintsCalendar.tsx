import React, { useEffect, useState } from "react";
import { Button, Calendar, Row, Space, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { getComplaintsRequestAction } from "../../store/actions";
import { getComplaintsSelector } from "../../store/reducers";
import { ComplaintCalendarCell } from "../ComplaintCalendarCell";
import styles from "./ComplaintsCalendar.module.scss";

export const ComplaintsCalendar: React.FC = () => {
    const dispatch = useDispatch();
    const complaints = useSelector(getComplaintsSelector);
    const [date, setDate] = useState(dayjs());
    const monthName = date.locale("ru").format("MMMM");

    useEffect(() => {
        dispatch(getComplaintsRequestAction());
    }, []);

    return (
        <Calendar
            className={styles.calendar}
            cellRender={ComplaintCalendarCell(complaints)}
            value={date}
            headerRender={() => (
                <Row justify="space-between" className={styles.calendarHeader}>
                    <Typography.Title level={3} className={styles.monthName}>{monthName}</Typography.Title>
                    <Space className={styles.headerButtons}>
                        <Button
                            shape="circle"
                            onClick={() => setDate(date.add(-1, "months"))}
                            icon={<LeftOutlined className={styles.buttonIcon} />}
                            className={styles.prevButton}
                        />
                        <Button
                            shape="circle"
                            onClick={() => setDate(date.add(1, "months"))}
                            icon={<RightOutlined className={styles.buttonIcon} />}
                        />
                    </Space>
                </Row>
            )}
            onSelect={setDate}
        />
    );
};
