import React, { useEffect, useState } from "react";
import { Badge, Button, Calendar, Row, Space, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getComplaintsRequestAction } from "../../store/actions";
import { getComplaintsSelector } from "../../store/reducers";
import dayjs, { Dayjs } from "dayjs";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

export const ComplaintsCalendar: React.FC = () => {
    const dispatch = useDispatch();
    const complaints = useSelector(getComplaintsSelector);
    const [date, setDate] = useState(dayjs());
    const monthName = date.locale('ru').format("MMMM");

    useEffect(() => {
        dispatch(getComplaintsRequestAction())
    }, [])

    const dataCellRender = (value: Dayjs) => {
        const formattedDate = value.format("DD/MM/YYYY");
        const complaintsForDate = complaints.filter(({dateCreation}) => dateCreation === formattedDate);
        return (
            <ul className="complaints">
                {complaintsForDate.map((complaint) => (
                    <li key={complaint.id}>
                        <Badge status="success" text={complaint.description} />
                    </li>
                ))}
            </ul>
        )
    }

    return <Calendar
        cellRender={dataCellRender}
        value={date}
        headerRender={() => (
            <Row justify="space-between" className="p-1">
                <Typography.Title level={3}>{monthName}</Typography.Title>
                <Space>
                    <Button shape="circle" onClick={() => setDate(date.add(-1, 'months'))} icon={<LeftOutlined />} />
                    <Button shape="circle" onClick={() => setDate(date.add(1, 'months'))} icon={<RightOutlined />} />
                </Space>
            </Row>
        )}
    />
}
