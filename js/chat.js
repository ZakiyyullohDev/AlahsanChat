const messagesUl = document.getElementById('messagesUl');
const messageSenderInput = document.getElementById('messageSenderInput');
const senderBtn = document.getElementById('senderBtn');

const userLis = document.querySelectorAll(".userLi");
const otherUserNameS = document.querySelectorAll(".otherUserName");
const otherUserStatusS = document.querySelectorAll(".otherUserStatus");
const otherUserImgs = document.querySelectorAll(".otherUserChatImg");

const imgSendInputsLabel = document.getElementById('imgSendInputsLabel');
const imgTextSendinput = document.getElementById('imgTextSendinput');
const todayDateWrapper = document.getElementById('todayDateWrapper');
const selectDateInput = document.getElementById('selectDateInput');
const imgSendinput = document.getElementById('imgSendinput');
const sendingMedia = document.getElementById('sendingMedia'); 
const imgSendBtn = document.getElementById('imgSendBtn');
const sendingImg = document.getElementById('sendingImg'); 
const closeBtn = document.getElementById('closeBtn');
const overlay = document.getElementById('overlay');
const modal = document.getElementById('modal');

const dateModal = document.getElementById('dateModal');
const dateCloseBtn = document.getElementById('dateCloseBtn');
const todayDate = document.getElementById('todayDate');

userLis.forEach(userLi => {
    userLi.addEventListener("click", (e) => {
        const userImg = userLi.querySelector(".user-img").src;
        const userName = userLi.querySelector(".user-name").textContent;
        const userStatus = userLi.querySelector(".user-status").textContent;

        otherUserImgs.forEach(otherUserImg => {
            otherUserImg.src = userImg;
        });

        otherUserNameS.forEach(otherUserName => {
            otherUserName.textContent = userName;
        });

        otherUserStatusS.forEach(otherUserStatus => {
            otherUserStatus.textContent = userStatus;
            if (userStatus === "Offline") {
                otherUserStatus.classList.add('offline');
            } else {
                otherUserStatus.classList.remove('offline');
            }
        });
    });
});

document.addEventListener("keydown", (e) => {
    if (e.keyCode === 191) {
        messageSenderInput.focus();
    }
});

document.addEventListener("contextmenu", (e) => {
    e.preventDefault();
});

todayDate.addEventListener('click', () => {
    dateModal.style.display = 'flex';
    overlay.style.display = 'flex';
    todayDateWrapper.style.zIndex = '0';
});

dateCloseBtn.addEventListener("click", () => {
    dateModal.style.display = 'none';
    overlay.style.display = 'none';
    todayDateWrapper.style.zIndex = '1';
});

overlay.addEventListener("click", () => {
    dateModal.style.display = 'none';
    overlay.style.display = 'none';
    todayDateWrapper.style.zIndex = '1';
});

selectDateInput.addEventListener('keydown', (e) => {
    if (e.key === "Enter") {
        alert(selectDateInput.value);
        overlay.style.display = 'none';
        dateModal.style.display = 'none';
        todayDateWrapper.style.zIndex = '1';
    }
});

let mediaType = '';

const setMediaTypeToStorage = () => {
    localStorage.setItem("MediaType", mediaType);
};

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.messages-li').forEach(function(messageLi) {
        const deleteBtn = messageLi.querySelector('.delete-btn');
        const messageTextWrapper = messageLi.querySelector('.message-text-wrapper');

        messageLi.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            if (deleteBtn) {
                deleteBtn.classList.remove('display-none');
            }
        });

        messageLi.addEventListener('click', function() {
            if (deleteBtn) {
                deleteBtn.classList.add('display-none');
            }
        });

        messageLi.addEventListener('dblclick', function() {
            if (deleteBtn) {
                deleteBtn.classList.remove('display-none');
            }
        });

        if (deleteBtn) {
            deleteBtn.addEventListener('click', function() {
                messageLi.remove();
                if (messageTextWrapper) {
                    const chat = messageTextWrapper.innerText.trim();
                    deleteChatFromStorage(chat);
                }
            });
        }
    });
});

let writedChats = JSON.parse(localStorage.getItem("WritedChat")) || [];

const setWritedChatToStorage = (chat, mediaType, mediaSrc) => {
    if (chat || mediaType) {
        writedChats.push({ chat, mediaType, mediaSrc });
        localStorage.setItem("WritedChat", JSON.stringify(writedChats));
    }
};

const getChatFromStorage = () => {
    writedChats.forEach(({ chat, mediaType, mediaSrc }) => {
        const newMessageLi = document.createElement('li');
        newMessageLi.classList.add('messages-li');

        const newMessageImg = document.createElement('img');
        newMessageImg.classList.add('user-img', 'chat-user-img');
        newMessageImg.setAttribute('alt', 'ZakiyDev');
        newMessageImg.setAttribute('width', 70);
        newMessageImg.setAttribute('height', 70);
        newMessageImg.src = localStorage.getItem("UserImgSource") || 'img/users-img/steve-jobs.jpg';
        newMessageLi.appendChild(newMessageImg);

        if (chat) {
            const newMessageHeaderTwoWrapper = document.createElement('div');
            newMessageHeaderTwoWrapper.classList.add('message-text-wrapper');
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
            newMessageHeaderTwoWrapper.appendChild(newMessageHeaderTwo);
            newMessageLi.appendChild(newMessageHeaderTwoWrapper);
        }

        if (mediaType && mediaSrc) {
            let mediaElement;
            if (mediaType === 'image') {
                mediaElement = document.createElement('img');
                mediaElement.classList.add('sendingImg');
            } else if (mediaType === 'video') {
                mediaElement = document.createElement('video');
                mediaElement.classList.add('sendingVideo');
                mediaElement.setAttribute('controls', 'true');
            } else if (mediaType === 'audio') {
                mediaElement = document.createElement('audio');
                mediaElement.classList.add('sendingAudio');
                mediaElement.setAttribute('controls', 'true');
            }
            mediaElement.src = mediaSrc;
            mediaElement.setAttribute('width', 300);
            mediaElement.setAttribute('height', 150);
            newMessageLi.appendChild(mediaElement);
        }

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn', 'display-none');
        deleteBtn.innerHTML = '<i class="ri-delete-bin-line"></i>';
        deleteBtn.addEventListener('click', () => {
            newMessageLi.remove();
            deleteChatFromStorage(chat); 
        });
        newMessageLi.appendChild(deleteBtn);

        newMessageLi.addEventListener('contextmenu', () => {
            deleteBtn.classList.remove('display-none');
        });
        newMessageLi.addEventListener('click', () => {
            deleteBtn.classList.add('display-none');
        });

        messagesUl.appendChild(newMessageLi);
    });
};

const deleteChatFromStorage = (chat) => {
    writedChats = writedChats.filter(item => item.chat !== chat);
    localStorage.setItem("WritedChat", JSON.stringify(writedChats));
};

const messageSendFunc = () => {
    const newMessageLi = document.createElement('li');

    const newMessageImg = document.createElement('img');
    newMessageImg.classList.add('user-img', 'chat-user-img');
    newMessageImg.setAttribute('alt', 'ZakiyDev');
    newMessageImg.setAttribute('width', 70);
    newMessageImg.setAttribute('height', 70);
    newMessageImg.src = localStorage.getItem("UserImgSource") || 'img/users-img/steve-jobs.jpg';

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
};

senderBtn.addEventListener('click', () => {
    messageSendFunc();
});

messageSenderInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        messageSendFunc();
    }
});

const fileSendFunction = (mediaType) => {
    const newMessageLi = document.createElement('li');

    const newMessageImg = document.createElement('img');
    newMessageImg.classList.add('user-img', 'chat-user-img');
    newMessageImg.setAttribute('alt', 'ZakiyDev');
    newMessageImg.setAttribute('width', 70);
    newMessageImg.setAttribute('height', 70);
    newMessageImg.src = localStorage.getItem("UserImgSource") || 'img/users-img/steve-jobs.jpg';

    newMessageLi.classList.add('messages-li');
    newMessageLi.appendChild(newMessageImg);

    if (mediaType === 'image') {
        const newMessageImage = document.createElement('img');
        newMessageImage.classList.add('sendingImg');
        newMessageImage.src = sendingImg.src;
        newMessageImage.setAttribute('alt', 'Sending Img');
        newMessageImage.setAttribute('width', 300);
        newMessageImage.setAttribute('height', 150);
        newMessageLi.appendChild(newMessageImage);
        setWritedChatToStorage('', 'image', sendingImg.src);
    } else if (mediaType === 'video') {
        const newMessageVideo = document.createElement('video');
        newMessageVideo.classList.add('sendingVideo');
        newMessageVideo.src = sendingImg.src;
        newMessageVideo.setAttribute('width', 300);
        newMessageVideo.setAttribute('height', 150);
        newMessageVideo.setAttribute('controls', 'true');
        newMessageLi.appendChild(newMessageVideo);
        setWritedChatToStorage('', 'video', sendingImg.src);
    } else if (mediaType === 'audio') {
        const newMessageAudio = document.createElement('audio');
        newMessageAudio.classList.add('sendingAudio');
        newMessageAudio.src = sendingImg.src;
        newMessageAudio.setAttribute('controls', 'true');
        newMessageLi.appendChild(newMessageAudio);
        setWritedChatToStorage('', 'audio', sendingImg.src);
    }

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn', 'display-none');
    deleteBtn.innerHTML = '<i class="ri-delete-bin-line"></i>';
    deleteBtn.addEventListener('click', () => {
        newMessageLi.remove();
    });
    newMessageLi.appendChild(deleteBtn);

    newMessageLi.addEventListener('contextmenu', () => {
        deleteBtn.classList.remove('display-none');
    });
    newMessageLi.addEventListener('click', () => {
        deleteBtn.classList.add('display-none');
    });

    messagesUl.appendChild(newMessageLi);
    newMessageLi.scrollIntoView({ behavior: 'smooth' });

    overlay.style.display = 'none';
    modal.style.display = 'none';
};

imgSendInputsLabel.addEventListener('click', () => {
    modal.style.display = 'flex';
    overlay.style.display = 'flex';
});

imgSendBtn.addEventListener('click', () => {
    if (sendingImg.src !== '') {
        fileSendFunction('image');
    }
});

imgSendinput.addEventListener('change', () => {
    const file = imgSendinput.files[0];
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
        sendingImg.src = e.target.result;
    };
    fileReader.readAsDataURL(file);
});

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    overlay.style.display = 'none';
    imgSendinput.value = '';
    sendingImg.src = '';
});

window.onload = function () {
    getChatFromStorage();
};
