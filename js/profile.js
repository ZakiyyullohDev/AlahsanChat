const userImgUpload = document.getElementById('userImgUpload');
const profileImg = document.getElementById('profileImg');

const userName = document.getElementById('userName');
const useremail = document.getElementById('userEmail');
const userAtName = document.getElementById('userAtName');
const editerBtnEmail = document.getElementById('editerBtnEmail');

const editerBtnAt = document.getElementById('editerBtnAt');
const editerBtn = document.getElementById('editerBtn');
const editerBtnName = document.getElementById('editerBtnName');

const imgSaveBtn = document.getElementById('imgSaveBtn');

userImgUpload.onchange = () => {
    const imageUrl = URL.createObjectURL(userImgUpload.files[0]);
    profileImg.src = imageUrl;
    profileImg.classList.add('user-profile-img');
    profileImg.setAttribute('width', '200px');
    profileImg.setAttribute('height', '200px');
};

imgSaveBtn.addEventListener('click', () => {
    try {
        if (profileImg.src) {
            localStorage.setItem("UserImgSource", profileImg.src);
        } else {
            alert("Xatolik Yuz Berdi. Iltimos Keyinroq Urinib Ko'ring!");
        }
    } catch (error) {
        console.error(error);
        alert("Xatolik Yuz Berdi. Iltimos Keyinroq Urinib Ko'ring!");
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const savedImgSrc = localStorage.getItem("UserImgSource");
    if (savedImgSrc) {
        profileImg.src = savedImgSrc;
        profileImg.classList.add('user-profile-img');
        profileImg.setAttribute('width', '200px');
        profileImg.setAttribute('height', '200px');
    }
});

if (localStorage.key("UserName")) {
    userName.textContent = JSON.parse(localStorage.getItem("UserName"))
}

if (localStorage.key("UserPassword")) {
    userPassword.textContent = JSON.parse(localStorage.getItem("UserPassword"))
}

if (localStorage.key("UserEmail")) {
    userEmail.textContent = JSON.parse(localStorage.getItem("UserEmail"))
}

editerBtnName.addEventListener('click', ()=> {
    userName.contentEditable = true
    userName.addEventListener('keydown', (e)=> {
        if (e.key === "Enter") {
            userName.contentEditable = false
            localStorage.setItem("UserName", userName.textContent)
        }
    })
})

editerBtnEmail.addEventListener('click', ()=> {
    userEmail.contentEditable = true
    userEmail.addEventListener('keydown', (e)=> {
        if (e.key === "Enter") {
            userEmail.contentEditable = false
            localStorage.setItem("UserEmauserEmail", userEmail.textContent)
        }
    })
})

editerBtnPassword.addEventListener('click', ()=> {
    userName.contentEditable = true
    userName.addEventListener('keydown', (e)=> {
        if (e.key === "Enter") {
            userName.contentEditable = false
            localStorage.setItem("UserName", userName.textContent)
        }
    })
})
