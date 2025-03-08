import { useState } from "react";
import {
  Notifications as BellIcon,
  CalendarToday as CalendarIcon,
  FilterList as FilterIcon,
  ExpandMore as ChevronDownIcon,
} from "@mui/icons-material";

const ActivityFilter = ({
  activityFilter,
  setActivityFilter,
  periodFilter,
  setPeriodFilter,
}) => {
  const [showActivityDropdown, setShowActivityDropdown] = useState(false);
  const [showPeriodDropdown, setShowPeriodDropdown] = useState(false);

  const activityOptions = [
    "All Activities",
    "Employee Management",
    "Rating Management",
    "Verifications",
    "Blacklist Management",
    "Document Updates",
    "Company Management",
    "User Management",
    "Dispute Management",
  ];

  const periodOptions = ["All Time", "Today", "This Week", "This Month"];

  return (
    <div className="py-2 relative">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <BellIcon className="mr-2 text-gray-700" style={{ fontSize: 20 }} />
          <h3 className="text-lg font-bold">Recent Activity</h3>
        </div>

        <div className="flex items-center space-x-4">
          {/* Period Filter */}
          <div className="relative">
            <div
              className="flex items-center justify-between border rounded-md py-1 px-3 text-gray-700 cursor-pointer bg-white hover:bg-gray-50 w-auto"
              onClick={() => setShowPeriodDropdown(!showPeriodDropdown)}
            >
              <CalendarIcon
                className="text-gray-500 mr-2"
                style={{ fontSize: 16 }}
              />
              <span>{periodFilter}</span>
              <ChevronDownIcon
                className="text-gray-500"
                style={{ fontSize: 16 }}
              />
            </div>

            {showPeriodDropdown && (
              <ul className="absolute z-10 bg-white border mt-1 rounded-md shadow-md w-full">
                {periodOptions.map((option) => (
                  <li
                    key={option}
                    className="px-3 py-2 cursor-pointer hover:bg-gray-100 w-full"
                    onClick={() => {
                      setPeriodFilter(option);
                      setShowPeriodDropdown(false);
                    }}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Activity Type Filter */}
          <div className="relative">
            <div
              className="flex items-center justify-between border rounded-md py-1 px-3 text-gray-700 cursor-pointer bg-white hover:bg-gray-50 "
              onClick={() => setShowActivityDropdown(!showActivityDropdown)}
            >
              <FilterIcon
                className="text-gray-500 mr-2"
                style={{ fontSize: 16 }}
              />
              <span>{activityFilter}</span>
              <ChevronDownIcon
                className="text-gray-500"
                style={{ fontSize: 16 }}
              />
            </div>

            {showActivityDropdown && (
              <ul className="absolute z-10 bg-white border mt-1 rounded-md shadow-md min-w-max">
                {activityOptions.map((option) => (
                  <li
                    key={option}
                    className="px-3 py-2 cursor-pointer hover:bg-gray-100 whitespace-nowrap"
                    onClick={() => {
                      setActivityFilter(option);
                      setShowActivityDropdown(false);
                    }}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityFilter;
