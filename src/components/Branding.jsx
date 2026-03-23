import React from "react";
import "./Branding.css";

/**
 * Branding — top-right logo block
 * Renders the "varian" wordmark and subtitle.
 * No props needed — purely static.
 */
function Branding() {
  return (
    <div className="header-branding">
      <div className="main-logo">varian</div>
      <div className="sub-logo">A Siemens Healthineers Company</div>
    </div>
  );
}

export default Branding;