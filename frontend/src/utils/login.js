const passwordInput = document.getElementById('senha-input');
const loginBtn = document.getElementById('form-login-btn');
const loginForm = document.getElementById('login-form');
const indentificationInput = document.getElementById('identificacao-input');
const visibilityIcon = document.getElementById('senha-icon');
const passwordVisibilityIcon = document.getElementById('password-visibility-icon');
const identificationErrorMessage = document.getElementById('identificacao-error-message');
const senhaErrorMessage = document.getElementById('senha-error-message');




// prevent login from submitin ( defualt action );
loginForm.onsubmit = (e) => e.preventDefault();


// when the use want to hide and show the password while typing
function handlePasswordVisibility(){
    const listaClass = visibilityIcon.getAttribute('class').split(" "); // ex: ["fa-solid", "fa-eye"]
    
    if (listaClass[1] === 'fa-eye'){
        visibilityIcon.classList.replace('fa-eye','fa-eye-slash');
        passwordInput.type = 'text'
    }
    else{
        visibilityIcon.classList.replace('fa-eye-slash','fa-eye');
        passwordInput.type = 'password'
    }
}

function loginValidator(indentfication, password){

    if(indentfication === ""){
        identificationErrorMessage.textContent = "Campo indentificação acima não pode estar vazio.";
        return false;
    }

    if(password === ""){
        senhaErrorMessage = "Campo passowrd acima não pode estar vazio.";
        return false;
    }

    return true;

}


passwordVisibilityIcon.addEventListener('click', handlePasswordVisibility);

loginBtn.addEventListener('click', () => {

    const isLoginOk = loginValidator(indentificationInput.value, passwordInput.value);

    if(isLoginOk){
        console.log('input is ok');
    }
});