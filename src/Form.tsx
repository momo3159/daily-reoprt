import React, { FC, useState } from "react";

type buttonLabel = "register" | "update";
type Props = {
  text: string;
  date: string;
  label: buttonLabel;
  onClickHandler: (text: string, date: string) => void;
};

const Form: FC<Props> = ({ text, date, label, onClickHandler }) => {
  const [currentText, setText] = useState(text);
  return (
    <div className="grid grid-cols-1 gap-4 grid-rows-10-1 h-full">
      <textarea
        className="resize-none w-11/12 mx-auto shadow-md bd-round focus:outline-none focus:ring-2 focus: ring-green-400"
        value={currentText}
        onChange={(e) => setText((current) => (current = e.target.value))}
      ></textarea>
      <button
        className="px-6 py-2 m-auto bg-blue-600 hover:bg-blue-800 rounded-md focus:outline-none"
        onClick={() => onClickHandler(currentText, date)}
      >
        {label}
      </button>
    </div>
  );
};

export default Form;
