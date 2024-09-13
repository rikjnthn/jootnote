import React from "react";

const SubmitButton = ({ name, title }: SubmitButtonPropsType) => {
  return (
    <button
      title={title}
      type="submit"
      className="btn btn-primary rounded-md px-6 font-normal text-white max-md:text-sm"
    >
      {name}
    </button>
  );
};

export default SubmitButton;

interface SubmitButtonPropsType {
  name: string;
  title: string;
}
