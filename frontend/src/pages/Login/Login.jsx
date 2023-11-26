import { LuEye, LuEyeOff } from "react-icons/lu";
import "./Login.scss"
import { useState } from "react";
import { checkForm } from "../../utils/checkForm";
import { setCookie } from "../../utils/cookieManager";
import { useNavigate } from "react-router-dom";

export default function Login(){

    const [loginAs, setLoginAs ] = useState('paciente');
    const [ formError, setFormError ] = useState({ target: "", message: ""});
    const [credentials, SetCredentials] = useState({ accessCredential: "", password: "" });
    const [ isPasswordVisble, setIsPasswordVisible ] = useState(false);
    const navigate = useNavigate();


    async function loginUserHandler(){

        const isFormOk = checkForm(credentials, setFormError);

        
        if(isFormOk){
            
            let formatedData = {}
    
            const { accessCredential, password} = credentials;
    
            if(loginAs === "paciente"){
                formatedData = { password: password, cardNumber: accessCredential}
            }
            else{
                formatedData = { password: password, crmCode: accessCredential}
            }

            const loginUserRequest = await fetch(`http://localhost:4000/api/v1/${ loginAs === "paciente" ? "usuario": "medico"}/login`,{
                headers:{
                    "Content-Type":"application/json"
                },
                method: "POST",
                body: JSON.stringify(formatedData)
            });

            const loginUserResponse = await loginUserRequest.json();

            if(loginUserResponse.ok){

                if(loginAs === 'paciente'){
                    setCookie('user', JSON.stringify(loginUserResponse.user));
                }
                else{
                    setCookie('user', JSON.stringify(loginUserResponse.medico));
                }
                
                navigate('/');

            }
            else{
                alert('user not found');
            }
        }

    }

    return(
        <main className="login-page-main">
            <section className="login-page-section">
                <div className="login-section-header">
                    <h1>Bem vindo de Volta</h1>
                </div>
                <div className="login-section-body">
                    <form className="login-form" onSubmit={ e => e.preventDefault()}>
                        <div className="login-form-item">
                            <label>Login Como: </label>
                            <select onChange={ (e) => setLoginAs(e.target.value)} >
                                <option value={"paciente"}>Paciente</option>
                                <option value={"medico"}>Médico</option>
                            </select>
                        </div>
                        {loginAs === "paciente" ? (
                            <div className="login-form-item">
                                <label>numero do cartão: </label>
                                <input
                                    type="number"
                                    onChange={ (e) => SetCredentials( prev => ({...prev, accessCredential: e.target.value}))}
                                />
                                {formError.target === "accessCredential" && (
                                    <p>{formError.message}</p>
                                )}
                            </div>
                        ):(
                            <div className="login-form-item">
                                <label>Codígo CRM: </label>
                                <input
                                    type="text"
                                    onChange={ (e) => SetCredentials( prev => ({...prev, accessCredential: e.target.value}))}
                                />
                                {formError.target === "accessCredential" && (
                                    <p>{formError.message}</p>
                                )}
                            </div>
                        )}
                        <div className="login-form-item">
                            <label>Senha: </label>
                            <div className="login-form-password">
                                <input
                                    type={isPasswordVisble ? "text" : "password"}
                                    onChange={ (e) => SetCredentials( prev => ({...prev, password: e.target.value}))}
                                />
                                <div className="login-password-icon" onClick={ () => setIsPasswordVisible( prev => !prev)}>
                                    {isPasswordVisble ? <LuEyeOff /> : <LuEye />}
                                </div>
                            </div>
                            {formError.target === "password" && (
                                <p>{formError.message}</p>
                            )}
                        </div>
                        <div className="login-form-button">
                            <button className="login-form-btn" onClick={ loginUserHandler }>Login</button>
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
