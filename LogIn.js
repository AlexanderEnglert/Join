import { app, database, ref, get, child, set } from './SignUp.js';
const BaseUrl = "https://join-317-default-rtdb.europe-west1.firebasedatabase.app/";
let matchingUser;
window.loginUser = loginUser;
window.addInputListeners = addInputListeners;
window.guestLogIN = guestLogIN;
window.loadRememberedData = loadRememberedData
window.logInAnimation = logInAnimation
fetchContactTask()

/**
 * The current password and email are read out here and if the data is not found, the border of the email container changes to red.
 * 
 * @returns 
 */
function logInvalidateEmail() {
    const emailInputElement = document.getElementById("emailInput");
    const emailContainer = emailInputElement.closest(".LoginInputIcon");
    const emailInput = emailInputElement.value;
    const usersRef = ref(database, 'users');
    logInvalidateEmail1(emailInput, emailContainer)
    get(usersRef).then((snapshot) => {
        logInvalidateEmail2(snapshot, emailInput, emailContainer)
    }).catch(() => {
        emailContainer.style.border = '1px solid red'; 
    });
}


async function fetchContactTask(){
     // Lösche alte Arrays aus dem localStorage
     localStorage.removeItem('taskAllArray');       // Entferne das alte 'taskAllArray'
     localStorage.removeItem('contactAllArray');    // Entferne das alte 'contactAllArray'
 
     // Initialisiere die neuen Arrays
 
     // Setze die Pfade für die Firebase-Abfragen
     let pathcontact1 = 'tasksAll';
     let pathcontact2 = 'contactall';
 
     // Lade die Daten von tasksAll
     let Summaryall = await fetch(BaseUrl + pathcontact1 + '.json');
     let Summaryallshow = await Summaryall.json();
 
     // Lade die Daten von contactall
     let Contactall = await fetch(BaseUrl + pathcontact2 + '.json');
     let Contactallshow = await Contactall.json();
 
     // Speichere die Daten lokal in Arrays
     let taskAllArray = [];
     let contactAllArray = [];
 
     // Iteriere durch die empfangenen Daten und fülle taskAllArray
     for (let key in Summaryallshow) {
         taskAllArray.push(Summaryallshow[key]);
     }
 
     // Iteriere durch die empfangenen Daten und fülle contactAllArray
     for (let key in Contactallshow) {
         contactAllArray.push(Contactallshow[key]);
     }
 
     // Speichere die Arrays im localStorage
     localStorage.setItem('taskAllArray', JSON.stringify(taskAllArray));
     localStorage.setItem('contactAllArray', JSON.stringify(contactAllArray));
}

/**
 * If the email field is empty, the border of the container will turn black.
 * 
 * @param {*} emailInput 
 * @param {*} emailContainer 
 * @returns 
 */
function logInvalidateEmail1(emailInput, emailContainer){
    if (emailInput.trim() === '') {
        emailContainer.style.border = '1px solid black';
        matchingUser = null;
        return;
    }
}


/**
 * If the email field is empty when logging in, the border of the container is black and if entered incorrectly it is red.
 * 
 * @param {*} snapshot 
 * @param {*} emailInput 
 * @param {*} emailContainer 
 */
function logInvalidateEmail2(snapshot, emailInput,emailContainer){
    if (snapshot.exists()) {
        const usersData = snapshot.val();
        matchingUser = Object.values(usersData).find(user => user.email === emailInput);
        if (matchingUser) {
            emailContainer.style.border = '1px solid black';
        } else {
            emailContainer.style.border = '1px solid red'; 
        }
    } else {
        emailContainer.style.border = '1px solid red'; 
    }
}


/**
 * If the password field is empty when logging in, the border of the container is black, 
 * if it is entered incorrectly it is red and if it is correct it is blue.
 * 
 * @returns 
 */
function logInvalidatePassword() {
    const passwordInputElement = document.getElementById("passwordInput1");
    const passwordContainer = passwordInputElement.closest(".LoginInputIcon");
    const passwordInput = passwordInputElement.value;
    if (passwordInput.trim() === '') {
        passwordContainer.style.border = '1px solid black';
        return;
    }
    if (matchingUser && matchingUser.password === passwordInput) {
        passwordContainer.style.border = '1px solid #29ABE2';
    } else {
        passwordContainer.style.border = '1px solid red'; 
    }
}


/**
 * Adds two add event listeners to the two input fields. The first is responsible for when the field is clicked to enter text and
 * the second, when you leave the field, the original state is restored.
 * 
 */
function addInputListeners() {
    const emailInputElement = document.getElementById("emailInput");
    emailInputElement.addEventListener('input', logInvalidateEmail);
    emailInputElement.addEventListener('blur', resetEmailBorderOnBlur);
    const passwordInputElement = document.getElementById("passwordInput1");
    passwordInputElement.addEventListener('input', logInvalidatePassword);
    passwordInputElement.addEventListener('blur', resetPasswordBorderOnBlur);
}

/**
 * When you leave the field, the border is set to black.
 * 
 */
function resetEmailBorderOnBlur() {
    const emailInputElement = document.getElementById("emailInput");
    const emailContainer = emailInputElement.closest(".LoginInputIcon");
    emailContainer.style.border = '1px solid black';
}


/**
 * When you leave the field, the border is set to black.
 * 
 */
function resetPasswordBorderOnBlur() {
    const passwordInputElement = document.getElementById("passwordInput1");
    const passwordContainer = passwordInputElement.closest(".LoginInputIcon");
    passwordContainer.style.border = '1px solid black';
}


/**
 * Data is retrieved from the input fields and transferred to the functions.
 * 
 */
function loginUser() {
    const emailInputElement = document.getElementById("emailInput");
    const passwordInputElement = document.getElementById("passwordInput1");
    const rememberMeChecked = document.getElementById("rememberMe").checked;
    const emailInput = emailInputElement.value;
    const passwordInput = passwordInputElement.value;
    loginUser1(rememberMeChecked)
    const usersRef = ref(database, 'users');
    get(usersRef).then((snapshot) => {
        if (snapshot.exists()) {
            loginUser2(emailInput, passwordInput)
        } else {
            userInformationPopUp('Keine Benutzer gefunden.')
        }})
}


/**
 * Here, data such as email, encrypted password and the click on the Rememberfield are saved in local storage.
 * If Rememberfield is not ticked, the data will not be saved
 * 
 * @param {*} rememberMeChecked 
 */
function loginUser1(rememberMeChecked){
    if (rememberMeChecked) {
        localStorage.setItem('rememberedEmail', emailInput);
        localStorage.setItem('rememberedPassword', encryptPassword(passwordInput));
        localStorage.setItem('rememberMeChecked', 'true'); 
    } else {
        localStorage.removeItem('rememberedEmail'); 
        localStorage.removeItem('rememberedPassword');
        localStorage.setItem('rememberMeChecked', 'false');
    }
}


/**
 * This function checks whether the email and password in the login match a user in the database.
 * If this is the case, the current user with the name is saved in an array in the local storage.
 * 
 * @param {*} emailInput 
 * @param {*} passwordInput 
 */
function loginUser2(emailInput, passwordInput){
    const usersData = snapshot.val();
    const matchingUser = Object.values(usersData).find(user => 
        user.email === emailInput);
    if (matchingUser) {
        if (matchingUser.password === passwordInput) {
            localStorage.removeItem('CurrentUser');
            let decodedName = decodeURIComponent(matchingUser.name);
            localStorage.setItem('CurrentUser', JSON.stringify(decodedName));
            window.location.href = `/htmls/summary.html`;
        } else {
            userInformationPopUp('Passwort ist falsch!')}
    } else {
        userInformationPopUp('E-Mail existiert nicht!')}
}


/**
 * The password is encrypted using Base64 and returned. 
 * 
 * @param {*} password 
 * @returns 
 */
function encryptPassword(password) {
    return btoa(password);
    
}


/**
 * Converts the Base64-encoded password back to plain text and returns it.
 * 
 * @param {*} encryptedPassword 
 * @returns 
 */
function decryptPassword(encryptedPassword) {
    const decodedPassword = atob(encryptedPassword); 
    return decodedPassword;
    
}


/**
 * First of all, the stored values are retrieved from the localStorage and stored in variables. 
 * Then the values are loaded into the input fields except for the checkbox, where it is first checked whether it is true.
 * 
 */
function loadRememberedData() {
    const rememberedEmail = localStorage.getItem('rememberedEmail'); 
    const rememberedPassword = localStorage.getItem('rememberedPassword');
    const rememberMeChecked = localStorage.getItem('rememberMeChecked'); 
    if (rememberedEmail) {
        document.getElementById('emailInput').value = rememberedEmail;
    }
    if (rememberedPassword) {
        document.getElementById('passwordInput').value = decryptPassword(rememberedPassword);
    }
    if (rememberMeChecked === 'true') {
        document.getElementById('rememberMe').checked = true;
    }
}


/**
 * If the button with the guest access was pressed in the login, the local storage 
 * the CurrentUser array is deleted and then recreated with the CurrentUser Guest.
 * The current CurrentUser is also transferred to the summary.html file. 
 * 
 */
function guestLogIN(){
    let matchingUser = 'Guest'
    localStorage.removeItem('CurrentUser');
    localStorage.setItem('CurrentUser', JSON.stringify(matchingUser));
    window.location.href = `/htmls/summary.html?name=${encodeURIComponent(matchingUser)}`;
}


/**
 * Here, the body and the JoinLogo are assigned to a variable. The first animation causes the logo to move to the top left.
 * The second animation fades in the remaining content with a delay and ensures that scrolling is possible again.
 * 
 */
export function logInAnimation(){
    const logo = document.querySelector('.JoinLogoStyle');
    const body = document.body;
    setTimeout(() => {
        logo.classList.add('logo-move');
        setTimeout(() => {
            body.classList.add('show-content');
            body.style.overflow = 'auto'; 
        }, 1000);
    }, 400);
}