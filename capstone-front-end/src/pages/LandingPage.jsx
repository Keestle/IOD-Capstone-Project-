import React from "react";
import ResponsiveAppBar from "./Header";
import BasicButtons from "./BasicButton";

export default function LandingPage() {
  return (
    <div className="Homepage">
      <ResponsiveAppBar />
      <h1>Nickel Nomad</h1>
      <p style={{ fontStyle: "italic" }}>Finances made simple.</p>
      <BasicButtons />
    </div>
  );
}
