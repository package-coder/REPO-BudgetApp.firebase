import React from 'react';

export default function LoadingPage() {
  return <div className="d-flex justify-content-center align-items-center w-100 h-100" variant="dark" style={{width: "3rem", height: "3rem"}}>
      <span class="spinner-border" role="status" >
      <span class="visually-hidden">Loading...</span>
    </span>
  </div>;
}
