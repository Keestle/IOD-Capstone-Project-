import * as React from "react";
import { useEffect } from "react";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import BudgetTotals from "./BudgetTotal";
import EditToolbar from "./EditToolbar";
import {
  GridRowModes,
  DataGrid,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import axios from "axios";
import saveBudget from "./SaveFunctionality";

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
      const response = await axios.get(
        `http://localhost:3000/api/budgetCalculator/${budgetId}`
      );

      if (Array.isArray(response.data.data.items)) {
        return response.data.data.items.map((item) => ({
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
  return (
    <FullFeaturedCrudGrid
      initialRows={collections}
      budgetName={collections?.budgetName}
    />
  );
};

function FullFeaturedCrudGrid({ initialRows, budgetName }) {
  const [rows, setRows] = React.useState([]);
  const [rowModesModel, setRowModesModel] = React.useState({});

  React.useEffect(() => {
    setRows(initialRows || []);
  }, [initialRows]);

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  // TO-DO: External service - Save budget functionality.
  const handleSaveClick = async (id, event) => {
    event.stopPropagation();
    await saveBudget(rows, budgetName);
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => `${row._id}-${row.itemName}` !== id));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row._id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row._id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row._id === newRow._id ? updatedRow : row)));
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
              onClick={(event) => handleSaveClick(id, event)} // Pass the event to the function
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
        getRowId={(row) => `${row._id}-${row.itemName}`}
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
