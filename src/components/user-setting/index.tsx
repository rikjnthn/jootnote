import React from "react";

import Input from "../input";

const UserSetting = () => {
  return (
    <div className="p-5 px-[30px]">
      <div>
        <span className="text-xl font-semibold md:text-2xl">User</span>
        <form className="flex flex-col gap-4 pt-4">
          <Input label="Username" type="text" defaultValue={"Username"} />
          <Input label="Email" type="email" defaultValue={"email@mail.com"} />
          <Input
            label="Change Password"
            type="password"
            defaultValue={"password"}
          />

          <button
            className="btn btn-primary rounded-md p-6 py-2.5 font-normal text-white max-md:text-sm"
            type="submit"
            title="Change"
          >
            Change
          </button>
        </form>
      </div>

      <div className="pt-10">
        <span className="text-xl font-semibold md:text-2xl">Account</span>
        <div className="flex justify-between pt-4">
          <button className="btn btn-primary rounded-md p-6 py-2.5 font-normal text-white max-md:text-sm">
            Log out
          </button>
          <button className="btn btn-error rounded-md p-6 py-2.5 font-normal text-white max-md:text-sm">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserSetting;
