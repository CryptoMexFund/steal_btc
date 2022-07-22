import React from 'react';

export function TextHyperlink({children, href}) {
  return (
    <a href={href} className={"text-blue-400 hover:underline"}>
      {children}
    </a>
  );
}