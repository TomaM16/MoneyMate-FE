import api from "../../api/axiosConfig";
import authHeader from "../auth/auth-header";

const API_URL = "/api/v1/transactions";

const getTransactions = async () => {
    try {
        const response = await api.get(API_URL, { headers: authHeader() });
        return response.data;
    } catch (error) {
        console.error("Error fetching transactions:", error);
        throw error;
    }
};

const getRecentTransactions = async () => {
    try {
        const response = await api.get(API_URL + '/recent', { headers: authHeader() });
        return response.data;
    } catch (error) {
        console.error("Error fetching recent transactions:", error);
        throw error;
    }
};

const getTransaction = async (id) => {
    try {
        const response = await api.get(API_URL + '/' + id, { headers: authHeader() });
        return response.data;
    } catch (error) {
        console.error("Error fetching transaction:", error);
        throw error;
    }
};

const createTransaction = async (transaction) => {
    try {
        const response = await api.post(API_URL, transaction, { headers: authHeader() });
        return response.data;
    } catch (error) {
        console.error("Error creating transaction:", error);
        throw error;
    }
};

const TransactionService = {
    getTransactions,
    getRecentTransactions,
    getTransaction,
    createTransaction
}

export default TransactionService;
