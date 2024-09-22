import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getTransactions = createAsyncThunk(
  "transactions/getTransactions",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get("/transactions/all", {
        params: {
          page: params?.page ?? 1,
          perPage: params?.perPage ?? 10,
          search: params?.search ?? "",
          status: params?.status ?? "",
          addedFrom: params?.addedFrom ?? "",
          paymentOption: params?.paymentOption ?? "",
        },
      });
      return response.data;
    } catch (error) {
      toast.error(JSON.stringify(error.messages[0]));

      return rejectWithValue(error.error);
    }
  }
);

export const getTransaction = createAsyncThunk(
  "transactions/getTransaction",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/transactions/info/${params?.id}`);
      return response.data;
    } catch (error) {
      toast.error(JSON.stringify(error.messages[0]));

      return rejectWithValue(error.error);
    }
  }
);

// export const downloadTransactionsFile = createAsyncThunk(
//   "transactions/downloadTransactions",
//   async (params, { rejectWithValue }) => {
//     try {
//       const response = await axios
//         .get("/transactions/download/file", {
//           params: {
//             status: params?.status ?? "",
//             addedFrom: params?.addedFrom ?? "",
//             paymentOption: params?.paymentOption ?? "",
//           },
//           responseType: "arraybuffer",
//         })
//         .then((response) => {
//           const url = window.URL.createObjectURL(new Blob([response.data]));
//           const link = document.createElement("a");
//           link.href = url;
//           link.setAttribute("download", "transactions.xlsx");
//           document.body.appendChild(link);
//           link.click();
//         });
//       return response.data;
//     } catch (error) {
//             toast.error(JSON.stringify(error.messages[0]));

//       return rejectWithValue(error.error);
//     }
//   }
// );

export const downloadTransactionsFile = createAsyncThunk(
  "transactions/downloadTransactions",
  async (params, { rejectWithValue }) => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      const requestHeaders = new Headers();

      requestHeaders.append("Authorization", "Bearer " + accessToken);
      requestHeaders.append("Accept", "application/json");

      const requestOptions = {
        method: "GET",
        headers: requestHeaders,
        body: values,
        redirect: "follow",
      };

      const queryParams = new URLSearchParams({
        status: params?.status ?? "",
        addedFrom: params?.addedFrom ?? "",
        paymentOption: params?.paymentOption ?? "",
      });

      const response = await fetch(
        `/api/admin/transactions/download/file?${queryParams}`,
        requestOptions
      );

      if (!response.ok) {
        // Handle any non-successful responses
        throw new Error("Network response was not ok");
      }

      // Read the response as ArrayBuffer
      const fileData = await response.arrayBuffer();

      // Create a Blob from the file data
      const blob = new Blob([fileData], {
        type: response.headers.get("content-type"),
      });

      // Create a URL for the Blob
      const url = window.URL.createObjectURL(blob);

      // Create a link and trigger the download
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "transactions.xlsx");
      document.body.appendChild(link);
      link.click();

      return fileData; // This line is not necessary since you are triggering a download and not using the data further in your application.
    } catch (error) {
      toast.error(JSON.stringify(error.messages[0]));

      return rejectWithValue(error.message);
    }
  }
);
