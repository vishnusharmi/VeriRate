// import React, { useEffect, useState } from "react";
// import { FiPlus } from "react-icons/fi";
// import Swal from "sweetalert2";
// import { useForm, Controller } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import BlacklistForm from "./BlacklistForm";
// import BlacklistTable from "./BlacklistTable";
// import {
//   Button,
//   Modal,
//   Box,
//   Typography,
//   CircularProgress,
// } from "@mui/material";
// import axiosInstance from "../../../../middleware/axiosInstance";

// const blacklistSchema = z.object({
//   fullname: z.string().min(1, "Full name is required"),
//   email: z.string().email("Invalid email address"),
//   contact_number: z.string().min(1, "Contact number is required"),
//   position: z.string().min(1, "Position is required"),
//   reason_for_blacklist: z.string().min(1, "Reason for blacklist is required"),
//   report_by: z.string().min(1, "Reported by is required"),
//   status: z.string().min(1, "Status is required"),
//   company_name: z.string().min(1, "Company name is required"),
//   reason_code: z.string().min(1, "Reason code is required"),
//   employee_id: z.number().min(1, "Employee ID is required"),
//   company_id: z.number().min(1, "Company ID is required"),
//   start_date: z.string().min(1, "Start date is required"),
//   end_date: z.string().nullable(),
// });

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

// const BlacklistManagement = () => {
//   const [employees, setEmployees] = useState([]);
//   const [employeeList, setEmployeeList] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [editEmployee, setEditEmployee] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [deleteId, setDeleteId] = useState(null);
//   const [openDelete, setOpenDelete] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const {
//     control,
//     handleSubmit,
//     reset,
//     setValue,
//     formState: { errors, isSubmitting },
//   } = useForm({
//     resolver: zodResolver(blacklistSchema),
//   });

//   console.log("form errors", errors);

//   const getData = async () => {
//     setIsLoading(true);
//     try {
//       const response = await axiosInstance.get("/blacklists");
//       setEmployees(response.data.data);
//     } catch (err) {
//       console.error("Error fetching data:", err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const fetchEmployees = async () => {
//     setIsLoading(true);
//     try {
//       const response = await axiosInstance.get("/users");
//       console.log(response.data);
//       const employees = response.data?.data?.data || [];
//       const filteredEmployees = employees.filter(
//         (emp) => emp.role === "Employee"
//       );
//       setEmployeeList(filteredEmployees);
//       console.log(filteredEmployees, "filtered employees data");
//     } catch (err) {
//       console.error("Error fetching employees:", err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     getData();
//     fetchEmployees();
//   }, []);

//   const handleSave = async (data) => {
//     console.log("Data being sent to the API:", editEmployee);

//     try {
//       const token = sessionStorage.getItem("authToken");
//       const url = editEmployee ? "/editEmployee" : "/blacklists";
//       console.log("URL:", url);
//       const method = editEmployee ? "PUT" : "POST";

//       const response = await axiosInstance(method, url, data);

//       console.log("API Response:", response);

//       if (response.status === 200 || response.status === 201) {
//         Swal.fire({
//           position: "center",
//           icon: "success",
//           title: editEmployee
//             ? "Blacklist entry updated successfully!"
//             : "Blacklist entry created successfully!",
//           showConfirmButton: false,
//           timer: 1500,
//         });
//         getData();
//         closeModal();
//       }
//     } catch (error) {
//       console.error("Submission error:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Oops...",
//         position: "center",
//         text: error.response?.data?.message || "Something went wrong!",
//         footer:
//           '<a href="#" onClick="location.reload()">Try reloading the page?</a>',
//       });
//       closeModal();
//     }
//   };

//   const onSubmit = (data) => {
//     console.log("Form data:", data);
//     handleSave(data);
//   };

//   const handleDelete = async () => {
//     try {
//       await axiosInstance.delete(`/blacklists/${deleteId}`);

//       Swal.fire({
//         position: "center",
//         icon: "success",
//         title: "Blacklist entry deleted successfully!",
//         showConfirmButton: false,
//         timer: 1500,
//       });
//       getData();
//       handleDeleteClose();
//     } catch (err) {
//       Swal.fire({
//         icon: "error",
//         title: "Oops...",
//         position: "center",
//         text: "Something went wrong!",
//         footer:
//           '<a href="#" onClick="location.reload()">Try reloading the page?</a>',
//       });
//       console.error("Error deleting data:", err);
//     }
//   };

//   const handleDeleteClose = () => {
//     setOpenDelete(false);
//     setDeleteId(null);
//   };

//   const handleDeleteOpen = (id) => {
//     setDeleteId(id);
//     setOpenDelete(true);
//   };

//   const handleEdit = (employee) => {
//     setEditEmployee(employee.id);
//     Object.keys(employee).forEach((key) => setValue(key, employee[key]));
//     setIsModalOpen(true);
//   };

//   const handleAddEmployee = () => {
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setEditEmployee(null);
//     reset();
//   };

//   const handleEmployeeSelect = (selectedId) => {
//     console.log("Selected Employee ID:", selectedId);

//     const selectedEmployee = employeeList.find((emp) => emp.id === selectedId);

//     if (!selectedEmployee) {
//       console.warn("Employee not found in the list!");
//       return;
//     }

//     console.log(selectedEmployee, "selected employee");

//     const { Employee } = selectedEmployee;
//     const fullName = `${Employee.first_name} ${Employee.last_name}`;

//     const employmentHistory = Employee.employment_history?.previous_jobs || [];
//     const lastJob = employmentHistory.reduce((latest, job) => {
//       if (!latest || new Date(job.start_date) > new Date(latest.start_date)) {
//         return job;
//       }
//       return latest;
//     }, null);

//     const lastCompanyName = lastJob ? lastJob.company : "N/A";
//     const lastPosition = lastJob ? lastJob.position : "N/A";

//     // Ensure all values are set correctly
//     setValue("employee_id", Employee.id || "");
//     setValue("company_id", Employee.company_id || "");
//     setValue("company_name", lastCompanyName);
//     setValue("position", lastPosition);
//     setValue("fullname", fullName);
//     setValue("email", selectedEmployee.email || "");
//     setValue("contact_number", Employee.phone_number || "");

//     console.log("Updated form values");
//   };

//   const filteredEmployees = employees?.filter((emp) =>
//     emp.fullname?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="mx-auto bg-white p-6 rounded-3xl">
//       <h2 className="text-2xl font-bold mb-4 text-gray-800">
//         Employee Blacklist Management
//       </h2>

//       {isLoading ? ( // Show loading spinner if data is being fetched
//         <Box
//           display="flex"
//           justifyContent="center"
//           alignItems="center"
//           minHeight="200px"
//         >
//           <CircularProgress />
//         </Box>
//       ) : (
//         <>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_auto] gap-4 mb-4">
//             <input
//               type="text"
//               placeholder="Search by name or ID..."
//               className="w-full p-3 border rounded-lg shadow-md focus:ring-2 focus:ring-indigo-500"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//             <Button
//               className="flex items-center justify-center bg-blue text-white px-4 py-2 rounded-lg shadow-md w-full sm:w-auto"
//               onClick={handleAddEmployee}
//               color="primary"
//               variant="contained"
//             >
//               <FiPlus className="mr-2" /> Add Blacklist
//             </Button>
//           </div>

//           {isModalOpen && (
//             <BlacklistForm
//               control={control}
//               handleSubmit={handleSubmit}
//               onSubmit={onSubmit}
//               closeModal={closeModal}
//               employeeList={employeeList}
//               handleEmployeeSelect={handleEmployeeSelect}
//               editEmployee={editEmployee}
//               isSubmitting={isSubmitting}
//             />
//           )}

//           <Modal
//             open={openDelete}
//             onClose={handleDeleteClose}
//             aria-labelledby="modal-modal-title"
//             aria-describedby="modal-modal-description"
//           >
//             <Box sx={style}>
//               <Typography id="modal-modal-title" variant="h6" component="h2">
//                 Confirm Delete
//               </Typography>
//               <Typography id="modal-modal-description" sx={{ mt: 2 }}>
//                 Are you sure you want to delete this blacklist entry?
//               </Typography>
//               <div className="mt-4 flex justify-end">
//                 <Button
//                   onClick={handleDeleteClose}
//                   style={{ marginRight: "10px" }}
//                   variant="outlined"
//                 >
//                   Cancel
//                 </Button>
//                 <Button
//                   variant="contained"
//                   color="error"
//                   onClick={handleDelete}
//                 >
//                   Delete
//                 </Button>
//               </div>
//             </Box>
//           </Modal>

//           <BlacklistTable
//             filteredEmployees={filteredEmployees}
//             handleEdit={handleEdit}
//             handleDeleteOpen={handleDeleteOpen}
//           />
//         </>
//       )}
//     </div>
//   );
// };

// export default BlacklistManagement;







import React, { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import Swal from "sweetalert2";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import BlacklistForm from "./BlacklistForm";
import BlacklistTable from "./BlacklistTable";
import { Button, Modal, Box, Typography, CircularProgress } from "@mui/material";
import axiosInstance from "../../../../middleware/axiosInstance";


const blacklistSchema = z.object({
  fullname: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  contact_number: z.string().min(1, "Contact number is required"),
  position: z.string().min(1, "Position is required"),
  reason_for_blacklist: z.string().min(1, "Reason for blacklist is required"), 
  report_by: z.string().min(1, "Reported by is required"),
  status: z.string().min(1, "Status is required"),
  company_name: z.string().min(1, "Company name is required"),
  reason_code: z.string().min(1, "Reason code is required"),
  employee_id: z.number().min(1, "Employee ID is required"),
  company_id: z.number().min(1, "Company ID is required"),
  start_date: z.string().min(1, "Start date is required"),
  end_date: z.string().nullable(),
});

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

const BlacklistManagement = () => {
  const [employees, setEmployees] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editEmployee, setEditEmployee] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [isLoading, setIsLoading] = useState(false); 

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors,isSubmitting },
  } = useForm({
    resolver: zodResolver(blacklistSchema),
  });

console.log("form errors",errors)

  const getData = async () => {
    setIsLoading(true); 
    try {
      const response = await axiosInstance.get("/blacklists")
      setEmployees(response.data.data); 
      console.log("get blacklist data..... ",response.data.data)
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setIsLoading(false); 
    }
  };

  const fetchEmployees = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get("/users")
      console.log(response.data)
      const employees = response.data?.data?.data || [];
      const filteredEmployees = employees.filter((emp) => emp.role === "Employee");
      setEmployeeList(filteredEmployees);
      console.log(filteredEmployees, "filtered employees data");
    } catch (err) {
      console.error("Error fetching employees:", err);
    } finally {
      setIsLoading(false); 
    }
  };

  useEffect(() => {
    getData();
    fetchEmployees();
  }, []);

  
  const handleSave = async (data) => {
    console.log("Data being sent to the API:", data); // Debugging
  
    try {
      const url = editEmployee
        ? `/blacklists/${editEmployee}`
        : `/blacklists`;
  
      const method = editEmployee ? "PUT" : "POST";
  
      const response = await axiosInstance({
        method: method,
        url: url,
        headers: { "Content-Type": "application/json" },
        data: data,
      });
  
      console.log("API Response:", response); // Debugging
  
      if (response.status === 200 || response.status === 201) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: editEmployee
            ? "Blacklist entry updated successfully!"
            : "Blacklist entry created successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        getData();
        closeModal();
      }
    } catch (error) {
      console.error("Submission error:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        position: "center",
        text: error.response?.data?.message || "Something went wrong!",
        footer: '<a href="#" onClick="location.reload()">Try reloading the page?</a>',
      });
      closeModal();
    }
  };




  const onSubmit = (data) => {
    // console.log("Form data:", data);
    const selectedEmployee = employeeList.find(emp => emp.id === data.employee_id);
    if (selectedEmployee) {
      data.employee_id=selectedEmployee.Employee.id
    } else {
      console.log("Employee not found!");
    }
    handleSave(data);
  };

  const handleDelete = async () => {
    try { 
      const token = sessionStorage.getItem("authToken")
      await axiosInstance.delete(`blacklists/${deleteId}`)
      
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Blacklist entry deleted successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
      getData();
      handleDeleteClose();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        position: "center",
        text: "Something went wrong!",
        footer: '<a href="#" onClick="location.reload()">Try reloading the page?</a>',
      });
      console.error("Error deleting data:", err);
    }
  };

  const handleDeleteClose = () => {
    setOpenDelete(false);
    setDeleteId(null);
  };

  const handleDeleteOpen = (id) => {
    setDeleteId(id);
    setOpenDelete(true);
  };

  const handleEdit = (employee) => {
    setEditEmployee(employee.id);
    Object.keys(employee).forEach((key) => setValue(key, employee[key]));
    setIsModalOpen(true);
  };

  const handleAddEmployee = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditEmployee(null);
    reset();
  };

  const handleEmployeeSelect = (selectedId) => {
    console.log("Selected Employee ID:", selectedId);
  
    const selectedEmployee = employeeList.find((emp) => emp.id === selectedId);
  
    if (!selectedEmployee) {
      console.warn("Employee not found in the list!");
      return;
    }
  
    //console.log(selectedEmployee, "selected employee");
  
    const { Employee } = selectedEmployee;
    const fullName = `${Employee.first_name} ${Employee.last_name}`;
  
    const employmentHistory = Employee.employment_history?.previous_jobs || [];
    const lastJob = employmentHistory.reduce((latest, job) => {
      if (!latest || new Date(job.start_date) > new Date(latest.start_date)) {
        return job;
      }
      return latest;
    }, null);
  
    const lastCompanyName = lastJob ? lastJob.company : "N/A";
    const lastPosition = lastJob ? lastJob.position : "N/A";
  
    // Ensure all values are set correctly
    setValue("employee_id", selectedEmployee.id || "");
    setValue("company_id", Employee.company_id || "");
    setValue("company_name", lastCompanyName);
    setValue("position", lastPosition);
    setValue("fullname", fullName);
    setValue("email", selectedEmployee.email || "");
    setValue("contact_number", Employee.phone_number || "");
  
    console.log("Updated form values");
  };
  

  const filteredEmployees = employees?.filter((emp) =>
    emp.fullname?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mx-auto bg-white p-6 rounded-3xl">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Employee Blacklist Management
      </h2>

      {isLoading ? ( // Show loading spinner if data is being fetched
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
          <CircularProgress />
        </Box>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_auto] gap-4 mb-4">
            <input
              type="text"
              placeholder="Search by name or ID..."
              className="w-full p-3 border rounded-lg shadow-md focus:ring-2 focus:ring-indigo-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button
              className="flex items-center justify-center bg-blue text-white px-4 py-2 rounded-lg shadow-md w-full sm:w-auto"
              onClick={handleAddEmployee}
              color="primary"
              variant="contained"
            >
              <FiPlus className="mr-2" /> Add Blacklist
            </Button>
          </div>

          {isModalOpen && (
            <BlacklistForm
              control={control}
              handleSubmit={handleSubmit}
              onSubmit={onSubmit}
              closeModal={closeModal}
              employeeList={employeeList}
              handleEmployeeSelect={handleEmployeeSelect}
              editEmployee={editEmployee}
              isSubmitting={isSubmitting}
            />
          )}

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
                Are you sure you want to delete this blacklist entry?
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
                  onClick={handleDelete}
                >
                  Delete
                </Button>
              </div>
            </Box>
          </Modal>

          <BlacklistTable
            filteredEmployees={filteredEmployees}
            handleEdit={handleEdit}
            handleDeleteOpen={handleDeleteOpen}
          />
        </>
      )}
    </div>
  );
};

export default BlacklistManagement;