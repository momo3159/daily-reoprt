import { PROPERTY_TYPES } from "@babel/types";
import React, { FC, useState } from "react";
import { pushReport } from "./firebase";
import { reportRef, updateReport } from "./firebase";

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
    <div>
      <textarea
        value={currentText}
        onChange={(e) => setText((current) => (current = e.target.value))}
      ></textarea>
      <button onClick={() => onClick(currentText, date)}>{label}</button>
    </div>
  );
};

export default Form;
