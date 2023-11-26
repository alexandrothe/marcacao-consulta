import { useEffect, useState } from "react";
import SolicitacaoItem from "../../components/SolicitacaoItem/SolicitacaoItem";
import { getCookie } from "../../utils/cookieManager";
import "./Home.scss";

export default function Home(){

    const [solicitacoes, setSolicitacoes] = useState([]);

    useEffect(() => {

        const getData = async () => {

            const userId = JSON.parse(getCookie('user')).id;
            const solicitacaoListRequest = await fetch(`http://localhost:4000/api/v1/solicitacao/list/${userId}`);
            const solicitacaoListResponse = await solicitacaoListRequest.json();

            if(solicitacaoListResponse.ok){
                
                setSolicitacoes(solicitacaoListResponse.solicitacaoes);
            }

        }

        getData();

    }, []);
    return(
        <main className="home-page-main">
            <section className="home-page-section">
                <div className="home-page-section-header">
                    <h1>Suas consultadas</h1>
                </div>
                <div className="home-page-consultas-body">
                    <div className="consultas-list">
                        {solicitacoes.map( (solicitacao, index) => (
                            <SolicitacaoItem key={solicitacao.id} solicitacao={solicitacao}/>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}