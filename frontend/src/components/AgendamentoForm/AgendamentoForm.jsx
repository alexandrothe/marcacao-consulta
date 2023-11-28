import "./AgendamentoForm.scss";


export default function AgendamentoForm({setAgendamentoDate, agendamentoDate, formError}) {
    return (
      <form className="agendar-solicitacao-form" onSubmit={ e => e.preventDefault() }>
        <div className="agendar-form-item">
          <label htmlFor="date-input">Data:</label>
          <input
            type="text"
            id="date-input"
            maxLength={10}
            value={agendamentoDate.dtAgendamento}
            placeholder="dia / mes / ano"
            onChange={ (e) => {
              setAgendamentoDate( prev => {
  
                if(e.target.value.length < prev.dtAgendamento.length){
                  return {...prev, dtAgendamento: e.target.value}
                }
  
                if(e.target.value.length === 2 || e.target.value.length === 5){
                  return {...prev, dtAgendamento: e.target.value + '/' }
                }
                
                return {...prev, dtAgendamento: e.target.value}
              });
            }}
          />
          {formError.target === "DATA_CONSULTA" && (
            <p>{formError.message}</p>
          )}
        </div>
        <div className="agendar-form-item">
          <label>Hora: </label>
          <div className="agendar-form-hora">
            <input
              type="text"
              placeholder="24"
              value={agendamentoDate.hour}
              maxLength={2}
              onChange={ (e) => {
                setAgendamentoDate( prev => ({...prev , hour: e.target.value}))
              }}
            />
            <span>:</span>
            <input
              type="text"
              placeholder="00"
              value={agendamentoDate.min}
              maxLength={2}
              onChange={ (e) => {                
                setAgendamentoDate( prev => ({...prev , min: e.target.value }))   
              }}
            />
          </div>
          {formError.target === "HORA_CONSULTA" && (
            <p>{formError.message}</p>
          )}
        </div>
    </form>
    );
  }
  