import React, { useState, useEffect } from "react";
import { database } from "./firebase";
import Header from "./Header";
import Card from "./Card";
import { FetchedData, Report } from "./types";
import { useRecoilValue } from "recoil";
import { loginState } from "./recoilState";


const App = () => {
  const [reports, setReports] = useState<Report[] | null>([]);
  const uid = useRecoilValue(loginState);

  useEffect(() => {
    if (uid) {
      database
        .ref(`daily-report/${uid}`)
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
    }
  }, [uid]);

  return (
    <div className="min-h-screen relative">
      <Header />
      <main className="w-10/12 mx-auto mt-10">
        {
          // TODO: ローディングGIF
        }
        {reports?.map((report) => (
          <Card date={report.date} text={report.text} key={report.date} />
        ))}
      </main>
    </div>
  );
};

export default App;
