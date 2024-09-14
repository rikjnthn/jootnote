"use client";
import React, { forwardRef, useId } from "react";
import clsx from "clsx";

const Input = (
  { label, error, ...inputProps }: InputPropsType,
  ref: React.ForwardedRef<HTMLInputElement>,
) => {
  const id = useId();
  const errorId = useId();

  const isError = typeof error !== "undefined" && error.length > 0;

  return (
    <div className="flex flex-col gap-2.5">
      {label.length > 0 && (
        <label className="font-medium md:text-xl" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        className="input input-bordered input-ghost input-primary aria-[invalid=true]:input-error max-md:text-sm"
        id={id}
        ref={ref}
        aria-invalid={isError}
        aria-describedby={errorId}
        {...inputProps}
      />

      <div
        id={errorId}
        className={clsx("text-sm text-error", { hidden: !isError })}
      >
        {error}
      </div>
    </div>
  );
};

export default forwardRef(Input);

interface InputPropsType extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}
