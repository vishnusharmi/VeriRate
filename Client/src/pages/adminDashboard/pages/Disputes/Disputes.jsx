
import React, { useEffect, useState, useRef } from "react";
import Swal from 'sweetalert2';

import {
  Card,
  CardContent,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Backdrop,
  Box,
  Modal,
  Fade
} from "@mui/material";


import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import {
  Info,
  AccessTime,
  CheckCircle,
  Cancel,
  Delete as DeleteIcon,
  Edit as EditIcon
} from "@mui/icons-material";
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import InsertInvitationOutlinedIcon from '@mui/icons-material/InsertInvitationOutlined';
import ImportExportOutlinedIcon from '@mui/icons-material/ImportExportOutlined';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import RequestPageIcon from '@mui/icons-material/RequestPage';
import axios from "axios";

const API = "http://localhost:3007/api";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: '10px'
};


const Disputes = () => {
  const [disputes, setDisputes] = useState([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    dispute_type: "",
    reason: "",
    status: "pending",
    resolution_notes: "",

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

  const handleStatusChange = (status) => {
    setFilterStatus(status)
  }


  const fetchDisputes = async () => {
    try {
      const response = await axios.get(`${API}/disputes`);
      let allDisputes = response.data.data;
      console.log("All Disputes:", allDisputes);

      if (selectedDate) {
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
  }, [filterStatus, selectedDate, page, rowsPerPage]);

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
    setFormData({
      id: "",
      dispute_type: "",
      reason: "",
      status: "pending",
      resolution_notes: "",
    });
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

    try {
      const requestData = isEditing ? formData : {
        dispute_type: formData.dispute_type,
        reason: formData.reason,
        status: formData.status,
        resolution_notes: formData.resolution_notes
      };

      const url = isEditing
        ? `${API}/dispute/${formData.id}`
        : `${API}/dispute`;

      const response = await axios({
        method: isEditing ? "PUT" : "POST",
        url: url,
        headers: { "Content-Type": "application/json" },
        data: requestData,
      });

      if (response.status === 200 || response.status === 201) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: isEditing ? "Dispute Updated successfully!" : "Dispute created successfully",
          showConfirmButton: false,
          timer: 1500
        });
        fetchDisputes();
        closeModal();
      }
    } catch (error) {
      console.error("Submission error:", error);
      if (error.response?.data?.error) {
        setErrors({ server: error.response.data.error });
        Swal.fire({
          icon: "error",
          title: "Oops...",
          position: 'center',
          text: error.response?.data?.message || "Something went wrong!",
          footer: '<a href="#" onClick="location.reload()">Try reloading the page?</a>'
        });
      }
    }
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



  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`${API}/dispute/${deleteId}`);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Dispute Deleted successful!",
        showConfirmButton: false,
        timer: 1500
      });
      fetchDisputes();
      setOpenDelete(false);
      setDeleteId(null);

    } catch (error) {
      console.error("Error deleting dispute:", error);
    }
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
          { label: "Total Disputes", value: disputes.length, icon: <Info className="text-blue-500" />, borderColor: "border-blue-500" },
          { label: "Pending", value: disputes.filter(d => d.status.toLowerCase() === "pending").length, icon: <AccessTime className="text-yellow-500" />, borderColor: "border-yellow-500" },
          { label: "Approved", value: disputes.filter(d => d.status.toLowerCase() === "approved").length, icon: <CheckCircle className="text-green-500" />, borderColor: "border-green-500" },
          { label: "Rejected", value: disputes.filter(d => d.status.toLowerCase() === "rejected").length, icon: <Cancel className="text-red-500" />, borderColor: "border-red-500" },
          { label: "Info Requested", value: disputes.filter(d => d.status.toLowerCase() === "info_requested").length, icon: <RequestPageIcon className="text-sky-400" />, borderColor: "border-sky-400" }
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
        <div className="flex space-x-3">
          <button className="border border-gray-300 px-4 rounded flex items-center gap-1">
            <FilterAltOutlinedIcon className="text-gray-500" />
            <select
              className="bg-transparent outline-none"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="info_requested">Info Requested</option>
            </select>
          </button>

          <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={selectedDate}
                onChange={(newValue) => handleDateChange(newValue)}
                format="DD-MM-YYYY"
                clearable
                slotProps={{
                  textField: {
                    placeholder: 'Select Date',
                  }
                }}
              />
            </LocalizationProvider>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={() => refreshPage()} variant="contained" color="primary">
              <AutorenewIcon />
            </Button>
          </div>

        </div>

        <Button id="create-case-button"
          variant="contained"
          color="primary"
          onClick={openModal}
          style={{ backgroundColor: "#1976d2", color: "#fff" }}>
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
                <label htmlFor="dispute_type" className="block text-gray-700 text-md font-bold mb-2">
                  Dispute Type
                </label>
                <select
                  id="dispute_type"
                  value={formData.dispute_type}
                  onChange={handleInputChange}

                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="">Select Dispute Type</option>
                  <option value="blacklist">Blacklist</option>
                  <option value="rating">Rating</option>
                  <option value="other">Other</option>
                </select>
                {errors.dispute_type && (
                  <p className="text-red-500 text-xs mt-1">{errors.dispute_type}</p>
                )}
              </div>

              <div>
                <label htmlFor="reason" className="block text-gray-700 text-sm font-bold mb-2">
                  Reason
                </label>
                <input
                  id="reason"
                  type="text"
                  required
                  value={formData.reason}
                  onChange={handleInputChange}
                  placeholder="Enter reason"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {errors.reason && (
                  <p className="text-red-500 text-xs mt-1">{errors.reason}</p>
                )}
              </div>

              <div>
                <label htmlFor="resolution_notes" className="block text-gray-700 text-sm font-bold mb-2">
                  Resolution Notes
                </label>
                <input
                  id="resolution_notes"
                  type="text"

                  value={formData.resolution_notes}
                  onChange={handleInputChange}
                  placeholder="Enter resolution notes"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {errors.resolution_notes && (
                  <p className="text-red-500 text-xs mt-1">{errors.resolution_notes}</p>
                )}
              </div>

              <div>
                <label htmlFor="status" className="block text-gray-700 text-md font-bold mb-2">
                  Status
                </label>
                <select
                  id="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                  <option value="info_requested">Info Requested</option>
                </select>
                {errors.status && (
                  <p className="text-red-500 text-xs mt-1">{errors.status}</p>
                )}
              </div>
            </div>


            <div className="mt-4 flex justify-end" >
              <Button onClick={onCloseBtn} style={{ marginRight: "10px" }} variant="outlined">
                Cancel
              </Button>
              <Button variant="contained" color="primary" onClick={handleSubmit}>
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
            <Button onClick={handleDeleteClose} style={{ marginRight: "10px" }} variant="outlined">
              Cancel
            </Button>
            <Button variant="contained" color="error" onClick={handleDeleteConfirm}>
              Delete
            </Button>
          </div>
        </Box>
      </Modal>

      <Paper>
        <TableContainer component={Paper} className="shadow-xl">
          <Table>
            <TableHead className="bg-gray-200 p-2 m-2">
              <TableRow>
                <TableCell className="px-3 py-2 font-bold">ID</TableCell>
                <TableCell className="px-3 py-2 font-bold">Dispute Type</TableCell>
                <TableCell className="px-3 py-2 font-bold">Reason</TableCell>
                <TableCell className="px-3 py-2 font-bold">Status</TableCell>
                <TableCell className="px-3 py-2 font-bold">Resolution Notes</TableCell>
                <TableCell className="px-3 py-2 font-bold">Created At</TableCell>
                <TableCell className="px-3 py-2 font-bold">Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {disputes.length > 0 ? (
                disputes
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow key={row.id} className="hover:bg-gray-200">
                      <TableCell className="px-5 py-2 font-medium">{row.id}</TableCell>
                      <TableCell className="px-3 py-2 font-medium">{row.dispute_type}</TableCell>
                      <TableCell className="px-3 py-2 font-medium">{row.reason}</TableCell>
                      <TableCell className="px-3 py-2 font-medium">
                        <span className={`px-2 py-1 rounded ${row.status.toLowerCase() === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                            row.status.toLowerCase() === 'approved' ? 'bg-green-100 text-green-700' :
                              row.status.toLowerCase() === 'rejected' ? 'bg-red-100 text-red-700' :
                                'bg-blue-100 text-sky-400'
                          }`}>
                          {row.status.replace('_', ' ').toLowerCase().replace(/\b\w/g, char => char.toUpperCase())}
                        </span>
                      </TableCell>
                      <TableCell className="px-3 py-2 font-medium">{row.resolution_notes}</TableCell>
                      <TableCell className="px-3 py-2 font-medium">
                        {new Date(row.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "numeric",
                          year: "numeric",
                        })}
                      </TableCell>
                      <TableCell className="px-3 py-2">

                        <Button onClick={() => handleDeleteOpen(row.id)} style={{ minWidth: 0 }}>
                          <DeleteIcon color="error" />
                        </Button>
                        <Button onClick={() => handleEdit(row)} style={{ minWidth: 0 }}>
                          <EditIcon color="primary" />
                        </Button>

                      </TableCell>
                    </TableRow>
                  ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-4 text-gray-500">
                    No Disputes Available
                  </TableCell>
                </TableRow>
              )}
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
