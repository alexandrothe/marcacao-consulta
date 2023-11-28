import { useEffect, useState } from "react";
import { getCookie} from "../../utils/cookieManager";
import { checkForm } from "../../utils/checkForm";
import { useNavigate, useParams } from "react-router-dom";
import "./MarcarConsulta.scss";

export default function MarcarConsulta(){
    const [ formError, setFormError ] = useState({ target: "", message: ""});
    const [especialidades, setEspecialidades ] = useState([]);
    const [medicos, setMedicos ] = useState([]);
    const [ actionName, setActionName ] = useState('MARCAR_CONSULTA');
    const navigate = useNavigate();
    const { solicitacaoId } = useParams();
    const [marcarConsulta, setMarcarcarConsulta] = useState({
        especialidadeId: "", medicoId: "", description: "", usuarioId: ""
    });
    
    async function loadMedicos(especialidadeId){
        const medicosListRequest = await fetch(`http://localhost:4000/api/v1/medico/list/${especialidadeId}`);
        const medicoListResponse = await medicosListRequest.json();

        if(medicoListResponse.ok){
            setMedicos(medicoListResponse.medicos);
        }
    }

    async function marcarConsultaHandler(){
        const isFormOk = checkForm(marcarConsulta, setFormError);

        if(isFormOk){
            if(actionName === "MARCAR_CONSULTA"){
                const marcarConsultaRequest = await fetch("http://localhost:4000/api/v1/solicitacao/create",{
                    headers:{
                        "Content-Type":"application/json"
                    },
                    method: "POST",
                    body: JSON.stringify(marcarConsulta)
                });
                const marcarConsultaResponse = await marcarConsultaRequest.json();
    
    
                if(marcarConsultaResponse.ok){
                    navigate('/')
                }
            }
            else{
                const atualizarConsultaRequest = await fetch(`http://localhost:4000/api/v1/solicitacao/update/${solicitacaoId}`,{
                    headers:{
                        "Content-Type": "application/json"
                    },
                    method: "PUT",
                    body: JSON.stringify(marcarConsulta)
                });

                const atualizarConsultaResponse = await atualizarConsultaRequest.json();
                if(atualizarConsultaResponse.ok){
                    navigate('/');
                }

            }
        }
    }

    useEffect(() => {
        const userCookie = getCookie('user');
        
        if(userCookie){
            const { id } = JSON.parse(userCookie);
            setMarcarcarConsulta( prev => ({...prev, usuarioId: id}));

            async function getData(){
    
                const especialidadesRequest = await fetch('http://localhost:4000/api/v1/especialidade/list');
                const especialidadeResponse = await especialidadesRequest.json();
    
                if(especialidadeResponse.ok){
                    setEspecialidades(especialidadeResponse.especialidades);
                    let action = document.location.href.split('/')[document.location.href.split('/').length - 1];

                    if(action.toLocaleLowerCase() === "update-consulta"){

                        const getOneConsultaRequest = await fetch(`http://localhost:4000/api/v1/solicitacao/one/${solicitacaoId}`);
                        const getOneConsultaResponse = await getOneConsultaRequest.json();

                        if(getOneConsultaResponse.ok){
                            const {medicoId, usuarioId, description,especialidadeId} = getOneConsultaResponse.solicitacao;
                            setMarcarcarConsulta({
                                medicoId,
                                usuarioId,
                                description,
                                especialidadeId
                            });
                            loadMedicos(especialidadeId);
                            setActionName('UPDATE_CONSULTA')
                        }
                    }

                }
            }
    
            getData();
        }

    },[]);



    return(
        <main className="marcar-consulta-page">
            <section className="marcar-consulta-page-section">

                <div className="marcar-consulta-section-header">
                    <h1>Marcar Consulta</h1>
                </div>

                <form className="marcar-consulta-form" onSubmit={ e => e.preventDefault()}>
                    <div className="marcar-consulta-form-item">
                        <label>Especialidade: </label>
                        <select
                            className="form-item-select"
                            value={marcarConsulta.especialidadeId}
                            onChange={ (e) => {
                                setMarcarcarConsulta( prev => ({...prev, especialidadeId: parseInt(e.target.value) }))
                                loadMedicos(e.target.value);
                            }}
                        >
                            <option>selecione</option>
                            {especialidades.map( (especialidade, index) => {
                                if(especialidade.id === marcarConsulta.especialidadeId){
                                    return <option value={especialidade.id} key={especialidade.nome}>{especialidade.nome}</option>
                                }else{
                                    return <option value={especialidade.id} key={especialidade.nome}>{especialidade.nome}</option>
                                }
                            })}
                        </select>
                    </div>
                    <div className="marcar-consulta-form-item">
                        <label>Medico: </label>
                        <select
                            className="form-item-select"
                            value={marcarConsulta.medicoId}
                            onChange={ (e) => setMarcarcarConsulta( prev => ({...prev, medicoId: parseInt(e.target.value) }))}
                        >
                            <option>selecione</option>
                            {medicos.map( (medico, index) => {
                                if(medico.id === marcarConsulta.medicoId){
                                    return <option value={medico.id} key={medico.name}>{medico.name}</option>
                                }else{
                                    return <option value={medico.id} key={medico.name}>{medico.name}</option>
                                }
                            })}
                        </select>
                    </div>
                    <div className="marcar-consulta-form-item">
                        <label>Motivo da consulta: </label>
                        <textarea
                            className="form-item-textarea"
                            value={marcarConsulta.description}
                            onChange={ e => setMarcarcarConsulta( prev => ({ ...prev, description: e.target.value}))}
                        >
                        </textarea>
                    </div>

                    <div className="marcar-consulta-form-button">
                        <button className="marcar-consulta-btn" onClick={ marcarConsultaHandler }>Confirmar Solicitação</button>
                    </div>
                </form>

            </section>
        </main>
    );
}
