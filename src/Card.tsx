import React, { FC, useState, useEffect } from "react";
import Modal from "./Mordal";
import { reportRef, updateReport } from "./firebase";
import Form from "./Form";
import { formatDate } from "./util/day";
import { FetchedData } from "./types";
import {loginState} from "./recoilState";
import { useRecoilValue } from "recoil";

type Props = {
  date: string;
  text: string;
};

const Card: FC<Props> = ({ date, text }) => {
  const [isModalOpen, setModalState] = useState(false);
  const doesLogin = useRecoilValue(loginState);
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
        setModalState(false);
      });
  };

  return (
    <>
      <div className="border-solid border-2 border-gray-300 rounded-md md:w-3/4 mx-auto mb-3 grid grid-cols-6">
        <p className="ml-2 mt-2 text-gray-400 col-start-1 col-end-7">{date}</p>
        <p className="ml-2 mt-2 break-all md:break-words col-start-1 col-end-6">
          {text}
        </p>
        <div className="col-start-6 col-end-7"></div>
        {doesLogin && (
          <button
            onClick={() => setModalState(true)}
            className="bg-green-500 hover:bg-green-700 rounded-xl w-3/4 focus:outline-none mx-auto col-start-6 col-end-7 "
          >
            edit
          </button>
        )}
      </div>
      <Modal isShow={isModalOpen} modalStateChanger={setModalState}>
        <Form label="update" text={text} date={date} onClick={handler} />
      </Modal>
    </>
  );
};

export default Card;
