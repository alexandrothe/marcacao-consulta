import { FaUserDoctor } from "react-icons/fa6";
import { FaCalendarAlt } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaRedo } from "react-icons/fa";
import PopUp from "../PopUp/PopUp";
import { useState } from "react";
import { checkDate, convertDateToDDMMYYYY, convertDateToYYYYMMDD } from "../../utils/formatDate";
import "./SolicitacaoItem.scss";


const SolicitacaoItem = ({ solicitacao, tipoUsuario }) => {
  const [popUpStatus,setPopUpStatus] = useState(false);
  const [agendamentoDate, setAgendamentoDate] = useState("");
  const [ formError, setFormError] = useState({target:"", message: ""});
  const { medico, especialidade, agendamento, usuario, } = solicitacao;

  
  const deleteSolicitacaoHandler = async () => {
    const deleteSolicitacaoRequest = await fetch(`http://localhost:4000/api/v1/solicitacao/delete/${solicitacao.id}`,{ method: "DELETE"});
    const deleteSolicitacaoResponse = await deleteSolicitacaoRequest.json();

    if(deleteSolicitacaoResponse.ok){
      location.reload();
    }

  }

  const agendarSolicitacaoHandler = async () => {

    const isDateOk = checkDate(agendamentoDate);

    if(isDateOk){
      const formatedDate = convertDateToYYYYMMDD(agendamentoDate); // DD/MM/YYYY to YYYY/MM/DD

      const agendarSolicitacaoRequest = await fetch(`http://localhost:4000/api/v1/agendamento/create`,{
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          solicitacaoId: solicitacao.id,
          usuarioId: usuario.id,
          dtAgendamento: formatedDate
        })
      });

      const agendarSolicitacaoResponse = await agendarSolicitacaoRequest.json();
  
      if(agendarSolicitacaoResponse.ok){
        location.reload();
      }
    }
    else{
      setFormError({ 
        target: "DATA_CONSULTA",
        message: "Data da consulta está inválida"
      });
    }
  }

  const deletarAgendamentoHandler = async () => {
    
    const deletarAgendamentoRequest = await fetch(`http://localhost:4000/api/v1/agendamento/delete/${agendamento.id}`,{
      method: "DELETE"
    });
    const deletarAgendamentoResponse = await deletarAgendamentoRequest.json();

    if(deletarAgendamentoResponse.ok){
      location.reload();
    }

  }
  

  return(
    <>
    
      <div className='solicitacao-item-container'>
        <div className='solicitacao-item-header'>
          <h3>{especialidade.nome}</h3>
        </div>
        <div className='solicitacao-item-information'>
          <div className='solicitacao-info-medico'>
            <div className='medico-icon'>
              <FaUserDoctor />
            </div>
            <p>Dr. {medico.name}</p>
          </div>

          <div className='solicitacao-info-data'>
            <div className='date-icon'>
              <FaCalendarAlt />
            </div>
            <p>{convertDateToDDMMYYYY(solicitacao.dtSolicitacao)}</p>
          </div>

          <div className='solicitacao-info-situacao'>
            <h4>Situação:</h4>
            { agendamento ? (
              <>
                <p className="agendamento">Agendado</p>
              </>
            ):(
              <p className='analise'>Em analíse</p>
            )}
          </div>
          

          <div className="solicitacao-info-motivo">
            <h4>Motivo da soliticação: </h4>
            <p>{solicitacao.description}</p>
          </div>

          <div className='solicitacao-item-buttons'>
            { tipoUsuario === "PACIENTE" ? (
              <>
                <button className='update-solicitacao-btn'>
                  <FaRedo />
                </button>
                <button className='delete-solicitacao-btn' onClick={ deleteSolicitacaoHandler }>
                  <FaRegTrashAlt />
                </button>
              </>
            ):(
              <>
                {agendamento && (
                  <button className="deletar-agendamento-btn" onClick={ deletarAgendamentoHandler }>
                    cancelar agendamento
                  </button>
                )}
                <button className="agendar-solicitacao-btn" onClick={ () => setPopUpStatus(true)}>
                  agendar 
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      <PopUp
        headerName={"Agendar Solicitação"}
        popUpStatus={popUpStatus}
        setPopUpStatus={setPopUpStatus}
        popUpConfirmHandler={ agendarSolicitacaoHandler }
      >
          <form className="agendar-solicitacao-form" onSubmit={ e => e.preventDefault() }>
              <div className="agendar-form-item">
                <label htmlFor="date-input">Data para Consulta:</label>
                <input
                  type="text"
                  id="date-input"
                  maxLength={10}
                  value={agendamentoDate}
                  placeholder="dia / mes / ano"
                  onChange={ (e) => {
                    setAgendamentoDate( prev => {

                      if(e.target.value.length < prev.length){
                        return e.target.value;
                      }

                      if(e.target.value.length === 2 || e.target.value.length === 5){
                        return e.target.value + '/'
                      }
                      
                      return e.target.value
                    });
                  }}
                />
                {formError.target === "DATA_CONSULTA" && (
                  <p>{formError.message}</p>
                )}
              </div>
          </form>
      </PopUp>
    </>
    );
  }

  export default SolicitacaoItem;