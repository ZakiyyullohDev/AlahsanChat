document.addEventListener("DOMContentLoaded", () => {
    const emojis = [
        "😀", "😁", "😂", "🤣", "😃", "😄", "😅", "😆", "😉", "😊", "😋", "😎", "😍", "😘", "😗", "😙", "😚", "🙂",
        "🤗", "🤩", "🤔", "🤨", "😐", "😑", "😶", "🙄", "😏", "😣", "😥", "😮", "🤐", "😯", "😪", "😫", "😴", "😌", "😛",
        "😜", "😝", "🤤", "😒", "😓", "😔", "😕", "🙃", "🤑", "😲", "☹️", "🙁", "😖", "😞", "😟", "😤", "😢", "😭", "😦",
        "😧", "😨", "😩", "😬", "😰", "😱", "😳", "🤯", "😵", "😡", "😠", "🤬", "😷", "🤒", "🤕", "🤢", "🤮", "🤧", "😇",
        "🥳", "🥺", "🥵", "🥶", "🥴", "🤠", "🥳", "🥸"
    ];
    
    const messageSenderInput = document.getElementById("messageSenderInput");
    const showEmojisBtn = document.getElementById("showEmojisBtn");
    const emojiContainer = document.getElementById("emojiContainer");
    
    showEmojisBtn.addEventListener("click", (event) => {
        event.stopPropagation();
        emojiContainer.classList.toggle("display-none");
        if (!emojiContainer.classList.contains("display-none")) {
            emojiContainer.innerHTML = "";
            emojis.forEach(emoji => {
                const span = document.createElement("span");
                span.textContent = emoji;
                span.addEventListener("click", (event) => {
                    event.stopPropagation();
                    messageSenderInput.value += emoji;
                    emojiContainer.classList.add("display-none");
                });
                emojiContainer.appendChild(span);
            });
        }
    });
    
    document.addEventListener('click', (event) => {
        if (!emojiContainer.classList.contains("display-none") && !emojiContainer.contains(event.target) && !showEmojisBtn.contains(event.target)) {
            emojiContainer.classList.add('display-none');
        }
    });
});

const loggedUserImgs = document.querySelectorAll('#loggedUserImg');
loggedUserImgs.forEach(loggedUserImg => {
    loggedUserImg.src = localStorage.getItem("UserImgSource")
})
