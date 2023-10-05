import "./consulta_item.scss";

function ConsultaItem(){
    return(
        <div class="consulta-item-container">
            <div class="consulta-item-header">

                <div class="consulta-title-container">
                    <div class="circle-icon">
                        <i class="fa-solid fa-bookmark"></i>
                    </div>
                    <p class="consulta-title">Oftamologista</p>
                </div>

                <div class="consulta-date-container">
                    <p class="consulta-date">01/02/2005</p>
                    <div class="calendar-icon">
                        <i class="fa-solid fa-calendar-alt"></i>
                    </div>
                </div>

            </div>

            <div class="consulta-item-ruler"></div>

            <div class="consulta-item-body">
                <p class="consulta-info">
                    t's important to note that moderate consumption of soda is generally
                    not harmful, but excessive and daily intake, such as 2 liters per
                </p>
                <div class="doctor-container">
                    <div class="doctor-icon">
                        <i class="fa-solid fa-user-doctor"></i>
                    </div>
                    <p class="doctor-name">Jose ribamar</p>
                </div>
            </div>

            <div class="consulta-item-ruler"></div>

            <div class="consulta-item-bottom">
                <a class="posicao-btn consulta-item-btn">
                    <i class="fa-solid fa-location-dot"></i>
                </a>
                <a class="cancelar-btn consulta-item-btn">
                    <i class="fa-solid fa-trash-alt"></i>
                </a>
            </div>
        </div>
    );
}

export default ConsultaItem;