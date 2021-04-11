import React, { useState, useEffect } from "react";
import { database } from "../util/firebase";
import Header from "./Header";
import Card from "./Card";
import { FetchedData, Report } from "../types";
import { useRecoilState, useRecoilValue } from "recoil";
import { loginState, yOffSetState } from "../recoilState";
import InfiniteScroll from "react-infinite-scroller";
import { formatDate } from "../util/day";

const App = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [lastKey, setLastKey] = useState<string>("");
  const [nextDate, setNextDate] = useState<string>(formatDate(new Date()));
  const [hasMore, setHasMore] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const uid = useRecoilValue(loginState);
  const [, setYOffSet] = useRecoilState(yOffSetState);

  const getLastKey = async (uid: string) => {
    database
      .ref(`daily-report/${uid}`)
      .orderByChild("date")
      .limitToFirst(1)
      .on("value", (snapshot) => {
        const data = snapshot.val() as FetchedData | {};

        const keys = Object.keys(data);
        const key = keys[0];
        if (keys.length === 0) setLastKey(formatDate(new Date()));
        else {
          const copy = data as FetchedData;
          setLastKey(copy[key]["date"]);
          console.log(copy[key]["date"]);
        }
      });
  };

  const getReports = async (uid: string) => {
    setIsFetching(true);
    database
      .ref(`daily-report/${uid}`)
      .orderByChild("date")
      .endAt(nextDate)
      .limitToLast(5)
      .on("value", (snapshot) => {
        const data: FetchedData | null = snapshot.val();

        if (data === null) {
          setHasMore(false);
          return;
        }

        const newReports = Object.entries(data)
          .map((obj) => {
            const [, report] = obj;
            return report;
          })
          .reverse();

        if (newReports[newReports?.length - 1]["date"] === lastKey) {
          setHasMore(false);
        }

        const next =
          new Date(newReports[newReports.length - 1]["date"]).getTime() -
          24 * 2600 * 1000;
        setNextDate(formatDate(new Date(next)));

        if (reports.length !== 0) {
          setReports([...reports, ...newReports]);
        } else {
          setReports(newReports);
        }
        setIsFetching(false);
      });
  };

  useEffect(() => {
    if (uid) {
      getLastKey(uid);
    }
  }, [uid]);

  useEffect(() => {
    window.addEventListener(
      "scroll",
      () => {
        setYOffSet((offset) => (offset = window.scrollY));
      },
      true
    );

    // return window.removeEventListener(
    //   "scroll",
    //   () => {
    //     setYOffSet(window.pageYOffset);
    //   },
    //   true
    // );
  });

  return (
    <>
      <Header />
      <main className="h-full w-10/12 mx-auto mt-10">
        {
          // TODO: ローディングGIF
          uid === "" ? (
            <div className="loader" key={0}>
              ログインしてください
            </div>
          ) : (
            <InfiniteScroll
              className="h-full"
              loadMore={(page: number) => getReports(uid)}
              hasMore={!isFetching && hasMore}
              loader={
                uid !== "" ? (
                  <div className="loader" key={0}>
                    Loading ...
                  </div>
                ) : undefined
              }
            >
              {reports?.map((report) =>
                uid !== "" ? (
                  <Card
                    date={report.date}
                    text={report.text}
                    key={report.date}
                  />
                ) : null
              )}
            </InfiniteScroll>
          )
        }
      </main>
    </>
  );
};

export default App;
