/* window.location.href = "https://www.example.com"; // Bu yerda maqsadli sayt URL-ni kiriting */


const usernameInput = document.getElementById('usernameInput')
const passwordInput = document.getElementById('passwordInput')
const emailInput = document.getElementById('emailInput')
const loginBtn = document.getElementById('loginBtn')

const passwordShowHideBtn = document.getElementById('passwordShowHideBtn')
const eyeIcon = document.getElementById('eyeIcon')

let userName = localStorage.getItem("UserName") || []
let userEmail = localStorage.getItem("UserEmail") || []
let userPassword = localStorage.getItem("UserPassword") || []

const setNameToStorage = () => {
    localStorage.setItem("UserName", JSON.stringify(userName))
}

const setPasswordToStorage = () => {
    localStorage.setItem("UserPassword", JSON.stringify(userPassword))
}

const setEmailToStorage = () => {
    localStorage.setItem("UserEmail", JSON.stringify(userEmail))
}

loginBtn.addEventListener('click', ()=> {
    if (!usernameInput.value || !passwordInput.value || !emailInput.value) {
        alert("Iltimos Barcha Maydonlarni To'ldiring!")
        return ''
    }
    if (userName.includes(usernameInput.value)) {
        window.location.href = "index.html"
        return ''
    } 
    userName.push(usernameInput.value.trim())
    userPassword.push(passwordInput.value.trim())
    userEmail.push(emailInput.value.trim())
    setNameToStorage()
    setPasswordToStorage()
    setEmailToStorage()
    
})

passwordInput.addEventListener('keydown', (e)=> {
    if (e.key === "Enter") {
        if (!usernameInput.value || !passwordInput.value || !emailInput.value) {
            alert("Iltimos Barcha Maydonlarni To'ldiring!")
            return ''
        }
        if (userName.includes(usernameInput.value.trim())) {
            window.location.href = "index.html"
            return ''
        } 
        
        userName.push(usernameInput.value.trim())
        userPassword.push(passwordInput.value.trim())
        userEmail.push(emailInput.value.trim())
        setNameToStorage()
        setPasswordToStorage()
        setEmailToStorage()
        window.location.href = "index.html"
        
    }
})

document.addEventListener('DOMContentLoaded', ()=> {
    if (localStorage.key("UserName")) {
        window.location.href = "index.html"
    }
})

passwordShowHideBtn.addEventListener('click', () => {
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        return ''
    }
    passwordInput.type = "password";
    
    eyeIcon.classList.toggle("ri-eye-line");
    eyeIcon.classList.toggle("ri-eye-off-line");
});

// show hide btn > i class ri-eye-off-line