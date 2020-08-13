const loginForm = document.querySelector('#loginForm');
const signupForm = document.querySelector('#signupForm');

export class loginValidator {
    constructor(){
        this.emailExp = new RegExp('^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$');

        if( loginForm !== null ) this.loginSubmitEvent();
        if( signupForm !== null ) this.signupSubmitEvent();
    };

    loginSubmitEvent(){
        loginForm.addEventListener('submit', (e) => {
            const inputsForm = e.target.children;
            const email = inputsForm[0];
            const password = inputsForm[1];

            if( email.value === '' || password.value == '' ){
                e.preventDefault();
                formContainer.classList.add('show-alert');
                alertText.innerHTML = '<p>Complete los datos faltantes</p>';
            }

            for( const element of inputsForm ){
                if(  element.type !== 'submit' && element.value === '' ) element.classList.add('input-alert');
                else element.classList.remove('input-alert');
            }

            if( email.value !== '' && !this.emailExp.test( email.value ) ){
                e.preventDefault();
                formContainer.classList.add('show-alert');
                alertText.innerHTML = alertText.innerHTML + '<p>Ingrese un formato de email válido</p>';
                email.classList.add('input-alert');
            }
            
        });
    }

    signupSubmitEvent(){
        signupForm.addEventListener('submit', (e) => {
            const inputsForm = e.target.children;
            const name = inputsForm[0];
            const lastname = inputsForm[1];
            const email = inputsForm[2];
            const password = inputsForm[3];

            // Validacion para algun campo vacio
            if( name.value === '' || lastname.value === '' || email.value === '' || password.value === '' ){
                e.preventDefault();
                formContainer.classList.add('show-alert');
                alertText.innerHTML = '<p>Complete los datos faltantes</p>';
            }

            // Determinar que campo esta vacio para resaltarlo
            // Hice este por separado al anterior para no repetir varias las lineas anteriores
            for( const element of inputsForm ){
                if(  element.type !== 'submit' && element.value === '' ) element.classList.add('input-alert');
                else element.classList.remove('input-alert');
            }

            // Valida si el formato de correo es correcto
            if( email.value !== '' && !this.emailExp.test( email.value ) ){
                e.preventDefault();
                formContainer.classList.add('show-alert');
                alertText.innerHTML = alertText.innerHTML + '<p>Ingrese un formato de email válido</p>';
                email.classList.add('input-alert');
            }
        });
    }

}




// SE PUEDE SIMPLIFICAR MEJOR!! DESPUES VEO COMO