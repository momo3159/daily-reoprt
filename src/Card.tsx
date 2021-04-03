import React, { FC, useState, useRef } from "react";
import Modal from "./Mordal";
import { database, updateReport } from "./firebase";
import Form from "./Form";
import { formatDate } from "./util/day";
import { FetchedData } from "./types";
import { loginState } from "./recoilState";
import { useRecoilValue } from "recoil";
import parser from "./mdParser";
import MarkDown from "./MarkDown";
import sanitizeHtml from "sanitize-html";

type Props = {
  date: string;
  text: string;
};

const Card: FC<Props> = ({ date, text }) => {
  const card = useRef(null) as any;
  const [isModalOpen, setModalState] = useState(false);
  const uid = useRecoilValue(loginState);

  const handler = (text: string, date: string) => {
    database
      .ref(`daily-report/${uid}`)
      .orderByChild("date")
      .equalTo(date)
      .once("value", async (snapshot) => {
        const data: FetchedData = snapshot.val();

        if (data === null) {
          return;
        }
        const key = Object.keys(data)[0];

        await updateReport({
          uid,
          key,
          date: formatDate(new Date()),
          text,
        });
        setModalState(false);
      });
  };
  const parsedText = parser(text);

  return (
    <>
      <div
        id={`${date}-card`}
        ref={card}
        className="border-solid border-2 border-gray-300 rounded-md md:w-3/4 mx-auto mb-3 grid grid-cols-6"
      >
        <p className="ml-2 mt-2 text-gray-400 col-start-1 col-end-7">{date}</p>
        <MarkDown htmlString={sanitizeHtml(parsedText)} />
        <div className="col-start-6 col-end-7"></div>
        {uid && (
          <button
            onClick={() => {
              setModalState(true);
            }}
            className="bg-green-500 hover:bg-green-700 rounded-xl w-3/4 focus:outline-none mx-auto mb-2 col-start-6 col-end-7 "
          >
            edit
          </button>
        )}
      </div>
      <Modal isShow={isModalOpen} modalStateChanger={setModalState}>
        <Form label="update" text={text} date={date} onClickHandler={handler} />
      </Modal>
    </>
  );
};

export default Card;
