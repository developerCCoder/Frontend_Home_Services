import React, { useContext,useState,useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Button,
  Divider,
  InputBase,
  Typography,
  Link,
  Alert,
  Snackbar,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

import { styled } from "@mui/material/styles";

import CreditCardIcon from "@mui/icons-material/CreditCard";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { FormContext, useFormContext } from "../Context/FormContext";

const Order = () => {
  // const {serviceName} = useContext(FormContext);
  // const {serviceName,dispatch} = useFormContext();
  // console.log(serviceName)
  const params = useParams();
  const searchQuery = params.name;
  const navigate = useNavigate();
  const [details,setDetails] = useState();
  const data = JSON.parse(localStorage.getItem("serviceRequested"));
  const [mode, setMode] = React.useState("Cash");

  const handleMode = (event, value) => {
    setMode(value);
  };

  const [open, setOpen] = React.useState(false);


 useEffect(() => {
   getData();
 }, []);

   const getData = () => {
     axios
       .get("https://lazy-ruby-shawl.cyclic.app/orders")
       .then((response) => {
         setDetails(response.data);
         
       })
       .catch((error) => {
         console.error("Error fetching data:", error);
       });
   };

  const handleClick = () => {
    setOpen(true);
    localStorage.removeItem("serviceRequested");

    axios
      .post("https://lazy-ruby-shawl.cyclic.app/orders", data)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    navigate("/");
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
    "& .MuiToggleButtonGroup-grouped": {
      margin: theme.spacing(2),
      border: "0",
      "&.Mui-disabled": {
        border: 0,
      },

      "&:not(first-of-type)": {
        borderRadius: theme.shape.borderRadius,
        height: "50px",
        border: "3px solid #FF914D ",
        borderRadius: "8px",
        backgroundColor: "#FF914D",
        color: "#fff",
      },
      "&.Mui-selected": {
        border: "4px solid #c1ff72",
      },
      "&:first-of-type": {
        borderRadius: "8px",
        marginLeft: "0px",
      },
      "&:not(:first-of-type)": {
        borderRadius: "8px",
        marginRight: "0px",
      },
    },
  }));

  return (
    <Box pt={"80px"}>
      <Divider />
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        py="8px"
        width={"90%"}
        margin={"auto"}
      >
        <Box color={"#305966"}>
          <Typography lineHeight={1.1} fontWeight={"500"}>
            {data.serviceName}
          </Typography>
          <Typography lineHeight={1.1}>
            {data.maids} Maid, {data.hours} Hours
          </Typography>
          <Typography lineHeight={1.2}>@SAR 35/Hour/Maid</Typography>
        </Box>
        <Box>
          <Typography
            lineHeight={1.1}
            variant="body1"
            color={"#305966"}
            fontWeight={"600"}
            textAlign={"right"}
          >
            SAR {data.totalAmount}.00
          </Typography>
        </Box>
      </Box>
      <Divider />

      <Box
        display={"flex"}
        justifyContent={"space-between"}
        pt="20px"
        pb={"10px"}
        width={"90%"}
        margin={"auto"}
      >
        <Box color={"#305966"}>
          <Typography lineHeight={1.1} fontWeight={"500"}>
            Subtotal
          </Typography>
        </Box>
        <Box>
          <Typography
            lineHeight={1.1}
            variant="body1"
            color={"#305966"}
            fontWeight={"600"}
            textAlign={"right"}
          >
            SAR {data.totalAmount}.00
          </Typography>
        </Box>
      </Box>

      <Divider variant="middle" />

      <Box
        display={"flex"}
        justifyContent={"space-between"}
        pt="20px"
        pb={"10px"}
        width={"90%"}
        margin={"auto"}
      >
        <Box color={"#305966"}>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Enter Promo Code Here"
          />
        </Box>
        <Box>
          <Button variant="contained">Submit</Button>
        </Box>
      </Box>

      <Divider variant="middle" />

      <Box
        display={"flex"}
        justifyContent={"space-between"}
        pt="20px"
        pb={"10px"}
        width={"90%"}
        margin={"auto"}
      >
        <Box color={"#305966"}>
          <Typography lineHeight={1.1} fontWeight={"500"}>
            VAT
          </Typography>
          <Typography lineHeight={1.1}>0%</Typography>
        </Box>
        <Box>
          <Typography
            lineHeight={1.1}
            variant="body1"
            color={"#305966"}
            textAlign={"right"}
          >
            SAR 00.
          </Typography>
        </Box>
      </Box>

      <Divider variant="middle" />

      <Box
        display={"flex"}
        justifyContent={"space-between"}
        pt="10px"
        pb={"20px"}
        width={"90%"}
        margin={"auto"}
      >
        <Box color={"#305966"}>
          <Typography lineHeight={1.1} fontWeight={"900"} fontSize={"16px"}>
            Total
          </Typography>
        </Box>
        <Box>
          <Typography
            lineHeight={1.1}
            variant="body1"
            color={"#FF914D"}
            FontWeight={"900"}
            fontSize={"16px"}
            textAlign={"right"}
          >
            SAR {data.totalAmount}.00
          </Typography>
        </Box>
      </Box>

      <Divider />

      <Box display={"flex"} alignItems={"center"} width={"90%"} margin={"auto"}>
        <Box color={"#305966"}>
          <Typography
            boxSizing={"border-box"}
            lineHeight={1.1}
            fontWeight={"500"}
            fontSize={"16px"}
          >
            Pay By
          </Typography>
        </Box>
        <Box>
          <Box mx={"15px"}>
            <StyledToggleButtonGroup
              fullWidth
              size="large"
              value={mode}
              exclusive
              onChange={handleMode}
              aria-label="select mades"
            >
              <ToggleButton value="card" aria-label="card">
                <CreditCardIcon sx={{ fontSize: "28px", marginRight: "5px" }} />{" "}
                Card
              </ToggleButton>
              <ToggleButton value="cash" aria-label="cash">
                <FaRegMoneyBillAlt
                  style={{ fontSize: "28px", marginRight: "5px" }}
                />{" "}
                Cash
              </ToggleButton>
            </StyledToggleButtonGroup>
          </Box>
        </Box>
      </Box>
      <Box width={"90%"} margin={"auto"} pb={"8px"}>
        <Link href={"/addcard"}>
          {" "}
          <Box
            sx={{ cursor: "pointer" }}
            ml={"20px"}
            color={"#fff"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            width={"45px"}
            height={"45px"}
            bgcolor={"#FF914D"}
            borderRadius={"8px"}
          >
            <AddCircleIcon sx={{ fontSize: "35px" }} />
          </Box>{" "}
        </Link>
      </Box>

      <Divider />

      <Box width={"95%"} margin={"auto"} pb={"5px"}>
        <Typography mt={"10px"} color={"#616a76"} fontSize={"12px"}>
          By placing the order,you agree to the{" "}
          <Box
            component="span"
            color={"#FF914D"}
            sx={{ textDecoration: "underline" }}
          >
            Terms and Conditions
          </Box>{" "}
          as well as the{" "}
          <Box
            component="span"
            color={"#FF914D"}
            sx={{ textDecoration: "underline" }}
          >
            Cancellation Policy
          </Box>{" "}
        </Typography>
      </Box>
      <Divider />
      <Box width={"95%"} margin={"auto"} pb={"5px"} mt={"5px"}>
        <Button
          onClick={handleClick}
          variant={"contained"}
          sx={{ width: "100%", textTransform: "capitalize" }}
        >
          Place Order
        </Button>
      </Box>

      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Service request is placed.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Order;
