import { useState } from "react";
import { IssueLogo } from "./svg/issueLogo";

interface ReportBugProps {
  appNames: string[];
}

export const ReportBug = ({ appNames }: ReportBugProps) => {
  const descMaxLen = 500;
  const [email, setEmail] = useState("");
  const [desc, setDesc] = useState("");
  const [appName, setAppName] = useState("");

  return (
    <div className="card w-96 p-[24px] bg-white">
      <div className="mb-[24px] flex flex-row align-middle">
        <div className="flex mr-[16px] justify-center items-center">
          <IssueLogo />
        </div>
        <div className="flex flex-col">
          <h4 className="text-gray-08">Experiencing issues?</h4>
          <p className="text-gray-06 p1">Report a bug with this form.</p>
        </div>
      </div>
      <div className="form-control mb-[24px]">
        <h6 className="mb-1 text-gray-08">Your Email</h6>
        <input
          type="text"
          placeholder="Enter Your Email"
          className="input input-bordered placeholder-gray-04 p1"
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>
      <div className="mb-[24px]">
        <h6 className="mb-1">App</h6>
        <div className="dropdown menu-dropdown-toggle">
          <input
            type="text"
            placeholder="Select an app..."
            className="input input-bordered placeholder-gray-04 p1 w-[100%]"
            onChange={(event) => setEmail(event.target.value)}
            value={appName}
          />
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            {appNames.map((appName, i) => (
              <li key={i}>
                <a onClick={(_) => setAppName(appName)}>{appName}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <h6 className="text-gray-08 mb-1">Description</h6>
      <div className="form-control">
        <textarea
          className="textarea textarea-bordered h-24"
          placeholder="Bio"
          onChange={(event) => {
            setDesc(event.target.value);
          }}
          maxLength={descMaxLen}
        />
        <label className="label">
          <span className="label-text-alt"></span>
          <span className="label-text-alt">
            {desc.length}/{descMaxLen}
          </span>
        </label>
      </div>
      <button
        className={`btn ${
          email !== "" && desc !== "" && appName !== "" ? "bg-ruby" : ""
        } ${email !== "" && desc !== "" && appName !== "" ? "text-white" : ""}`}
      >
        Submit Bug Report
      </button>
    </div>
  );
};
