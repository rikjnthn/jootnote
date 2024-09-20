"use client";
import React, { useEffect, useState } from "react";
import clsx from "clsx";

import { SetStateType } from "@/interface";

const ButtonWithTimer = ({
  clickFuntion,
  title,
  initialTime,
}: ButtonWithTimerPropsType) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [timeReminder, setTimeReminder] = useState<number>(initialTime);

  const handleClick = () => {
    if (!clickFuntion) return;

    if (isLoading) return;

    clickFuntion(setIsLoading);
    setTimeReminder(initialTime);
  };

  useEffect(() => {
    if (!isLoading) return;

    const intervalId = setInterval(() => {
      setTimeReminder((prev) => {
        if (prev === 0) {
          setIsLoading(false);

          clearInterval(intervalId);

          return 0;
        } else return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isLoading]);

  const seconds = timeReminder % 60;
  const minutes = Math.floor(timeReminder / 60);

  const timer = `${minutes < 10 ? "0" + `${minutes}` : minutes} : ${seconds < 10 ? "0" + seconds : seconds}`;

  return (
    <button
      onClick={handleClick}
      className={clsx("btn btn-primary font-normal max-md:text-sm", {
        "bg-opacity-75": isLoading,
      })}
      type="button"
      title={isLoading ? "Please wait" : title}
    >
      {isLoading ? timer : "Resent Verification Email"}
    </button>
  );
};

export default ButtonWithTimer;

interface ButtonWithTimerPropsType {
  title: string;
  initialTime: number;
  clickFuntion?: (setIsLaoding: SetStateType<boolean>) => void;
}
