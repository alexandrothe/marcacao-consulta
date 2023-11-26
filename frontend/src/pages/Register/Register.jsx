import { LuEye, LuEyeOff, LuSearch } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { checkForm } from "../../utils/checkForm";
import "./Register.scss";


export default function Register(){
    const [ isPassowrdVisible, setIsPasswordVisible] = useState(false);
    const [ formError, setFormError ] = useState({ target: "", message: ""});
    const [especialidades, setEspecialidades] = useState([]);
    const [ tipoUsuario, setTipoUsuario ] = useState(1);
    const [ usuario, SetUsuario] = useState({
        name: "", birthDay: "", sex: "", accessCredential: "", password: "", especialidadeId: ""
    });
    const navigate = useNavigate();

    const handlerRequest = async() => {
        let formatedData = {}

        const { accessCredential, especialidadeId, ...restUsuario} = usuario;
        // desctructuring accessCredential for (paciente and Medico) and especialidadeId ( only for Medico),
        // the rest data is both for medico and paciente

        if(tipoUsuario === 1){
            // check if the user is login as Paciente, if yes, remove the especialiadeId and change accessCredential to cardNumber
            formatedData = {...restUsuario, cardNumber: accessCredential}
        }
        else{
            // check if the user is login as Medico, if yes, add the especialiadeId and change accessCredential to crmNumber
            formatedData = {...restUsuario, crmCode: accessCredential, especialidadeId: especialidadeId}
        }


        const isFormOK = checkForm(formatedData, setFormError);
        
        if(isFormOK){
            const createUserRequest = await fetch(`http://localhost:4000/api/v1/${ tipoUsuario ? "usuario" : "medico" }/create`,{
                headers:{
                    "Content-Type":"application/json"
                },
                method: "POST",
                body: JSON.stringify(formatedData)
            });
    
            const createUserResponse = await createUserRequest.json();
    
            if(createUserResponse.ok){
                console.log(createUserResponse);
                // navigate('/');
            }
            else{
                alert('user could not be created');
            }
        }

    }

    async function loadEspecialidades(){

        const especialidadeListRequest = await fetch('http://localhost:4000/api/v1/especialidade/list');
        const especialidadeListRespose = await especialidadeListRequest.json();
       
        if(especialidadeListRespose.ok){
            setEspecialidades(especialidadeListRespose.especialidades);
        }
    }
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
                                value={usuario.name}
                                onChange={ (e) => SetUsuario( prev => ({ ...prev, name: e.target.value}))}
                            />
                            {formError.target === "name" && (
                                <p>{formError.message}</p>
                            )}
                        </div>

                        <div className="register-form-item">
                            <label>Data nascimento</label>
                            <input
                                type="date"
                                value={usuario.birthDay}
                                onChange={ (e) => SetUsuario( prev => ({ ...prev, birthDay: e.target.value}))}
                            />
                            {formError.target === "birthDay" && (
                                <p>{formError.message}</p>
                            )}
                        </div>
                        <div className="register-form-item">
                            <label> Gênero: </label>
                            <select onChange={ (e) => SetUsuario( prev => ({ ...prev, sex: e.target.value}))}>
                                <option>selecione</option>
                                <option value={"MALE"}>homem</option>
                                <option value={"FEMALE"}>mulher</option>
                            </select>
                        </div>
                        <div className="register-form-item">
                            <label>Registrar-se como</label>
                            <select  onChange={ (e) => {
                                setTipoUsuario(parseInt(e.target.value))
                                if(parseInt(e.target.value) === 0 ){
                                    loadEspecialidades();
                                }    
                            }}>
                                <option value="">selecione</option>
                                <option value={1}>Paciente</option>
                                <option value={0}>Medico</option>
                            </select>
                        </div>
                        {tipoUsuario === 1 ? (
                            <div className="register-form-item">
                                <label>Numero do cartão: </label>
                                <input
                                    type="number"
                                    value={usuario.accessCredential}
                                    onChange={ (e) => SetUsuario( prev => ({ ...prev, accessCredential: e.target.value}))}
                                />
                                {formError.target === "accessCredential" && (
                                    <p>{formError.message}</p>
                                )}
                            </div>
                        ):(
                            <>
                                <div className="register-form-item">
                                    <label>Código CRM: </label>
                                    <input
                                        type="text"
                                        value={usuario.accessCredential}
                                        onChange={ (e) => SetUsuario( prev => ({ ...prev, accessCredential: e.target.value}))}
                                    />
                                    {formError.target === "accessCredential" && (
                                        <p>{formError.message}</p>
                                    )}
                                </div>
                                <div className="register-form-item">
                                    <label>Sua especialidade: </label>
                                    <select onChange={ (e) => SetUsuario( prev => ({...prev, especialidadeId: parseInt(e.target.value )}))}>
                                        <option>selecione</option>
                                        {especialidades.map((especialidade, index) => (
                                            <option value={especialidade.id} key={especialidade.nome}>{especialidade.nome}</option>
                                        ))}
                                    </select>
                                    {formError==="especialidade" && (
                                        <p>{formError.message}</p>
                                    )}
                                </div>
                            </>
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
                            {formError.target === "password" && (
                                <p>{formError.message}</p>
                            )}
                        </div>

                        <div className="register-form-button">
                            <button className="register-form-btn" onClick={handlerRequest}>
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
