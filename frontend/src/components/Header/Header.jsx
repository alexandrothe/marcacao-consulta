import { useState } from 'react';
import { LuLogOut, LuUser, LuX } from "react-icons/lu";
import { FaBars, FaPlus} from 'react-icons/fa6';
import { Outlet } from 'react-router-dom';
import "./Header.scss";


export default function Header(){
    const [isNavigationVisible, setIsNavigationVisible ] = useState(false);
  
    return(
        <>
            <header>
                <div className='header-col1'>
                    <div className='header-hamburguer' onClick={ () => setIsNavigationVisible( prev => !prev)}>
                        { isNavigationVisible ? <LuX/> : <FaBars /> }
                    </div>
                </div>
                <div className='header-col2'>
                    <div className='header-logo-name'>
                        <a href='/home'>
                        <h1>Facebook</h1>
                        </a>
                    </div>
                </div>
                <div className='header-col3'>
                    <div className='marcar-solicitacao-btn'>
                        <FaPlus />
                    </div>
                </div>
                <nav className={`dropdown-navigation ${isNavigationVisible ? "open" : "close" }`}>
                    <ul className='dropdown-links-container'>
                        <li className='dropdown-link-item'>
                            <a href='/'>
                                <div className='dropdown-item-icon'><LuUser /></div>
                                Minha Conta
                            </a>
                        </li>
                        <li className='dropdown-link-item'>
                            <a href='/'>
                                <div className='dropdown-item-icon'><LuLogOut /></div>
                                Sair
                            </a>
                        </li>
                    </ul>
                </nav>
            </header>
            
            <Outlet />
        </>
    );
  }
  