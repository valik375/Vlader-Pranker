import {slider} from './slider.js';


const init = () => {
    const burgerBtn = document.querySelector('.burger');
    const hiddenMenu = document.querySelector('.burger-menu');
    const navLinksBtn = document.querySelectorAll('.nav-link');
    burgerBtn.addEventListener('click', () => {
        hiddenMenu.classList.toggle('active')
        burgerBtn.classList.toggle('toggle')
    })
    navLinksBtn.forEach(item => {
        item.addEventListener('click', () => {
            hiddenMenu.classList.toggle('active')
            burgerBtn.classList.toggle('toggle')
        })
    })
}
init()

async function getPosts() {
    await firebase.database().ref('/Blog').limitToFirst(6).once('value', function(snapshot){

        let vatchers = document.querySelector('.slider-truck');

        snapshot.forEach(function(childSnapshot){

            let childData = childSnapshot.val();
            
            let myArticle = document.createElement('article');
            let myDiv = document.createElement('div');
            let blogItemMargin = document.createElement('div');
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
            myButton.href = './blog.html'

            // Image --------------------------------
            myImg.classList.add('post-image')
            myImg.src = childData.image;
            myImg.alt = childData.image;

            // Image Div -----------------------------
            myDiv.classList.add('post-image-wrapper')
            myDiv.appendChild(myImg);

            // Second Div ----------------------------
            mySecondDiv.classList.add('post-content')
            mySecondDiv.appendChild(myH3);
            mySecondDiv.appendChild(myText);
            mySecondDiv.appendChild(hashContainer);
            mySecondDiv.appendChild(myButton);

            // Article -------------------------------
            myArticle.classList.add('post-article')
            myArticle.classList.add('show')
            myArticle.appendChild(myDiv);
            myArticle.appendChild(mySecondDiv);
      
            // Article Wrapper ------------------------
            blogItemMargin.classList.add('blog-item-margin')
            blogItemMargin.appendChild(myArticle)
            blogItemMargin.dataset.ofArticle = childData.id;

            // Article Container ----------------------
            vatchers.appendChild(blogItemMargin);
            
        })

    })
    popupBlogItemActive()

    if(window.innerWidth >= 1070){
        slider('3', '1', '.blog-slider-container', '.slider-truck', '.blog-item-margin', '.btn-prev', '.btn-next')
    }
    if(window.innerWidth <= 1060){
        slider('2', '1', '.blog-slider-container', '.slider-truck', '.blog-item-margin', '.btn-prev', '.btn-next')
    }
    if(window.innerWidth <= 480){
        slider('1', '1', '.blog-slider-container', '.slider-truck', '.blog-item-margin', '.btn-prev', '.btn-next')
    }

    
}

getPosts()



function popupBlogItemActive() {
    const blogHiddenText = document.querySelectorAll('.post-text')
    blogHiddenText.forEach(item => {
        const pharagraph = String(item.innerText).substr(0, 60)

        item.innerHTML = pharagraph + '...'
    })
}