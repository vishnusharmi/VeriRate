import { useState } from "react";
import Dashboard from "./DashboardComponent";
import FilterButtons from "./FilterButtonsComponent";
import SearchComponent from "./SearchComponent";
import Tabs from "./TabsComponent";

import CardsComponent from "./CardsComponent";

const EmploymentVerificationSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("name");
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeTab, setActiveTab] = useState(0);

  const filters = ["All", "Verified", "Pending", "High-rated"];

  // Mock data for analytics
  const analyticsData = {
    totalVerifications: 1247,
    averageRating: 4.2,
    verificationRate: 85,
    crossReferenceRate: 92,
  };

  const employmentHistory = [
    {
      employeeId: "EMP001",
      email: "john.smith@email.com",
      name: "John Smith",
      company: "Tech Solutions Inc",
      position: "Senior Developer",
      period: "2020-2023",
      isVerified: true,
      rating: 4.5,
      crossReference: ["Digital Innovations", "Creative Minds"],
    },
    {
      employeeId: "EMP002",
      email: "sarah.jones@email.com",
      name: "Sarah Jones",
      company: "Digital Innovations",
      position: "Developer",
      period: "2018-2020",
      isVerified: true,
      rating: 4.2,
      crossReference: ["Tech Solutions Inc"],
    },
    {
      employeeId: "EMP003",
      email: "mike.brown@email.com",
      name: "Mike Brown",
      company: "Creative Minds",
      position: "Junior Developer",
      period: "2016-2018",
      isVerified: false,
      rating: 3.8,
      crossReference: [],
    },
    {
      employeeId: "EMP004",
      email: "lisa.wilson@email.com",
      name: "Lisa Wilson",
      company: "Innovative Labs",
      position: "Software Engineer",
      period: "2021-2023",
      isVerified: true,
      rating: 4.9,
      crossReference: ["Tech Solutions Inc", "Digital Innovations"],
    },
  ];

  const filteredEmploymentHistory = employmentHistory.filter((employment) => {
    const searchField =
      searchType === "name"
        ? employment.name
        : searchType === "email"
        ? employment.email
        : employment.employeeId;

    const isSearchMatch = searchField
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const isFilterMatch =
      activeFilter === "All" ||
      (activeFilter === "Verified" && employment.isVerified) ||
      (activeFilter === "Pending" && !employment.isVerified) ||
      (activeFilter === "High-rated" && employment.rating >= 4.5);

    return isSearchMatch && isFilterMatch;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-4 ">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">
          Employment Verification System
        </h1>

        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {activeTab === 0 ? (
          <>
            <SearchComponent
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              searchType={searchType}
              setSearchType={setSearchType}
            />

            <FilterButtons
              filters={filters}
              activeFilter={activeFilter}
              setActiveFilter={setActiveFilter}
            />
            <CardsComponent
              filteredEmploymentHistory={filteredEmploymentHistory}
            />
          </>
        ) : (
          <Dashboard analyticsData={analyticsData} />
        )}
      </div>
    </div>
  );
};

export default EmploymentVerificationSearch;
