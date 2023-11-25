import SolicitacaoItem from "../../components/SolicitacaoItem/SolicitacaoItem";
import "./Home.scss";

export default function Home(){
    return(
        <main className="home-page-main">
            <section className="home-page-section">
                <div className="home-page-section-header">
                    <h1>Suas consultadas</h1>
                </div>
                <div className="home-page-consultas-body">
                    <div className="consultas-list">
                        {Array.from({ length: 10}, (value, index) => (
                            <SolicitacaoItem key={index} />
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}