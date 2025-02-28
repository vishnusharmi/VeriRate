import {
  CheckCircle,
  Star,
  Business,
  Badge,
  VerifiedUser,
} from "@mui/icons-material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
const CardsComponent = ({ filteredEmploymentHistory, onVerifyClick }) => {
  // console.log(filteredEmploymentHistory);
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-3">
        {filteredEmploymentHistory.length === 0 ? (
          <p className="text-gray-500">No results found</p>
        ) : (
          <div className="space-y-4">
            {filteredEmploymentHistory.map((employment, index) => (
              <div
                key={index}
                className="border border-gray-200 shadow-[inset_0px_-20px_26px_-28px_rgba(0,0,0,0.35),inset_0px_20px_26px_-28px_rgba(0,0,0,0.35)] rounded-lg p-4 hover:shadow-lg transition-shadow"
              >
                <div className="grid gap-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold">
                        {/* {`${employment.first_name} ${employment.last_name}`} */}
                        {employment.name || "NA"}
                      </h3>
                      <span className="px-2 py-1 bg-gray-100 rounded-full text-sm flex items-center gap-1">
                        <Badge className="w-4 h-4" />
                        {employment.employeeId || "NA"}
                      </span>
                    </div>
                    <div className="flex justify-center items-center gap-1">
                      <MailOutlineIcon />
                      <p className="text-gray-600 p-2 text-base">
                        {employment?.email || "No email provided"}
                      </p>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex gap-2">
                      <Business className="text-gray-400 w-5 h-5" />
                      <div>
                        <p className="font-medium">
                          {employment.company || "NA"}
                        </p>
                        <p className="text-gray-600">
                          {employment.position || "NA"} ,{" "}
                          {employment.startDate || "NA"} -{" "}
                          {employment.endDate || "NA"}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2 items-center justify-between">
                      <div className="flex gap-2">
                        {employment.is_verified === "Verified" ? (
                          <span className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded-full text-sm">
                            <CheckCircle className="w-4 h-4" />
                            Verified
                          </span>
                        ) : (
                          <button
                            onClick={() => onVerifyClick(employment)}
                            className="flex items-center gap-1 text-blue-600 bg-blue-50 px-3 py-1 rounded-full text-sm hover:bg-blue-100 transition-colors"
                          >
                            <VerifiedUser className="w-4 h-4" />
                            Verify Now
                          </button>
                        )}
                        {/* <span
                          className="flex items-center gap-1 text-yellow-600 bg-yellow-50 px-2 py-1 rounded-full text-sm"
                          title={
                            employment.rating >= 4.5
                              ? "High-rated employee"
                              : ""
                          }
                        >
                          <Star className="w-4 h-4" />
                          Rating: {employment.rating}
                        </span> */}
                      </div>
                    </div>
                  </div>
                  {employment.totalCompaniesWorked.length > 0 ? (
                    <>
                      <div className="border-t border-gray-200 my-2"></div>
                      <p className="text-gray-600">
                        {/* Cross-referenced with:{" "}
                        {employment.crossReference.join(", ")} */}
                        Previously Worked in :{" "}
                        {employment.totalCompaniesWorked.join(" , ")}
                      </p>
                    </>
                  ) : (
                    <p className="text-gray-500">
                      No cross-references available
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CardsComponent;
