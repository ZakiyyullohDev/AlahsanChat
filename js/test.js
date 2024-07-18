const docTitle = document.querySelector('title')

const otherUserProfileImg = document.getElementById('otherUserProfileImg')
const otherUserNameElement = document.getElementById('otherUserName')

otherUserProfileImg.src = localStorage.getItem("OtherUserImgSource")
otherUserNameElement.textContent = localStorage.getItem("OtherUserName")

docTitle.textContent = localStorage.getItem("OtherUserName")
