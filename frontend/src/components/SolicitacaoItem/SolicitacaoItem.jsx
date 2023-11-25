import { FaUserDoctor } from "react-icons/fa6";
import { FaCalendarAlt } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaRedo } from "react-icons/fa";
import "./SolicitacaoItem.scss";


 const SolicitacaoItem = ({}) => {
    return(
      <div className='solicitacao-item-container'>
        <div className='solicitacao-item-header'>
          <h3>Cirugião</h3>
        </div>
        <div className='solicitacao-item-information'>
          <div className='solicitacao-info-medico'>
            <div className='medico-icon'>
              <FaUserDoctor />
            </div>
            <p>Dr. Eduardo Silveira</p>
          </div>
          <div className='solicitacao-info-data'>
            <div className='date-icon'>
              <FaCalendarAlt />
            </div>
            <p>01/02/2005</p>
          </div>
          <div className='solicitacao-info-situacao'>
            <h4>Situação:</h4>
            <p className='agendamento'>Em analíse</p>
          </div>
        </div>
        <div className='solicitacao-item-buttons'>
          <button className='update-solicitacao-btn'>
            <FaRedo />
          </button>
          <button className='delete-solicitacao-btn'>
            <FaRegTrashAlt />
          </button>
        </div>
      </div>
    );
  }

  export default SolicitacaoItem;