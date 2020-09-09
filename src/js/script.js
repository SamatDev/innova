document.addEventListener('DOMContentLoaded', () => {
    // sidebar menu
    const parentMenuBtns = document.querySelectorAll('.parent-menu li a'),
        childMenus = document.querySelectorAll('.parent-menu .tapble');

    for (let i = 0; i < parentMenuBtns.length; i++) {
        parentMenuBtns[i].addEventListener('click', e => {
            e.preventDefault()
            childMenus[i].classList.contains('active') ?
                childMenus[i].classList.remove('active') :
                childMenus[i].classList.add('active')
        })
    }
    // end sidebar

    // data
    const dataWrap = document.querySelector('#content-wrapper');

    (function () {
        fetch('/innova/innova/src/data.json')
            .then(async response => {
                const data = await response.json()

                data.forEach(element => {

                    const div = document.createElement('div')
                    div.classList.add('serial')

                    div.innerHTML = `
                        <div class="picture">
                            <img src="${element.picture}" alt="">
                            <div class="overlay">
                                <div class="top">
                                    <div class="like-button"></div>
                                    <div class="exit">&times;</div>
                                </div>
                                <div class="body"></div>
                                <div class="bottom">
                                    <div class="KP">KP: ${element.KP}</div>
                                    <div class="IMDb">IMDb: ${element.IMDb}</div>
                                </div>
                            </div>
                        </div>
                        <div class="like">
                            <div class="likes">${element.desc.likes}</div>
                            <div class="dislikes">${element.desc.dislikes}</div>
                        </div>
                        <div class="title">${element.title}</div>
                        <div class="desc">
                            ${element.desc.seasons} сезонов, ${element.desc.series} серии
                        </div>
                    `
                    dataWrap.append(div)
                });

                // В случае удачного фетча, после того как форич выстроит все элементы
                // Вешаем события клика по лайку
                const likeBtn = document.querySelectorAll('.like-button');
                console.log(likeBtn)
                likeBtn.forEach(element => {
                    element.addEventListener('click', e => {
                        e.preventDefault()
                        element.classList.contains('active') ?
                            element.classList.remove('active') :
                            element.classList.add('active')
                    })
                });
            })
            .catch(err => console.log(err))
    }())
    
    // mobile menu

    const menuBtn = document.querySelector('.burger'),
        mMenu = document.querySelector('.sidebar');
    menuBtn.addEventListener('click', e => {
        e.preventDefault()
        mMenu.classList.contains('active') ?
            mMenu.classList.remove('active') :
            mMenu.classList.add('active')
            
    })

    const closeMenu = document.querySelector('.close');

    closeMenu.addEventListener('click', e => {
        e.preventDefault()
        mMenu.classList.remove('active')
    })
    // like btn
})