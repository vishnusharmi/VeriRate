import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

const Employer = () => {
  const [employers, setEmployers] = useState([
    { id: 1, name: "John Doe", email: "john.doe@example.com" },
    { id: 2, name: "Jane Smith", email: "jane.smith@example.com" },
    { id: 3, name: "Alice Johnson", email: "alice.johnson@example.com" },
    { id: 4, name: "Bob Brown", email: "bob.brown@example.com" },
    { id: 5, name: "Charlie Davis", email: "charlie.davis@example.com" },
    { id: 6, name: "Diana Evans", email: "diana.evans@example.com" },
    { id: 7, name: "Evan Foster", email: "evan.foster@example.com" },
    { id: 8, name: "Fiona Green", email: "fiona.green@example.com" },
    { id: 9, name: "George Harris", email: "george.harris@example.com" },
    { id: 10, name: "Hannah Irving", email: "hannah.irving@example.com" },
    { id: 11, name: "Ian Johnson", email: "ian.johnson@example.com" },
    { id: 12, name: "Jackie King", email: "jackie.king@example.com" },
  ]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentEmployer, setCurrentEmployer] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [deleteEmployerId, setDeleteEmployerId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const employersPerPage = 10;

  const showModal = (employer = null) => {
    setCurrentEmployer(employer);
    setIsEditMode(!!employer);
    setFormData(
      employer
        ? { name: employer.name, email: employer.email }
        : { name: "", email: "" }
    );
    setIsModalVisible(true);
  };

  const handleOk = () => {
    if (isEditMode) {
      setEmployers(
        employers.map((emp) =>
          emp.id === currentEmployer.id ? { ...formData, id: emp.id } : emp
        )
      );
    } else {
      setEmployers([...employers, { ...formData, id: Date.now() }]);
    }
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleDeleteClick = (employerId) => {
    setDeleteEmployerId(employerId);
  };

  const confirmDelete = () => {
    setEmployers(employers.filter((emp) => emp.id !== deleteEmployerId));
    setDeleteEmployerId(null);
  };

  const indexOfLastEmployer = currentPage * employersPerPage;
  const indexOfFirstEmployer = indexOfLastEmployer - employersPerPage;
  const currentEmployers = employers.slice(
    indexOfFirstEmployer,
    indexOfLastEmployer
  );

  const nextPage = () => {
    if (currentPage < Math.ceil(employers.length / employersPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="p-5 bg-gradient-to-br from-white to-gray-100 text-gray-900 h-full flex flex-col flex-1 items-center">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-gradient-to-r from-[#0a3469] to-[#1b5dad] text-white px-8 py-4 rounded-lg shadow-xl text-lg font-semibold tracking-wide hover:from-blue-600 hover:to-blue-500 transition-all duration-300"
        onClick={() => showModal()}
      >
        + Add Employer
      </motion.button>

      <div className="w-full mt-10">
        <div className="overflow-auto max-h-96">
          <table className="w-full shadow-lg rounded-lg overflow-hidden bg-white">
            <thead>
              <tr className="bg-gradient-to-r from-[#1b5dad] to-[#0a3469] text-white text-lg">
                <th className="py-4 px-6 text-left">Name</th>
                <th className="py-4 px-6 text-left">Email</th>
                <th className="py-4 px-6 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentEmployers.map((employer) => (
                <tr
                  key={employer.id}
                  className="border-b border-gray-300 hover:bg-gray-200 transition-all duration-300"
                >
                  <td className="py-4 px-6">{employer.name}</td>
                  <td className="py-4 px-6">{employer.email}</td>
                  <td className="py-4 px-6 flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      className="text-yellow-500 hover:text-gray-600"
                      onClick={() => showModal(employer)}
                    >
                      <EditOutlinedIcon />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      className="text-red-500 hover:text-gray-600"
                      onClick={() => handleDeleteClick(employer.id)}
                    >
                      <DeleteOutlineOutlinedIcon />
                    </motion.button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between mt-4 mb-4">
          <button
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg shadow-md hover:bg-gray-400 transition-all duration-300"
            onClick={prevPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg shadow-md hover:bg-gray-400 transition-all duration-300"
            onClick={nextPage}
            disabled={
              currentPage === Math.ceil(employers.length / employersPerPage)
            }
          >
            Next
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isModalVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-xs shadow-[0_4px_10px_10px_rgba(0,0,0,0.5)]"
          >
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              className="bg-white p-8 rounded-lg shadow-2xl w-1/3 text-center text-gray-900"
            >
              <h2 className="text-2xl font-semibold mb-4">
                {isEditMode ? "Edit Employer" : "Add Employer"}
              </h2>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Enter Name"
                className="w-full px-4 py-2 border rounded-lg mb-3"
              />
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="Enter Email"
                className="w-full px-4 py-2 border rounded-lg mb-4"
              />
              <div className="flex justify-center gap-4">
                <motion.button
                  className="bg-green-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-600 transition-all duration-300 cursor-pointer"
                  onClick={handleOk}
                >
                  {isEditMode ? "Update" : "Add"}
                </motion.button>
                <motion.button
                  className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg shadow-md hover:bg-gray-400 transition-all duration-300 cursor-pointer"
                  onClick={handleCancel}
                >
                  Cancel
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {deleteEmployerId !== null && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-xs shadow-[0_4px_10px_10px_rgba(0,0,0,0.5)]pre"
          >
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              className="bg-white p-8 rounded-lg shadow-2xl w-1/3 text-center text-gray-900"
            >
              <h2 className="text-2xl font-semibold mb-4">Confirm Deletion</h2>
              <p className="text-gray-700 mb-6">
                Are you sure you want to delete this employer?
              </p>
              <div className="flex justify-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="bg-red-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-red-600 transition-all duration-300 cursor-pointer"
                  onClick={confirmDelete}
                >
                  Delete
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg shadow-md hover:bg-gray-400 transition-all duration-300 cursor-pointer"
                  onClick={() => setDeleteEmployerId(null)}
                >
                  Cancel
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Employer;
