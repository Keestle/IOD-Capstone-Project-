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

const BudgetComponent = () => {
  const [collections, setCollections] = React.useState(null);
  const [budgetName, setBudgetName] = React.useState("");

  // Set budgetId to be the ObjectId of thye budget created in MongoDb you which to fetch the intialbudgetrows from.
  const fetchInitialBudgetRows = async () => {
    try {
      const budgetId = "65e8139ae8d136442e7609d6";
      const response = await axios.get(
        `http://localhost:3000/api/budgetCalculator/${budgetId}`
      );

      if (Array.isArray(response.data.data.items)) {
        let mappedItems = response.data.data.items.map((item) => ({
          ...item,
          isNew: false,
        }));
        let output = { ...response.data.data, items: mappedItems };
        console.log("result of spread: " + output);
        return output;
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
      // Assuming the response includes budgetName directly or within a data object
      const fetchedBudgetName = data?.budgetName || ""; // Use a fallback empty string if undefined

      setCollections(data.items);

      console.log(
        "data in useEffect after fetchInitialBudgetRows: " + data.items
      );
      console.log(
        "Budgetname in useEffect after fetchInitialBudgetRows: " +
          fetchedBudgetName
      );
      setBudgetName(fetchedBudgetName);
    });
  }, []);

  // Render your component using the 'collections' state
  return (
    <FullFeaturedCrudGrid
      initialRows={collections}
      budgetName={budgetName}
      setBudgetName={setBudgetName}
    />
  );
};

function FullFeaturedCrudGrid({ initialRows, budgetName, setBudgetName }) {
  const [rows, setRows] = React.useState([]);
  const [rowModesModel, setRowModesModel] = React.useState({});

  console.log("Budget name in FullFeaturedCrudGrid: " + budgetName);

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
          toolbar: {
            rows,
            setRows,
            setRowModesModel,
            budgetName,
            setBudgetName,
          },
          footer: { rows },
        }}
      />
    </Box>
  );
}
export default BudgetComponent;
