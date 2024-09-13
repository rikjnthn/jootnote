"use client";
import useMatchMedia from "@/hooks/useMatchMedia";
import React, { useEffect, useRef } from "react";

const ContentInput = () => {
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const isMatchMedia = useMatchMedia("(min-width: 768px)");

  const updateContentHeight = (e: Event) => {
    const element = contentRef.current;
    if (!element) return;

    element.style.height = "0";

    const scrollHeight = (e.currentTarget as HTMLTextAreaElement).scrollHeight;

    element.style.height = `${scrollHeight}px`;
  };

  useEffect(() => {
    const element = contentRef.current;
    element?.addEventListener("input", updateContentHeight);
    return () => element?.removeEventListener("input", updateContentHeight);
  }, []);

  useEffect(() => {
    const element = contentRef.current;
    if (!element) return;

    const changeEvent = new Event("input", { bubbles: true });

    contentRef.current.dispatchEvent(changeEvent);
  }, [isMatchMedia]);

  return (
    <div onClick={() => contentRef.current?.focus()} className="h-full">
      <textarea
        ref={contentRef}
        className="context-textarea"
        defaultValue={"lorem ipsum"}
        placeholder="Text"
        autoFocus
      />
    </div>
  );
};

export default ContentInput;
