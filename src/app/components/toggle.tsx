"use client";

import Image from 'next/image';
import { useState } from "react";

interface ToggleSectionProps {
  title: string;
  num: string;
  children: React.ReactNode;
}

const ToggleSection = ({ title, num, children }: ToggleSectionProps) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggle = () => {
    setIsOpen((prev) => !prev);
  };


  return (
    <div style={{ marginTop: "16px" , marginBottom: "50px" }}>
    <div className="toggle-section">
      <button className="toggle-button" onClick={toggle}>
        <span className="arrow">
          {isOpen ? (
            <Image src="/icons/arrow-down.png" alt="열림" className="arrow-icon"/>
          ) : (
            <Image src="/icons/arrow-right.png" alt="닫힘" className="arrow-icon"/>
          )}
        </span>
        <h3><strong>{num}. {title}</strong></h3>

      </button>
      {isOpen && <div className="toggle-content">{children}</div>}
    </div>
    </div>
  );
};

export default ToggleSection;
