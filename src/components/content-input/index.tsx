"use client";
import { usePocketbase } from "@/context/pocketbase-context";
import useMatchMedia from "@/hooks/useMatchMedia";
import React, { useEffect, useRef } from "react";

const ContentInput = ({ contentId, content }: ContentInputPropsType) => {
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const isMatchMedia = useMatchMedia("(min-width: 768px)");

  const { pb } = usePocketbase();

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

  const save = async () => {
    try {
      await pb.collection("contents").update(contentId, {
        content: contentRef.current?.value,
      });
    } catch (e) {}
  };

  return (
    <div onClick={() => contentRef.current?.focus()} className="h-full">
      <textarea
        ref={contentRef}
        onBlur={save}
        className="context-textarea"
        defaultValue={content}
        placeholder="Text"
        autoFocus
      />
    </div>
  );
};

export default ContentInput;

interface ContentInputPropsType {
  contentId: string;
  content?: string;
}
