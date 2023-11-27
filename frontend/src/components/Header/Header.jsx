import { useEffect, useState } from 'react';
import { LuLogOut, LuPlus, LuUser} from "react-icons/lu";
import { Outlet, useNavigate, Link } from 'react-router-dom';
import { getCookie, deleteCookie} from "../../utils/cookieManager"
import "./Header.scss";


export default function Header(){
    const navigate = useNavigate();

    const [ userType, setUserType] = useState('');

    function logoutHandler () {
        deleteCookie('user');
        navigate('/login');
    }

    useEffect(() => {
        const userCookie = getCookie('user');

        if(!userCookie){
            navigate('/login');
        }
        else{
            const { crmCode } = JSON.parse(userCookie);
        
            if(crmCode === undefined){
                setUserType('PACIENTE');
            }
            else{
                setUserType('MEDICO');
            }
        }


    },[]);

    return(
        <>
            <header>
                <div className='header-content'>
                    <div className='header-col2'>
                        <div className='header-logo-name'>
                            <Link to='/'>
                                <h1>Hospital</h1>
                            </Link>
                        </div>
                    </div>

                    <nav className='header-navigation'>
                        <ul className='navigation-links'>
                            <li className='link-item' title='profile'>
                                <Link to='/profile'>
                                    <LuUser />
                                </Link>
                            </li>
                            {userType==="PACIENTE" && (
                                <li className='link-item' title="marcar consulta">
                                    <Link to="/marcar-consulta" >
                                        <LuPlus />
                                    </Link>
                                </li>
                            )}
                            <li className='link-item-btn' title="sair" onClick={ logoutHandler}>
                                <LuLogOut />
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
            
            <Outlet />
        </>
    );
  }
  