import React from 'react';

export function TextHyperlink({children, href}) {
  return (
    <a href={href} target="_blank" className={"text-blue-400 hover:underline"}>
      {children}
    </a>
  );
}