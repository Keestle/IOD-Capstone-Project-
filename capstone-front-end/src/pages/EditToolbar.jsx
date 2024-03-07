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
  const { rows, setRows, setRowModesModel, budgetName, setBudgetName } = props;

  // Local state for the input field to prevent re-rendering on every keystroke
  const [localBudgetName, setLocalBudgetName] = React.useState(budgetName);

  // Effect to synchronize local state with the parent state when the component mounts or the parent state changes
  React.useEffect(() => {
    setLocalBudgetName(budgetName);
  }, [budgetName]);

  const handleLocalChange = (event) => {
    setLocalBudgetName(event.target.value);
  };

  const handleBlur = () => {
    setBudgetName(localBudgetName);
  };


  console.log('Budget name in EditToolbar: ' + budgetName);

  React.useEffect(() => {
    console.log('Budget name in EditToolbar within useEffect: ' + budgetName);
  }, []);

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
      // Optionally update UI or perform actions on successful save
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
          label="Enter budget name"
          variant="outlined"
          style={{ marginRight: "350px" }}
          value={localBudgetName}
          onChange={handleLocalChange}
          onBlur={handleBlur} // Update parent state when the input loses focus
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
