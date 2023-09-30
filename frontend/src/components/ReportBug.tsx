import { BACKEND_URL } from "@/constants";
import { useState } from "react";
import IssueIcon from "./svg/IssueIcon";
import WarningIcon from "./svg/WarningIcon";

interface ReportBugProps {
  appNames: string[];
}

export const ReportBug = ({ appNames }: ReportBugProps) => {
  const descMaxLen = 500;
  const [email, setEmail] = useState("");
  const [desc, setDesc] = useState("");
  const [appName, setAppName] = useState("");
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(false);

  const validateEmail = () => {
    if (!email) {
      return email;
    }
    return email.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/);
  };

  const submitBugReport = async () => {
    const response = await fetch(`${BACKEND_URL}/bug-reports/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        appName: appName,
        desc: desc,
        createdTime: new Date().toString(),
      }),
    });

    const responseJson = await response.json();
    if (responseJson.success) {
      setEmail("");
      setDesc("");
      setAppName("");
      setSucceeded(true);
    } else {
      setSucceeded(false);
    }
  };

  let areFieldsPopulated = email !== "" && desc !== "" && appName !== "";

  return (
    <div className="card w-full p-6 bg-white gap-4">
      <div className="flex flex-row align-middle gap-4">
        <div className="flex justify-center items-center">
          <IssueIcon />
        </div>
        <div className="flex flex-col">
          <h5 className="text-gray-08">Experiencing issues?</h5>
          <p className="text-gray-04 p1">Report a bug with this form.</p>
        </div>
      </div>
      <div className="form-control flex flex-col gap-2">
        <h6 className="text-gray-05">Email</h6>
        <input
          type="email"
          placeholder="Enter your email"
          className={`input input-bordered text-gray-06 placeholder:text-gray-03 p1 w-full focus:outline-8" ${
            validateEmail() == null ? "input-warning" : ""
          }`}
          onChange={(event) => setEmail(event.target.value)}
          value={email}
          required
        />
        {validateEmail() == null && (
          <div className="flex flex-row gap-2 items-center">
            <WarningIcon />
            <label className="p2 text-gray-05">
              Please enter a valid email
            </label>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <h6 className="text-gray-05">App</h6>
        <div className="dropdown menu-dropdown-toggle">
          <input
            type="text"
            placeholder="Select an app..."
            className="input input-bordered text-gray-06 placeholder:text-gray-03 p1 w-full caret-transparent cursor-pointer"
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
      <div className="flex flex-col gap-2">
        <h6 className="text-gray-05">Description</h6>
        <div className="form-control">
          <textarea
            className="textarea textarea-bordered h-24 text-gray-06 placeholder:text-gray-03 h6"
            placeholder="What is going wrong?"
            onChange={(event) => {
              setDesc(event.target.value);
            }}
            maxLength={descMaxLen}
            value={desc}
          />
          <label className="label">
            <span className="label-text-alt"></span>
            <span className="label-text-alt text-gray-05">
              {desc.length}/{descMaxLen}
            </span>
          </label>
        </div>
      </div>
      <button
        className={`btn py-4 ${areFieldsPopulated ? "bg-ruby" : "bg-gray-00"} ${
          areFieldsPopulated ? "text-white" : "text-gray-03"
        }`}
        disabled={!areFieldsPopulated || validateEmail() == null}
        onClick={submitBugReport}
      >
        Submit Bug Report
      </button>
      {succeeded && (
        <div className="alert alert-success">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Request Submitted!</span>
          <button
            onClick={() => setSucceeded(false)}
            className="btn btn-circle btn-xs btn-outline"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      )}
      {error && (
        <div className="alert alert-success">
          <div className="alert alert-error">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Request failed, please try again later.</span>
          </div>
          <button
            onClick={() => setError(false)}
            className="btn btn-circle btn-xs btn-outline"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};
