function adminUserUnAuth() {
    firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
            window.location.replace("./login.html");
        } 
    });
}
adminUserUnAuth()


function tabsForOptions() {
    const tabBtn = document.querySelector('.options-title')
    const tabContainer = document.querySelector('.options-container')
    const tabCArrow = document.querySelector('.option-arrow')
    const tabWrapper = document.querySelector('.tebs-content-wrapper').scrollHeight;

    

    tabBtn.addEventListener('click', () => {
        if(tabContainer.style.height == 0 + "px"){
            tabContainer.style.height = tabWrapper + 60 + "px"
            tabContainer.style.paddingTop = "30px"
            tabCArrow.style.transform = 'rotate(180deg)'
        } else{
            tabContainer.style.height = "0px"
            tabCArrow.style.transform = 'rotate(0deg)'
            tabContainer.style.paddingTop = "0px"
        }
    })

}

tabsForOptions()


function sendDataToServer() {

    let image = document.querySelector('#image').value,
    title = document.querySelector('#title').value,
    text = document.querySelector('#text').value,
    allCheckboxes = document.querySelectorAll('.checkbox-group input')
    
    allCheckboxes.forEach(item => {
        if(item.checked <= 0){
            return item
        } 
        if(!image == 0 && !text == 0 && !title == 0 && item.checked == true){
            writeData()
            alert('Новая запись создана!')
            window.location.reload()
        } else {
            alert('Заполните все поля для ввода!')
        }
    })
 
}


function writeData(){

    let image = document.querySelector('#image').value,
    title = document.querySelector('#title').value,
    text = document.querySelector('#text').value,

    // CheckBoxes ----------------------------------------------------------

    lifeStyleCheckbox = document.querySelector('#lifeStyleCheckbox').checked,
    cookingCheckbox = document.querySelector('#cookingCheckbox').checked,
    shopCheckbox = document.querySelector('#shopCheckbox').checked,
    styleCheckbox = document.querySelector('#styleCheckbox').checked

    // CheckBoxes ----------------------------------------------------------

    firebase.database().ref("Blog/"+title ).set({
        image: image,
        title: title,
        text: text,
        id: Date.now(),
        lifeStyle: lifeStyleCheckbox,
        cooking: cookingCheckbox,
        shop: shopCheckbox,
        style: styleCheckbox
    })

}

function clearInputValue(){
    document.querySelector('#image').value = ''
    document.querySelector('#title').value = ''
    document.querySelector('#text').value = ''

    document.querySelector('#lifeStyleCheckbox').checked = ''
    document.querySelector('#cookingCheckbox').checked = ''
    document.querySelector('#shopCheckbox').checked = ''
    document.querySelector('#styleCheckbox').checked = ''
}


async function showAllBlogsInAdminPanel(){

    await firebase.database().ref('/Blog').once('value', function(snapshot){
        let postsMainContainer = document.querySelector('.all-post-container');
        snapshot.forEach(function(childSnapshot){
            let childData = childSnapshot.val();
            let postDiv = document.createElement('div');
            let postTitle = document.createElement('h3');
            let btnWrapper = document.createElement('div');
            let editBtn = document.createElement('a');
            let deleteBtn = document.createElement('a');
            let deleteBtnImage = document.createElement('img');
            let editBtnImage = document.createElement('img');

            // Post Title -----------------------------
            postTitle.textContent = childData.title;
            postTitle.classList.add('post-item__title')

            // Image Button Edit ----------------------
            editBtnImage.src = "./images/edit.svg"
            editBtnImage.alt = "Edit Image Button"

            // Image Button Delete --------------------
            deleteBtnImage.src = "./images/delete.svg"
            deleteBtnImage.alt = "Delete Image Button"

            // Button Edit ----------------------------
            editBtn.classList.add('post-edit-btn')
            editBtn.href = '#create-edit'
            editBtn.appendChild(editBtnImage)

            // Button Delete --------------------------
            deleteBtn.classList.add('post-delete-btn')
            deleteBtn.appendChild(deleteBtnImage)

            // Button Wrapper -------------------------
            btnWrapper.classList.add('post-btns-container')
            btnWrapper.appendChild(editBtn)
            btnWrapper.appendChild(deleteBtn)

            // Second Div ----------------------------
            postDiv.classList.add('post-item')
            postDiv.appendChild(postTitle)
            postDiv.appendChild(btnWrapper)
      
            // Article Container ---------------------
            postsMainContainer.appendChild(postDiv);

        })
    })

    removePost()
    changePost()

}

showAllBlogsInAdminPanel()

function removePost() {
    document.querySelectorAll('.post-delete-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            if(confirm("Вы хотите удалить эту запись?")){
                btnDeletePost = btn.parentNode.parentNode.querySelector('.post-item__title')
                deletePost = btn.parentNode.parentNode
                deletePost.classList.add('deleted-post')
                title = btnDeletePost.textContent
                firebase.database().ref("Blog/"+title).remove()
                
                clearInputValue()
            }
        })
    })
}



function changePost() {
    document.querySelectorAll('.post-edit-btn').forEach(btn => {
        btn.addEventListener('click', () => {
    
            let image = document.querySelector('#image').value,
            title = document.querySelector('#title').value,
            text = document.querySelector('#text').value,
            btnThisTitle = btn.parentNode.parentNode.querySelector('.post-item__title')
    
            title = btnThisTitle.textContent
    
                firebase.database().ref("Blog/"+title).on('value', function(snapshot){
    
                    document.querySelector('#image').value = snapshot.val().image
                    document.querySelector('#text').value = snapshot.val().text
                    document.querySelector('#title').value = snapshot.val().title
    
                    document.querySelector('#lifeStyleCheckbox').checked = snapshot.val().lifeStyle
                    document.querySelector('#cookingCheckbox').checked = snapshot.val().cooking
                    document.querySelector('#shopCheckbox').checked = snapshot.val().shop
                    document.querySelector('#styleCheckbox').checked = snapshot.val().style
                
            })

        })
    })
}


document.querySelector('#search').oninput = function() {
    const searchingTitles = document.querySelectorAll('.post-item__title')
    const searchInputValue = document.querySelector('#search').value

    if(searchInputValue != ''){
        searchingTitles.forEach(item => {

            const itemContainer = item.parentNode
            if(item.innerText.search(RegExp(searchInputValue,"gi")) == -1){
                itemContainer.classList.add('hide-post')
            } else {
                itemContainer.classList.remove('hide-post')
            }

        })
    } else {
        searchingTitles.forEach(item => {
            const itemContainer = item.parentNode
            itemContainer.classList.remove('hide-post')
        })
    }
}
    