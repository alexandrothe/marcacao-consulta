import './login.scss';

function Login(){
    return(
        <div class="login-page-container">
            <div class="login-box-container">
                <div class="login-box-header">
                    <h1>Login no App</h1>
                </div>

                <form id="login-form" >
                    <div class="login-input-field">
                        <label for="identificacao-input">CPF ou numero cartão </label>
                        <div class="input-container">
                            <input type="text" id="identificacao-input"/>
                            <div class="input-container-icon">
                                <i class="fa-solid fa-envelope"></i>
                            </div>
                        </div>
                        <div class="error-message" id="identificacao-error-message">Campo acima não pode estar vazio</div>
                    </div>
                    <div class="login-input-field">
                        <label for="senha-input">Senha: </label>
                        <div class="input-container">
                            <input type="password" id="senha-input" />
                            <div class="input-container-icon" id="password-visibility-icon">
                                <i class="fa-solid fa-eye" id="senha-icon"></i>
                            </div>
                        </div>
                        <div class="error-message" id="senha-error-message">Campo acima não pode estar vazio</div>
                    </div>

                    <button id="form-login-btn">Login</button>
                </form>

                <div class="login-box-ruler"></div>

                <div class="login-box-footer">
                    <p>Ainda não tem cadastro? <a href="/login">login</a> </p>
                </div>
            </div>
        </div>
    );
}
export default Login;