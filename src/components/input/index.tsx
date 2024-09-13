import React, { useId } from "react";

const Input = ({ label, ...inputProps }: InputPropsType) => {
  const id = useId();

  return (
    <div className="flex flex-col gap-2.5">
      <label className="font-medium md:text-xl" htmlFor={id}>
        {label}
      </label>
      <input
        className="rounded-md border border-black p-2.5 ring-black focus:outline-none focus-visible:ring-1 max-md:text-sm"
        id={id}
        {...inputProps}
      />
    </div>
  );
};

export default Input;

interface InputPropsType extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}
