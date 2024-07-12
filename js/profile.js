const userImgUpload = document.getElementById('userImgUpload');
const profileImg = document.getElementById('profileImg');

const userName = document.getElementById('userName');
const userEmail = document.getElementById('userEmail');
const userAtName = document.getElementById('userAtName');
const editerBtnEmail = document.getElementById('editerBtnEmail');

const editerBtnAt = document.getElementById('editerBtnAt');
const editerBtnName = document.getElementById('editerBtnName');
const editerBtnPassword = document.getElementById('editerBtnPassword');

const imgSaveBtn = document.getElementById('imgSaveBtn');
const logOutBtn = document.getElementById('logOutBtn');

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
            alert("Rasm Saqlandi!");
            return '';
        }
        alert("Xatolik Yuz Berdi. Iltimos Keyinroq Urinib Ko'ring!");
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

    if (localStorage.getItem("UserName")) {
        userName.textContent = JSON.parse(localStorage.getItem("UserName"));
    }

    if (localStorage.getItem("UserEmail")) {
        userEmail.textContent = JSON.parse(localStorage.getItem("UserEmail"));
    }

    if (!localStorage.getItem("UserName")) {
        window.location.href = "login.html";
    }
});

editerBtnName.addEventListener('click', () => {
    userName.contentEditable = true;
    userName.addEventListener('keydown', (e) => {
        if (e.key === "Enter") {
            userName.contentEditable = false;
            localStorage.setItem("UserName", JSON.stringify(userName.textContent));
        }
    });
});

editerBtnEmail.addEventListener('click', () => {
    userEmail.contentEditable = true;
    userEmail.addEventListener('keydown', (e) => {
        if (e.key === "Enter") {
            userEmail.contentEditable = false;
            localStorage.setItem("UserEmail", JSON.stringify(userEmail.textContent));
        }
    });
});

editerBtnPassword.addEventListener('click', () => {
    userPassword.contentEditable = true;
    userPassword.addEventListener('keydown', (e) => {
        if (e.key === "Enter") {
            userPassword.contentEditable = false;
            localStorage.setItem("UserPassword", JSON.stringify(userPassword.textContent));
        }
    });
});

logOutBtn.addEventListener('click', () => {
    localStorage.clear();
    window.location.href = 'login.html';
});
