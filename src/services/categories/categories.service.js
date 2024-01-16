import api from "../../api/axiosConfig";
import authHeader from "../auth/auth-header";

const API_URL = "/api/v1/categories";

const getCategories = async () => {
    const response = await api.get(API_URL, { headers: authHeader() })
    return response.data;
}

const createCategory = async (category) => {
    const response = await api.post(API_URL, category, { headers: authHeader() })
    return response.data;
}

const CategoriesService = {
    getCategories,
    createCategory,
}

export default CategoriesService;