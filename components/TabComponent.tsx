"use client";
import React, { Fragment, useState } from "react";

interface TabComponentProps {
  tabs: {
    label: string;
    content: React.ReactNode;
  }[];
}

const TabComponent: React.FC<TabComponentProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  return (
    <div className="w-full mx-auto h-full">
      <div className="flex border-b border-gray-300">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`py-2 px-4 text-center flex-1 ${
              activeTab === index
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {tabs.map((tab, index) => (
        <Fragment key={tab.label}>
          {/* {"fgdfgfd "} */}
          {activeTab === index && tab.content}
        </Fragment>
      ))}
    </div>
  );
};

export default TabComponent;
