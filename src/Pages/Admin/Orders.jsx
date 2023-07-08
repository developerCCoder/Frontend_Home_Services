import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  TableContainer,
  Link,
  Button,
  TextField,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Select,
  MenuItem,
  Box,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";

const Orders = () => {
  const [data, setData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredServices, setFilteredServices] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get("https://lazy-ruby-shawl.cyclic.app/orders")
      .then((response) => {
        setData(response.data);
        setFilteredServices(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleStatusChange = (event, id) => {
    const updatedData = data.map((item) => {
      if (item.id === id) {
        return { ...item, status: event.target.value };
      }
      return item;
    });
    setData(updatedData);
    console.log(event.target.value);
    // Send an API request to update the status
    axios
      .patch(`https://lazy-ruby-shawl.cyclic.app/orders/${id}`, {
        status: event.target.value,
      })
      .then((response) => {
        console.log("Status updated successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error updating status:", error);
      });

    // Update the JSON file
  };

  useEffect(() => {
    let filteredData = data;

    // Filter by search input
    if (searchInput) {
      filteredData = filteredData.filter(
        (service) =>
          service.user.firstName
            .toLowerCase()
            .includes(searchInput.toLowerCase()) ||
          service.user.mobileNumber.includes(searchInput)
      );
    }

    setFilteredServices(filteredData);
  }, [data, searchInput]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "#FDDF96";
      case "Processing":
        return "#FFB74D";
      case "Completed":
        return "#81C784";
      case "Rejected":
        return "#E57373";
      default:
        return "#FDDF96";
    }
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  return (
    <Box pt={"100px"}>
      <Box
        columnGap={"30px"}
        maxWidth={{ xs: "95%", md: "85%" }}
        mt={"20px"}
        margin={"auto"}
      >
        <Link href="/admin" color="inherit" underline="none">
          {" "}
          <Button
            sx={{
              display: "block",

              width: "10rem",
              mb: "30px",
              color: "#343f52",
              borderRadius: "0.625rem",
              padding: "10px",
              fontSize: "1rem",
              textTransform: "capitalize",
              fontWeight: "500",
              boxSizing: "border-box",
              background: "#C1FF72",
              transition: "all 300ms ease 0s",
              ":hover": { background: "#9acc5b" },
            }}
            size={"large"}
            variant="contained"
          >
            Admin page
          </Button>{" "}
        </Link>

        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          marginBottom="1rem"
        >
          <TextField
            sx={{ bgcolor: "#fff" }}
            label="Search"
            placeholder="Search service"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            margin="dense"
          />
        </Box>
      </Box>

      <Box maxWidth={{ xs: "95%", md: "85%" }} margin={"auto"} pb={"6rem"}>
       

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>ID</StyledTableCell>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell>Location</StyledTableCell>
                <StyledTableCell>Mobile</StyledTableCell>
                <StyledTableCell>Service Requested</StyledTableCell>
                <StyledTableCell>No. Of Mades</StyledTableCell>
                <StyledTableCell>No.Of Hours</StyledTableCell>
                <StyledTableCell>Date of Service</StyledTableCell>
                <StyledTableCell>Status</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredServices.map((row) => (
                <StyledTableRow key={row.user}>
                  <StyledTableCell component="th" scope="row">
                    {row.id}
                  </StyledTableCell>
                  {console.log(row)}
                  <StyledTableCell>{row.user.first_name}</StyledTableCell>
                  <StyledTableCell>{row.user.address}</StyledTableCell>
                  <StyledTableCell>{row.user.mobile_number}</StyledTableCell>
                  <StyledTableCell>{row.serviceName}</StyledTableCell>
                  <StyledTableCell>{row.maid}</StyledTableCell>
                  <StyledTableCell>{row.hours}</StyledTableCell>
                  <StyledTableCell>{row.selectedDateTime}</StyledTableCell>
                  <StyledTableCell>
                    <select
                      value={row.status}
                      onChange={(event) => handleStatusChange(event, row.id)}
                      width={"50px"}
                      style={{
                        background: "transparent",
                        padding: "10px 20px",
                        cursor: "pointer",
                        lineHeight: "4",
                        color: "black",
                        borderRadius: "30px",
                        backgroundColor: getStatusColor(row.status),
                      }}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Completed">Completed</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default Orders;
