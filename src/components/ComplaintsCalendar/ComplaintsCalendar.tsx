import React, { useEffect } from "react";
import { Badge, Calendar, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getComplaintsRequestAction } from "../../store/actions";
import { getComplaintsSelector } from "../../store/reducers";
import { Dayjs } from "dayjs";

export const ComplaintsCalendar: React.FC = () => {
    const dispatch = useDispatch();
    const complaints = useSelector(getComplaintsSelector);

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

    return <Calendar cellRender={dataCellRender} />
}
