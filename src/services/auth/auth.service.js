import api from "../../api/axiosConfig";

const API_URL = "/api/v1/auth";

const signUp = async (firstName, lastName, email, password) => {
    try {
        const response = await api.post(API_URL + "/register", {
            firstName,
            lastName,
            email,
            password
        });

        // if (response.data.accessToken) {
        //     localStorage.setItem("user", JSON.stringify(response.data));
        // }

        return response.data;
    } catch (error) {
        console.error("Error signing up:", error);
        throw error; // Rethrow the error to propagate it to the caller if needed
    }
};

const login = async (email, password) => {
    try {
        const response = await api.post(API_URL + "/authenticate", {
            email,
            password,
        });

        if (response.data.accessToken) {
            localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
    } catch (error) {
        console.error("Error during login:", error);
        throw error;
    }
};

const logout = () => {
    localStorage.removeItem("user");
};

const getCurrentUser = () => {
    try {
        return JSON.parse(localStorage.getItem("user"));
    } catch (error) {
        console.error("Error parsing user data:", error);
        return null; // Return a default value or handle the error as needed
    }
};

const AuthService = {
    signUp,
    login,
    logout,
    getCurrentUser,
};

export default AuthService;
