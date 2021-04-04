import React, { FC, useEffect } from "react";
import Prism from "prismjs";
import "./prism.css";
import "./MarkDown.css"
import sanitizeHtml from "sanitize-html";
import sanitize from "sanitize-html";
type Props = {
  htmlString: string;
};

const MarkDown: FC<Props> = ({ htmlString }) => {
  useEffect(() => {
    Prism.highlightAll();
  });

  return (
    <div
      
      dangerouslySetInnerHTML={{
        __html: sanitizeHtml(htmlString, {
          allowedTags: sanitize.defaults.allowedTags.concat(["img"]),
          allowedAttributes: {...sanitize.defaults.allowedAttributes, code: ['class']}
        }),
      }}
      className="markdown prose sm:prose prose-blue break-all md:break-words col-start-1 col-end-7 w-11/12 mx-auto"
    />
  );
};

export default MarkDown;
