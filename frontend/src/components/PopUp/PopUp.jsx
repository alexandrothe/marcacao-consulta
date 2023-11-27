import { LuX} from "react-icons/lu";
import "./PopUp.scss";


export default function PopUp({ headerName, popUpConfirmHandler, popUpStatus, setPopUpStatus, children}){
    return (
        <>
            <div
                className={`popup-background ${popUpStatus ? "open": "close"}`}
                onClick={ () => setPopUpStatus(false)}
            ></div>
            <div className={`popup-container ${popUpStatus ? "open" : "close"}`}>
                <div className="popup-header">
                    <div className="header-name">
                        <h2>{headerName}</h2>
                    </div>
                    <div className="close-popup-header" onClick={ () => setPopUpStatus(false)}>
                        <LuX />
                    </div>
                </div>
                <div className="popup-body">
                    {children}
                </div>
                <div className="popup-footer">
                    <button className="cancel-btn">Cancel</button>
                    <button className="confirm-btn" onClick={ popUpConfirmHandler }>Ok</button>
                </div>
            </div>
        </>
    );
}