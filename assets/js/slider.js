const slider = ( slidesShow, sliteScroll, sliderContain, sliderTruck, sliderItems, nextBtn, prevBtn ) => {
   
    let position = 0
    const slidesToShow = slidesShow
    const sliteToScroll = sliteScroll
    const container = document.querySelector(sliderContain)
    const track = document.querySelector(sliderTruck)
    const items = document.querySelectorAll(sliderItems)
    const btnNext = document.querySelector(nextBtn)
    const btnPrev = document.querySelector(prevBtn)

    const itemsCount = items.length
    const itemWidth = container.clientWidth / slidesToShow
    const movePosition = sliteToScroll * itemWidth

    items.forEach((item) => {
        item.style.minWidth = `${itemWidth}px`
    })

    btnNext.addEventListener('click', () => {
        const itemLeft = itemsCount - (Math.abs(position) + slidesToShow * itemWidth) / itemWidth;

        position -= itemLeft >= sliteToScroll ? movePosition : itemLeft * itemWidth;

        setPosition()
        checkBtns()
    })

    btnPrev.addEventListener('click', () => {
        const itemLeft = Math.abs(position) / itemWidth;

        position += itemLeft >= sliteToScroll ? movePosition : itemLeft * itemWidth;

        setPosition()
        checkBtns()
    })

    const setPosition = () => {
        track.style.transform = `translateX(${position}px)`
    }

    const checkBtns = () => {
        btnPrev.disabled = position === 0
        btnNext.disabled = position <= -(itemsCount - slidesToShow) * itemWidth
    }

}

export {slider};