import { FaUser, FaUserDoctor } from "react-icons/fa6";
import { FaCalendarAlt } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaRedo } from "react-icons/fa";
import PopUp from "../PopUp/PopUp";
import { useState } from "react";
import { checkAgendamentoDate, convertDateToDDMMYYYY, convertDateToYYYYMMDD } from "../../utils/formatDate";
import { validateTime } from "../../utils/validateTime";
import AgendamentoForm from "../AgendamentoForm/AgendamentoForm";
import "./SolicitacaoItem.scss";
import { Link } from "react-router-dom";

const SolicitacaoItem = ({ solicitacao, tipoUsuario }) => {
  const [popUpStatus,setPopUpStatus] = useState(false);
  const [agendamentoDate, setAgendamentoDate] = useState({dtAgendamento: "", hour: "", min: ""});
  const [ formError, setFormError] = useState({target:"", message: ""});
  const { medico, especialidade, agendamento, usuario, } = solicitacao;
  const [hour, min] = agendamento.hrAgendamento.split(':');

  
  const deleteSolicitacaoHandler = async () => {
    const deleteSolicitacaoRequest = await fetch(`http://localhost:4000/api/v1/solicitacao/delete/${solicitacao.id}`,{ method: "DELETE"});
    const deleteSolicitacaoResponse = await deleteSolicitacaoRequest.json();

    if(deleteSolicitacaoResponse.ok){
      location.reload();
    }

  }

  const agendarSolicitacaoHandler = async () => {
    const {dtAgendamento, hour, min} = agendamentoDate;
    const isDateOk = checkAgendamentoDate(dtAgendamento);
    const isTimeOk = validateTime(`${hour}:${min}`);

    if(isDateOk && isTimeOk){
      const formatedDate = convertDateToYYYYMMDD(dtAgendamento); // DD/MM/YYYY to YYYY/MM/DD

      const agendarSolicitacaoRequest = await fetch(`http://localhost:4000/api/v1/agendamento/create`,{
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          solicitacaoId: solicitacao.id,
          usuarioId: usuario.id,
          dtAgendamento: formatedDate,
          hrAgendamento: `${hour}:${min}:00`
        })
      });

      const agendarSolicitacaoResponse = await agendarSolicitacaoRequest.json();
  
      if(agendarSolicitacaoResponse.ok){
        location.reload();
      }
    }
    else if (!isDateOk){
      setFormError({ 
        target: "DATA_CONSULTA",
        message: "Data da consulta está inválida"
      });
    }
    else{
      setFormError({ 
        target: "HORA_CONSULTA",
        message: "Hora da consulta está inválida"
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
            {tipoUsuario === "PACIENTE" ? (
              <>
                <div className="medico-icon">
                  <FaUserDoctor />
                </div>
                <p>Dr. {medico.name}</p>
              </>
            ):(
              <>
                <div className="paciente-icon">
                  <FaUser />
                </div>
                <p>{usuario.name}</p>
              </>
            )}
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
              <p className="agendamento">Agendado</p>
            ):(
              <p className='analise'>Em analíse</p>
            )}
          </div>

          { agendamento && (
            <div className="agendamento-info">
              <div className="agendamento-info-date">
                <h4>Data Agendamento: </h4>
                <p>{convertDateToDDMMYYYY(agendamento.dtAgendamento)}</p>
              </div>
              <div className="agendamento-info-time">
                <h4>Hora Agendamento: </h4>
                <p>{`${hour}:${min}`}</p>
              </div>
            </div>
          )}
        
          <div className="solicitacao-info-motivo">
            <h4>Motivo da soliticação: </h4>
            <p>{solicitacao.description}</p>
          </div>

          <div className='solicitacao-item-buttons'>
            { tipoUsuario === "PACIENTE" ? (
              <>
                <Link to={`${solicitacao.id}/update-consulta`} className='update-solicitacao-btn'>
                  <FaRedo />
                </Link>
                <button className='delete-solicitacao-btn' onClick={ deleteSolicitacaoHandler }>
                  <FaRegTrashAlt />
                </button>
              </>
            ):(
              <>
                {agendamento ? (
                  <>
                    <button className="update-agendamento-btn">
                      <FaRedo />
                    </button>
                    <button className="deletar-agendamento-btn" onClick={ deletarAgendamentoHandler }>
                      cancelar agendamento
                    </button>
                  </>
                ):(
                  <button className="agendar-solicitacao-btn" onClick={ () => setPopUpStatus(true)}>
                    agendar 
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <PopUp
        headerName={"Agendar Consulta"}
        popUpStatus={popUpStatus}
        setPopUpStatus={setPopUpStatus}
        popUpConfirmHandler={ agendarSolicitacaoHandler }>
        <AgendamentoForm
          setAgendamentoDate={setAgendamentoDate}
          agendamentoDate={agendamentoDate}
          formError={formError}/>
      </PopUp>
    </>
    );
  }

  export default SolicitacaoItem;