import * as React from "react";
import { useEffect } from "react";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import BudgetTotals from "./BudgetTotal";
import EditToolbar from "./BudgetFormManipulation/EditToolbar";
import {
  GridRowModes,
  DataGrid,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import { randomId, randomArrayItem } from "@mui/x-data-grid-generator";
import axios from "axios";

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
    actualCost: 0,
    isNew: true,
  };
};
// Fetch all budgets for user with id = 65dc2e9233c3c13bc2b5755
// select the first budget in the collection

// Actually - Easier if fetch budget with id= 65e524faa43d27e6815b9e89
// Set intialbudgetrows to be all the items from that collection for that user.
const BudgetComponent = () => {
  const [collections, setCollections] = React.useState(null);

  // Fetch function for budget rows from my budget.
  const fetchInitialBudgetRows = async () => {
    try {
      const budgetId = "65e524faa43d27e6815b9e89";
      const response = await axios.get(`/api/budgetCalculator/${budgetId}`);

      if (Array.isArray(response.data.data)) {
        return response.data.data.map((item) => ({
          ...item,
          isNew: false,
        }));
      } else {
        console.error(
          "Invalid response format - data is not an array:",
          response.data
        );
        return null;
      }
    } catch (error) {
      console.error("Error fetching initial budget rows:", error);
      return null;
    }
  };

  useEffect(() => {
    fetchInitialBudgetRows().then((data) => {
      setCollections(data);
    });
  }, []);

  // Render your component using the 'collections' state
  return <FullFeaturedCrudGrid initialRows={collections} />;
};

function FullFeaturedCrudGrid({ initialRows }) {
  const [rows, setRows] = React.useState(initialRows || []);
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
export default BudgetComponent;
