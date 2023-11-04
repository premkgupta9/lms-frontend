import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axiosInstance";
import toast from "react-hot-toast";



const initialState = {
    key: "",
    subscription_id: "",
    isPaymentVerified: false,
    allPayments: {},
    finalMonths: {},
    monthlySalesRecord: []
};

// function to get the api key
export const getRazorPayId = createAsyncThunk("/razorpay/getId", async () => {
    try {
        const response = await axiosInstance.get("/payments/razorpay-key");
        return response.data;
    } catch(error) {
        toast.error("Failed to load data");
    }
});

// function to purchase the course bundle
export const purchaseCourseBundle = createAsyncThunk("/purchasecourse", async () => {
    try {
        const response = await axiosInstance.post("/payments/subscribe");
        return response.data;
    } catch(error) {
        toast.error(error?.response?.data?.message);
    }
});

// function to verify the user payment

export const verifyUserPayment = createAsyncThunk("/payments/verify", async (data) => {
    try {
        const response = await axiosInstance.post("/payments/verify", {
            razorpay_payment_id: data.razorpay_payment_id,
            razorpay_subscription_id: data.razorpay_subscription_id,
            razorpay_signature: data.razorpay_signature
        });
        console.log("response of verify", response);
        return response;
    } catch(error) {
        toast.error(error?.response?.data?.message);
    }
});

// function to get all the payment record
export const getPaymentRecord = createAsyncThunk("/payment/record", async () => {
    try {
        const response = axiosInstance.get("/payments?count=100");
        toast.promise(response, {
            loading: "Getting the payment record",
            success: (data) => {
                return data?.data?.message
            },
            error: "Failed to get the payment record"
        })
        return (await response).data;
    } catch(error) {
        toast.error("Operation failed");
    }
});

// function to cancel the course bundle subscription
export const cancelCourseBundle = createAsyncThunk("/payment/cancel", async () => {
    try {
        const response = axiosInstance.post("/payments/unsubscribe");
        toast.promise(response, {
            loading: "unsubscribing the bundle",
            success: (data) => {
                return data?.data?.message
            },
            error: "Failed to unsubscribe"
        })
        return (await response).data;
    } catch(error) {
        toast.error(error?.response?.data?.message);
    }
});


const razorPaySlice = createSlice({
    name: "razorpay",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getRazorPayId.fulfilled, (state, action) => {
            state.key = action?.payload?.key;
        })
        .addCase(purchaseCourseBundle.fulfilled, (state, action) => {
            state.subscription_id = action?.payload?.subscription_id;
        })
        .addCase(verifyUserPayment.fulfilled, (state, action) => {
            toast.success(action?.payload?.message);
            state.isPaymentVerified = action?.payload?.sucess;
        })
        .addCase(verifyUserPayment.rejected, (state, action) => {
            toast.error(action?.payload?.message);
            state.isPaymentVerified = action?.payload?.sucess;
        })
        .addCase(getPaymentRecord.fulfilled, (state, action) => {
            state.allPayments = action?.payload?.allPayments;
            state.finalMonths = action?.payload?.finalMonths;
            state.monthlySalesRecord = action?.payload?.monthlySalesRecord;
        })
    }
})

export default razorPaySlice.reducer;