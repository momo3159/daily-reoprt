import React, { FC } from "react";
import { useRecoilValue } from "recoil";
import { yOffSetState } from "../recoilState";

type Props = {
  isShow: boolean;
  modalStateChanger: React.Dispatch<React.SetStateAction<boolean>>;
};

const Mordal: FC<Props> = ({ isShow, modalStateChanger, children }) => {
  const yOffSet = useRecoilValue(yOffSetState);

  return isShow ? (
    <div
      style={{ top: yOffSet, height: window.innerHeight + yOffSet }}
      className={`z-40 absolute inset-0 bg-gray-900 bg-opacity-80`}
    >
      <div
        style={{ top: window.innerHeight / 2 }}
        className="w-2/3 absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-100"
      >
        <div className="grid grid-cols-4 grid-rows-1-10 h-full">
          <button
            onClick={() => modalStateChanger(false)}
            className="col-start-4 block text-right rounded-full focus:outline-none"
          >
            <span className="text-3xl pr-2 text-gray-700">×</span>
          </button>
          <div className="col-start-1 col-end-5">{children}</div>
        </div>
      </div>
    </div>
  ) : null;
};

export default Mordal;
