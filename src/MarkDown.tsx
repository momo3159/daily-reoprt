import React, { FC, useEffect } from "react";
import Prism from "prismjs";
import "./prism.css";
type Props = {
  htmlString: string;
};

const MarkDown: FC<Props> = ({ htmlString }) => {
  useEffect(() => {
    Prism.highlightAll();
  });

  return (
    <div
      dangerouslySetInnerHTML={{ __html: htmlString }}
      className="prose prose-blue break-all md:break-words col-start-1 col-end-7 w-11/12 mx-auto"
    />
  );
};

export default MarkDown;
