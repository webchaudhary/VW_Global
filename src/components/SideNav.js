import React, { useState } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdDataset } from "react-icons/md";
import { FaChartBar } from "react-icons/fa";
import { MdSatelliteAlt } from "react-icons/md";
import { CiSettings } from "react-icons/ci";
import { RiMenuUnfold4Line2 } from "react-icons/ri";
import { RiMenuUnfold3Line2 } from "react-icons/ri";
import { NavLink } from 'react-router-dom';
import { LiaMapMarkedSolid } from "react-icons/lia";
import { IoBarChartSharp } from "react-icons/io5";
import { FaInfoCircle } from "react-icons/fa";


const SideNav = () => {
    const [showMenu, setShowMenu] = useState(false);


    return (
        <div className='sidenav_container'>

            <div className='sidenav_list'>
                <NavLink to="/" className={({ isActive }) => (isActive ? 'sidenav_item sidenav_item_active' : 'sidenav_item')}>
                    <span><LiaMapMarkedSolid /></span> <p>MAP </p>
                </NavLink>

                <NavLink to="/plot" className={({ isActive }) => (isActive ? 'sidenav_item sidenav_item_active' : 'sidenav_item')}>
                    <span><IoBarChartSharp /> </span> <p>PLOT</p>
                </NavLink>

                {/* <NavLink to="/about" className={({ isActive }) => (isActive ? 'sidenav_item sidenav_item_active' : 'sidenav_item')}>
                    <span><FaInfoCircle /> </span> <p>ABOUT</p>
                </NavLink> */}


            </div>



        </div>

    )
}

export default SideNav