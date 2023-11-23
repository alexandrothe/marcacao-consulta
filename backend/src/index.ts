
import { AppDataSource } from "./data-source";
import express from "express";
import {notFoundErrorHandler, asyncErrorHandler } from './middlewares/errorHandler';
import { agendamentoRouter } from "./routes/agendamento.router";
import { userRouter } from "./routes/user.router";
import { solicitacaoRouter } from "./routes/solicitacao.router";
import { medicoRouter } from "./routes/medico.router";
import { especialidadeRouter } from "./routes/especialidade.router";
import { tipoUsuarioRouter } from "./routes/tipoUsuario.router";
import cors from "cors";


AppDataSource.initialize()
.then(async () => {
   console.log('AppDatasource has been initialized')

})
.catch(error => console.log(error));

const app = express();



// MIDDLEWARES
app.use(cors({
   origin: ['http://localhost:5173/'],
   methods: ["GET", "POST", "DELETE", "PUT"]
}));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

// ROUTES
app.use('/api/v1/usuario', userRouter);
app.use('/api/v1/usuario/tipo', tipoUsuarioRouter);
app.use('/api/v1/especialidade', especialidadeRouter);
app.use('/api/v1/medico', medicoRouter);
app.use('/api/v1/agendamento', agendamentoRouter);
app.use('/api/v1/solicitacao', solicitacaoRouter);


// ERROR HANDLER
app.use(notFoundErrorHandler);
app.use(asyncErrorHandler);


app.listen(4000)