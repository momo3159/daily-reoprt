import React, { FC, useState } from "react";
import { signInWithEmailAndPassword, signOut } from "./firebase";
import { useSetRecoilState, useRecoilValue } from "recoil";
import Modal from "./Mordal";

import { loginState } from "./recoilState";

const Header: FC = () => {
  const [isModalOpen, setModalState] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const setLoginState = useSetRecoilState(loginState);
  const doesLogin = useRecoilValue(loginState);

  const signIn = async (email: string, password: string) => {
    alert("called");
    const isLoginSuccess = await signInWithEmailAndPassword(email, password);
    if (isLoginSuccess) {
      alert("success");
      setLoginState(true);
    } else {
      alert("fail");
      setLoginState(false);
    }

    setModalState(false);
  };
  const signOutHandler = async () => {
    await signOut();
    setLoginState(false);
  };

  return (
    <div className="bg-green-400 h-20 grid grid-cols-4">
      <h1 className="text-2xl md:text-4xl m-auto ml-2">DAILY REPORT</h1>
      {doesLogin ? (
        <>
          <button className="col-start-3 text-right mt-12 mr-2">
            登録する
          </button>
          <button
            onClick={() => signOutHandler()}
            className="col-start-4 text-right mt-12 mr-2"
          >
            ログアウト
          </button>
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
                <button className="w-1/3 md:w-1/5 mx-auto bg-green-500 hover:bg-green-700 rounded-xl focus:outline-none" onClick={() => signIn(email, password)}>
                  ログイン
                </button>
              </div>
            </div>
          </Modal>
        </>
      )}
    </div>
  );
};

export default Header;
