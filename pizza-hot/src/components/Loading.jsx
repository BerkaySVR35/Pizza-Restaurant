import React from "react";

export default function Loading({ error }) {
  return (
    <>
      <div class="d-flex align-items-center">
        <strong role="status">Loading...</strong>
        <div class="spinner-border ms-auto" aria-hidden="true"></div>
      </div>

      <div className="mt-4 alert alert-danger text-center">
        <div>{error}</div>
      </div>
    </>
  );
}
