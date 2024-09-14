"use client";
import useMatchMedia from "@/hooks/useMatchMedia";
import React, { useEffect, useRef } from "react";

const TitleInput = () => {
  const titleRef = useRef<HTMLTextAreaElement>(null);

  const isMatchMedia = useMatchMedia("(min-width: 768px)");

  const updateTitleHeight = (e: Event) => {
    const element = titleRef.current;
    if (!element) return;

    element.style.height = "0";

    const scrollHeight = (e.currentTarget as HTMLTextAreaElement).scrollHeight;

    element.style.height = `${scrollHeight}px`;
  };

  useEffect(() => {
    const element = titleRef.current;
    element?.addEventListener("input", updateTitleHeight);
    return () => element?.removeEventListener("input", updateTitleHeight);
  }, []);

  useEffect(() => {
    const element = titleRef.current;
    if (!element) return;

    const changeEvent = new Event("input", { bubbles: true });

    titleRef.current.dispatchEvent(changeEvent);
  }, [isMatchMedia]);

  return (
    <div>
      <textarea
        ref={titleRef}
        className="title-textarea"
        defaultValue={"Title"}
        placeholder="Title..."
      />
    </div>
  );
};

export default TitleInput;
