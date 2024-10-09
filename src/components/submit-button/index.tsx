import React from "react";
import Spinner from "../spinner";

const SubmitButton = ({ name, title, isLoading }: SubmitButtonPropsType) => {
  if (isLoading) {
    return (
      <button
        title="Loading"
        type="button"
        className="btn btn-primary flex rounded-md px-6 disabled:bg-primary"
        disabled
      >
        <Spinner />
      </button>
    );
  }

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
  isLoading?: boolean;
}
