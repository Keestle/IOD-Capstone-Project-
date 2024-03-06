import axios from "axios";

const saveBudget = async (rows, budgetName) => {
  try {
    const url = "http://localhost:3000/api/budgetCalculator/create";
    const method = "POST"; // Assuming it's an update; change as needed

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
};
export default saveBudget;
