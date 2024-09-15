"use client";
import React, { useEffect, useRef } from "react";

import { usePocketbase } from "@/context/pocketbase-context";
import useMatchMedia from "@/hooks/useMatchMedia";

const TitleInput = ({ contentId, title }: TitleInputPropsType) => {
  const titleRef = useRef<HTMLTextAreaElement>(null);

  const isMatchMedia = useMatchMedia("(min-width: 768px)");

  const { pb } = usePocketbase();

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

  const save = async () => {
    try {
      console.log(contentId);
      await pb.collection("contents").update(contentId, {
        title: titleRef.current?.value,
      });
    } catch (e) {}
  };

  return (
    <div>
      <textarea
        ref={titleRef}
        onBlur={save}
        className="title-textarea"
        defaultValue={title}
        placeholder="Title..."
      />
    </div>
  );
};

export default TitleInput;

interface TitleInputPropsType {
  contentId: string;
  title?: string;
}
