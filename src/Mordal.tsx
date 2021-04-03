import React, { FC } from "react";

type Props = {
  isShow: boolean;
  modalStateChanger: React.Dispatch<React.SetStateAction<boolean>>;
};

const Mordal: FC<Props> = ({ isShow, modalStateChanger, children }) => {
  return isShow ? (
    <div className="absolute inset-0  bg-gray-900 bg-opacity-80">
      <div className="w-2/3 h-4/6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-100">
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
