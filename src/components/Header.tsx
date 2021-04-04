import React, { FC, useState } from "react";
import {
  database,
  pushReport,
  signInWithEmailAndPassword,
  signOut,
  updateReport,
} from "../util/firebase";
import { useSetRecoilState, useRecoilValue } from "recoil";
import Modal from "./Mordal";

import { loginState } from "../recoilState";
import { FetchedData } from "../types";
import { formatDate } from "../util/day";
import Form from "./Form";

const Header: FC = () => {
  const [isModalOpen, setModalState] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const setLoginState = useSetRecoilState(loginState);
  const uid = useRecoilValue(loginState);

  const signIn = async (email: string, password: string) => {
    const uid = await signInWithEmailAndPassword(email, password);
    if (uid) {
      setLoginState(uid);
    } else {
      // TODO: エラーハンドル
      setLoginState("");
    }

    setModalState(false);
  };

  const signOutHandler = async () => {
    await signOut();
    setLoginState("");
  };

  const handler = (text: string, date: string) => {
    database
      .ref(`daily-report/${uid}`)
      .orderByChild("date")
      .equalTo(date)
      .once("value", (snapshot) => {
        const data: FetchedData = snapshot.val();

        if (data === null) {
          pushReport({ uid, text, date });
          setModalState(false);
        } else {
          const response = window.confirm(
            "すでに本日の記録が存在します。上書きされますがよろしいですか？"
          );
          if (!response) return;

          const key = Object.keys(data)[0];
          updateReport({
            key,
            date: formatDate(new Date()),
            text,
            uid,
          });
        }
      });
  };

  return (
    <div className="bg-green-400 h-20 grid grid-cols-2">
      <h1 className="text-2xl md:text-4xl m-auto ml-2">DAILY REPORT</h1>
      {uid ? (
        <>
          <button
            onClick={() => setModalState(true)}
            className="col-start-3 text-right mt-12 mr-2"
          >
            登録する
          </button>
          <button
            onClick={() => signOutHandler()}
            className="col-start-4 text-right mt-12 mr-2"
          >
            ログアウト
          </button>
          <Modal isShow={isModalOpen} modalStateChanger={setModalState}>
            <Form
              label="register"
              text=""
              date={formatDate(new Date())}
              onClickHandler={handler}
            />
          </Modal>
        </>
      ) : (
        <>
          <button
            onClick={() => setModalState(true)}
            className="col-start-4 text-right mt-12 mr-2"
          >
            ログイン
          </button>
          <Modal isShow={isModalOpen} modalStateChanger={setModalState}>
            <div className="h-full">
              <div className="grid grid-cols-1 gap-y-8 mt-32">
                <input
                  placeholder="   email address"
                  className="shadow-inner bd-round w-3/4 h-10 mx-auto"
                  type="text"
                  onChange={(e) =>
                    setEmail((current) => (current = e.target.value))
                  }
                />
                <input
                  placeholder="   password"
                  className="shadow-inner bd-round w-3/4 h-10 mx-auto"
                  type="password"
                  onChange={(e) =>
                    setPassword((current) => (current = e.target.value))
                  }
                />
                <button
                  className="w-1/3 md:w-1/5 mx-auto bg-green-500 hover:bg-green-700 rounded-xl focus:outline-none"
                  onClick={() => signIn(email, password)}
                >
                  ログイン
                </button>
              </div>
            </div>
          </Modal>
          {
            // TODO: ローディングGIF
          }
        </>
      )}
    </div>
  );
};

export default Header;
