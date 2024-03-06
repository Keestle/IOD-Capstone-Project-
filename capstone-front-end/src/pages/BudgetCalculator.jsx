import React from "react";
import ResponsiveAppBar from "./Header";
import BudgetComponent from "./BudgetForm";
// import FormDialog from "./UserManager";

function BudgetCalculator() {
  return (
    <div>
      <ResponsiveAppBar />
      <BudgetComponent />
    </div>
  );
}

export default BudgetCalculator;
