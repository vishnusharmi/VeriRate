import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  IconButton,
  Chip,
  Typography,
  Tooltip,
  Tab,
} from "@mui/material";

// Styled components for table cells and rows
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: "bold",
  fontSize: "0.9rem",
  padding: "8px 16px", // Adjust padding for smaller cells
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.8rem",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  height: "40px", // Set a fixed height for table rows
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:hover": {
    backgroundColor: theme.palette.action.selected,
    transition: "background-color 0.3s ease",
  },
}));

const BlacklistTable = ({ filteredEmployees, handleEdit, handleDeleteOpen }) => {
  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Slice the filtered employees for pagination
  const paginatedEmployees = filteredEmployees.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper sx={{ mt: 4, boxShadow: 3, borderRadius: 2, overflow: "hidden" }}>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="blacklist table">
          <TableHead>
            <TableRow
              sx={{
                background: "linear-gradient(45deg, #3f51b5, rgb(99, 179, 244))",
                height: "50px", // Set a fixed height for the header
              }}
            >
              <StyledTableCell className="text-white">Full Name</StyledTableCell>
              <StyledTableCell className="text-white">Email</StyledTableCell>
              {/* <StyledTableCell className="text-white">Contact</StyledTableCell> */}
              <StyledTableCell className="text-white">Position</StyledTableCell>
              <StyledTableCell className="text-white">
                Company Name
              </StyledTableCell>
              <StyledTableCell className="text-white">
                Reason for Blacklist
              </StyledTableCell>

              <StyledTableCell className="text-white">Start Date</StyledTableCell>
              <StyledTableCell className="text-white">End Date</StyledTableCell>
              {/* <StyledTableCell className="text-white">
                Blacklist Date
              </StyledTableCell> */}
              <StyledTableCell className="text-white">Status</StyledTableCell>
              <StyledTableCell className="text-white">Actions</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedEmployees.length > 0 ? (
              paginatedEmployees.map((employee) => (
                <StyledTableRow key={employee.id}>
                  <TableCell sx={{ padding: "8px 16px" }}>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {employee.fullname}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ padding: "8px 16px" }}>
                    <Typography variant="body2">{employee.email}</Typography>
                  </TableCell>
                  {/* <TableCell sx={{ padding: "8px 16px" }}>
                    <Typography variant="body2">
                      {employee.contact_number}
                    </Typography>
                  </TableCell> */}
                  <TableCell sx={{ padding: "8px 16px" }}>
                    <Typography variant="body2">{employee.position}</Typography>
                  </TableCell>
                  <TableCell sx={{ padding: "8px 16px" }}>
                    <Typography variant="body2">
                      {employee.company_name}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ padding: "8px 16px" }}>
                    <Typography variant="body2">
                      {employee.reason_for_blacklist}
                    </Typography>
                  </TableCell> 

                    <TableCell sx={{ padding: "8px 16px" }}>
                    <Typography variant="body2">
                      {employee.start_date}
                    </Typography>
                  </TableCell> 
                  <TableCell sx={{ padding: "8px 16px" }}>
                    <Typography variant="body2">
                      {employee.end_date}
                    </Typography>
                  </TableCell>
                  

                  {/* <TableCell sx={{ padding: "8px 16px" }}>
                    <Typography variant="body2">
                      {employee.blackList_date
                        ? new Date(employee.blackList_date).toLocaleDateString()
                        : "N/A"}
                    </Typography>
                  </TableCell> */}
                  <TableCell sx={{ padding: "8px 16px" }}>
                    <Chip
                      label={employee.status}
                      sx={{
                        backgroundColor:
                          employee.status === "Temporary"
                            ? "warning.light"
                            : "success.light",
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "0.75rem",
                      }}
                    />
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ padding: "8px 16px", minWidth: 120 }}
                  >
                    <Tooltip title="Edit" arrow>
                      <IconButton
                        onClick={() => handleEdit(employee)}
                        sx={{
                          color: "primary.main",
                          "&:hover": { backgroundColor: "action.hover" },
                          transition: "background-color 0.3s ease",
                        }}
                      >
                        <FiEdit />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete" arrow>
                      <IconButton
                        onClick={() => handleDeleteOpen(employee.id)}
                        sx={{
                          color: "error.main",
                          "&:hover": { backgroundColor: "action.hover" },
                          transition: "background-color 0.3s ease",
                        }}
                      >
                        <FiTrash2 />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </StyledTableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={11} align="center" sx={{ py: 4 }}>
                  <Typography variant="body1" color="text.secondary">
                    No blacklisted employees found
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={filteredEmployees.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Paper>
  );
};

export default BlacklistTable;