import React from "react";
import "./Loading.css";

export default function Loading() {
  return (
    <div className="loader-container">
      <div className="loader">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
}
