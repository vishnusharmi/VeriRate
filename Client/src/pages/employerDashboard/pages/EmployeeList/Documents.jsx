import { AiOutlineCloudUpload } from "react-icons/ai";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import PropTypes from "prop-types";

const Documents = ({
  isDragging,
  handleDragOver,
  handleDragLeave,
  handleDrop,
  handleFileChange,
  files,
  handleEdit,
  handleFileDelete,
}) => {
  return (
    <div className="mt-6 bg-white p-4 rounded-lg shadow-lg w-[90%] mx-auto">
      <h2 className="text-xl font-bold mb-4">Employee Documents</h2>
      <div
        className={`p-8 border-2 border-dashed rounded-lg mb-6 text-center ${
          isDragging ? "bg-blue-50 border-blue-400" : "border-gray-300"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <AiOutlineCloudUpload className="mx-auto text-4xl text-gray-400 mb-2" />
        <p className="mb-2">Drag and drop files here</p>
        <p className="text-sm text-gray-500 mb-4">
          Support for certifications, ID proofs, and other employee documents
        </p>
        <div>
          <label className="px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600">
            Browse Files
            <input
              type="file"
              multiple
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left">Document Name</th>
              <th className="py-3 px-4 text-left">Type</th>
              <th className="py-3 px-4 text-left">Employee</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {files.map((file) => (
              <tr key={file.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">{file.name}</td>
                <td className="py-3 px-4">{file.type}</td>
                <td className="py-3 px-4">{file.employee}</td>
                <td className="py-3 px-4 text-center">
                  <button
                    className="p-1 mx-1 border rounded bg-gray-200"
                    onClick={() => handleEdit(file)}
                  >
                    <FaRegEdit />
                  </button>
                  <button
                    className="p-1 mx-1 border rounded bg-red-500 text-white"
                    onClick={() => handleFileDelete(file.id)}
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

Documents.propTypes = {
  isDragging: PropTypes.bool.isRequired,
  handleDragOver: PropTypes.func.isRequired,
  handleDragLeave: PropTypes.func.isRequired,
  handleDrop: PropTypes.func.isRequired,
  handleFileChange: PropTypes.func.isRequired,
  files: PropTypes.array.isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleFileDelete: PropTypes.func.isRequired,
};

export default Documents;
