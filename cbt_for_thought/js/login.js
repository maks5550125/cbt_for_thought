const loginWrapper = document.querySelector('.login');
const loginForm = loginWrapper.querySelector('.login__form');
const submitBtn = loginForm.querySelector('.login__submit');

loginForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const loginData = new FormData(loginForm);
    
    const apiKey = 'AIzaSyDEs-xxkamhfqjdulZugYj3SIVNB1qMutU';

    fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
        method: 'POST',
        body: JSON.stringify({
            email: loginData.get('email'),
            password: loginData.get('password'),
            returnSecureToken: true,
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(responce => responce.json())
    .then(data => {
        if (data.idToken) {
            loginWrapper.classList.add('_hidden');
        } else {
            submitBtn.style.backgroundColor = 'red';

            loginForm.password.value = '';

            setTimeout(() => submitBtn.style.backgroundColor = '#90ee90', 500);
        }
    });
})