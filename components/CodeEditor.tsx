"use client";
import React, { useState, useEffect, useRef } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-funky.css";
import "./code-editor-style.css";

interface CodeEditorProps {
  language?: string;
  setCodeChange: (code: string) => void;
  defaultValue?: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  language = "javascript",
  setCodeChange,
  defaultValue = "",
}) => {
  const [code, setCode] = useState(defaultValue);
  const codeRef = useRef<any>(null);
  const outputRef = useRef<any>(null);
  const handleInput = (e: any) => {
    setCode(
      e.target.value
        .replace(new RegExp("&", "g"), "&")
        .replace(new RegExp("<", "g"), "<")
    );
  };

  const handleScroll = (e: any) => {
    outputRef.current.scrollTop = e.target.scrollTop;
    outputRef.current.scrollLeft = e.target.scrollLeft;
  };

  const handleKeyDown = (e: any) => {
    if (e.keyCode === 9) {
      e.preventDefault();
      setCode((prev) => prev + "\t");
    }
  };

  useEffect(() => {
    if (code[code.length - 1] == "\n") {
      setCode(code + " ");
    }
    setCodeChange(code);
    if (codeRef.current) Prism.highlightAll();
  }, [code]);

  return (
    <div className="w-full p-2 h-full relative">
      <div className="bg-stone-900 w-full p-2 overflow-auto h-full relative rounded-lg">
        <textarea
          onScroll={handleScroll}
          onKeyDown={handleKeyDown}
          spellCheck="false"
          name="code"
          onInput={handleInput}
          id="input"
          value={code}
          className="absolute top-0 left-0 h-full w-full resize-none p-0 m-0 z-10 outline-none bg-transparent text-transparent caret-white whitespace-pre-wrap"
        ></textarea>
        <pre ref={outputRef} id="output">
          <code className={`language-${language}`} ref={codeRef}>
            {code}
          </code>
        </pre>
      </div>
    </div>
  );
};

export default CodeEditor;
