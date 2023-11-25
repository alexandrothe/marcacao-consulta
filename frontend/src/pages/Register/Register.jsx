import { LuEye, LuEyeOff, LuSearch } from "react-icons/lu";
import { useState } from "react";
import "./Register.scss";

export default function Register(){

    const [ isPassowrdVisible, setIsPasswordVisible] = useState(false);
    const [ tipoUsuario, setTipoUsuario ] = useState("paciente");
    const [ usuario, SetUsuario] = useState({
        fullName: "", birthDay: "", sex: "", cardNumber: "", crmCode: "", password: ""
    });

    return(
        <main className="register-page-main">
            <section className="register-page-section">
                <div className="register-section-header">
                    <h1>Bem Vindo ao Facebook</h1>
                </div>
                
                <div className="register-section-body">
                    <form className="register-form" onSubmit={(e) => e.preventDefault() }>
                        <div className="register-form-item">
                            <label>Nome Completo</label>
                            <input
                                type="text"
                                value={usuario.fullName}
                                onChange={ (e) => SetUsuario( prev => ({ ...prev, fullName: e.target.value}))}
                            />
                            <p>this field can not be emtpy</p>
                        </div>

                        <div className="register-form-item">
                            <label>Data nascimento</label>
                            <input
                                type="date"
                                value={usuario.birthDay}
                                onChange={ (e) => SetUsuario( prev => ({ ...prev, birthDay: e.target.value}))}
                            />
                            <p>this field can not be emtpy</p>
                        </div>
                        <div className="register-form-item">
                            <label> Gênero: </label>
                            <select defaultValue={1} onChange={ (e) => SetUsuario( prev => ({ ...prev, sex: e.target.value}))}>
                                <option>selecione</option>
                                <option value={1}>homem</option>
                                <option value={0}>mulher</option>
                            </select>
                        </div>
                        <div className="register-form-item">
                            <label>Registrar-se como</label>
                            <select onChange={ (e) => setTipoUsuario(e.target.value)} defaultValue={"paciente"}>
                                <option value={"paciente"}>Paciente</option>
                                <option value={"medico"}>Médico</option>
                            </select>
                        </div>
                        {tipoUsuario === "paciente" ? (
                            <div className="register-form-item">
                                <label>Numero do cartão: </label>
                                <input
                                    type="number"
                                    value={usuario.cardNumber}
                                    onChange={ (e) => SetUsuario( prev => ({ ...prev, cardNumber: e.target.value}))}
                                />
                                <p>this field can not be emtpy</p>
                            </div>
                        ):(
                            <div className="register-form-item">
                                <label>Código CRM: </label>
                                <input
                                    type="text"
                                    value={usuario.crmCode}
                                    onChange={ (e) => SetUsuario( prev => ({ ...prev, crmCode: e.target.value}))}
                                />
                                <p>this field can not be emtpy</p>
                            </div>
                        )}

                        <div className="register-form-item">
                            <label>Criar Senha:</label>
                            <div className="register-form-password">
                                <input
                                    type={ isPassowrdVisible ?  'text' : "password"  }
                                    value={usuario.password}
                                    onChange={ (e) => SetUsuario( prev => ({ ...prev, password: e.target.value}))}
                                />
                                <div className="register-password-icon" onClick={ () => setIsPasswordVisible( prev => !prev)}>
                                    {isPassowrdVisible ? <LuEyeOff/> : <LuEye /> }
                                </div>
                            </div>
                            <p>this field can not be emtpy</p>
                        </div>

                        <div className="register-form-button">
                            <button className="register-form-btn" onClick={ () => console.log(usuario)}>
                                Registrar
                            </button>
                        </div>
                        <div className="register-form-bottom">
                            <p>Já é usuário? </p>
                            <a href="/login"> Login</a>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    );
}
