import React, { useContext, useState, useEffect } from "react";
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
} from "@mui/material";
import { AuthContext } from "../Context/AuthContext";

const Cart = () => {
  const data = JSON.parse(localStorage.getItem("serviceRequested"));
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await fetch("https://lazy-ruby-shawl.cyclic.app/orders");
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.log("Error fetching services:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `https://lazy-ruby-shawl.cyclic.app/orders/${id}`
      );
      const data = await response.json();
    } catch (error) {
      console.log("Error fetching services:", error);
    }

    getData();
  };

  return (
    <Box pt={"80px"}>
      {orders.length > 0 ? (
        <Box>
          {orders.map((el) => {
            return (
              <Box width={"90%"} margin={"auto"} my={"8px"} boxShadow={1}>
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
                      {el.serviceName}
                    </Typography>
                    <Typography lineHeight={1.1}>
                      {el.maids} Maid, {el.hours} Hours
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
                      SAR {el.totalAmount}.00
                    </Typography>
                    <Button
                      onClick={() => handleDelete(el.id)}
                      variant="text"
                      sx={{
                        color: "red",
                        textTransform: "capitalize",
                        fontWeight: 700,
                      }}
                    >
                      Cancel
                    </Button>
                  </Box>
                </Box>
                <Divider />
              </Box>
            );
          })}
        </Box>
      ) : (
        <Box
          height={"85vh"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Typography color={"#305966"} fontSize={"18px"} textAlign={"center"}>
            No orders found
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Cart;
