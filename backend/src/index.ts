
import { AppDataSource } from "./data-source";
import express from "express";
import {notFoundErrorHandler, asyncErrorHandler } from './middlewares/errorHandler';
import { agendamentoRouter } from "./routes/agendamento.router";
import { userRouter } from "./routes/user.router";
import { solicitacaoRouter } from "./routes/solicitacao.router";
import { medicoRouter } from "./routes/medico.router";
import { especialidadeRouter } from "./routes/especialidade.router";
import { tipoUsuarioRouter } from "./routes/tipoUsuario.router";

AppDataSource.initialize()
.then(async () => {
   console.log('AppDatasource has been initialized')

})
.catch(error => console.log(error));

const app = express();



// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// ROUTES
app.use('/api/usuario', userRouter);
app.use('/api/usuario/tipo', tipoUsuarioRouter);
app.use('/api/especialidade', especialidadeRouter);
app.use('/api/medico', medicoRouter);
app.use('/api/agendamento', agendamentoRouter);
app.use('/api/solicitacao', solicitacaoRouter);


// ERROR HANDLER
app.use(notFoundErrorHandler);
app.use(asyncErrorHandler);


app.listen(4000)