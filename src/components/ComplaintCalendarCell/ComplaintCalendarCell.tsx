import { Complaint } from "../../models";
import dayjs, { Dayjs } from "dayjs";
import { Badge } from "antd";
import React from "react";

export const ComplaintCalendarCell = (complaints: Complaint[]) => {
    return (cellDate: Dayjs) => {
        const complaintsForDate = complaints.filter(({dateCreation}) => {
            const complaintDate = dayjs(dateCreation, "DD/MM/YYYY");
            return complaintDate.date() === cellDate.date() &&
                complaintDate.month() === cellDate.month() &&
                complaintDate.year() === cellDate.year();
        })
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
}
