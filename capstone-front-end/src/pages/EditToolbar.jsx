import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import TextField from "@mui/material/TextField";
import { GridToolbarContainer } from "@mui/x-data-grid";
import { GridRowModes } from "@mui/x-data-grid";
import saveBudget from "./SaveFunctionality";

// Function to add empty rows to continue budget list.
const generateEmptyBudgetItem = () => {
  return {
    _id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, // Generate a new random id
    itemName: "",
    itemLink: "",
    estimateCost: "",
    actualCost: 0,
    isNew: true,
  };
};
function EditToolbar(props) {
  const { rows, setRows, setRowModesModel } = props;
  const [budgetName, setBudgetName] = React.useState("");

  const handleClick = () => {
    const newItem = generateEmptyBudgetItem();
    setRows((oldRows) => [...oldRows, newItem]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [`${newItem._id}-${newItem.itemName}`]: {
        mode: GridRowModes.Edit,
        fieldToFocus: "itemName",
      },
    }));
  };

  // TO-DO: Const handlesaveclick -call external module to save. (Build this)
  const handleSaveClick = async () => {
    try {
      await saveBudget(rows, budgetName);
      console.log("Budget saved successfully!");
    } catch (error) {
      console.error("Error during save:", error.message);
      // Optionally handle errors and update UI or show a notification
    }
  };

  // Ernie Notes: Make sure the buttons on the top of the budget is dynamic. Only budget name has this feat. at the moment.
  return (
    <GridToolbarContainer>
      <Box sx={{ flexGrow: 1 }}>
        <TextField
          label="Give your Budget a Name!"
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
        <Button
          color="primary"
          startIcon={<SaveIcon />}
          onClick={handleSaveClick}
        >
          Save Budget
        </Button>
      </Box>
    </GridToolbarContainer>
  );
}
export default EditToolbar;
