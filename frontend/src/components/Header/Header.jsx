import profileImage from "../../assets/profile.avif"
import "./header.scss";

function Header(){
    return(
        <header>
            <div class="header-content">
                <div class="header-logo-container">
                    <a><h1>Consulta App</h1></a>
                </div>
                <div class="header-ellipse-container">
                    <div class="more-icon-btn">
                        <i class="fa-solid fa-bars"></i>
                    </div>
                </div>


                <div class="header-right-container">
                    <div class="header-user-actions">
                        <div class="user-marcar-consulta-btn user-action-btn" title="marcar-consulta">
                            <i class="fa-solid fa-plus"></i>
                        </div>
                        <div class="user-logout-btn user-action-btn" title="sair">
                            <i class="fa-solid fa-sign-out"></i>
                        </div>
                        <a href="#">
                            <div class="user-profile-image" title="your profile">
                                <img src={profileImage} />
                            </div>
                        </a>
                    </div>
                    
                </div>


            </div>
        </header>
    );
}
export default Header;