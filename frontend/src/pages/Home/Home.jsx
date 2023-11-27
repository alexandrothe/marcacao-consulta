import { useEffect, useState } from "react";
import SolicitacaoItem from "../../components/SolicitacaoItem/SolicitacaoItem";
import { getCookie } from "../../utils/cookieManager";
import PopUp from "../../components/PopUp/PopUp"
import "./Home.scss";

export default function Home(){

    const [solicitacoes, setSolicitacoes] = useState([]);
    const [tipoUsuario, setTipoUsuario ] = useState("");

    useEffect(() => {
        const userCookie = getCookie('user');

        if(userCookie){
            const { crmCode, id } = JSON.parse(userCookie);
           
            if( crmCode){
                setTipoUsuario( prev => 'MEDICO');
            }else{
                setTipoUsuario( prev => 'PACIENTE');
            }
        }
    },[]);
    useEffect(() => {
        const { id } = JSON.parse(getCookie('user'));
       
        if(tipoUsuario){
    
    
            const getData = async () => {
                const solicitacaoListRequest = await fetch(`http://localhost:4000/api/v1/solicitacao/${tipoUsuario==="MEDICO" ? "medico":"paciente"}/list/${id}`);
                const solicitacaoListResponse = await solicitacaoListRequest.json();
    
                if(solicitacaoListResponse.ok){
                    
                    setSolicitacoes( prev => solicitacaoListResponse.solicitacaoes);
                }
    
            }
            getData()
    
        }


    }, [tipoUsuario]);
    return(
        <main className="home-page-main">
            <section className="home-page-section">
                <div className="home-page-section-header">
                    <h1>Suas consultadas</h1>
                </div>
                <div className="home-page-consultas-body">                   
                    <div className={`consultas-list`}>
                        {solicitacoes.map( (solicitacao, index) => (
                            <SolicitacaoItem
                                key={solicitacao.id}
                                solicitacao={solicitacao}
                                tipoUsuario={tipoUsuario}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}