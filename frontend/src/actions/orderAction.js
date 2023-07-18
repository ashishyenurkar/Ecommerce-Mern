import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAIL,
    MY_ORDER_REQUEST,
    MY_ORDER_SUCCESS,
    MY_ORDER_FAIL,

    CLEAR_ERRORS,
} from "../constants/orderConstants";
import axios from "axios";

//create Order

export const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({ type: CREATE_ORDER_REQUEST });
        const config = {
            headers: {
                "Content-Type": "application/json"
            },
        };
        const { data } = await axios.post("/api/v1/order/new", order, config);
        dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: CREATE_ORDER_FAIL,
            payload: error.response.data.message,
        });
    }
}


//my orders
export const myOrders = () => async (dispatch, getState) => {
    try {
        dispatch({ type: MY_ORDER_REQUEST });
       
        const { data } = await axios.get("/api/v1/orders/me");
        dispatch({ type:  MY_ORDER_SUCCESS, payload: data.orders });
    } catch (error) {
        dispatch({
            type:  MY_ORDER_FAIL,
            payload: error.response.data.message,
        });
    }
}

//clear Errors.
export const clearErrors = () => async (dispatch) => {
    dispatch({type:CLEAR_ERRORS})
}