import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import BudgetTotals from "./BudgetTotal";
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import {
  randomCreatedDate,
  randomTraderName,
  randomId,
  randomArrayItem,
} from "@mui/x-data-grid-generator";
import axios from "axios";

// Function to add empty rows to continue budget list.
const generateEmptyBudgetItem = () => {
  return {
    id: randomId(), // itemId
    itemName: "",
    itemLink: "",
    estimateCost: "",
    actualCost: "",
    isNew: true,
  };
};
// We will create a function to handle the intial population of items in our budget form
const generateBudgetItem = () => {
  const itemNameOptions = [
    "Toothpaste",
    "Bread",
    "Laundry Detergent",
    "Shampoo",
    "Milk",
    "T-shirt",
    "Dish Soap",
    "Eggs",
    "Toilet Paper",
    "Hand Soap",
  ];
  return {
    id: randomId(), // itemId
    itemName: randomArrayItem(itemNameOptions),
    itemLink: "",
    estimateCost: parseFloat((Math.random() * 10).toFixed(2)), // Adjust as needed
    actualCost: "",
    isNew: true,
  };
};

const initialBudgetRows = Array.from({ length: 7 }, generateBudgetItem);

// Buttons on the top of the budget form.
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

export default function FullFeaturedCrudGrid() {
  const [rows, setRows] = React.useState(initialBudgetRows);
  const [rowModesModel, setRowModesModel] = React.useState({});

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  // Ernie Notes: Modify this handleSaveClick to call the saveBudget function above.
  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    {
      field: "itemName",
      headerName: "Description",
      width: 400,
      editable: true,
    },

    {
      field: "estimateCost",
      headerName: "Estimated Cost",
      type: "Number",
      width: 180,
      editable: true,
    },
    {
      field: "actualCost",
      headerName: "Actual Cost",
      width: 180,
      editable: true,
      type: "Number",
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Box
      sx={{
        height: 500,
        width: "100%",
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{
          toolbar: (props) => <EditToolbar {...props} setRows={setRows} />,
          footer: BudgetTotals,
        }}
        slotProps={{
          toolbar: { rows, setRows, setRowModesModel },
          footer: { rows },
        }}
      />
    </Box>
  );
}
