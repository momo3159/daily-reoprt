import React, { FC, useState, useEffect } from "react";
import { reportRef, updateReport } from "./firebase";
import Form from "./Form";
import { formatDate } from "./util/day";
import { FetchedData } from "./types";
import { pushReport } from "./firebase";

type Props = {
  date: string;
  text: string;
  isShow: boolean;
  modalStateChanger: React.Dispatch<React.SetStateAction<boolean>>;
};

const Mordal: FC<Props> = ({ date, text, isShow, modalStateChanger }) => {
  const handler = (text: string, date: string) => {
    reportRef
      .orderByChild("date")
      .equalTo(date)
      .once("value", async (snapshot) => {
        const data: FetchedData = snapshot.val();

        if (data === null) {
          return;
        }
        const key = Object.keys(data)[0];

        await updateReport({
          key,
          date: formatDate(new Date()),
          text,
        });
        modalStateChanger(false);
      });
  };

  return isShow ? (
    <div className="z-30 absolute m m-auto	left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2;">
      <button onClick={() => modalStateChanger(false)}>x 閉じる</button>
      <Form label="update" text={text} date={date} onClick={handler} />
    </div>
  ) : null;
};

export default Mordal;
