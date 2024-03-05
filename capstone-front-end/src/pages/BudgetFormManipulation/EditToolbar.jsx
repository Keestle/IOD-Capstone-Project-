import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import TextField from "@mui/material/TextField";
import { GridToolbarContainer } from "@mui/x-data-grid";
import axios from "axios";
import { randomId } from "@mui/x-data-grid-generator";
import { GridRowModes } from "@mui/x-data-grid";

// Function to add empty rows to continue budget list.
const generateEmptyBudgetItem = () => {
  return {
    id: randomId(), // itemId
    itemName: "",
    itemLink: "",
    estimateCost: "",
    actualCost: 0,
    isNew: true,
  };
};
function EditToolbar(props) {
  const { rows, setRows, setRowModesModel } = props;

  const handleClick = () => {
    const newItem = generateEmptyBudgetItem();
    setRows((oldRows) => [...oldRows, newItem]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [newItem.id]: { mode: GridRowModes.Edit, fieldToFocus: "itemName" },
    }));
  };

  // Save button: To do - If saved once then change save budget to PUT method with the current budget.
  const [budgetName, setBudgetName] = React.useState("");

  const saveBudget = async () => {
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

  // Ernie Notes: Make sure the buttons on the top of the budget is dynamic. Only budget name has this feat. at the moment.
  return (
    <GridToolbarContainer>
      <Box sx={{ flexGrow: 1 }}>
        <TextField
          label="Enter budget name"
          variant="outlined"
          style={{ marginRight: "350px" }}
          value={budgetName}
          onChange={(e) => setBudgetName(e.target.value)}
        />
      </Box>
      <Box>
        <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
          Add budget item
        </Button>
        <Button color="primary" startIcon={<SaveIcon />} onClick={saveBudget}>
          Save Budget
        </Button>
      </Box>
    </GridToolbarContainer>
  );
}
export default EditToolbar;
