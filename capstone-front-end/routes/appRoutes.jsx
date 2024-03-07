import { Routes, Route } from "react-router-dom";
import LandingPage from "../src/pages/LandingPage";
import BudgetCalculator from "../src/pages/BudgetCalculator";
import WhoWeArePage from "../src/pages/Whoweare";

function AppRoutes(props) {
  return (
    <Routes>
      {/* index matches on default/home URL: / */}
      <Route index element={<LandingPage {...props} />} />
      <Route path="/budget" element={<BudgetCalculator {...props} />} />
      <Route path="/Whoweare" element={<WhoWeArePage {...props} />} />
    </Routes>
  );
}

export default AppRoutes;
