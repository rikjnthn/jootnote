"use client";
import { useRouter } from "next/navigation";
import React, { RefObject, useEffect, useRef, useState } from "react";
import { ClientResponseError } from "pocketbase";

import SaveContentButton from "../save-content-button";
import { usePocketbase } from "@/context/pocketbase-context";

const updateContentHeight = (element: RefObject<HTMLTextAreaElement>) => {
  if (!element.current) return;

  element.current.style.height = "0";

  const scrollHeight = element.current.scrollHeight;

  element.current.style.height = `${scrollHeight}px`;
};

const FileContent = ({ fileContent }: FileContentPropsType) => {
  const [isContentChange, setIsContentChange] = useState<boolean>(false);

  const titleRef = useRef<HTMLTextAreaElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const router = useRouter();
  const { pb } = usePocketbase();

  useEffect(() => {
    updateContentHeight(titleRef);
    updateContentHeight(contentRef);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      updateContentHeight(titleRef);
      updateContentHeight(contentRef);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const save = async () => {
    if (!isContentChange) {
      setIsContentChange(false);
      return;
    }

    try {
      await pb.collection("contents").update(fileContent.id, {
        title: titleRef.current?.value,
        content: contentRef.current?.value,
      });
      setIsContentChange(false);
      router.refresh();
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
          onChange={() => {
            setIsContentChange(true);
            updateContentHeight(titleRef);
          }}
          className="title-textarea"
          defaultValue={fileContent.title}
          placeholder="Title..."
        />
      </div>

      <div onClick={() => contentRef?.current?.focus()} className="h-full">
        <textarea
          ref={contentRef}
          onChange={() => {
            setIsContentChange(true);
            updateContentHeight(contentRef);
          }}
          className="content-textarea"
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
