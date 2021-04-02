import React, { FC } from "react";
import { reportRef, updateReport } from "./firebase";
import Form from "./Form";
import { formatDate } from "./util/day";
import { FetchedData } from "./types";

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
    <div className="absolute inset-0  bg-gray-900 bg-opacity-80">
      <div className="w-2/3 h-4/6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-50">
        <div className="h-full grid grid-cols-4 grid-rows-1-10-1">
          <button
            onClick={() => modalStateChanger(false)}
            className="text-right rounded-full focus:outline-none col-start-4 col-end-5"
          >
            <span className="text-2xl pr-2 text-gray-700">×</span>
          </button>
          <Form label="update" text={text} date={date} onClick={handler} />
        </div>
      </div>
    </div>
  ) : null;
};

export default Mordal;
