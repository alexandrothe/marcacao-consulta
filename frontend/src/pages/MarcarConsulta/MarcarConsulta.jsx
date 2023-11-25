import "./MarcarConsulta.scss";

export default function MarcarConsulta(){
    return(
        <main className="marcar-consulta-page">
            <section className="marcar-consulta-page-section">

                <div className="marcar-consulta-section-header">
                    <h1>Marcar Consulta</h1>
                </div>

                <form className="marcar-consulta-form">
                    <div className="marcar-consulta-form-item">
                        <label>Especialidade: </label>
                        <select className="form-item-select">
                            <option>Cirugiao</option>
                            <option>Ortopedista</option>
                        </select>
                    </div>
                    <div className="marcar-consulta-form-item">
                        <label>Medico: </label>
                        <select className="form-item-select">
                            <option>Pedro</option>
                            <option>Jão</option>
                        </select>
                    </div>
                    <div className="marcar-consulta-form-item">
                        <label>Motivo da consulta: </label>
                        <textarea className="form-item-textarea">
                           
                        </textarea>
                    </div>

                    <div className="marcar-consulta-form-button">
                        <button className="marcar-consulta-btn">Confirmar</button>
                    </div>
                </form>

            </section>
        </main>
    );
}
