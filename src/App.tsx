import React from 'react';
import { ComplaintsCalendar } from "./components";
import styles from "./App.module.scss";

function App() {
  return (
      <div className={styles.app}>
        <ComplaintsCalendar />
      </div>
  );
}

export default App;
