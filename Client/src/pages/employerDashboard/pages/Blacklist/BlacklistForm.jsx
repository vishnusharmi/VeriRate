  import React from "react";
  import { Controller, useWatch } from "react-hook-form";
  import {
    TextField,
    Select,
    MenuItem,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Grid,
    InputLabel,
    FormControl,
    CircularProgress,
  } from "@mui/material";
  import dayjs from "dayjs";
  import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
  import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
  import { DatePicker } from "@mui/x-date-pickers/DatePicker";

  const BlacklistForm = ({
    control,
    handleSubmit,
    onSubmit,
    closeModal,
    employeeList,
    handleEmployeeSelect,
    editEmployee,
    isSubmitting,
  }) => { 
    const startDate = useWatch({control,name:'start_date'})
    return (
      <Dialog open onClose={closeModal} maxWidth="md" fullWidth>
        <DialogTitle
          sx={{
            fontWeight: "bold",
            backgroundColor: "primary.main",
            color: "white",
          }}
        >
          {editEmployee ? "Edit Blacklist Entry" : "Add Blacklist Entry"}
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3} sx={{ mt: 2 }}>
              {/* Employee Selection */}
              <Grid item xs={12} md={12}>
                <FormControl fullWidth>
                  <Controller
                    name="employee_id"
                    control={control}
                    defaultValue=""
                    render={({ field }) => {
                      console.log("Current Employee ID:", field.value); // Debugging
                      return (
                        <Select
                          {...field}
                          labelId="employee-select-label"
                          label="Employee"
                          onChange={(e) => {
                            const selectedValue = Number(e.target.value);
                            field.onChange(selectedValue); // Update the form state
                            handleEmployeeSelect(selectedValue); // Pass only the selected ID
                           }}
                          value={field.value || ""} // Ensure the Select is controlled
                          displayEmpty
                          size="small"
                        >
                          <MenuItem value="" disabled>
                            Select Employee
                          </MenuItem>
                          {employeeList.map((emp) => (
                            <MenuItem key={emp.id} value={emp.id}>
                              {emp.Employee.first_name} {emp.Employee.last_name}
                            </MenuItem>
                          ))}
                        </Select>
                      );
                    }}
                  />
                </FormControl>
            </Grid>

              {/* Full Name */}
              <Grid item xs={12} md={4}>
                <Controller
                  name="fullname"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Full Name"
                      variant="outlined"
                      disabled
                    />
                  )}
                />
              </Grid>

              {/* Email */}
              <Grid item xs={12} md={4}>
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Email"
                      variant="outlined"
                      disabled
                    />
                  )}
                />
              </Grid>

              {/* Position */}
              <Grid item xs={12} md={4}>
                <Controller
                  name="position"
                  control={control}
                  defaultValue=""
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Position"
                      variant="outlined"
                      error={!!error}
                      helperText={error ? error.message : null} 
                      disabled
                    />
                  )}
                />
              </Grid>

              {/* Company Name */}
              <Grid item xs={12} md={4}>
                <Controller
                  name="company_name"
                  control={control}
                  defaultValue=""
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Company Name"
                      variant="outlined"
                      error={!!error}
                      helperText={error ? error.message : null} 
                      disabled
                    />
                  )}
                />
              </Grid>

              {/* Start Date */}
              <Grid item xs={12} md={4}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Controller
                    name="start_date"
                    control={control}
                    defaultValue=""
                    render={({ field, fieldState: { error } }) => (
                      <DatePicker
                        {...field}
                        label="Start Date"
                        value={field.value ? dayjs(field.value) : null}
                        onChange={(date) =>
                          field.onChange(date ? date.toISOString() : null)
                        } 
                        minDate={dayjs()}
                        slots={(params) => (
                          <TextField
                            {...params}
                            fullWidth
                            variant="outlined"
                            error={!!error}
                            helperText={error ? error.message : null}
                          />
                        )}
                      />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
              

              {/* End Date */}
              <Grid item xs={12} md={4}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Controller
                    name="end_date"
                    control={control}
                    defaultValue=""
                    render={({ field, fieldState: { error } }) => (
                      <DatePicker
                        {...field}
                        label="End Date"
                        value={field.value ? dayjs(field.value) : null}
                        onChange={(date) =>
                          field.onChange(date ? date.toISOString() : null)
                        }
                        minDate={startDate ? dayjs(startDate).add(1, "day") : dayjs().add(1, "day")}
                        slots={(params) => (
                          <TextField
                            {...params}
                            fullWidth
                            variant="outlined"
                            error={!!error}
                            helperText={error ? error.message : null}
                          />
                        )}
                      />
                    )}
                  />
                </LocalizationProvider>
              </Grid>

              {/* Status */}
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel id="status-select-label">Status</InputLabel>
                  <Controller
                    name="status"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <Select
                        {...field}
                        labelId="status-select-label"
                        label="Status"
                      >
                        <MenuItem value="Temporary">Temporary</MenuItem>
                        <MenuItem value="Permanent">Permanent</MenuItem>
                      </Select>
                    )}
                  />
                </FormControl>
              </Grid>

              {/* Reason Code */}
              <Grid item xs={12} md={6}>
                <Controller
                  name="reason_code"
                  control={control}
                  defaultValue=""
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Reason Code"
                      variant="outlined"
                      error={!!error}
                      helperText={error ? error.message : null}
                    />
                  )}
                />
              </Grid>


              <Grid item xs={12} md={6}>
                <Controller
                  name="report_by"
                  control={control}
                  defaultValue=""
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Report By"
                      variant="outlined"
                      error={!!error}
                      helperText={error ? error.message : null}
                    />
                  )}
                />
              </Grid>

              {/* Reason for Blacklist */}
              <Grid item xs={12}>
                <Controller
                  name="reason_for_blacklist"
                  control={control}
                  defaultValue=""
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Reason for Blacklist"
                      variant="outlined"
                      error={!!error}
                      helperText={error ? error.message : null}
                      multiline
                      rows={3}
                    />
                  )}
                />
              </Grid>




            </Grid>

            <DialogActions>
              <Button onClick={closeModal} color="secondary">
                Cancel
              </Button>
              <Button
                type="submit"
                color="primary"
                variant="contained"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <CircularProgress size={24} />
                ) : editEmployee ? (
                  "Update"
                ) : (
                  "Save"
                )}
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    );
  };

  export default BlacklistForm;