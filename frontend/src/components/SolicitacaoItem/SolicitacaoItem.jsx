import { FaUserDoctor } from "react-icons/fa6";
import { FaCalendarAlt } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaRedo } from "react-icons/fa";
import "./SolicitacaoItem.scss";


const SolicitacaoItem = ({ solicitacao }) => {
  const { medico, especialidade, usuario } = solicitacao;

  const deleteSolicitacaoHandler = async () => {
    const deleteSolicitacaoRequest = await fetch(`http://localhost:4000/api/v1/solicitacao/delete/${solicitacao.id}`,{ method: "DELETE"});
    const deleteSolicitacaoResponse = await deleteSolicitacaoRequest.json();

    if(deleteSolicitacaoResponse.ok){
      location.reload();
    }

  }

  return(
    <div className='solicitacao-item-container'>
      <div className='solicitacao-item-header'>
        <h3>{especialidade.nome}</h3>
      </div>
      <div className='solicitacao-item-information'>
        <div className='solicitacao-info-medico'>
          <div className='medico-icon'>
            <FaUserDoctor />
          </div>
          <p>Dr. {medico.nome}</p>
        </div>

        <div className='solicitacao-info-data'>
          <div className='date-icon'>
            <FaCalendarAlt />
          </div>
          <p>{solicitacao.dtSolicitacao}</p>
        </div>

        <div className='solicitacao-info-situacao'>
          <h4>Situação:</h4>
          <p className='agendamento'>Em analíse</p>
        </div>

        <div className='solicitacao-item-buttons'>
          <button className='update-solicitacao-btn'>
            <FaRedo />
          </button>
          <button className='delete-solicitacao-btn' onClick={ deleteSolicitacaoHandler }>
            <FaRegTrashAlt />
          </button>
        </div>
      </div>
    </div>
    );
  }

  export default SolicitacaoItem;