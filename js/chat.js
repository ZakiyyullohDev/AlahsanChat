const messagesUl = document.getElementById('messagesUl');
const messageSenderInput = document.getElementById('messageSenderInput');
const senderBtn = document.getElementById('senderBtn');

const imgSendInputsLabel = document.getElementById('imgSendInputsLabel');
const imgTextSendinput = document.getElementById('imgTextSendinput');
const imgSendinput = document.getElementById('imgSendinput');
const sendingMedia = document.getElementById('sendingMedia'); 
const imgSendBtn = document.getElementById('imgSendBtn');
const sendingImg = document.getElementById('sendingImg'); 
const closeBtn = document.getElementById('closeBtn');
const overlay = document.getElementById('overlay');
const modal = document.getElementById('modal');

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.messages-li').forEach(function(messageLi) {
        const deleteBtn = messageLi.querySelector('.delete-btn');
        const messageTextWrapper = messageLi.querySelector('.message-text-wrapper'); 

        messageLi.addEventListener('mouseover', function() {
            if (deleteBtn) {
                deleteBtn.classList.remove('display-none');
            }
        });

        messageLi.addEventListener('mouseout', function() {
            if (deleteBtn) {
                deleteBtn.classList.add('display-none');
            }
        });

        messageLi.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            if (deleteBtn) {
                deleteBtn.classList.remove('display-none');
                deleteBtn.addEventListener('click', function() {
                    messageLi.remove();
                    
                    if (messageTextWrapper) {
                        const chat = messageTextWrapper.innerText.trim();
                        deleteChatFromStorage(chat);
                    }
                });
            }
        });

        messageLi.addEventListener('dblclick', function() {
            if (deleteBtn) {
                deleteBtn.classList.remove('display-none');
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
});


let writedChats = JSON.parse(localStorage.getItem("WritedChat")) || [];

const setWritedChatToStorage = (chat, mediaType = null, mediaSrc = null) => {
    if (chat || mediaType) {
        writedChats.push({ chat, mediaType, mediaSrc });
        localStorage.setItem("WritedChat", JSON.stringify(writedChats));
    }
}

const getChatFromStorage = () => {
    writedChats.forEach(({ chat, mediaType, mediaSrc }) => {
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
            sendingMedia.appendChild(mediaElement);
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
    const file = imgSendinput.files[0];
    if (!file) return; 
    
    const fileType = file.type;

    if (fileType.startsWith('image/')) {
        
        const imageUrl = URL.createObjectURL(file);
        const imgSend = document.createElement('img');
        imgSend.classList.add('sendingImg');
        imgSend.setAttribute('width', 300);
        imgSend.setAttribute('height', 150);
        imgSend.setAttribute('alt', 'ZakiyDev');
        imgSend.src = imageUrl;
        
        sendingImg.innerHTML = ''; 
        sendingImg.appendChild(imgSend); 
    } else if (fileType.startsWith('audio/')) {
        
        const audioUrl = URL.createObjectURL(file);
        const audioElement = document.createElement('audio');
        audioElement.src = audioUrl;
        audioElement.controls = true;
        audioElement.classList.add('sendingAudio');
        audioElement.setAttribute('width', 300);
        audioElement.setAttribute('height', 150);
        
        sendingImg.innerHTML = ''; 
        sendingImg.appendChild(audioElement); 
    } else if (fileType.startsWith('video/')) {
        
        const videoUrl = URL.createObjectURL(file);
        const videoElement = document.createElement('video');
        videoElement.src = videoUrl;
        videoElement.controls = true;
        videoElement.classList.add('sendingVideo');
        videoElement.setAttribute('width', 300);
        videoElement.setAttribute('height', 150);
        
        sendingImg.innerHTML = ''; 
        sendingImg.appendChild(videoElement); 
    }
    
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
    
    const mediaElement = sendingImg.querySelector('img') || sendingImg.querySelector('audio') || sendingImg.querySelector('video');
    
    const mediaToSend = document.createElement(mediaElement.tagName);
    mediaToSend.src = mediaElement.src;
    mediaToSend.classList.add(mediaElement.classList.contains('sendingImg') ? 'sendingImg' : mediaElement.classList.contains('sendingVideo') ? 'sendingVideo' : 'sendingAudio');
    mediaToSend.setAttribute('width', 300);
    mediaToSend.setAttribute('height', 150);
    if (mediaElement.tagName.toLowerCase() !== 'img') {
        mediaToSend.setAttribute('controls', 'true');
    }
    
    newMessageLi.classList.add('messages-li');
    newMessageLi.appendChild(img);
    newMessageLi.appendChild(mediaToSend);
    messagesUl.appendChild(newMessageLi);
    
    setWritedChatToStorage(null, mediaToSend.src);
    
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
