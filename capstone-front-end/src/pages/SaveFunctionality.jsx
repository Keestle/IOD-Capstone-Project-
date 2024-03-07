import axios from "axios";
import SimpleAlert from "./PopupSaveNotification";

const saveBudget = async (
  rows,
  budgetName,
  existingBudgetId = "65e8139ae8d136442e7609d6"
) => {
  try {
    let url;
    let method;

    if (existingBudgetId) {
      // If existingBudgetId is provided, it's an update (PUT request)
      url = `http://localhost:3000/api/budgetCalculator/update/${existingBudgetId}`;
      method = "PUT";
    } else {
      // If existingBudgetId is not provided, it's a new budget (POST request)
      url = "http://localhost:3000/api/budgetCalculator/create";
      method = "POST";
    }

    const formattedData = {
      budgetName: budgetName,
      items: rows.map((item) => ({
        itemName: item.itemName,
        estimateCost: item.estimateCost,
        actualCost: item.actualCost,
      })),
    };

    const response = await axios({
      method,
      url,
      headers: {
        "Content-Type": "application/json", // Adjust based on your API requirements
      },
      data: formattedData,
    });

    console.log("Budget saved successfully:", response.data);

    // Optionally, you can update your UI or state based on the response if needed
  } catch (error) {
    console.error("Error saving budget:", error.message);
    // Optionally, handle errors and update your UI or show a notification
  }
  return <SimpleAlert />;
};

export default saveBudget;
