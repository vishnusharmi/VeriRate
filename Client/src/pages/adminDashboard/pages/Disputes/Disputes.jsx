// //disputes frontend code //
// import { useEffect, useState } from "react";
// import Swal from "sweetalert2";

// import {
//   Card,
//   CardContent,
//   Typography,
//   Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   TablePagination,
//   Backdrop,
//   Box,
//   Modal,
//   Fade,
//   IconButton,
// } from "@mui/material";

// import dayjs from "dayjs";
// import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { FiEdit, FiTrash2 } from "react-icons/fi";

// import { Info, AccessTime, CheckCircle, Cancel } from "@mui/icons-material";
// import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
// import AutorenewIcon from "@mui/icons-material/Autorenew";
// import RequestPageIcon from "@mui/icons-material/RequestPage";
// import axios from "axios";
// import axiosInstance from "../../../../middleware/axiosInstance";

// const API = "http://localhost:3000/api";

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 800,
//   bgcolor: "background.paper",
//   boxShadow: 24,
//   p: 4,
//   borderRadius: "10px",
// };

// const Disputes = () => {
//   const [disputes, setDisputes] = useState([]);
//   const [open, setOpen] = useState(false);
//   const [formData, setFormData] = useState({
//     dispute_type: "",
//     reason: "",
//     status: "pending",
//     resolution_notes: "",
//     employee_id: "",
//   });

//   const [isEditing, setIsEditing] = useState(false);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [openDelete, setOpenDelete] = useState(false);
//   const [deleteId, setDeleteId] = useState(null);
//   const [errors, setErrors] = useState({});

//   const [selectedDate, setSelectedDate] = useState(null);
//   const [filterStatus, setFilterStatus] = useState("all");
//   const [employees, setEmployees] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const handleDateChange = (newDate) => {
//     setSelectedDate(newDate);
//   };

//   const handleStatusChange = (status) => {
//     setFilterStatus(status);
//   };

//   //fetch employees
//   const fetchEmployees = async () => {
//     try {
//       const response = await axios.get("http://localhost:3000/api/all");
//       console.log("Full API response:", response.data); // Debugging

//       if (response.status === 200 && Array.isArray(response.data.employees)) {
//         setEmployees(response.data.employees); // Fix: Extract employees from response
//       } else {
//         throw new Error("Invalid response format");
//       }
//     } catch (error) {
//       console.error("Error fetching employees:", error);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchEmployees();
//   }, []);

//   // Fetch disputes
//   const fetchDisputes = async () => {
//     try {
//       const response = await axiosInstance.get("/disputes");
//       let allDisputes = response.data.data;
//       console.log("All Disputes:", allDisputes);

//       if (selectedDate) {
//         allDisputes = allDisputes.filter((dispute) => {
//           const disputeDate = dayjs(dispute.createdAt);
//           return disputeDate.isSame(selectedDate, "day");
//         });
//       }

//       if (filterStatus !== "all") {
//         allDisputes = allDisputes.filter(
//           (dispute) =>
//             dispute.status.toLowerCase() === filterStatus.toLowerCase()
//         );
//       }
//       setDisputes(allDisputes);
//       console.log("Fetched disputes:", response.data);
//     } catch (error) {
//       console.error("Error fetching disputes:", error);
//     }
//   };

//   useEffect(() => {
//     fetchDisputes();
//   }, [filterStatus, selectedDate, page, rowsPerPage]);

//   useEffect(() => {
//     if (open) {
//       document.getElementById("dispute_type")?.focus();
//     }
//   }, [open]);

//   useEffect(() => {
//     const root = document.getElementById("root");
//     if (open) {
//       root.setAttribute("inert", "true");
//     } else {
//       root.removeAttribute("inert");
//     }
//   }, [open]);

//   const openModal = () => {
//     setOpen(true);
//   };

//   const closeModal = () => {
//     setOpen(false);
//     setFormData({
//       id: "",
//       dispute_type: "",
//       reason: "",
//       status: "pending",
//       resolution_notes: "",
//       employee_id: "",
//     });
//     setIsEditing(false);
//   };

//   // Handle form input change
//   const handleInputChange = (e) => {
//     const { id, value } = e.target;
//     setFormData({ ...formData, [id]: value });

//     setErrors((prevErrors) => ({
//       ...prevErrors,
//       [id]: "",
//     }));
//   };

//   const onCloseBtn = () => {
//     closeModal();
//   };

//   // Handle form submission
//   const handleSubmit = async () => {
//     const newErrors = {};
//     if (!formData.dispute_type)
//       newErrors.dispute_type = "Dispute type is required";
//     if (!formData.reason) newErrors.reason = "Reason is required";
//     if (!formData.resolution_notes)
//       newErrors.resolution_notes = "Resolution notes is required";
//     if (!formData.status) newErrors.status = "Status is required";
//     // if (!formData.employee_id) newErrors.employee_id = "Employee ID  is required";
//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       return;
//     }

//     try {
//       const requestData = isEditing
//         ? formData
//         : {
//             dispute_type: formData.dispute_type,
//             reason: formData.reason,
//             status: formData.status,
//             resolution_notes: formData.resolution_notes,
//             employee_id: formData.employee_id,
//           };

//       const url = isEditing
//         ? `${API}/dispute/${formData.id}`
//         : `${API}/dispute`;

//       const response = await axios({
//         method: isEditing ? "PUT" : "POST",
//         url,
//         headers: { "Content-Type": "application/json" },
//         data: requestData,
//       });

//       if (response.status === 200 || response.status === 201) {
//         Swal.fire({
//           position: "center",
//           icon: "success",
//           title: isEditing
//             ? "Dispute Updated successfully!"
//             : "Dispute created successfully",
//           showConfirmButton: false,
//           timer: 1500,
//         });
//         fetchDisputes();
//         closeModal();
//       }
//     } catch (error) {
//       console.error("Submission error:", error);
//       if (error.response?.data?.error) {
//         setErrors({ server: error.response.data.error });
//         Swal.fire({
//           icon: "error",
//           title: "Oops...",
//           position: "center",
//           text: error.response?.data?.message || "Something went wrong!",
//           footer:
//             '<a href="#" onClick="location.reload()">Try reloading the page?</a>',
//         });
//       }
//     }
//   };

//   // Edit dispute
//   const handleEdit = (dispute) => {
//     setFormData({
//       ...dispute,
//       employee_id: dispute.employee_id ? Number(dispute.employee_id) : null,
//     });
//     setIsEditing(true);
//     openModal();
//   };

//   const handleDeleteOpen = (id) => {
//     setDeleteId(id);
//     setOpenDelete(true);
//   };

//   const handleDeleteClose = () => {
//     setOpenDelete(false);
//     setDeleteId(null);
//   };

//   // Delete dispute
//   const handleDeleteConfirm = async () => {
//     try {
//       await axiosInstance.delete("/dispute/${deleteId}");
//       Swal.fire({
//         position: "center",
//         icon: "success",
//         title: "Dispute Deleted successful!",
//         showConfirmButton: false,
//         timer: 1500,
//       });
//       fetchDisputes();
//       setOpenDelete(false);
//       setDeleteId(null);
//     } catch (error) {
//       console.error("Error deleting dispute:", error);
//     }
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const refreshPage = () => {
//     window.location.reload();
//   };

//   return (
//     <div className="p-6 bg-gray-100">
//       <div className="mb-4">
//         <Typography variant="h5" className="font-semibold">
//           Dispute Resolution Center
//         </Typography>
//         <Typography variant="body2" className="text-gray-600 mb-4">
//           Manage and resolve company disputes
//         </Typography>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mb-5">
//         {[
//           {
//             label: "Total Disputes",
//             value: disputes.length,
//             icon: <Info className="text-blue-500" />,
//             borderColor: "border-blue-500",
//           },
//           {
//             label: "Pending",
//             value: disputes.filter((d) => d.status.toLowerCase() === "pending")
//               .length,
//             icon: <AccessTime className="text-yellow-500" />,
//             borderColor: "border-yellow-500",
//           },
//           {
//             label: "Approved",
//             value: disputes.filter((d) => d.status.toLowerCase() === "approved")
//               .length,
//             icon: <CheckCircle className="text-green-500" />,
//             borderColor: "border-green-500",
//           },
//           {
//             label: "Rejected",
//             value: disputes.filter((d) => d.status.toLowerCase() === "rejected")
//               .length,
//             icon: <Cancel className="text-red-500" />,
//             borderColor: "border-red-500",
//           },
//           {
//             label: "Info Requested",
//             value: disputes.filter(
//               (d) => d.status.toLowerCase() === "info_requested"
//             ).length,
//             icon: <RequestPageIcon className="text-sky-400" />,
//             borderColor: "border-sky-400",
//           },
//         ].map((item, index) => (
//           <Card
//             key={index}
//             className={`shadow-md border-t-4 ${item.borderColor}`}
//           >
//             <CardContent className="flex justify-between items-center">
//               <div>
//                 <Typography variant="subtitle2" className="text-gray-600">
//                   {item.label}
//                 </Typography>
//                 <Typography variant="h5" className="font-bold">
//                   {item.value}
//                 </Typography>
//               </div>
//               {item.icon}
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       <div className="flex justify-between items-center mb-4 bg-white p-4 mt-4">
//         <div className="flex space-x-3">
//           <button className="border border-gray-300 px-4 rounded flex items-center gap-1">
//             <FilterAltOutlinedIcon className="text-gray-500" />
//             <select
//               className="bg-transparent outline-none"
//               value={filterStatus}
//               onChange={(e) => setFilterStatus(e.target.value)}
//             >
//               <option value="all">All Statuses</option>
//               <option value="pending">Pending</option>
//               <option value="approved">Approved</option>
//               <option value="rejected">Rejected</option>
//               <option value="info_requested">Info Requested</option>
//             </select>
//           </button>

//           <div>
//             <LocalizationProvider dateAdapter={AdapterDayjs}>
//               <DatePicker
//                 value={selectedDate}
//                 onChange={(newValue) => handleDateChange(newValue)}
//                 format="DD-MM-YYYY"
//                 clearable
//                 slotProps={{
//                   textField: {
//                     placeholder: "Select Date",
//                   },
//                 }}
//               />
//             </LocalizationProvider>
//           </div>
//           <div className="flex items-center gap-2">
//             <Button
//               onClick={() => refreshPage()}
//               variant="contained"
//               color="primary"
//             >
//               <AutorenewIcon />
//             </Button>
//           </div>
//         </div>

//         <Button
//           id="create-case-button"
//           variant="contained"
//           color="primary"
//           onClick={openModal}
//           style={{ backgroundColor: "#1976d2", color: "#fff" }}
//         >
//           Create New Case
//         </Button>
//       </div>

//       <Modal
//         aria-labelledby="transition-modal-title"
//         aria-describedby="transition-modal-description"
//         open={open}
//         onClose={closeModal}
//         closeAfterTransition
//         slots={{ backdrop: Backdrop }}
//         slotProps={{ backdrop: { timeout: 500 } }}
//       >
//         <Fade in={open}>
//           <Box sx={style}>
//             <div className="grid grid-cols-2 gap-5">
//               {employees.length > 0 ? (
//                 <div>
//                   <label
//                     htmlFor="employee_id"
//                     className="block text-gray-700 text-md font-bold mb-2"
//                   >
//                     Select Employee
//                   </label>
//                   <select
//                     id="employee_id"
//                     value={formData?.employee_id || ""}
//                     onChange={handleInputChange}
//                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                   >
//                     <option value="">Select Employee</option>
//                     {employees.map((emp) => (
//                       <option key={emp.id} value={emp.id}>
//                         {emp.first_name} {emp.last_name}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               ) : (
//                 <p className="text-gray-500">Loading employees...</p>
//               )}

//               <div>
//                 <label
//                   htmlFor="dispute_type"
//                   className="block text-gray-700 text-md font-bold mb-2"
//                 >
//                   Dispute Type
//                 </label>
//                 <select
//                   id="dispute_type"
//                   value={formData.dispute_type}
//                   onChange={handleInputChange}
//                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                 >
//                   <option value="">Select Dispute Type</option>
//                   <option value="blacklist">Blacklist</option>
//                   <option value="rating">Rating</option>
//                   <option value="other">Other</option>
//                 </select>
//                 {errors.dispute_type && (
//                   <p className="text-red-500 text-xs mt-1">
//                     {errors.dispute_type}
//                   </p>
//                 )}
//               </div>

//               <div>
//                 <label
//                   htmlFor="reason"
//                   className="block text-gray-700 text-sm font-bold mb-2"
//                 >
//                   Reason
//                 </label>
//                 <input
//                   id="reason"
//                   type="text"
//                   required
//                   value={formData.reason}
//                   onChange={handleInputChange}
//                   placeholder="Enter reason"
//                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                 />
//                 {errors.reason && (
//                   <p className="text-red-500 text-xs mt-1">{errors.reason}</p>
//                 )}
//               </div>

//               <div>
//                 <label
//                   htmlFor="resolution_notes"
//                   className="block text-gray-700 text-sm font-bold mb-2"
//                 >
//                   Resolution Notes
//                 </label>
//                 <input
//                   id="resolution_notes"
//                   type="text"
//                   value={formData.resolution_notes}
//                   onChange={handleInputChange}
//                   placeholder="Enter resolution notes"
//                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                 />
//                 {errors.resolution_notes && (
//                   <p className="text-red-500 text-xs mt-1">
//                     {errors.resolution_notes}
//                   </p>
//                 )}
//               </div>

//               <div>
//                 <label
//                   htmlFor="status"
//                   className="block text-gray-700 text-md font-bold mb-2"
//                 >
//                   Status
//                 </label>
//                 <select
//                   id="status"
//                   value={formData.status}
//                   onChange={handleInputChange}
//                   required
//                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                 >
//                   <option value="pending">Pending</option>
//                   <option value="approved">Approved</option>
//                   <option value="rejected">Rejected</option>
//                   <option value="info_requested">Info Requested</option>
//                 </select>
//                 {errors.status && (
//                   <p className="text-red-500 text-xs mt-1">{errors.status}</p>
//                 )}
//               </div>
//             </div>

//             <div className="mt-4 flex justify-end">
//               <Button
//                 onClick={onCloseBtn}
//                 style={{ marginRight: "10px" }}
//                 variant="outlined"
//               >
//                 Cancel
//               </Button>
//               <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={handleSubmit}
//               >
//                 {isEditing ? "Update" : "Create"}
//               </Button>
//             </div>
//           </Box>
//         </Fade>
//       </Modal>

//       <Modal
//         open={openDelete}
//         onClose={handleDeleteClose}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >
//         <Box sx={style}>
//           <Typography id="modal-modal-title" variant="h6" component="h2">
//             Confirm Delete
//           </Typography>
//           <Typography id="modal-modal-description" sx={{ mt: 2 }}>
//             Are you sure you want to delete this dispute?
//           </Typography>
//           <div className="mt-4 flex justify-end">
//             <Button
//               onClick={handleDeleteClose}
//               style={{ marginRight: "10px" }}
//               variant="outlined"
//             >
//               Cancel
//             </Button>
//             <Button
//               variant="contained"
//               color="error"
//               onClick={handleDeleteConfirm}
//             >
//               Delete
//             </Button>
//           </div>
//         </Box>
//       </Modal>

//       <Paper>
//         <TableContainer component={Paper} className="shadow-xl">
//           <Table>
//             <TableHead
//               className="bg-gray-200 px-2 py-2"
//               sx={{
//                 background: "linear-gradient(45deg, #3f51b5,rgb(99, 179, 244))", // Gradient background
//               }}
//             >
//               <TableRow>
//                 {/* <TableCell className="px-2 py-1 font-bold text-white" >ID</TableCell> */}
//                 <TableCell className="px-2 py-5 font-bold text-white">
//                   Dispute Type
//                 </TableCell>
//                 <TableCell className="px-2 py-1 font-bold text-white">
//                   Reason
//                 </TableCell>
//                 <TableCell className="px-2 py-1  font-bold text-white">
//                   Status
//                 </TableCell>
//                 <TableCell className="px-2 py-1 font-bold text-white">
//                   Resolution Notes
//                 </TableCell>
//                 <TableCell className="px-2 py-1  font-bold text-white">
//                   Created At
//                 </TableCell>
//                 {/* <TableCell className="px-3 py-2 font-bold">
//                 Employee ID 
//                 </TableCell> */}
//                 <TableCell className="px-2 py-1  font-bold text-white">
//                   Actions
//                 </TableCell>
//               </TableRow>
//             </TableHead>

//             <TableBody>
//               {disputes.length > 0 ? (
//                 disputes
//                   .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                   .map((row) => (
//                     <TableRow key={row.id} className="hover:bg-gray-200">
//                       {/* <TableCell className="px-5 py-1 font-medium">
//                         {row.id}
//                       </TableCell> */}
//                       <TableCell className="px-3 py-1 font-medium">
//                         {row.dispute_type}
//                       </TableCell>
//                       <TableCell className="px-3 py-1 font-medium">
//                         {row.reason}
//                       </TableCell>
//                       <TableCell className="px-3 py-1 font-medium">
//                         <span
//                           className={`px-2 py-1 rounded ${
//                             row.status.toLowerCase() === "pending"
//                               ? "bg-yellow-100 text-yellow-700"
//                               : row.status.toLowerCase() === "approved"
//                               ? "bg-green-100 text-green-700"
//                               : row.status.toLowerCase() === "rejected"
//                               ? "bg-red-100 text-red-700"
//                               : "bg-blue-100 text-sky-400"
//                           }`}
//                         >
//                           {row.status
//                             .replace("_", " ")
//                             .toLowerCase()
//                             .replace(/\b\w/g, (char) => char.toUpperCase())}
//                         </span>
//                       </TableCell>
//                       <TableCell className="px-3 py-1 font-medium">
//                         {row.resolution_notes}
//                       </TableCell>

//                       <TableCell className="px-3 py-1 font-medium">
//                         {new Date(row.createdAt).toLocaleDateString("en-IN", {
//                           day: "numeric",
//                           month: "numeric",
//                           year: "numeric",
//                         })}
//                       </TableCell>

//                       {/* <TableCell className="px-3 py-2 font-medium">
//                     {row.employee_id}
//                   </TableCell> */}

//                       <TableCell className="px-2 py-1">
//                         <IconButton
//                           onClick={() => handleEdit(row)}
//                           sx={{
//                             color: "primary.main",
//                             "&:hover": { backgroundColor: "action.hover" },
//                             transition: "background-color 0.3s ease",
//                           }}
//                         >
//                           <FiEdit />
//                         </IconButton>
//                         <IconButton
//                           onClick={() => handleDeleteOpen(row.id)}
//                           sx={{
//                             color: "error.main",
//                             "&:hover": { backgroundColor: "action.hover" },
//                             transition: "background-color 0.3s ease",
//                           }}
//                         >
//                           <FiTrash2 />
//                         </IconButton>
//                       </TableCell>
//                     </TableRow>
//                   ))
//               ) : (
//                 <TableRow>
//                   <TableCell
//                     colSpan={7}
//                     className="text-center py-4 text-gray-500"
//                   >
//                     No Disputes Available
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//         <TablePagination
//           rowsPerPageOptions={[5, 10, 25]}
//           component="div"
//           count={disputes.length}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onPageChange={handleChangePage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//         />
//       </Paper>
//     </div>
//   );
// };

// export default Disputes;

import { useEffect, useState, useCallback } from "react";
import { useContext } from "react";
import { AuthContext } from "../../../../components/Context/Contextapi";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
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
  Backdrop,
  Box,
  Modal,
  Fade,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { Info, AccessTime, CheckCircle, Cancel } from "@mui/icons-material";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import RequestPageIcon from "@mui/icons-material/RequestPage";
import axiosInstance from "../../../../middleware/axiosInstance";
import PaginationControls from "../../../../components/Pagination/PaginationControls"

const Disputes = () => {
  const { auth, token } = useContext(AuthContext);
  const [disputes, setDisputes] = useState([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    dispute_type: "",
    reason: "",
    status: "pending",
    resolution_notes: "",
    employee_id: "",
  });
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("Select");
  const options = ["Today", "This Week", "This Month"];
  const [isEditing, setIsEditing] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [errors, setErrors] = useState({});
  const [filterStatus, setFilterStatus] = useState("all");
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("");

  const [pagination, setPagination] = useState({
    totalRecords: 0,
    totalPages: 1,
    currentPage: 1,
    pageSize: 10,
    pendingCount: 0,
    approvedCount: 0,
    infoRequestedCount: 0,
    rejectedCount: 0,
  });

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setPagination((prev) => ({ ...prev, currentPage: newPage }));
    }
  };

  const handlePageSizeChange = (newSize) => {
    setPagination((prev) => ({
      ...prev,
      pageSize: newSize,
      currentPage: 1,
    }));
  };

  const fetchEmployees = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/get-employees-for-disputes");
      console.log(response);
      if (response.status === 200 && Array.isArray(response.data.employees)) {
        setEmployees(response.data.employees);
        console.log(employees, "dataa");
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchDisputes = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/disputes", {
        params: {
          page: pagination.currentPage,
          pageSize: pagination.pageSize,
          status: filterStatus === "all" ? undefined : filterStatus,
        },
      });

      console.log(response.data.data);

      const disputesData = Array.isArray(response.data.data.data) ? response.data.data.data : [];
      setDisputes(disputesData);

      const paginationData = response.data.data.pagination || {};
      setPagination((prev) => ({
        ...prev,
        totalRecords: paginationData.totalRecords || 0,
        totalPages: paginationData.totalPages || 1,
        currentPage: paginationData.currentPage || prev.currentPage,
        pageSize: paginationData.pageSize || prev.pageSize,
        pendingCount: paginationData.pendingCount || 0,
        approvedCount: paginationData.approvedCount || 0,
        infoRequestedCount: paginationData.infoRequestedCount || 0,
        rejectedCount: paginationData.rejectedCount || 0,
      }));
    } catch (error) {
      console.error("Error fetching disputes:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to fetch disputes",
      });
    } finally {
      setLoading(false);
    }
  }, [pagination.currentPage, pagination.pageSize, filterStatus]);

  useEffect(() => {
    fetchDisputes();
  }, [fetchDisputes]);

  const openModal = async () => {
    setOpen(true);
    setErrors({});
    await fetchEmployees();
  };

  const closeModal = () => {
    setOpen(false);
    setFormData({
      dispute_type: "",
      reason: "",
      status: "pending",
      resolution_notes: "",
      employee_id: "",
    });
    setSelectedEmployeeId("");
    setIsEditing(false);
    setErrors({});
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    setErrors((prev) => ({ ...prev, [id]: "" }));
  };

  const handleSubmit = async () => {
    const newErrors = {};
    if (!formData.dispute_type) newErrors.dispute_type = "Dispute type is required";
    if (!formData.reason) newErrors.reason = "Reason is required";
    if (!formData.resolution_notes) newErrors.resolution_notes = "Resolution notes is required";
    if (!formData.status) newErrors.status = "Status is required";
    if (!formData.employee_id && !isEditing) newErrors.employee_id = "Employee is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);
      const requestData = isEditing
        ? formData
        : {
            dispute_type: formData.dispute_type,
            reason: formData.reason,
            status: formData.status,
            resolution_notes: formData.resolution_notes,
            employee_id: formData.employee_id,
          };

      const url = isEditing ? `/dispute/update/${formData.id}` : `/dispute`;
      const response = await axiosInstance({
        method: isEditing ? "PUT" : "POST",
        url: url,
        headers: { "Content-Type": "application/json" },
        data: requestData,
      });
      console.log(response + "edit response");

      if (response.status === 200 || response.status === 201) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: isEditing ? "Dispute Updated successfully!" : "Dispute created successfully",
          showConfirmButton: false,
          timer: 4500,
        });
        await fetchDisputes();
        closeModal();
      }
    } catch (error) {
      console.error("Submission error:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response?.data?.message || "Something went wrong!",
      });
      closeModal();
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (dispute) => {
    console.log(dispute, "dis");
    console.log("Editing dispute:", dispute); // Debug log
    setFormData({
      id: dispute.id,
      dispute_type: dispute.dispute_type || "",
      reason: dispute.reason || "",
      status: dispute.status || "pending",
      resolution_notes: dispute.resolution_notes || "",
      employee_id: dispute.employeeId,
    });
    console.log(dispute.employeeId, "data");
    setSelectedEmployeeId(dispute.employeeId);
    setIsEditing(true);
    await openModal(); // Ensure modal opens after state is set
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
      setLoading(true);
      await axiosInstance.delete(`/dispute/delete/${deleteId}`);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Dispute Deleted successfully!",
        showConfirmButton: false,
        timer: 1500,
      });

      await fetchDisputes();
      handleDeleteClose();
    } catch (error) {
      console.error("Error deleting dispute:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to delete dispute",
      });
      handleDeleteClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-3 bg-gray-100">
      <Typography variant="h5" className="font-semibold">
        Dispute Resolution Center
      </Typography>
      <Typography variant="body2" className="text-gray-600 mb-4">
        Manage and resolve company disputes
      </Typography>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mb-5">
        {[
          { label: "Total Disputes", value: pagination.totalRecords, icon: <Info />, borderColor: "border-blue-500" },
          { label: "Pending", value: pagination.pendingCount, icon: <AccessTime />, borderColor: "border-yellow-500" },
          { label: "Approved", value: pagination.approvedCount, icon: <CheckCircle />, borderColor: "border-green-500" },
          { label: "Rejected", value: pagination.rejectedCount, icon: <Cancel />, borderColor: "border-red-500" },
          {
            label: "Info Requested",
            value: pagination.infoRequestedCount,
            icon: <RequestPageIcon />,
            borderColor: "border-sky-400",
          },
        ].map((item, index) => (
          <Card key={index} className={`shadow-md border-t-4 ${item.borderColor}`}>
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

          <div className="relative w-52">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-full px-4 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md flex justify-between items-center"
            >
              {selected}
              <svg
                className={`w-5 h-5 ml-2 transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {isOpen && (
              <motion.ul
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute left-0 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg"
              >
                {options.map((option) => (
                  <li
                    key={option}
                    onClick={() => {
                      setSelected(option);
                      setIsOpen(false);
                    }}
                    className="px-4 py-3 text-gray-700 hover:bg-blue-500 hover:text-white cursor-pointer"
                  >
                    {option}
                  </li>
                ))}
              </motion.ul>
            )}
          </div>
          <Button onClick={() => fetchDisputes()} variant="contained" color="primary">
            <AutorenewIcon />
          </Button>
        </div>
        {/* Show "Create New Dispute" button only if role is not "Super Admin" */}
        {auth.role !== "Super Admin" && (
          <Button onClick={openModal} variant="contained" color="primary">
            Create New Dispute
          </Button>
        )}
      </div>

      <Modal
        open={open}
        onClose={closeModal}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
            sx: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            {loading && (
              <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                <CircularProgress />
              </Box>
            )}
            <div className="grid grid-cols-2 gap-5">
              <div>
                <label htmlFor="employee_id" className="block text-gray-700 text-md font-bold mb-2">
                  Select Employee
                </label>
                <select
                  id="employee_id"
                  value={formData.employee_id}
                  onChange={handleInputChange}
                  disabled={loading}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="">Select an employee</option>
                  {employees.map((emp) => (
                    <option key={emp.id} value={emp.id}>
                      {emp.first_name} {emp.last_name}
                    </option>
                  ))}
                </select>
                {errors.employee_id && <p className="text-red-500 text-xs mt-1">{errors.employee_id}</p>}
              </div>
              <div>
                <label htmlFor="dispute_type" className="block text-gray-700 text-md font-bold mb-2">
                  Dispute Type
                </label>
                <select
                  id="dispute_type"
                  value={formData.dispute_type}
                  onChange={handleInputChange}
                  disabled={loading}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="">Select Dispute Type</option>
                  <option value="blacklist">Blacklist</option>
                  <option value="rating">Rating</option>
                  <option value="other">Other</option>
                </select>
                {errors.dispute_type && <p className="text-red-500 text-xs mt-1">{errors.dispute_type}</p>}
              </div>
              <div className="col-span-2">
                <label htmlFor="resolution_notes" className="block text-gray-700 text-md font-bold mb-2">
                  Resolution Notes
                </label>
                <textarea
                  id="resolution_notes"
                  value={formData.resolution_notes}
                  onChange={handleInputChange}
                  disabled={loading}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  rows="4"
                />
                {errors.resolution_notes && <p className="text-red-500 text-xs mt-1">{errors.resolution_notes}</p>}
              </div>
              <div>
                <label htmlFor="reason" className="block text-gray-700 text-md font-bold mb-2">
                  Reason
                </label>
                <input
                  id="reason"
                  value={formData.reason}
                  onChange={handleInputChange}
                  disabled={loading}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {errors.reason && <p className="text-red-500 text-xs mt-1">{errors.reason}</p>}
              </div>
              <div>
                <label htmlFor="status" className="block text-gray-700 text-md font-bold mb-2">
                  Status
                </label>
                <select
                  id="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  disabled={loading}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                  <option value="info_requested">Info Requested</option>
                </select>
                {errors.status && <p className="text-red-500 text-xs mt-1">{errors.status}</p>}
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <Button onClick={closeModal} style={{ marginRight: "10px" }} variant="outlined" disabled={loading}>
                Cancel
              </Button>
              <Button variant="contained" color="primary" onClick={handleSubmit} disabled={loading}>
                {loading ? <CircularProgress size={24} /> : isEditing ? "Update" : "Create"}
              </Button>
            </div>
          </Box>
        </Fade>
      </Modal>

      <Modal
        open={openDelete}
        onClose={handleDeleteClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{ backdrop: { timeout: 500 } }}
      >
        <Fade in={openDelete}>
          <Box sx={style}>
            <Typography variant="h6" component="h2">
              Confirm Delete
            </Typography>
            <Typography sx={{ mt: 2 }}>Are you sure you want to delete this dispute?</Typography>
            <div className="mt-4 flex justify-end">
              <Button onClick={handleDeleteClose} style={{ marginRight: "10px" }} variant="outlined" disabled={loading}>
                Cancel
              </Button>
              <Button variant="contained" color="error" onClick={handleDeleteConfirm} disabled={loading}>
                {loading ? <CircularProgress size={24} /> : "Delete"}
              </Button>
            </div>
          </Box>
        </Fade>
      </Modal>

      <Paper>
        <TableContainer component={Paper} className="shadow-xl overflow-y-auto h-[270px]">
          <Table>
            <TableHead sx={{ background: "linear-gradient(45deg, #3f51b5, rgb(99, 179, 244))" }}>
              <TableRow>
                <TableCell className="px-2 py-1 font-bold text-white">Full Name</TableCell>
                <TableCell className="px-2 py-5 font-bold text-white">Dispute Type</TableCell>
                <TableCell className="px-2 py-1 font-bold text-white">Reason</TableCell>
                <TableCell className="px-2 py-1 font-bold text-white">Status</TableCell>
                <TableCell className="px-2 py-1 font-bold text-white">Resolution Notes</TableCell>
                <TableCell className="px-2 py-1 font-bold text-white">Created At</TableCell>
                {/* Show "Actions" column only if role is "Super Admin" */}
                {auth.role === "Super Admin" && (
                  <TableCell className="px-2 py-1 font-bold text-white">Actions</TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={auth.role === "Super Admin" ? 7 : 6} className="text-center py-4">
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : disputes.length > 0 ? (
                disputes.map((row) => (
                  <TableRow key={row.id} className="hover:bg-gray-200">
                    <TableCell className="px-3 py-1 font-medium">{row.fullName}</TableCell>
                    <TableCell className="px-3 py-1 font-medium">{row.dispute_type}</TableCell>
                    <TableCell className="px-3 py-1 font-medium">{row.reason}</TableCell>
                    <TableCell className="px-3 py-1 font-medium">
                      <span
                        className={`px-2 py-1 rounded ${
                          row.status.toLowerCase() === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : row.status.toLowerCase() === "approved"
                            ? "bg-green-100 text-green-700"
                            : row.status.toLowerCase() === "rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-blue-100 text-sky-400"
                        }`}
                      >
                        {row.status.replace("_", " ").toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase())}
                      </span>
                    </TableCell>
                    <TableCell className="px-3 py-1 font-medium">{row.resolution_notes}</TableCell>
                    <TableCell className="px-3 py-1 font-medium">
                      {new Date(row.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "numeric",
                        year: "numeric",
                      })}
                    </TableCell>
                    {/* Show "Actions" buttons only if role is "Super Admin" */}
                    {auth.role === "Super Admin" && (
                      <TableCell className="px-2 py-1">
                        <IconButton onClick={() => handleEdit(row)} sx={{ color: "primary.main" }}>
                          <FiEdit />
                        </IconButton>
                        <IconButton onClick={() => handleDeleteOpen(row.id)} sx={{ color: "error.main" }}>
                          <FiTrash2 />
                        </IconButton>
                      </TableCell>
                    )}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={auth.role === "Super Admin" ? 7 : 6} className="text-center py-4 text-gray-500">
                    No Disputes Available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <PaginationControls
          pagination={pagination}
          handlePageChange={handlePageChange}
          handlePageSizeChange={handlePageSizeChange}
        />
      </Paper>

      <Backdrop sx={{ color: "#fff", zIndex: 1000 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default Disputes;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};