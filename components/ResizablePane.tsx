"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import throttle from "lodash-es/throttle";

interface ResizableSplitPaneProps {
  minLeftWidth?: number;
  minRightWidth?: number;
  leftPane: React.ReactNode;
  rightPane: React.ReactNode;
}

const ResizableSplitPane: React.FC<ResizableSplitPaneProps> = ({
  minLeftWidth = 200,
  minRightWidth = 200,
  leftPane,
  rightPane,
}) => {
  const [leftPaneWidth, setLeftPaneWidth] = useState(250);
  const isResizing = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    isResizing.current = true;
  };

  const handleMouseMove = useCallback(
    throttle((e: MouseEvent) => {
      if (isResizing.current && containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const newWidth = e.clientX - containerRect.left;
        const containerWidth = containerRect.width;
        const rightPaneWidth = containerWidth - newWidth - 5; // 5px is the width of the resizer

        if (newWidth >= minLeftWidth && rightPaneWidth >= minRightWidth) {
          setLeftPaneWidth(newWidth);
        }
      }
    }, 10), // adjust the throttle delay as needed
    [minLeftWidth, minRightWidth]
  );

  const handleMouseUp = () => {
    isResizing.current = false;
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove]);

  return (
    <div ref={containerRef} className="flex h-full">
      <div
        className="flex-shrink-0 h-full p-4 bg-green-700"
        style={{ width: `${leftPaneWidth}px`, transition: "width 0.1s" }}
      >
        {leftPane}
      </div>
      <div
        className="bg-gray-400 cursor-col-resize"
        onMouseDown={handleMouseDown}
        style={{ width: "5px" }}
      ></div>
      <div className="flex-1 h-full p-4 bg-red-200">{rightPane}</div>
    </div>
  );
};

export default ResizableSplitPane;
