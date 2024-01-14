import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Logout = ({ onLogout }) => {
    const navigate = useNavigate();

    useEffect(() => {
        onLogout()
        navigate("/login", { replace: true });
    }, []);

    return <h1>Logging you out..</h1>;
};

export default Logout