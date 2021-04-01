import React, { useState, useEffect } from "react";
import { reportRef } from "./firebase";
import Card from "./Card";
import Form from "./Form";
import { FetchedData, Report } from "./types";

const App = () => {
  const [reports, setReports] = useState<Report[] | null>([]);

  useEffect(() => {
    reportRef
      .orderByKey()
      .limitToLast(10)
      .on("value", (snapshot) => {
        const data: FetchedData = snapshot.val();
        console.log(data);
        if (data === null) return;

        const newReports = Object.entries(data).map((obj) => {
          const [, report] = obj;
          return { ...report };
        });
        setReports(newReports);
      });
  }, []);

  return (
    <>
      <Form />
      {reports?.map((report) => (
        <Card date={report.date} text={report.text} key={report.date} />
      ))}
    </>
  );
};

export default App;
