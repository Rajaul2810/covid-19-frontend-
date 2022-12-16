import React, { useState } from 'react';
import {

    FaBars,
 
    FaRegChartBar,
    FaPlusCircle,
    FaUserSecret
} from "react-icons/fa";
import { NavLink, Outlet } from 'react-router-dom';
import './Dashboard.css';
//import Info from './Info';

export const Dashboard = () => {
    const [isOpen, setIsOpen] = useState(true);
    const toggle = () => setIsOpen(!isOpen);
    return (
        <div className="container1">
            <div style={{ width: isOpen ? "200px" : "50px" }} className="sidebar">
                <div className="top_section">
                    <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">Logo</h1>
                    <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars">
                        <FaBars onClick={toggle} />
                    </div>
                </div>

                <NavLink to='/dashboard/info' className="link " >
                    <div className="icon"><FaPlusCircle /></div>
                    <div style={{ display: isOpen ? "block" : "none" }} className="link_text">Add Info</div>
                </NavLink>
                <NavLink to='/dashboard/manage' className="link" >
                    <div className="icon"><FaRegChartBar /></div>
                    <div style={{ display: isOpen ? "block" : "none" }} className="link_text">ManageInfo</div>
                </NavLink>

                <NavLink to='/dashboard/Admin' className="link" >
                    <div className="icon"><FaUserSecret /></div>
                    <div style={{ display: isOpen ? "block" : "none" }} className="link_text">Admin</div>
                </NavLink>


            </div>
            <main>
                <Outlet />
            </main>

        </div>
    )
}
