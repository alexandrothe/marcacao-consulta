import "./marcar_consulta.scss";

function MarcarConsulta(){
    return(
        <form id="marcar-consulta-form">
            <div class="marcar-consulta-form-item">
                <label>Especialidade: </label>
                {/* <!-- <select>
                    <option> Selecione </option>
                </select> --> */}
                <div class="custom-select-container">
                    <div class="custom-select-value">
                        <p>Babaji</p>
                    </div>
                    <div class="custom-select-option-list">
                        <div class="custom-select-option-item">1</div>
                        <div class="custom-select-option-item">2</div>
                        <div class="custom-select-option-item">3</div>
                        <div class="custom-select-option-item">4</div>
                    </div>
                </div>
            </div>
            <div class="marcar-consulta-form-item">
                <label>Médico: </label>
                {/* <!-- <select>
                    <option> Selecione </option>
                </select> --> */}
            </div>
            <div class="marcar-consulta-form-checkbox">
                <h4>Selecione sua prioridade:</h4>
                <div class="consulta-form-checkbox-list">
                    <label>
                        <input type="checkbox" name="prioridade" />
                        Hipertenso
                    </label>
                    <label>
                        <input type="checkbox" name="prioridade" />
                        Diabético
                    </label>
                </div>

            </div>
            
            <div class="marcar-consulta-form-buttons">
                <button>Limpar</button>
                <button>Enviar</button>
            </div>
        </form>
    );
}

export default MarcarConsulta;