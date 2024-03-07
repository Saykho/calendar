import React from "react";
import { ConfigProvider } from "antd";
import ru from "antd/locale/ru_RU";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import updateLocale from "dayjs/plugin/updateLocale";
import { ComplaintsCalendar } from "./components";
import styles from "./App.module.scss";

dayjs.extend(updateLocale);
dayjs.updateLocale("ru", {
  weekdaysMin:
    "Воскресенье_Понедельник_Вторник_Среда_Четверг_Пятница_Суббота".split("_"),
});
dayjs.locale("ru");

function App() {
  return (
    <ConfigProvider locale={ru}>
      <div className={styles.app}>
        <ComplaintsCalendar />
      </div>
    </ConfigProvider>
  );
}

export default App;
