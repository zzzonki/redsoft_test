let pictures

function Ready(){
    if(!localStorage.pics){
        pictures = [{name: "Рождение Венеры",
        painter: "Сандро Боттичелли",
        img: "./pics/venus.png",
        price:{
            old: "2 000 000 $",
            new: "1 000 000 $"
            },
        sold: false,
        cart: false,
        loading: false
        },
        {name: "Тайная вечеря",
        painter: "Леонардо да Винчи",
        img: "./pics/davinci.png",
        price:{
            old: "",
            new: "3 000 000 $"
            },
        sold: false,
        cart: false,
        loading: false
        },
        {name: "Сотворение Адама",
        painter: "Микеланджело",
        img: "./pics/creation.png",
        price:{
            old: "6 000 000 $",
            new: "5 000 000 $"
            },
        sold: false,
        cart: true,
        loading: false
        },
        {name: "Урок анатомии",
        painter: "Рембрандт",
        img: "./pics/anathomy.png",
        price:{
            old: "",
            new: "2 000 000 $"
            },
        sold: true,
        cart: false,
        loading: false
        }]
        console.log('no old')
    }else{
        pictures = JSON.parse(localStorage.getItem('pics'))
        console.log('old')
    }
}

document.addEventListener("DOMContentLoaded", Ready())
console.log(pictures)

let cards = document.querySelector('.cards')

let card = pictures.map(i => 
    (`<div class='card ${i.sold ? 'disabled' : ''}'>
    <div class='card__pic'>
        <img src='${i.img}' alt=''>
    </div>
    <h2 class='card__h2'>&laquo${i.name}&raquo ${i.painter}</h2>
    <div class='card__info ${i.sold ? 'hide' : ''}'>
        <div class='card__price'>
            <div class='card__price--old'>${i.price.old}</div>
            <div class='card__price--new'>${i.price.new}</div>
        </div>
        <button class='card__button button${i.cart ? '--cart' : ''}'>${i.cart ? '<svg class="button__icon"><use xlink:href="./svg/check.svg#check" /></svg>В корзине' : 'Купить'}</button>
    </div>
    <div class='card__sold ${i.sold ? '' : 'hide'}'>Продана на аукционе</div>
    </div>`)
).join('')

cards.innerHTML = card

let card_btn = document.querySelectorAll('.card__button')

function Add_click(btn, i){
    fetch('https://jsonplaceholder.typicode.com/posts/1')
    .then(
        btn.innerHTML = '<div class="loader"><div class="loader__inside"></div></div>',
        console.log('Загрузка...')
    )
    .then(
        response => {
            return response.json()
        }
    ).then(
        (result) => {
            console.log(result)
            pictures[i].cart = true
            btn.classList.remove('button')
            btn.classList.add('button--cart')
            btn.innerHTML = `${pictures[i].cart ? '<svg class="button__icon"><use xlink:href="./svg/check.svg#check" /></svg>В корзине' : 'Купить'}`
            setTimeout(() => {
                localStorage.setItem('pics', JSON.stringify(pictures))
            }, 1)
        }
    ).catch(() => console.log('Ошибка'))
}

function Remove_click(btn, i){
    pictures[i].cart = false
    btn.classList.remove('button--cart')
    btn.classList.add('button')
    btn.innerHTML = `${pictures[i].cart ? '<svg class="button__icon"><use xlink:href="./svg/check.svg#check" /></svg>В корзине' : 'Купить'}`
    setTimeout(() => {
        localStorage.setItem('pics', JSON.stringify(pictures))
    }, 1);
}

card_btn.forEach((btn, i) => {
    btn.addEventListener('click', function(){
        pictures[i].cart ? Remove_click(btn, i) : Add_click(btn, i)
    })
})