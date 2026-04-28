import React from 'react'
import logo from '../assets/logo2.png'
import '../css/Header.css'
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';
import { FaBars } from "react-icons/fa";
import { MdArrowDropDown } from "react-icons/md";
import { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { IoMdClose } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom'
function Header() {

    const navigate = useNavigate();
    const [isOpenBottomMenu, setIsOpenBottomMenu] = useState(null);
    const [isBarsOpen, setIsBarsOpen] = useState(false);
    const handleOpenBottomMenu = (event) => {
        setIsOpenBottomMenu(event.currentTarget);
    }

    const handleClose = () => {
        setIsOpenBottomMenu(null);
    };

    return (
        <div className='header'>
            <div className="left">
                <img src={logo} alt="logo" className="logo" />
                <div className="title">Recipe Chef</div>
            </div>
            {
                isBarsOpen && (
                    <nav className='navbar'>
                        <ul>
                            <li>
                                <Link to="/" onClick={()=>setIsBarsOpen(false)}>Anasayfa</Link>
                            </li>
                            <li>
                                <Link to="/tarif-ara" onClick={()=>setIsBarsOpen(false)}>Tarif Ara</Link>
                            </li>
                            <li>
                                <Link to="/tarif-sor" onClick={()=>setIsBarsOpen(false)}>Tarif Sor</Link>
                            </li>
                            <li>
                                <Link to="/favorilerim" onClick={()=>setIsBarsOpen(false)}>Favorilerim</Link>
                            </li>
                        </ul>
                    </nav>)}
            <div className="right">

                <Avatar sx={{ width: 40, height: 40, fontSize: 20, bgcolor: deepOrange[500] }}>B</Avatar>
                <MdArrowDropDown className="arrow" size={30} id="basic-button"
                    aria-controls={isOpenBottomMenu ? 'bottom-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={isOpenBottomMenu ? 'true' : undefined}
                    onClick={handleOpenBottomMenu} style={{ cursor: 'pointer' }} />

                <Menu
                    id="bottom-menu"
                    anchorEl={isOpenBottomMenu}
                    open={Boolean(isOpenBottomMenu)}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    slotProps={{
                        paper: {
                            sx: {
                                minWidth: 150,
                                mt: 1,
                            },
                        },
                    }}
                >
                    <MenuItem sx={{ fontSize: 14, fontWeight: "500" }} onClick={handleClose}>Çıkış Yap</MenuItem>
                  
                    <MenuItem sx={{ fontSize: 14, fontWeight: "500" }} onClick={()=>{handleClose();navigate("/bilgilerim") }}>Bilgilerim</MenuItem>
                </Menu>
                <span>{!isBarsOpen ? <FaBars className="bars" size={20} onClick={() => setIsBarsOpen(true)} /> :
                    <IoMdClose className="bars" size={25} onClick={() => setIsBarsOpen(false)} />
                }</span>


            </div>

        </div>
    )
}

export default Header