import { CheckCircle, Star, Business, Badge } from "@mui/icons-material";

const CardsComponent = ({ filteredEmploymentHistory }) => (
  <div className="bg-white rounded-lg shadow  ">
    <div className="p-3">
      {filteredEmploymentHistory.length === 0 ? (
        <p className="text-gray-500">No results found</p>
      ) : (
        <div className="space-y-4">
          {filteredEmploymentHistory.map((employment, index) => (
            <div
              key={index}
              className="border border-gray-200 shadow-[inset_0px_-20px_26px_-28px_rgba(0,0,0,0.35),inset_0px_20px_26px_-28px_rgba(0,0,0,0.35)] rounded-lg p-4"
            >
              <div className="grid gap-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold">{employment.name}</h3>
                    <span className="px-2 py-1 bg-gray-100 rounded-full text-sm flex items-center gap-1">
                      <Badge className="w-4 h-4" />
                      {employment.employeeId}
                    </span>
                  </div>
                  <p className="text-gray-600">{employment.email}</p>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex gap-2">
                    <Business className="text-gray-400 w-5 h-5" />
                    <div>
                      <p className="font-medium">{employment.company}</p>
                      <p className="text-gray-600">
                        {employment.position} • {employment.period}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {employment.isVerified && (
                      <span className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded-full text-sm">
                        <CheckCircle className="w-4 h-4" />
                        Verified
                      </span>
                    )}
                    <span className="flex items-center gap-1 text-yellow-600 bg-yellow-50 px-2 py-1 rounded-full text-sm">
                      <Star className="w-4 h-4" />
                      Rating: {employment.rating}
                    </span>
                  </div>
                </div>
                {employment.crossReference.length > 0 && (
                  <>
                    <div className="border-t border-gray-200 my-2"></div>
                    <p className="text-gray-600">
                      Cross-referenced with:{" "}
                      {employment.crossReference.join(", ")}
                    </p>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);

export default CardsComponent;
