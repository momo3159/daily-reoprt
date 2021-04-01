import React, { FC, useState } from "react";
import { pushReport } from "./firebase";
import { reportRef, updateReport } from "./firebase";

const formatDate = (date: Date) => {
  const y = date.getFullYear();
  const m = ("00" + (date.getMonth() + 1)).slice(-2);
  const d = ("00" + date.getDate()).slice(-2);

  return `${y}-${m}-${d}`;
};

type Report = {
  date: string;
  text: string;
};

type FetchedData = {
  [key: string]: Report;
} | null;

const clickHandler = (text: string) => {
  reportRef
    .orderByChild("date")
    .equalTo(formatDate(new Date()))
    .once("value", (snapshot) => {
      const data: FetchedData = snapshot.val();
      if (data == null) {
        pushReport({ date: formatDate(new Date()), text });
      } else {
        const key = Object.keys(data)[0]
        
        const response = window.confirm(
          "データが既に存在しています。追記しますか？"
        );
        if (response) {
          updateReport({ key, date: formatDate(new Date()), text: data[key].text + text });
        }
      }
    });
};
const Form: FC = () => {
  const [text, setText] = useState("write what you did today");
  return (
    <div>
      <textarea
        value={text}
        onChange={(e) => setText((text) => (text = e.target.value))}
      >
      </textarea>
      <button onClick={() => clickHandler(text)}>登録</button>
    </div>
  );
};

export default Form;
