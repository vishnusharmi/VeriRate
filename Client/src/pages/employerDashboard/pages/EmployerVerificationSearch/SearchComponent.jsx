import { Person, Email, Badge, Search } from "@mui/icons-material";

const SearchComponent = ({
  searchType,
  setSearchType,
  searchQuery,
  setSearchQuery,
}) => (
  <div className="bg-white rounded-lg border border-gray-200 p-5 mb-1">
    <div className="flex items-center gap-2 mb-2">
      <Search className="text-gray-500" />
      <h2 className="text-xl font-semibold">Advanced Search</h2>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
      <div className="md:col-span-3">
        <select
          className="w-full border border-gray-300 rounded-lg px-3 py-2"
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
        >
          <option value="name">Name</option>
          <option value="email">Email</option>
          <option value="employeeId">Employee ID</option>
        </select>
      </div>
      <div className="md:col-span-9">
        <div className="relative">
          {searchType === "name" && (
            <Person className="absolute left-3 top-2.5 text-gray-400" />
          )}
          {searchType === "email" && (
            <Email className="absolute left-3 top-2.5 text-gray-400" />
          )}
          {searchType === "employeeId" && (
            <Badge className="absolute left-3 top-2.5 text-gray-400" />
          )}
          <input
            type="text"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
            placeholder={`Search by ${searchType}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
    </div>
  </div>
);

export default SearchComponent;
