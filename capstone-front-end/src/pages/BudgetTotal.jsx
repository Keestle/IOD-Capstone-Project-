// CustomFooter.js
import React from "react";

const BudgetTotals = ({ rows }) => {
  console.log("Rows:", rows);
  const totalEstimatedCost = rows
    ? rows.reduce((total, row) => total + (row.estimateCost || 0), 0)
    : 0;
  const totalActualCost = rows
    ? rows.reduce((total, row) => total + (row.actualCost || 0), 0)
    : 0;

  return (
    <div
      style={{ display: "flex", justifyContent: "flex-end", padding: "10px" }}
    >
      <div style={{ marginRight: "20px" }}>
        <strong>Total Estimated Cost:</strong> {totalEstimatedCost.toFixed(2)}
      </div>
      <div>
        <strong>Total Actual Cost:</strong> {totalActualCost.toFixed(2)}
      </div>
    </div>
  );
};

export default BudgetTotals;
