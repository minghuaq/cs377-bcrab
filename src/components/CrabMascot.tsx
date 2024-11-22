import React from 'react';

export default function CrabMascot({ className = "w-20 h-20" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Body */}
      <circle cx="50" cy="50" r="35" fill="#F2A900" />
      
      {/* Eyes */}
      <g className="eyes">
        <circle cx="40" cy="40" r="8" fill="#003865" />
        <circle cx="60" cy="40" r="8" fill="#003865" />
        <circle cx="40" cy="38" r="3" fill="white" />
        <circle cx="60" cy="38" r="3" fill="white" />
      </g>
      
      {/* Claws */}
      <path
        d="M15 45 Q25 50 15 55 Q25 50 15 45"
        fill="#F2A900"
        stroke="#003865"
        strokeWidth="3"
      />
      <path
        d="M85 45 Q75 50 85 55 Q75 50 85 45"
        fill="#F2A900"
        stroke="#003865"
        strokeWidth="3"
      />
      
      {/* Legs */}
      <g stroke="#003865" strokeWidth="3">
        <path d="M30 70 Q25 80 20 75" fill="none" />
        <path d="M40 75 Q35 85 30 80" fill="none" />
        <path d="M60 75 Q65 85 70 80" fill="none" />
        <path d="M70 70 Q75 80 80 75" fill="none" />
      </g>
      
      {/* Smile */}
      <path
        d="M40 55 Q50 65 60 55"
        fill="none"
        stroke="#003865"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}