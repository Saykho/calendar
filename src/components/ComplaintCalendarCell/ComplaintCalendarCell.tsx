import { Complaint } from "../../models";
import dayjs, { Dayjs } from "dayjs";
import { Badge, Flex } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import styles from "./ComplaintCalendarCell.module.scss";
import { RiseOutlined } from "@ant-design/icons";

const MaxComplaintsLength = 2;

const Component: React.FC<{ cellDate: Dayjs, complaints: Complaint[] }> = ({cellDate, complaints}) => {
    const complaintsForDate = useMemo(() => complaints.filter(({dateCreation}) => {
        const complaintDate = dayjs(dateCreation, "DD/MM/YYYY");
        return complaintDate.date() === cellDate.date() &&
            complaintDate.month() === cellDate.month() &&
            complaintDate.year() === cellDate.year();
    }), [cellDate.toISOString(), complaints]);

    const [isHideMode, setIsHideMode] = useState<boolean>(false);

    useEffect(() => {
        setIsHideMode(complaintsForDate.length > MaxComplaintsLength);
    }, [cellDate.toISOString(), complaintsForDate]);

    const [isFirstRender, setIsFirstRender] = useState(true);

    useEffect(() => {
        setIsFirstRender(false);
    }, []);

    if (isFirstRender) {
        return null;
    }

    if (isHideMode) {
        return <Flex justify="space-between" align="center" className={`${styles.hiddenComplaints} hidden-complaints`}>
            <div className={styles.complaintsLength}>{complaintsForDate.length} <span className={`${styles.text} text`}>жалоб</span></div>
            <RiseOutlined className={`${styles.showAll} show-icon`} onClick={() => {
                setIsHideMode(false);
            }} />
        </Flex>;
    }

    return (
        <ul className={`${styles.complaints} complaints`}>
            {complaintsForDate.map((complaint) => (
                <li key={complaint.id}>
                    <Badge status="success" text={complaint.description}/>
                </li>
            ))}
        </ul>
    );
};

export const ComplaintCalendarCell = (complaints: Complaint[]) => {
    return (cellDate: Dayjs) => {
        return <Component cellDate={cellDate} complaints={complaints}/>;
    };
};
