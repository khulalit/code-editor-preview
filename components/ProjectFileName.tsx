"use client";

import { useState, useRef, useEffect } from "react";
import { FaPencilAlt } from "react-icons/fa";

interface ProjectFileNameProps {
  name?: string;
  className?: string;
}

const ProjectFileName: React.FC<ProjectFileNameProps> = ({
  name = "Untitled",
  className,
}) => {
  const [isEditable, setIsEditable] = useState(false);
  const [projectName, setProjectName] = useState(name);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsEditable(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [inputRef]);

  return (
    <div
      className={"flex items-center max-w-[240px] overflow-hidden " + className}
    >
      {isEditable ? (
        <input
          ref={inputRef}
          type="text"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          className="text-black text-lg border-b border-gray-400 focus:outline-none text-[18px]"
        />
      ) : (
        <div className="flex items-center">
          <span className="text-black text-lg text-[18px]">{projectName}</span>
          <FaPencilAlt
            className="w-4 h-4 mb-1 text-black cursor-pointer ml-2"
            onClick={() => setIsEditable(true)}
          />
        </div>
      )}
    </div>
  );
};

export default ProjectFileName;
