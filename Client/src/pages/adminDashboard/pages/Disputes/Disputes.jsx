import { useState,useEffect } from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  Paper,
  TablePagination,
} from "@mui/material";
import { Info, AccessTime, CheckCircle, Cancel } from "@mui/icons-material";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import InsertInvitationOutlinedIcon from "@mui/icons-material/InsertInvitationOutlined";
import ImportExportOutlinedIcon from "@mui/icons-material/ImportExportOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4, 
  borderRadius:'10px'
};

const initialDisputes = [
  {
    id: "DIS-2024001",
    company: "Tech Corp Ltd.",
    type: "Billing",
    status: "Review",
    priority: "High",
    created: "2024-02-21",
  },
  {
    id: "DIS-2024002",
    company: "Tech Corp Ltd.",
    type: "Billing",
    status: "Pending",
    priority: "High",
    created: "2024-02-21",
  },
  {
    id: "DIS-2024003",
    company: "Tech Corp Ltd.",
    type: "Billing",
    status: "Action  ",
    priority: "High",
    created: "2024-02-21",
  },
  {
    id: "DIS-2024004",
    company: "Tech Corp Ltd.",
    type: "Billing",
    status: "Pending",
    priority: "High",
    created: "2024-02-21",
  },
  {
    id: "DIS-2024005",
    company: "Tech Corp Ltd.",
    type: "Billing",
    status: "Pending",
    priority: "High",
    created: "2024-02-21",
  },
];

const Disputes = () => {
  const [disputes, setDisputes] = useState([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    company: "",
    type: "",
    priority: "",
    status: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [errors, setErrors] = useState({}); 

  const [selectedDate, setSelectedDate] = useState(null); 
  const [filterStatus, setFilterStatus] = useState('all');

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  }; 

  const handleStatusChange = (status)=>{
    setFilterStatus(status)
  }
 

  const fetchDisputes = async () => {
    try {
      const response = await axios.get(`${API}/disputes`);
      let allDisputes = response.data.data; 
      console.log("All Disputes:", allDisputes);

      if(selectedDate) {
        allDisputes = allDisputes.filter(dispute => {
          const disputeDate = dayjs(dispute.createdAt);
          return disputeDate.isSame(selectedDate, 'day');
        });
      } 
      
  if (filterStatus !== 'all') {
    allDisputes = allDisputes.filter(dispute => 
      dispute.status.toLowerCase() === filterStatus.toLowerCase()
    );
  }
  
      setDisputes(allDisputes);
      console.log("Fetched disputes:", response.data);
    } catch (error) {
      console.error("Error fetching disputes:", error);
    }
  };



  useEffect(() => {
    fetchDisputes();
  }, [filterStatus,selectedDate,disputes]);


  useEffect(() => {
    if (open) {
      document.getElementById("dispute_type")?.focus();
    }
  }, [open]);
  
useEffect(() => {
  const root = document.getElementById("root");
  if (open) {
    root.setAttribute("inert", "true"); 
  } else {
    root.removeAttribute("inert");
  }
}, [open]);

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setFormData({ id: "", company: "", type: "", status: "", priority: "" });
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });


    setErrors((prevErrors) => ({
      ...prevErrors,
      [id]: "",
    }));
  };

  const onCloseBtn = () => {
    closeModal();
  };

  const handleSubmit = async () => {
    const newErrors = {};
    if (!formData.dispute_type) newErrors.dispute_type = "Dispute type is required";
    if (!formData.reason) newErrors.reason = "Reason is required";
    if (!formData.resolution_notes) newErrors.resolution_notes = "Resolution notes is required";
    if (!formData.status) newErrors.status = "Status is required";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (isEditing) {
      setDisputes(disputes.map((d) => (d.id === formData.id ? formData : d)));
    } else {
      setDisputes([
        ...disputes,
        {
          ...formData,
          id: `DIS-${Date.now()}`,
          status: "Pending",
          created: new Date().toISOString().split("T")[0],
        },
      ]);
    }
    closeModal();
  };

  const handleEdit = (dispute) => {
    setFormData(dispute);
    setIsEditing(true);
    openModal();
  };

  const handleDeleteOpen = (id) => {
    setDeleteId(id);
    setOpenDelete(true);
  };

  const handleDeleteClose = () => {
    setOpenDelete(false);
    setDeleteId(null);
  };

  const handleDeleteConfirm = () => {
    setDisputes(disputes.filter((d) => d.id !== deleteId));
    handleDeleteClose();
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const refreshPage = () => {
    window.location.reload();
  }


  
  return (
    <div className="p-6 bg-gray-100">
      <div className="mb-4">
        <Typography variant="h5" className="font-semibold">
          Dispute Resolution Center
        </Typography>
        <Typography variant="body2" className="text-gray-600 mb-4">
          Manage and resolve company disputes
        </Typography>
      </div>



      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mb-5">
        {[
          {
            label: "Total Disputes",
            value: disputes.length,
            icon: <Info className="text-blue-500" />,
            borderColor: "border-blue-500",
          },
          {
            label: "Pending",
            value: disputes.filter((d) => d.status === "Pending").length,
            icon: <AccessTime className="text-yellow-500" />,
            borderColor: "border-yellow-500",
          },
          {
            label: "Resolved",
            value: disputes.filter((d) => d.status === "Resolved").length,
            icon: <CheckCircle className="text-green-500" />,
            borderColor: "border-green-500",
          },
          {
            label: "Escalated",
            value: disputes.filter((d) => d.status === "Escalated").length,
            icon: <Cancel className="text-red-500" />,
            borderColor: "border-red-500",
          },
        ].map((item, index) => (
          <Card
            key={index}
            className={`shadow-md border-t-4 ${item.borderColor}`}
          >
            <CardContent className="flex justify-between items-center">
              <div>
                <Typography variant="subtitle2" className="text-gray-600">
                  {item.label}
                </Typography>
                <Typography variant="h5" className="font-bold">
                  {item.value}
                </Typography>
              </div>
              {item.icon}
            </CardContent>
          </Card>
        ))}
      </div>


      <div className="flex justify-between items-center mb-4 bg-white p-4 mt-4">
        <div className="flex space-x-2">
          <button className="border border-gray-300 px-4 py-2 rounded">
            All Statuses <FilterAltOutlinedIcon className=" text-gray-500" />
          </button>
          <button className="border border-gray-300 px-4 py-2 rounded">
            Priority <ImportExportOutlinedIcon className=" text-gray-500" />
          </button>
          <button className="border border-gray-300 px-4 py-2 rounded">
            dd-mm-yyyy{" "}
            <InsertInvitationOutlinedIcon className=" text-gray-500" />
          </button>
        </div>
        <Button
          variant="contained"
          color="primary"
          onClick={openModal}
          style={{ backgroundColor: "#1976d2", color: "#fff" }}
        >
          Create New Case
        </Button>
      </div>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={closeModal}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{ backdrop: { timeout: 500 } }}

      >
        <Fade in={open}>
          <Box sx={style}>
            <div className="grid grid-cols-2 gap-5">
              <div>
                <label
                  htmlFor="id"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Case ID
                </label>
                <input
                  id="id"
                  type="text"
                  value={formData.id}
                  onChange={handleInputChange}
                  placeholder="Enter case ID"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  disabled={isEditing}
                />
              </div>
              <div>
                <label
                  htmlFor="company"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Company
                </label>
                <input
                  id="company"
                  type="text"
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder="Enter company name"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div>
                <label
                  htmlFor="type"
                  className="block text-gray-700 text-md font-bold mb-2"
                >
                  Type
                </label>
                <input
                  id="type"
                  type="text"
                  value={formData.type}
                  onChange={handleInputChange}
                  placeholder="Enter dispute type"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div>
                <label
                  htmlFor="priority"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Priority
                </label>
                <input
                  id="priority"
                  type="text"
                  value={formData.priority}
                  onChange={handleInputChange}
                  placeholder="Enter priority level"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div>
                <label
                  htmlFor="status"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Status
                </label>
                <select
                  id="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="Pending">Pending</option>
                  <option value="Resolved">Resolved</option>
                  <option value="Escalated">Escalated</option>
                </select>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <Button
                onClick={onCloseBtn}
                style={{ marginRight: "10px" }}
                variant="outlined"
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                {isEditing ? "Update" : "Create"}
              </Button>
            </div>
          </Box>
        </Fade>
      </Modal>

      <Modal
        open={openDelete}
        onClose={handleDeleteClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Confirm Delete
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Are you sure you want to delete this dispute?
          </Typography>
          <div className="mt-4 flex justify-end">
            <Button
              onClick={handleDeleteClose}
              style={{ marginRight: "10px" }}
              variant="outlined"
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleDeleteConfirm}
            >
              Delete
            </Button>
          </div>
        </Box>
      </Modal>

      <Paper>
        <TableContainer component={Paper} className="shadow-xl">
          <Table>
            <TableHead className="bg-gray-200 p-2 m-2">
              <tr>
                <td className="px-3 py-2 text-start font-bold">Case ID</td>
                <td className="px-3 py-2 text-start font-bold">Company</td>
                <td className="px-3 py-2 text-start font-bold">Type</td>
                <td className="px-3 py-2 text-start font-bold">Status</td>
                <td className="px-3 py-2 text-start font-bold">Priority</td>
                <td className="px-3 py-2 text-start font-bold">Created</td>
                <td className="px-3 py-2 text-start font-bold">Actions</td>
              </tr>
            </TableHead>

            <TableBody>
              {disputes
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <tr key={row.id} className="hover:bg-gray-200 shadow-md m-4">
                    <td className="px-5 py-2 font-medium">#{row.id}</td>
                    <td className="px-3 py-2 font-medium">{row.company}</td>
                    <td className="px-3 py-2 font-medium">{row.type}</td>
                    <td className="px-3 py-2 font-medium">{row.status}</td>
                    <td className="px-3 py-2 font-medium">{row.priority}</td>
                    <td className="px-3 py-2 font-medium">{row.created}</td>
                    <td className="px-3 py-2 text-start">
                      <div>
                        <button
                          className="m-1 p-1"
                          color="white"
                          onClick={() => handleDeleteOpen(row.id)}
                          style={{
                            backgroundColor: "transparent",
                            border: "none",
                            cursor: "pointer",
                          }}
                        >
                          <DeleteIcon color="error" />
                        </button>
                        <button
                          className="p-1 m-1"
                          onClick={() => handleEdit(row)}
                          style={{
                            backgroundColor: "transparent",
                            border: "none",
                            cursor: "pointer",
                          }}
                        >
                          <EditIcon color="primary" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={disputes.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
      </Paper>
    </div>
  );
};

export default Disputes;
 