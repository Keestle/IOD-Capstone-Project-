import React from "react";
import ResponsiveAppBar from "./Header";

export default function LandingPage() {
  return (
    <div className="Homepage">
      <ResponsiveAppBar />
      <h1>Nickel Nomad</h1>
      <h3>Finances made simple.</h3>
    </div>
  );
}
