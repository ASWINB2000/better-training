"use client";

import * as React from "react";
import { Button, type ButtonProps } from "@/components/ui/button";

interface ScrollLinkProps extends Omit<ButtonProps, "onClick"> {
  targetId: string;
}

export function ScrollLink({ targetId, children, ...props }: ScrollLinkProps) {
  const handleClick = () => {
    const el = document.getElementById(targetId);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <Button onClick={handleClick} {...props}>
      {children}
    </Button>
  );
}

interface ScrollAnchorProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  targetId: string;
}

export function ScrollAnchor({ targetId, children, ...props }: ScrollAnchorProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <a href={`#${targetId}`} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}
