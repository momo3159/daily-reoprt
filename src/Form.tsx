import React, { FC, useState } from "react";

type buttonLabel = "register" | "update";
type Props = {
  text: string;
  date: string;
  label: buttonLabel;
  onClick: (text: string, date: string) => void;
};

const Form: FC<Props> = ({ text, date, label, onClick }) => {
  const [currentText, setText] = useState(text);
  return (
    <>
      <textarea
        className="resize-none col-start-1 col-end-5 w-11/12 mx-auto shadow-md bd-round focus:outline-none focus:ring-2 focus: ring-green-400"
        value={currentText}
        onChange={(e) => setText((current) => (current = e.target.value))}
      ></textarea>
      <button
        className="w-2/3 h-2/3 m-auto bg-blue-600 hover:bg-blue-800 rounded-md focus:outline-none col-start-4 col-end-5"
        onClick={() => onClick(currentText, date)}
      >
        {label}
      </button>
    </>
  );
};

export default Form;
