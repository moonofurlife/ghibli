document.addEventListener('mousemove', e => {
    Object.assign(document.documentElement, {
        style: `
        --move-x:${(e.clientX - window.innerWidth / 2) * -.009}deg;
        --move-y:${(e.clientY - window.innerHeight / 2) * -.009}deg;
        `
    })
})
var swiper1 = new Swiper('.swiper-container.swiper-container1', {

    slidesPerView: 1,
    mousewheel: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    speed: 2000,
    autoplay: {
        delay: 20000,
    },
    loop: true,
});
let swiper2; // Объявляем переменную вне функции, чтобы она была доступна и в других функциях

function toggleBlock(button) {
    const logo = document.getElementsByClassName('logo')[0];
    const menu = document.getElementsByClassName('menu__container')[0];
    const body = document.body;
    const music = document.getElementById('music')
    const nextBlock = document.getElementById('catalogue');
    const lending = document.getElementById('lending');
    const swiperSlides = document.querySelectorAll('.swiper-wrapper2 .swiper-slide');

    if (button[0] == 'button-start' || button[0] == 'films') {
        console.log('start')
        lending.style.display = 'none';
        filmContainer.style.display = 'none';
        nextBlock.style.display = 'block';
        // music.play();
        menu.style.display = 'flex';
        logo.style.left = '20px';
        logo.style.backgroundImage = 'url(img/logo1.svg)'
        body.style.background = 'linear-gradient(rgba(28, 24, 29, 1), black)';
        if (button[0] !== 'button-start'){
            for (let i = 0; i < swiperSlides.length; i++) {
                swiperSlides[i].remove();
                console.log('получилось')
            }
        }
    }
    else {
        music.pause()
        menu.style.display = 'none';
        logo.style.backgroundImage = 'url(img/logo.svg)'
        logo.style.left = '40%';
        lending.style.display = 'block';
        nextBlock.style.display = 'none';
        body.style.background = '#00B2FF';

    }
}

function createSwaperFilds(numSlidesToAdd) {
    const swiperWrapper = document.querySelector('.swiper-wrapper2 ');
    const charactersPerSlide = 3; // Количество персонажей на одном слайде
    let characterCounter = 1; // Начальное значение счетчика персонажей

    // Уничтожаем предыдущий экземпляр Swiper
    if (swiper2) {
        swiper2.destroy();
    }

    for (let i = 0; i < numSlidesToAdd; i++) {
        const slide = document.createElement('div');
        slide.classList.add('swiper-slide');
        for (let j = 0; j < charactersPerSlide; j++) {
            const card = document.createElement('div');
            card.classList.add('card');
            card.id = `character${characterCounter}`; // Установка уникального идентификатора
            card.innerHTML = `
                <img src="">
                <p></p>
            `;
            slide.appendChild(card);
            characterCounter++; // Увеличение счетчика для следующего персонажа
        }

    swiperWrapper.appendChild(slide);
    }

    // Создаем новый экземпляр Swiper после добавления новых слайдов
    swiper2 = new Swiper('.swiper-container.swiper-container2', {
        slidesPerView: 1,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
        },
        loop: true,
    });
}



async function fillFilmData(filmKey) {
    try {
        // Загружаем файл films.json
        const response = await fetch('films.json');
        
        // Проверяем успешность загрузки
        if (!response.ok) {
            throw new Error('Failed to load films data');
        }
        
        // Получаем содержимое файла
        const filmsData = await response.json();
        
        // Получаем данные конкретного фильма
        const filmData = filmsData[filmKey];
        
        // Заполняем элементы на странице данными о фильме
        document.getElementById("EnglishName").textContent = filmData.englishName;
        document.getElementById("MainName").textContent = filmData.mainName;
        document.getElementById("JapaneseName").textContent = filmData.japaneseName;
        document.getElementById("MainQuote").textContent = filmData.mainQuote;
        document.getElementById("History").textContent = filmData.history;
        document.getElementById("Story").textContent = filmData.story;
        document.getElementById("MainPhoto").src = filmData.mainPhotoSrc;
        document.getElementById("trailer").src = filmData.trailer;
    } catch (error) {
        console.error('Error:', error);
    }
}

// Функция для заполнения данных о персонажах
async function fillCharactersData(filmKey) {
    try {
        // Загружаем файл films.json
        const response = await fetch('films.json');
        
        // Проверяем успешность загрузки
        if (!response.ok) {
            throw new Error('Failed to load films data');
        }
        
        // Получаем содержимое файла
        const filmsData = await response.json();
        
        // Получаем данные конкретного фильма
        const filmData = filmsData[filmKey];
        // if (filmData.characters.length > 3) {
        //     let numofslides = (filmData.characters.length - 3) / 3
        //     console.log(numofslides)
        //     createSwaperFilds(numofslides)
        // }
        
        let numofslides = (filmData.characters.length) / 3
        console.log(numofslides)
        createSwaperFilds(numofslides)
        

        // Заполняем элементы на странице данными о персонажах
        filmData.characters.forEach((character, index) => {
            const characterElement = document.getElementById(`character${index + 1}`);
            if (characterElement) {
                characterElement.querySelector("p").textContent = character.name;
                characterElement.querySelector("img").src = character.photoSrc;
            }
        });
        
    } catch (error) {
        console.error('Error:', error);
    }
}




const music = document.getElementById('music')
const films = document.querySelectorAll('.film');
const catalogueContainer = document.querySelector('.catalogue_conteiner');
const filmContainer = document.querySelector('.film__container');
const body = document.body;
const logo = document.getElementsByClassName('logo')[0];

films.forEach(film => {
    film.addEventListener('click', () => {
        // Скрываем контейнер каталога
        catalogueContainer.style.display = 'none';
        music.pause()
        // Отображаем контейнер фильма
        filmContainer.style.display = 'flex';
        body.style.background = 'none'
        body.style.backgroundColor = '#0F1D26';
        logo.style.backgroundSize = 'contain'
        logo.style.width = 'calc(var(--index)*10)';
        logo.style.height = 'calc(var(--index)*10)';
        logo.style.top = '10px';
        // Получаем id выбранного фильма и используем его для заполнения данных
        const filmId = film.id.substring(1);
        fillFilmData(filmId);
        fillCharactersData(filmId)
    });
});

