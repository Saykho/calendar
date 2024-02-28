import React, { useEffect, useState } from "react";
import { Badge, Button, Calendar, Row, Space, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getComplaintsRequestAction } from "../../store/actions";
import { getComplaintsSelector } from "../../store/reducers";
import dayjs, { Dayjs } from "dayjs";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { ComplaintCalendarCell } from "../ComplaintCalendarCell";

export const ComplaintsCalendar: React.FC = () => {
    const dispatch = useDispatch();
    const complaints = useSelector(getComplaintsSelector);
    const [date, setDate] = useState(dayjs());
    const monthName = date.locale('ru').format("MMMM");

    useEffect(() => {
        dispatch(getComplaintsRequestAction())
    }, []);

    return <Calendar
        cellRender={ComplaintCalendarCell(complaints)}
        value={date}
        headerRender={() => (
            <Row justify="space-between">
                <Typography.Title level={3}>{monthName}</Typography.Title>
                <Space>
                    <Button shape="circle" onClick={() => setDate(date.add(-1, 'months'))} icon={<LeftOutlined />} />
                    <Button shape="circle" onClick={() => setDate(date.add(1, 'months'))} icon={<RightOutlined />} />
                </Space>
            </Row>
        )}
        onSelect={setDate}
    />
}
