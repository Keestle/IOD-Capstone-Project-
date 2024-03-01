import React from "react";
import ResponsiveAppBar from "./Header";
import FullFeaturedCrudGrid from "./BudgetForm";

function BudgetCalculator() {
  return (
    <div>
      <ResponsiveAppBar />
      <FullFeaturedCrudGrid />
    </div>
  );
}

export default BudgetCalculator;
