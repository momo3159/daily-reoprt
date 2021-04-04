import marked from "marked";
import highlightjs from "highlight.js";

marked.setOptions({
  breaks: true,
  silent: false,
  highlight: function (code, lang) {
    return highlightjs.highlightAuto(code, [lang]).value;
  },
});

export default marked;
