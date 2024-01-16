import api from "../../api/axiosConfig";
import authHeader from "../auth/auth-header";

const API_URL = "/api/v1/budget";

const getBudget = async () => {
    const response = await api.get(API_URL, { headers: authHeader() })
    return response.data;
}

const getBudgetPlans = async () => {
    const response = await api.get(API_URL + '/plans', { headers: authHeader() })
    return response.data;
}

const createBudgetPlan = async (budgetPlan) => {
    const response = await api.post(API_URL + '/plans', budgetPlan, { headers: authHeader() })
    return response.data;
}

const BudgetService = {
    getBudget,
    getBudgetPlans,
    createBudgetPlan
}

export default BudgetService;