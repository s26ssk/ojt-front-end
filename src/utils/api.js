import axios from "axios";

const apiBaseUrl = process.env.API_BASE_URL;

export const getAllOrders = async (page, sortBy, order) => {
    try {
        const token = checkLogin().token;
        const response = await axios.get(
            `${apiBaseUrl}/orders?page=${page}&sortBy=${sortBy}&order=${order}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response;
    } catch (error) {
        console.error("Error fetching orders:", error);
        throw error;
    }
};
export const getAllOrdersHistory = async (page, sortBy, order) => {
    try {
        const token = checkLogin().token;
        const response = await axios.get(
            `${apiBaseUrl}/orders-history?page=${page}&sortBy=${sortBy}&order=${order}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        console.log(response);
        return response;
    } catch (error) {
        console.error("Error fetching ordersHistory:", error);
        throw error;
    }
};
export const searchOrders = async (keyword, status = "", time = "", warehouse = "", page) => {
    try {
        const token = checkLogin().token;

        let url = `${apiBaseUrl}/orders/search?keyword=${keyword}&page=${page}`;
        if (status !== "") {
            url += `&status=${status}`;
        }
        if (time !== "") {
            url += `&time=${time}`;
        }
        if (warehouse !== "") {
            url += `&warehouse=${warehouse}`;
        }

        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || error.message);
    }
};

export const deleteOrder = async (orderCode) => {
    try {
        const token = checkLogin().token;
        const response = await axios.delete(`${apiBaseUrl}/order/${orderCode}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        return response;
    } catch (error) {
        console.log(error);
        if (error.response.status === 401) {
            return error.response.data;
        } else if (error.request) {
            console.log(error.request);
        } else {
            console.log("Error", error.message);
        }
    }
};

export const importExcel = async (file) => {
    const formData = new FormData();
    formData.append("multipartFile", file);
    try {
        const token = checkLogin().token;
        const response = await axios.post(`${apiBaseUrl}/import-excel-order`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
        });
        return response;
    } catch (error) {
        console.log(error);
        if (error.response.status === 400) {
            return error.response.data;
        } else if (error.request) {
            console.log(error.request);
        } else {
            console.log("Error", error.message);
        }
    }
};

export const addOrder = async (newOrder) => {
    try {
        const token = checkLogin().token;
        const response = await axios.post(`${apiBaseUrl}/create-order`, newOrder, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        console.log(response);
        return response;
    } catch (error) {
        console.error("Error adding order:", error);
        throw error;
    }
};
export const exportPdf = async (orderCode) => {
    try {
        const token = checkLogin().token;
        const response = await axios.get(`${apiBaseUrl}/create-label/${orderCode}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            responseType: "blob",
        });

        const blob = new Blob([response.data], { type: "application/pdf" });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");

        link.href = url;
        link.setAttribute("download", `${orderCode}.pdf`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        return response;
    } catch (error) {
        console.error("Error updating category:", error);
        throw error;
    }
};

export const updateOrder = async (orderCode, updatedOrder) => {
    try {
        const token = checkLogin().token;
        const response = await axios.put(`${apiBaseUrl}/order/${orderCode}`, updatedOrder, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        return response;
    } catch (error) {
        if (error.response) {
            return error.response;
        }
    }
};

export const updateStatusOrder = async (data) => {
    try {
        const token = checkLogin().token;
        const response = await axios.patch(`${apiBaseUrl}/order/delivery`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        console.log(response);
        return response;
    } catch (error) {
        if (error.response) {
            return error.response;
        } else if (error.request) {
            console.log(error.request);
        } else {
            console.log("Error", error.message);
        }
    }
};

export const changeStatus = async (status, page) => {
    try {
        const token = checkLogin().token;
        const response = await axios.get(
            `${apiBaseUrl}/orders-status?status=${status}&page=${page}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        console.log(response);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || error.message);
    }
};

export const update = async (data, image) => {
    try {
        const response = await axios.put(apiBaseUrl + `/user/updateProfile`, data, image, {
            headers: {
                Authorization: `Bearer ${checkLogin().token}`,
                "Content-Type": "multipart/form-data",
            },
        });
        logout();
        console.log(response);
        return response.status;
    } catch (error) {
        if (error.response) {
            return error.response;
        } else if (error.request) {
            console.log(error.request);
        } else {
            console.log("Error", error.message);
        }
    }
};

export const sendEmailOnFail = async (orderCode) => {
    try {
        const response = await axios.post(`${apiBaseUrl}/send-email-on-fail/${orderCode}`);
        console.log(response);
        return response;
    } catch (error) {
        if (error.response) {
            return error.response;
        } else if (error.request) {
            console.log(error.request);
        } else {
            console.log("Error", error.message);
        }
    }
};

export const sendMailAccountLocked = async (data) => {
    const token = checkLogin().token;
    try {
        const response = await axios.post(`${apiBaseUrl}/send-email-account-locked`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        console.log(response);
        return response;
    } catch (error) {
        if (error.response) {
            return error.response;
        } else if (error.request) {
            console.log(error.request);
        } else {
            console.log("Error", error.message);
        }
    }
};

// linh
export const userRegister = async (data) => {
    try {
        const response = await axios.post(apiBaseUrl + "/api/auth/register", data);
        return response.status;
    } catch (error) {
        if (error.response) {
            return error.response.data;
        } else if (error.request) {
            console.log(error.request);
        } else {
            console.log("Error", error.message);
        }
    }
};

export const isLogin = () => {
    if (typeof window !== "undefined" && window.sessionStorage) {
        const login = JSON.parse(sessionStorage.getItem("userLogin"));
        if (login === null) {
            return false;
        }
        return true;
    }
    return false;
};

export const login = async (data) => {
    try {
        const response = await axios.post(apiBaseUrl + "/api/auth/login", data);
        const expirationTime = new Date(Date.now() + 8640000);
        document.cookie = `user=${JSON.stringify(
            response.data
        )}; expires=${expirationTime.toUTCString()}; path=/`;
        return response.status;
    } catch (error) {
        if (error.response) {
            return error.response;
        } else if (error.request) {
            console.log(error.request);
        } else {
            console.log("Error", error.message);
        }
    }
};

export const logout = () => {
    document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
};

export const checkLogin = () => {
    const userCookie = document.cookie.split("; ").find((row) => row.startsWith("user="));

    if (userCookie) {
        const user = JSON.parse(userCookie.split("=")[1]);
        return user;
    } else {
        return null;
    }
};

export const changePassword = async (data) => {
    try {
        const response = await axios.put(apiBaseUrl + "/user/changePassword", data, {
            headers: {
                Authorization: `Bearer ${checkLogin().token}`,
                "Content-Type": "application/json",
            },
        });
        logout();
        return response.status;
    } catch (error) {
        if (error.response) {
            return error.response;
        } else if (error.request) {
            console.log(error.request);
        } else {
            console.log("Error", error.message);
        }
    }
};

export const updateProfile = async (data) => {
    try {
        const response = await axios.put(apiBaseUrl + `/user/update-profile`, data, {
            headers: {
                Authorization: `Bearer ${checkLogin().token}`,
                "Content-Type": "application/json",
            },
        });
        console.log(response);
        logout();
        return response.status;
    } catch (error) {
        if (error.response) {
            return error.response;
        } else if (error.request) {
            console.log(error.request);
        } else {
            console.log("Error", error.message);
        }
    }
};

export const getWarehouses = async () => {
    try {
        const response = await axios.get(apiBaseUrl + "/warehouses");
        return response.data;
    } catch (error) {
        if (error.response) {
            return error.response;
        } else if (error.request) {
            console.log(error.request);
        } else {
            console.log("Error", error.message);
        }
    }
};
export const getStatistical = async (dateSelect) => {
    try {
        const response = await axios.post(apiBaseUrl + "/statistical", dateSelect, {
            headers: {
                Authorization: `Bearer ${checkLogin().token}`,
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            return error.response;
        } else if (error.request) {
            console.log(error.request);
        } else {
            console.log("Error", error.message);
        }
    }
};

export const getDaily = async (dateSelect) => {
    try {
        const response = await axios.post(apiBaseUrl + "/daily-warehouse", dateSelect, {
            headers: {
                Authorization: `Bearer ${checkLogin().token}`,
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            return error.response;
        } else if (error.request) {
            console.log(error.request);
        } else {
            console.log("Error", error.message);
        }
    }
};

export const getOrderStatistical = async (dateSelect) => {
    try {
        const response = await axios.post(apiBaseUrl + "/order-statistical", dateSelect, {
            headers: {
                Authorization: `Bearer ${checkLogin().token}`,
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            return error.response;
        } else if (error.request) {
            console.log(error.request);
        } else {
            console.log("Error", error.message);
        }
    }
};
