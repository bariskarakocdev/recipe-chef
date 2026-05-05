import React, { useEffect } from 'react'
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
import { signOut } from 'firebase/auth'
import { auth } from '../services/firebase'
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { setLogin, setUser } from '../store/slices/AuthSlice';
import { clearFavorites } from '../store/slices/FavoriteSlice';


function Header() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLogin = useSelector((state) => state.auth.isLogin)
    const user = useSelector((state) => state.auth.user)
    const [isOpenBottomMenu, setIsOpenBottomMenu] = useState(null);
    const [isBarsOpen, setIsBarsOpen] = useState(false);
    const changeNavbar = () => {
        setIsBarsOpen(!isBarsOpen);
    }

    const handleOpenBottomMenu = (event) => {
        setIsOpenBottomMenu(event.currentTarget);
    }

    const handleClose = () => {
        setIsOpenBottomMenu(null);
    };
    const signOutApp = async () => {
        try {
            if (user == null) {
                toast.warning("Giriş sayfasına yönledndiriliyorsunuz.")
                handleClose();
                navigate("/giris-yap");
            } else {
                const response = await signOut(auth);
                dispatch(setLogin(false));
                dispatch(setUser(null));
                dispatch(clearFavorites()); // Çıkış yapıldığında favorileri de hafızadan sil
                toast.success("Başarıyla çıkış yapıldı.");
                handleClose();
                navigate("/giris-yap");
                
            }


        } catch (error) {
            toast.error("Çıkış yapılamadı.")
        }
    }

    return (
        <div className='header'>
            <div className="left">
                <img src={logo} alt="logo" className="logo" />
                <div className="title">RecipeChef</div>
            </div>

            <nav className={`navbar ${isBarsOpen ? 'open' : ''}`}>
                <ul>
                    <li>
                        <Link to="/" onClick={() => setIsBarsOpen(false)}>Anasayfa</Link>
                    </li>
                    <li>
                        <Link to="/tarif-ara" onClick={() => setIsBarsOpen(false)}>Tarif Ara</Link>
                    </li>
                    <li>
                        <Link to="/tarif-sor" onClick={() => setIsBarsOpen(false)}>Tarif Sor</Link>
                    </li>
                    <li>
                        <Link to="/favorilerim" onClick={() => setIsBarsOpen(false)}>Favorilerim</Link>
                    </li>
                </ul>
            </nav>
            <div className="right">
                {user!=null && <Avatar className="avatar" sx={{ width: 40, height: 40, fontSize: 20, bgcolor: deepOrange[500] }}>{user?.displayName ? user.displayName[0].toUpperCase() : user.email[0].toUpperCase() }</Avatar>}
                
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
                    <MenuItem sx={{ fontSize: 14, fontWeight: "500" }} onClick={signOutApp}>{user==null ? "Giriş yap" : "çıkış yap"}</MenuItem>

                    {user!=null && <MenuItem sx={{ fontSize: 14, fontWeight: "500" }} onClick={() => { handleClose(); navigate("/bilgilerim") }}>Bilgilerim</MenuItem>}
                </Menu>
                <span className="bars-toggle">
                    {!isBarsOpen ?
                        <FaBars className="bars" size={22} onClick={changeNavbar} /> :
                        <IoMdClose className="bars" size={22} onClick={changeNavbar} />
                    }
                </span>


            </div>

        </div>
    )
}

export default Header