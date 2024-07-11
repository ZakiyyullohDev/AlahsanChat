const messagesUl = document.getElementById('messagesUl');
const messageSenderInput = document.getElementById('messageSenderInput');
const senderBtn = document.getElementById('senderBtn');

const imgSendInputsLabel = document.getElementById('imgSendInputsLabel');
const imgTextSendinput = document.getElementById('imgTextSendinput');
const imgSendinput = document.getElementById('imgSendinput');
const sendingImg = document.getElementById('sendingImg');
const imgSendBtn = document.getElementById('imgSendBtn');
const closeBtn = document.getElementById('closeBtn');
const overlay = document.getElementById('overlay');
const modal = document.getElementById('modal');

const messageSendFunc = () => {
    const newMessageLi = document.createElement('li');
    
    const newMessageImg = document.createElement('img');
    newMessageImg.classList.add('user-img', 'chat-user-img');
    newMessageImg.setAttribute('alt', 'ZakiyDev');
    newMessageImg.setAttribute('width', 70);
    newMessageImg.setAttribute('height', 70);
    if (localStorage.getItem("UserImgSource")) {
        newMessageImg.src = localStorage.getItem("UserImgSource");
    } else {
        newMessageImg.src = 'https://futureoflife.org/wp-content/uploads/2020/08/elon_musk_royal_society.jpg';
    }
    
    const newMessageHeaderTwo = document.createElement('h2');
    newMessageHeaderTwo.innerHTML = messageSenderInput.value;
    newMessageHeaderTwo.classList.add('user-message', 'messages');

    newMessageHeaderTwo.addEventListener('click', ()=> {
        newMessageHeaderTwo.contentEditable = 'true'
    })

    newMessageHeaderTwo.addEventListener('keydown', (e)=> {
        if (e.key == 'Enter') {
            newMessageHeaderTwo.contentEditable = 'false'
        }
    })
    
    newMessageLi.classList.add('messages-li');
    newMessageLi.appendChild(newMessageImg);
    newMessageLi.appendChild(newMessageHeaderTwo);
    messagesUl.appendChild(newMessageLi);
    
    newMessageLi.scrollIntoView({ behavior: 'smooth' });
    
    messageSenderInput.value = '';
}

senderBtn.addEventListener('click', () => {
    if (messageSenderInput.value.trim() !== '') {
        messageSendFunc();
    }
});

messageSenderInput.addEventListener('keydown', (e) => {
    if (e.key === "Enter" && messageSenderInput.value.trim() !== '') {
        messageSendFunc();
    }
});

imgSendinput.onchange = () => {
    const imgSend = document.createElement('img');
    imgSend.classList.add('sendingImg');
    imgSend.setAttribute('width', 300);
    imgSend.setAttribute('height', 150);
    imgSend.setAttribute('alt', 'ZakiyDev');
    const imageUrl = URL.createObjectURL(imgSendinput.files[0]);
    imgSend.src = imageUrl;
    sendingImg.src = imageUrl;
    
    sendingImg.innerHTML = '';
    sendingImg.appendChild(imgSend);
    
    modal.style.display = 'flex';
    overlay.classList.remove('display-none');
};

imgSendBtn.addEventListener('click', () => {
    const newMessageLi = document.createElement('li');
    
    const img = document.createElement('img');
    img.classList.add('user-img', 'chat-user-img');
    img.setAttribute('alt', 'ZakiyDev');
    img.setAttribute('width', 70);
    img.setAttribute('height', 70);
    if (localStorage.getItem("UserImgSource")) {
        img.src = localStorage.getItem("UserImgSource");
    } else {
        img.src = 'https://futureoflife.org/wp-content/uploads/2020/08/elon_musk_royal_society.jpg';
    }
    
    const imgToSend = document.createElement('img');
    imgToSend.src = sendingImg.querySelector('img').src;
    imgToSend.classList.add('sendingImg');
    imgToSend.setAttribute('width', 300);
    imgToSend.setAttribute('height', 150);
    
    newMessageLi.classList.add('messages-li');
    newMessageLi.appendChild(img);
    newMessageLi.appendChild(imgToSend);
    messagesUl.appendChild(newMessageLi);
    
    newMessageLi.scrollIntoView({ behavior: 'smooth' });
    
    modal.style.display = 'none';
    overlay.classList.add('display-none');
    imgSendinput.value = ''; 
});

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    overlay.classList.add('display-none');
});
