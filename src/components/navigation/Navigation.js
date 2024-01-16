import React from "react";
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import { SidebarData } from "./SidebarData";
import './Navigation.css';

const Navigation = (onLogoutClicked) => {
    const [isCollapsed, setIsCollapsed] = React.useState(true);

    return (
        <Sidebar collapsed={isCollapsed} style={{ height: "100vh" }}>
            <Menu>
                <MenuItem
                    icon={<img src="icons/menuIcon.svg" alt="Menu" />}
                    onClick={() => {
                        setIsCollapsed(!isCollapsed);
                    }}
                    style={{ textAlign: "center" }}
                >
                    {" "}
                    <h2>MoneyMate</h2>
                </MenuItem>

                {SidebarData.map((item) => (
                    <MenuItem key={item.path}
                        icon={<img className="navigation-menu-icon" src={item.icon} alt={item.title} />}
                        component={<Link to={item.path} />}
                    >
                        {" "}
                        <h4>{item.title}</h4>
                    </MenuItem>
                ))}
            </Menu>
        </Sidebar>
    );
};

export default Navigation;