const otherUserLink = document.querySelectorAll('.other-user-link')

otherUserLink.forEach(userLiA => {
    userLiA.addEventListener('click', (e)=> {
        let otherUserName = e.target.children[1].children[0].textContent
        let otherUserImg = e.target.children[0]
        localStorage.setItem("OtherUserImgSource", otherUserImg.src)
        localStorage.setItem("OtherUserName", otherUserName)
    })    
});