// import {
//   CheckCircle,
//   VerifiedUser,
//   Business,
//   Badge,
// } from "@mui/icons-material";
// import MailOutlineIcon from "@mui/icons-material/MailOutline";

// const CardsComponent = ({ filteredEmploymentHistory, onVerifyClick }) => {
//   return (
//     <div>
//       <div className="bg-white rounded-lg shadow overflow-y-auto h-[443px]">
//         <div className="p-3">
//           {filteredEmploymentHistory.length === 0 ? (
//             <p className="text-gray-500">No results found</p>
//           ) : (
//             <div className="space-y-4">
//               {filteredEmploymentHistory.map((employee, index) => (
//                 <div
//                   key={index}
//                   className="border border-gray-200 shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow"
//                 >
//                   <div className="grid gap-4">
//                     {/* Employee Name & Email */}
//                     <div className="flex justify-between items-start">
//                       <div className="flex items-center gap-2">
//                         <h3 className="text-lg font-semibold">
//                           {employee.name || "NA"}
//                         </h3>
//                         <span className="px-2 py-1 bg-gray-100 rounded-full text-sm flex items-center gap-1">
//                           <Badge className="w-4 h-4" />
//                           {employee.id || "NA"}
//                         </span>
//                       </div>
//                       <div className="flex justify-center items-center gap-1">
//                         <MailOutlineIcon />
//                         <p className="text-gray-600 p-1 text-base">
//                           {employee.email || "No email provided"}
//                         </p>
//                       </div>
//                     </div>

//                     {/* Position, Salary, Qualification */}
//                     <div className="grid md:grid-cols-2 gap-4">
//                       <div className="flex gap-2">
//                         <Business className="text-gray-400 w-5 h-6" />
//                         <div>
//                           <p className="font-medium">
//                             {employee.position || "NA"}
//                           </p>
//                           <p className="text-gray-600">
//                             Salary: ${employee.salary || "NA"}
//                           </p>
//                           <p className="text-gray-600">
//                             Qualification: {employee.qualification || "NA"}
//                           </p>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Address & Employment History */}
//                     <p className="text-gray-600 ">
//                       <strong>Address:</strong> {employee.address || "NA"}
//                     </p>
//                     <div className="text-gray-600">
//                       <strong>Employment History:</strong>
//                       {employee.employment_history.length > 0 ? (
//                         employee.employment_history.map((history, idx) => (
//                           <div key={idx} className="ml-4">
//                             <p>Company: {history.company}</p>
//                             <p>Job Title: {history.jobTitle}</p>
//                             <p>Start Date: {history.startDate}</p>
//                             <p>End Date: {history.endDate}</p>
//                             <p>Description: {history.description}</p>
//                           </div>
//                         ))
//                       ) : (
//                         <p>NA</p>
//                       )}
//                     </div>

//                     {/* Verification Status */}
//                     <div className="flex gap-2 items-center justify-between">
//                       {employee.is_verified === "Verified" ? (
//                         <span className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded-full text-sm">
//                           <CheckCircle className="w-4 h-4" />
//                           Verified
//                         </span>
//                       ) : (
//                         <button
//                           onClick={() => onVerifyClick(employee)}
//                           className="flex items-center gap-1 text-blue-600 bg-blue-50 px-3 py-1 rounded-full text-sm hover:bg-blue-100 transition-colors"
//                         >
//                           <VerifiedUser className="w-4 h-4" />
//                           Verify Now
//                         </button>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CardsComponent;

import {
  CheckCircle,
  VerifiedUser,
  Business,
  Badge,
} from "@mui/icons-material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

const CardsComponent = ({ filteredEmploymentHistory, onVerifyClick }) => {
  return (
    <div>
      <div className="bg-white rounded-lg shadow overflow-y-auto h-[443px]">
        <div className="p-3">
          {filteredEmploymentHistory.length === 0 ? (
            <p className="text-gray-500">No results found</p>
          ) : (
            <div className="space-y-4">
              {filteredEmploymentHistory.map((employee, index) => (
                <div
                  key={index}
                  className="border border-gray-200 shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow"
                >
                  <div className="grid gap-4">
                    {/* Employee Name & Email */}
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold">
                          {employee.name || "NA"}
                        </h3>
                        <span className="px-2 py-1 bg-gray-100 rounded-full text-sm flex items-center gap-1">
                          <Badge className="w-4 h-4" />
                          {employee.id || "NA"}
                        </span>
                      </div>
                      <div className="flex justify-center items-center gap-1">
                        <MailOutlineIcon />
                        <p className="text-gray-600 p-1 text-base">
                          {employee.email || "No email provided"}
                        </p>
                      </div>
                    </div>

                    {/* Position, Salary, Qualification */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="flex gap-2">
                        <Business className="text-gray-400 w-5 h-6" />
                        <div>
                          <p className="font-medium">
                            {employee.position || "NA"}
                          </p>
                          <p className="text-gray-600">
                            Salary: ${employee.salary || "NA"}
                          </p>
                          <p className="text-gray-600">
                            Qualification: {employee.qualification || "NA"}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Address & Employment History */}
                    <p className="text-gray-600 ">
                      <strong>Address:</strong> {employee.address || "NA"}
                    </p>
                    <div className="text-gray-600">
                      <strong>Employment History:</strong>
                      {Array.isArray(employee.employment_history) && employee.employment_history.length > 0 ? (
                        employee.employment_history.map((history, idx) => (
                          <div key={idx} className="ml-4">
                            {history.company && <p>Company: {history.company}</p>}
                            {history.jobTitle && <p>Job Title: {history.jobTitle}</p>}
                            {history.startDate && <p>Start Date: {history.startDate}</p>}
                            {history.endDate && <p>End Date: {history.endDate}</p>}
                            {history.description && <p>Description: {history.description}</p>}
                          </div>
                        ))
                      ) : (
                        <p>NA</p>
                      )}
                    </div>

                    {/* Verification Status */}
                    <div className="flex gap-2 items-center justify-between">
                      {employee.is_verified === "Verified" ? (
                        <span className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded-full text-sm">
                          <CheckCircle className="w-4 h-4" />
                          Verified
                        </span>
                      ) : (
                        <button
                          onClick={() => onVerifyClick(employee)}
                          className="flex items-center gap-1 text-blue-600 bg-blue-50 px-3 py-1 rounded-full text-sm hover:bg-blue-100 transition-colors"
                        >
                          <VerifiedUser className="w-4 h-4" />
                          Verify Now
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardsComponent;