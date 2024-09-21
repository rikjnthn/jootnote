"use client";
import React, { RefObject, useEffect, useRef, useState } from "react";
import { ClientResponseError } from "pocketbase";

import SaveContentButton from "../save-content-button";
import { usePocketbase } from "@/context/pocketbase-context";
import useMatchMedia from "@/hooks/useMatchMedia";

const updateContentHeight = (
  e: Event,
  element: RefObject<HTMLTextAreaElement>,
) => {
  if (!element.current) return;

  element.current.style.height = "0";

  const scrollHeight = (e.currentTarget as HTMLTextAreaElement).scrollHeight;

  element.current.style.height = `${scrollHeight}px`;
};

const FileContent = ({ fileContent }: FileContentPropsType) => {
  const [isContentChange, setIsContentChange] = useState<boolean>(false);
  const isMatchMedia = useMatchMedia("(min-width: 768px)");

  const titleRef = useRef<HTMLTextAreaElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const { pb } = usePocketbase();

  useEffect(() => {
    const contentElement = contentRef.current;
    const titleElement = titleRef.current;

    contentElement?.addEventListener("input", (e) =>
      updateContentHeight(e, contentRef),
    );

    titleElement?.addEventListener("input", (e) =>
      updateContentHeight(e, titleRef),
    );

    return () => {
      contentElement?.removeEventListener("input", (e) =>
        updateContentHeight(e, contentRef),
      );

      titleElement?.removeEventListener("input", (e) =>
        updateContentHeight(e, titleRef),
      );
    };
  }, []);

  useEffect(() => {
    const element = contentRef?.current;
    if (!element) return;

    const changeEvent = new Event("input", { bubbles: true });

    contentRef?.current.dispatchEvent(changeEvent);
  }, [isMatchMedia]);

  useEffect(() => {
    const element = titleRef?.current;
    if (!element) return;

    const changeEvent = new Event("input", { bubbles: true });

    titleRef?.current.dispatchEvent(changeEvent);
  }, [isMatchMedia]);

  const save = async () => {
    if (!isContentChange) {
      return;
    }

    try {
      await pb.collection("contents").update(fileContent.id, {
        title: titleRef.current?.value,
        content: contentRef.current?.value,
      });
      setIsContentChange(false);
    } catch (e) {
      if (e instanceof ClientResponseError) {
        console.error("Error: " + e.message);
      }
    }
  };

  return (
    <div className="flex h-full flex-col md:py-14 lg:px-20">
      <div>
        <textarea
          ref={titleRef}
          onChange={() => setIsContentChange(true)}
          className="title-textarea"
          defaultValue={fileContent.title}
          placeholder="Title..."
        />
      </div>

      <div onClick={() => contentRef?.current?.focus()} className="h-full">
        <textarea
          ref={contentRef}
          onChange={() => setIsContentChange(true)}
          className="context-textarea"
          defaultValue={fileContent.content}
          placeholder="Text"
          autoFocus
        />
      </div>
      {isContentChange && <SaveContentButton onClick={save} />}
    </div>
  );
};

export default FileContent;

interface FileContentPropsType {
  fileContent: {
    id: string;
    title: string;
    content: string;
  };
}
