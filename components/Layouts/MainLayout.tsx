"use client";
import Preview from "../Preview";
import TabComponent from "../TabComponent";
import { useState } from "react";
import dynamic from "next/dynamic";

const CodeEditor = dynamic(() => import("../CodeEditor"), {
  loading: () => <p>Loading...</p>,
});

export default function MainLayout() {
  const [html, setHtml] = useState("<h1>Hello World</h1>");
  const [css, setCss] = useState("h1 { color: red; }");
  const [js, setJs] = useState('console.log("Hello from JS");');

  const tabs = [
    {
      label: "HTML",
      content: (
        <CodeEditor
          language="html"
          setCodeChange={setHtml}
          defaultValue={html}
        />
      ),
    },
    {
      label: "CSS",
      content: (
        <CodeEditor language="css" setCodeChange={setCss} defaultValue={css} />
      ),
    },
    {
      label: "JS",
      content: (
        <CodeEditor
          language="javascript"
          setCodeChange={setJs}
          defaultValue={js}
        />
      ),
    },
  ];
  return (
    <div className="h-full">
      <div className="h-full flex">
        <div className="w-full flex-1 h-full border-r">
          <TabComponent tabs={tabs} />
        </div>
        <div className="w-full flex-1 h-full">
          <Preview html={html} css={css} js={js} />
        </div>
      </div>
      {/* <ResizableSplitPane
        minLeftWidth={200}
        minRightWidth={200}
        leftPane={}
        rightPane={<Preview html={html} css={css} js={js} />}
      /> */}
    </div>
  );
}
