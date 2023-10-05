import Header from './components/Header/Header';
import ConsultaItem from './components/ConsultaItem/ConsultaItem';
import './App.scss'

function App() {

    return (
        <>
        <Header />
        <main>
            <div class="consulta-container">
                <div class="consulta-container-header">
                    <p>Suas consultas:</p>
                </div>
                <div class="consulta-container-body">
                    {
                        Array.from({length:8}, (v, k) => {
                            return(
                                <ConsultaItem />
                            );
                        })
                    }
                </div>
            </div>
        </main>
        
        </>

    )
}

export default App
