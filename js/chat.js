const messagesUl = document.getElementById('messagesUl');
const messageSenderInput = document.getElementById('messageSenderInput');
const senderBtn = document.getElementById('senderBtn');

const imgSendInputsLabel = document.getElementById('imgSendInputsLabel');
const imgTextSendinput = document.getElementById('imgTextSendinput');
const imgSendinput = document.getElementById('imgSendinput');
const sendingImg = document.getElementById('sendingImg');
const imgSendBtn = document.getElementById('imgSendBtn');
const deleteBtn = document.querySelectorAll('#deleteBtn');
const closeBtn = document.getElementById('closeBtn');
const overlay = document.getElementById('overlay');
const modal = document.getElementById('modal');

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.messages-li').forEach(function (messageLi) {
        const deleteBtn = messageLi.querySelector('.delete-btn')
        messageLi.addEventListener('mouseover', function () {
            if (deleteBtn) {
                deleteBtn.classList.remove('display-none');
            }
        });
        messageLi.addEventListener('mouseout', function () {
            if (deleteBtn) {
                deleteBtn.classList.add('display-none');
            }
        });

        messageLi.addEventListener('contextmenu', function (e) {
            e.preventDefault();
            if (deleteBtn) {
                deleteBtn.classList.remove('display-none');
                deleteBtn.addEventListener('click', function () {
                    messageLi.remove();
                    deleteBtn.classList.add('display-none');
                });
            }
        });

        messageLi.addEventListener('dblclick', function () {
            if (deleteBtn) {
                deleteBtn.classList.remove('display-none');
                deleteBtn.addEventListener('click', function () {
                    messageLi.remove();
                    deleteBtn.classList.add('display-none');
                });
            }
        });
    });
});



let writedChats = JSON.parse(localStorage.getItem("WritedChat")) || [];

const setWritedChatToStorage = (chat, img = null) => {
    if (chat || img) {
        writedChats.push({ chat, img });
        localStorage.setItem("WritedChat", JSON.stringify(writedChats));
    }
}

const getChatFromStorage = () => {
    writedChats.forEach(({ chat, img }) => {
        const newMessageLi = document.createElement('li');
        newMessageLi.classList.add('messages-li');
        
        const newMessageImg = document.createElement('img');
        newMessageImg.classList.add('user-img', 'chat-user-img');
        newMessageImg.setAttribute('alt', 'ZakiyDev');
        newMessageImg.setAttribute('width', 70);
        newMessageImg.setAttribute('height', 70);
        newMessageImg.src = localStorage.getItem("UserImgSource") || 'https://futureoflife.org/wp-content/uploads/2020/08/elon_musk_royal_society.jpg';
        newMessageLi.appendChild(newMessageImg);
        
        if (chat) {
            const newMessageHeaderTwoWrapper = document.createElement('div');
            newMessageHeaderTwoWrapper.classList.add('message-text-wrapper')
            const newMessageHeaderTwo = document.createElement('h2');
            newMessageHeaderTwo.innerHTML = chat;
            newMessageHeaderTwo.classList.add('user-message', 'messages');
            newMessageHeaderTwo.addEventListener('click', () => {
                newMessageHeaderTwo.contentEditable = 'true';
            });
            
            newMessageHeaderTwo.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    newMessageHeaderTwo.contentEditable = 'false';
                    e.preventDefault();
                }
            });
            newMessageHeaderTwoWrapper.appendChild(newMessageHeaderTwo)
            newMessageLi.appendChild(newMessageHeaderTwoWrapper);
        }
        
        if (img) {
            const imgToSend = document.createElement('img');
            imgToSend.src = img;
            sendingImg.src = img;
            imgToSend.classList.add('sendingImg');
            imgToSend.setAttribute('width', 300);
            imgToSend.setAttribute('height', 150);
            newMessageLi.appendChild(imgToSend);
        }
        
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn', 'display-none');
        deleteBtn.innerHTML = '<i class="ri-delete-bin-line"></i>';
        deleteBtn.addEventListener('click', () => {
            newMessageLi.remove();
            deleteChatFromStorage(chat);
        });
        newMessageLi.appendChild(deleteBtn);

        newMessageLi.addEventListener('mouseover', () => {
            deleteBtn.classList.remove('display-none');
        });
        newMessageLi.addEventListener('mouseout', () => {
            deleteBtn.classList.add('display-none');
        });

        messagesUl.appendChild(newMessageLi);
    });
}

// Function to remove chat from localStorage
const deleteChatFromStorage = (chat) => {
    writedChats = writedChats.filter(item => item.chat !== chat);
    localStorage.setItem("WritedChat", JSON.stringify(writedChats));
}


const messageSendFunc = () => {
    const newMessageLi = document.createElement('li');
    
    const newMessageImg = document.createElement('img');
    newMessageImg.classList.add('user-img', 'chat-user-img');
    newMessageImg.setAttribute('alt', 'ZakiyDev');
    newMessageImg.setAttribute('width', 70);
    newMessageImg.setAttribute('height', 70);
    newMessageImg.src = localStorage.getItem("UserImgSource") || 'https://futureoflife.org/wp-content/uploads/2020/08/elon_musk_royal_society.jpg';
    
    const newMessageHeaderTwo = document.createElement('h2');
    newMessageHeaderTwo.innerHTML = messageSenderInput.value;
    newMessageHeaderTwo.classList.add('user-message', 'messages');
    
    newMessageHeaderTwo.addEventListener('click', () => {
        newMessageHeaderTwo.contentEditable = 'true';
    });
    
    newMessageHeaderTwo.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            newMessageHeaderTwo.contentEditable = 'false';
            e.preventDefault();
        }
    });
    
    newMessageLi.classList.add('messages-li');
    newMessageLi.appendChild(newMessageImg);
    newMessageLi.appendChild(newMessageHeaderTwo);
    messagesUl.appendChild(newMessageLi);
    
    setWritedChatToStorage(newMessageHeaderTwo.innerHTML);
    
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
    img.src = localStorage.getItem("UserImgSource") || 'https://futureoflife.org/wp-content/uploads/2020/08/elon_musk_royal_society.jpg';
    
    const imgToSend = document.createElement('img');
    imgToSend.src = sendingImg.querySelector('img').src;
    imgToSend.classList.add('sendingImg');
    imgToSend.setAttribute('width', 300);
    imgToSend.setAttribute('height', 150);
    
    newMessageLi.classList.add('messages-li');
    newMessageLi.appendChild(img);
    newMessageLi.appendChild(imgToSend);
    messagesUl.appendChild(newMessageLi);
    
    setWritedChatToStorage(null, imgToSend.src);
    
    newMessageLi.scrollIntoView({ behavior: 'smooth' });
    
    modal.style.display = 'none';
    overlay.classList.add('display-none');
    imgSendinput.value = ''; 
});

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    overlay.classList.add('display-none');
});

getChatFromStorage();
