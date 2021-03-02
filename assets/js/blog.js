async function getPosts() {
    await firebase.database().ref('/Blog').once('value', function(snapshot){

        let vatchers = document.querySelector('.grid-blog-container');

        snapshot.forEach(function(childSnapshot){

            let childKey = childSnapshot.key;
            let childData = childSnapshot.val();
            
            let myArticle = document.createElement('article');
            let myDiv = document.createElement('div');
            let mySecondDiv = document.createElement('div');
            let myH3 = document.createElement('h3');
            let myText = document.createElement('p');
            let myTextClone = document.createElement('p');
            let myButton = document.createElement('a');
            let myImg = document.createElement('img')
            let myImgClose = document.createElement('img')



            // #LifeStyle Chakboxes ------------------
            let hashLifeStyle = document.createElement('p');
            hashLifeStyle.classList.add('hash-item')
            hashLifeStyle.textContent = '#LifeStyle';

            // #Cooking Chakboxes ----------------------
            let hashCooking = document.createElement('p');
            hashCooking.classList.add('hash-item')
            hashCooking.textContent = '#Cooking';

            // #Shop Chakboxes ---------------------
            let hashShop = document.createElement('p');
            hashShop.classList.add('hash-item')
            hashShop.textContent = '#Shop';

            // #Style Chakboxes ---------------------
            let hashStyle = document.createElement('p');
            hashStyle.classList.add('hash-item')
            hashStyle.textContent = '#Style';

            // All Chakbox Container ----------------
            let hashContainer = document.createElement('div');
            hashContainer.classList.add('hash-content')
            if(childData.lifeStyle === true){
                hashContainer.appendChild(hashLifeStyle);
                myArticle.classList.add('show-life')
            }
            if(childData.cooking === true){
                hashContainer.appendChild(hashCooking);
                myArticle.classList.add('show-cooking')
            }
            if(childData.shop === true){
                hashContainer.appendChild(hashShop);
                myArticle.classList.add('show-shop')
            }
            if(childData.style === true){
                hashContainer.appendChild(hashStyle);
                myArticle.classList.add('show-style')
            }
            

            // Title --------------------------------
            myH3.textContent = childData.title;
            myH3.classList.add('post-title')

            // Text ---------------------------------
            myText.textContent = childData.text;
            myText.classList.add('post-text')

            // Text Clone ---------------------------
            myTextClone.textContent = childData.text;
            myTextClone.classList.add('post-text-clone')

            let repString = myTextClone.textContent;

            myTextClone.innerHTML = repString.replace(/---/gi, "<hr class='blog-line'>")
            .replace(/-img-/gi, "<img class='image-in-blog' src='")
            .replace(/-#-/gi, "'>")
            .replace(/\n/gi, "<br>")
            .replace(/-a-/gi, "<a class='blog-link' href='")
            .replace(/-enda-/gi, "'> Ссылка </a>")
            .replace(/-h3-/gi, "<h3 class='blog-subtitle'>")
            .replace(/-endh3-/gi, "</h3>")
            .replace(/-v-\s+/gi, "<iframe class='blod-video' src='https://www.youtube.com/embed/")
            .replace(/-endv-/gi, "'></iframe>")


            // Button -------------------------------
            myButton.textContent = "More";
            myButton.dataset.ofPost = childData.id;
            myButton.classList.add('btn')

            // Image --------------------------------
            myImg.classList.add('post-image')
            myImg.src = childData.image;
            myImg.alt = childData.image;

            // Close Icon ---------------------------
            myImgClose.classList.add('post-image-close')
            myImgClose.src = './assets/images/close.svg';
            myImgClose.alt = 'Cloase Icon';

            // Image Div -----------------------------
            myDiv.classList.add('post-image-wrapper')
            myDiv.appendChild(myImg);

            // Second Div ----------------------------
            mySecondDiv.classList.add('post-content')
            mySecondDiv.appendChild(myH3);
            mySecondDiv.appendChild(myTextClone);
            mySecondDiv.appendChild(myText);
            mySecondDiv.appendChild(hashContainer);
            mySecondDiv.appendChild(myButton);
            mySecondDiv.appendChild(myImgClose);

            // Article -------------------------------
            myArticle.dataset.ofArticle = childData.id;
            myArticle.classList.add('post-article')
            myArticle.classList.add('show')
            myArticle.appendChild(myDiv);
            myArticle.appendChild(mySecondDiv);
      
            // Article Container ----------------------
            vatchers.appendChild(myArticle);

        })
    })
    popupBlogItemActive()
}

getPosts()

blogsFilter("all")

function blogsFilter(c) {

    let i;
    let x = document.querySelectorAll('.post-article')
    if(c == "all") c = "";
    for(i = 0; i < x.length; i++){
        removeClass(x[i], "show");
        if(x[i].className.indexOf(c) > -1) addClass(x[i], "show")
    }

}

function addClass(elem, name) {

    let i;
    let arr1 = elem.className.split(" ");
    let arr2 = name.split(" ");
    for(i = 0; i < arr2.length; i++){
        if(arr1.indexOf(arr2[i]) == -1){
            elem.className += " " + arr2[i];
        }
    }

}

function removeClass(elem, name){

    let i;
    let arr1 = elem.className.split(" ");
    let arr2 = name.split(" ");
    for(i = 0; i < arr2.length; i++){
        while(arr1.indexOf(arr2[i]) > -1){
            arr1.splice(arr1.indexOf(arr2[i]), 1);
        }
    }
    elem.className = arr1.join(" ");

}


function popupBlogItemActive() {

    const blogHiddenText = document.querySelectorAll('.post-text')
    blogHiddenText.forEach(item => {
        const pharagraph = String(item.innerText).substr(0, 100)

        item.innerHTML = pharagraph + '...'
    })

    const moreBtn = document.querySelectorAll('.btn')
    const moreArticle = document.querySelectorAll('.post-article')

    moreBtn.forEach(item => { 
        let moreBtnData = item.getAttribute('data-of-post')

        item.addEventListener('click', () => {

            moreArticle.forEach(art => {
                const articleShowData = art.getAttribute('data-of-article')
                const closeBlogArticle = document.querySelectorAll('.post-image-close')
    
                if(moreBtnData === articleShowData){
                    art.classList.add('active-article')
                    document.querySelector('body').style.overflowY = 'hidden'

                    closeBlogArticle.forEach(close => {
                        close.addEventListener('click', () => {
                            art.classList.remove('active-article')
                            document.querySelector('body').style.overflowY = 'scroll'
                        })
                    })
                } 
            })
        })
    })
}


document.querySelector('#search').oninput = function() {
    const searchingTitles = document.querySelectorAll('.post-title')
    const searchInputValue = document.querySelector('#search').value

    if(searchInputValue != ''){
        searchingTitles.forEach(item => {

            const itemContainer = item.parentNode.parentNode

            console.log(item);
            if(item.innerText.search(RegExp(searchInputValue,"gi")) == -1){
                itemContainer.classList.remove('show')
            } else {
                itemContainer.classList.add('show')
            }

        })
    } else {
        searchingTitles.forEach(item => {
            const itemContainer = item.parentNode.parentNode
            itemContainer.classList.add('show')
        })
    }
}

