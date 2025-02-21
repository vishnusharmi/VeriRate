import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const API = "https://dummyjson.com"; //This is the dummy api for testing purposes. Replace it with your own API...............................................

// Customized alert for Snackbar notifications...............................................
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// Start with an empty array; data will be fetched from the backend...............................................
const initialRows = [];

function EmployeeList() {
  const [rows, setRows] = useState(initialRows);
  const [open, setOpen] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [dialogMode, setDialogMode] = useState(""); // "edit" or "add"...............................................
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastSeverity, setToastSeverity] = useState("success");

  // Fetch Employees on component mount...............................................

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch(`${API}/users`); // GET all users
        if (response.ok) {
          const data = await response.json();
          console.log("Fetched employees:", data);
          // Set rows to the "users" array inside the returned object.
          setRows(data.users);
        } else {
          console.error("Failed to fetch employees");
        }
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  // Delete an employee with backend logic...............................................

  const handleDelete = async (id) => {
    try {
      // DELETE request to remove an employee by id...............................................
      const response = await fetch(`${API}/users/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setRows((prevRows) => prevRows.filter((row) => row.id !== id));
        setToastMessage("Employee deleted successfully");
        setToastSeverity("success");
        setToastOpen(true);
      } else {
        console.error("Failed to delete employee");
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  // Open edit dialog with selected employee's data...............................................

  const handleEdit = (employee) => {
    setCurrentEmployee(employee);
    setDialogMode("edit");
    setOpen(true);
  };

  // Open add dialog with empty employee data...............................................

  const handleAdd = () => {
    // Create a temporary employee object; backend will assign a real ID...............................................
    setCurrentEmployee({ firstName: "", lastName: "", phone: "", email: "" });
    setDialogMode("add");
    setOpen(true);
  };

  // Close the dialog and reset state...............................................

  const handleClose = () => {
    setOpen(false);
    setCurrentEmployee(null);
    setDialogMode("");
  };

  // Save (add or update) an employee with backend logic...............................................

  const handleSave = async () => {
    if (currentEmployee) {
      if (dialogMode === "edit") {
        // PUT request to update an employee...............................................
        try {
          const response = await fetch(`${API}/users/${currentEmployee.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(currentEmployee),
          });
          if (response.ok) {
            setRows((prevRows) =>
              prevRows.map((row) =>
                row.id === currentEmployee.id ? currentEmployee : row
              )
            );
            setToastMessage("Employee updated successfully");
          } else {
            console.error("Failed to update employee");
          }
        } catch (error) {
          console.error("Error updating employee:", error);
        }
      } else if (dialogMode === "add") {
        // POST request to add a new employee...............................................

        // This is DummyJSON uses /users/add for adding new users...............................................
        try {
          const response = await fetch(`${API}/users/add`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(currentEmployee),
          });
          if (response.ok) {
            const newEmployee = await response.json();
            setRows((prevRows) => [...prevRows, newEmployee]);
            setToastMessage("Employee added successfully");
          } else {
            console.error("Failed to add employee");
          }
        } catch (error) {
          console.error("Error adding employee:", error);
        }
      }
      setToastSeverity("success");
      setToastOpen(true);
    }
    handleClose();
  };

  // Close the Snackbar toast notification...............................................

  const handleToastClose = (event, reason) => {
    if (reason === "clickaway") return;
    setToastOpen(false);
  };

  // Define columns for the DataGrid...............................................
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "firstName", headerName: "First name", width: 130 },
    { field: "lastName", headerName: "Last name", width: 130 },
    { field: "phone", headerName: "Phone", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <>
          <IconButton color="primary" onClick={() => handleEdit(params.row)}>
            <EditIcon />
          </IconButton>
          <IconButton color="error" onClick={() => handleDelete(params.row.id)}>
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <div>
      {/* Header with the "Add Employee" button */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "10px",
        }}
      >
        <Button
          style={{ margin: "10px" }}
          variant="contained"
          color="primary"
          onClick={handleAdd}
        >
          Add Employee
        </Button>
      </div>

      {/* Employee Data Grid */}
      <Paper style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10]}
          // checkboxSelection
          disableSelectionOnClick
        />
      </Paper>

      {/* Dialog for Adding/Editing an Employee */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {dialogMode === "edit" ? "Edit Employee" : "Add Employee"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="First Name"
            type="text"
            fullWidth
            value={currentEmployee ? currentEmployee.firstName : ""}
            onChange={(e) =>
              setCurrentEmployee({
                ...currentEmployee,
                firstName: e.target.value,
              })
            }
          />
          <TextField
            margin="dense"
            label="Last Name"
            type="text"
            fullWidth
            value={currentEmployee ? currentEmployee.lastName : ""}
            onChange={(e) =>
              setCurrentEmployee({
                ...currentEmployee,
                lastName: e.target.value,
              })
            }
          />
          <TextField
            margin="dense"
            label="Phone"
            type="text"
            fullWidth
            value={currentEmployee ? currentEmployee.phone : ""}
            onChange={(e) =>
              setCurrentEmployee({
                ...currentEmployee,
                phone: e.target.value,
              })
            }
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            value={currentEmployee ? currentEmployee.email : ""}
            onChange={(e) =>
              setCurrentEmployee({
                ...currentEmployee,
                email: e.target.value,
              })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar Toast Notification */}
      <Snackbar
        open={toastOpen}
        autoHideDuration={3000}
        onClose={handleToastClose}
      >
        <Alert onClose={handleToastClose} severity={toastSeverity}>
          {toastMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default EmployeeList;
