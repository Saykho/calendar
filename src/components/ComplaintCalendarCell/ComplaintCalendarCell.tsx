import React, { useEffect, useMemo, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { Badge } from "antd";
import { Complaint } from "../../models";
import styles from "./ComplaintCalendarCell.module.scss";

const MaxComplaintsLength = 5;

const Component: React.FC<{ cellDate: Dayjs; complaints: Complaint[] }> = ({
  cellDate,
  complaints,
}) => {
  const complaintsForDate = useMemo(
    () =>
      complaints.filter(({ dateCreation }) => {
        const complaintDate = dayjs(dateCreation, "DD/MM/YYYY");
        return (
          complaintDate.date() === cellDate.date() &&
          complaintDate.month() === cellDate.month() &&
          complaintDate.year() === cellDate.year()
        );
      }),
    [cellDate.toISOString(), complaints],
  );

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
    return (
      <div>
        <p>{complaintsForDate.length} жалоб</p>
        <p
          className={styles.showAll}
          onClick={() => {
            setIsHideMode(false);
          }}
        >
          Показать все..
        </p>
      </div>
    );
  }

  return (
    <ul className="complaints">
      {complaintsForDate.map((complaint) => (
        <li key={complaint.id}>
          <Badge status="success" text={complaint.description} />
        </li>
      ))}
    </ul>
  );
};

export const ComplaintCalendarCell = (complaints: Complaint[]) => {
  return (cellDate: Dayjs) => {
    return <Component cellDate={cellDate} complaints={complaints} />;
  };
};
