import { Routes, Route } from "react-router-dom";
import LandingPage from "../src/pages/LandingPage";
import BudgetCalculator from "../src/pages/BudgetCalculator";

function AppRoutes(props) {
  return (
    <Routes>
      {/* index matches on default/home URL: / */}
      <Route index element={<LandingPage {...props} />} />
      <Route path="/budget" element={<BudgetCalculator {...props} />} />
    </Routes>
  );
}

export default AppRoutes;
