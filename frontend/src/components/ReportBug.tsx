import { BACKEND_URL } from "@/constants";
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
          type="email"
          placeholder="Enter Your Email"
          className={`input input-bordered placeholder-gray-04 p1 ${
            validateEmail() == null ? "input-warning" : ""
          }`}
          onChange={(event) => setEmail(event.target.value)}
          value={email}
          required
        />
        {validateEmail() == null && (
          <label className="text-xs mt-1">Please enter a valid email</label>
        )}
      </div>
      <div className="mb-[24px]">
        <h6 className="mb-1">App</h6>
        <div className="dropdown menu-dropdown-toggle">
          <input
            type="text"
            placeholder="Select an app..."
            className="input input-bordered placeholder-gray-04 p1 w-[100%]"
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
          placeholder="What is going wrong?"
          onChange={(event) => {
            setDesc(event.target.value);
          }}
          maxLength={descMaxLen}
          value={desc}
        />
        <label className="label">
          <span className="label-text-alt"></span>
          <span className="label-text-alt">
            {desc.length}/{descMaxLen}
          </span>
        </label>
      </div>
      <button
        className={`btn mb-5 ${areFieldsPopulated ? "bg-ruby" : ""} ${
          areFieldsPopulated ? "text-white" : ""
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
