import { LuEye } from "react-icons/lu";
import "./Login.scss"
import { useState } from "react";

export default function Login(){

    const [loginAs, setLoginAs ] = useState('paciente');
    const [credentials, SetCredentials] = useState({ crmCode: "", cardNumber: "", password: "" });

    return(
        <main className="login-page-main">
            <section className="login-page-section">
                <div className="login-section-header">
                    <h1>Bem vindo de Volta</h1>
                </div>
                <div className="login-section-body">
                    <form className="login-form">
                        <div className="login-form-item">
                            <label>Login Como: </label>
                            <select onChange={ (e) => setLoginAs(e.target.value)} >
                                <option value={"paciente"}>Paciente</option>
                                <option value={"medico"}>Médico</option>
                            </select>
                            <p>this field can not be empty</p>
                        </div>
                        {loginAs === "paciente" ? (
                            <div className="login-form-item">
                                <label>numero do cartão: </label>
                                <input
                                    type="number"
                                    onChange={ (e) => SetCredentials( prev => ({...prev, cardNumber: e.target.value}))}
                                />
                                <p>this field can not be empty</p>
                            </div>
                        ):(
                            <div className="login-form-item">
                                <label>Codígo CRM: </label>
                                <input
                                    type="text"
                                    onChange={ (e) => SetCredentials( prev => ({...prev, crmCode: e.target.value}))}
                                />
                                <p>this field can not be empty</p>
                            </div>
                        )}
                        <div className="login-form-item">
                            <label>Senha: </label>
                            <div className="login-form-password">
                                <input
                                    type="pasword"
                                    onChange={ (e) => SetCredentials( prev => ({...prev, password: e.target.value}))}
                                />
                                <div className="login-password-icon">
                                    <LuEye />
                                </div>
                            </div>
                            <p>this field can not be empty</p>
                        </div>
                        <div className="login-form-button">
                            <button className="login-form-btn">Login</button>
                        </div>
                        <div className="login-form-bottom">
                            <p>Não tem conta?</p>
                            <a href="/register">cadastrar-se</a>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    );
}
