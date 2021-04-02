import React, { useState, useEffect } from "react";
import { reportRef, pushReport, updateReport } from "./firebase";
import Header from "./Header";
import Card from "./Card";
import { FetchedData, Report } from "./types";
import { formatDate } from "./util/day";

const handler = (text: string, date: string) => {
  reportRef
    .orderByChild("date")
    .equalTo(date)
    .once("value", (snapshot) => {
      const data: FetchedData = snapshot.val();
      if (data === null) {
        pushReport({ text, date });
      } else {
        const response = window.confirm(
          "すでに本日の記録が存在します。上書きされますがよろしいですか？"
        );

        const key = Object.keys(data)[0];
        updateReport({
          key,
          date: formatDate(new Date()),
          text,
        });
      }
    });
};

const App = () => {
  const [reports, setReports] = useState<Report[] | null>([]);
  const [isModalOpen, setModalState] = useState(false);

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
    <div className="min-h-screen relative">
      <Header />
      <main className="w-10/12 mx-auto">
        {/* <Form
          text={"今日は何をしましたか？"}
          date={formatDate(new Date())}
          label="register"
          onClick={handler}
        /> */}

        <div>
          {reports?.map((report) => (
            <Card date={report.date} text={report.text} key={report.date} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default App;
