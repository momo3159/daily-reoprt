import React, { FC, useState, useEffect } from "react";
import { reportRef, updateReport } from "./firebase";
import Form from "./Form";
import { formatDate } from "./util/day";
import { FetchedData } from "./types";
import { pushReport } from "./firebase";

type Props = {
  date: string;
  text: string;
};

const handler = (text: string, date: string) => {
  reportRef
    .orderByChild("date")
    .equalTo(date)
    .once("value", (snapshot) => {
      const data: FetchedData = snapshot.val();
      if (data === null) {
        return;
      }
      const key = Object.keys(data)[0];

      updateReport({
        key,
        date: formatDate(new Date()),
        text,
      });
    });
};

const Card: FC<Props> = ({ date, text }) => {
  return (
    <>
      <div>
        <p>{date}</p>
        <p>{text}</p>
        <button>編集する</button>
      </div>
      <div>
        <Form label="update" text={text} date={date} onClick={handler} />
      </div>
    </>
  );
};

export default Card;
