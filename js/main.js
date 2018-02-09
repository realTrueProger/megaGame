
// начало игры

window.onload = () => {
    coverWithBackImg();
    let startBtn = document.getElementById('startBtn');
    let toCheck = [];
    let p = document.getElementById('instructions');
    let guesses = 0;
    let counterP = document.getElementById('tryCounter');
    let count = 0;

    startBtn.addEventListener('click', startGame);

    // Старт игры по кнопке

    function startGame(e) {
        startBtn.style.display = 'none';
        p.innerHTML = 'Вам необходимо запомнить расположение картинок. Поторопитесь!';
        randomPics();
        setTimeout( () => {
            p.innerHTML = 'Теперь пора вспомнить увиденное, раскрывайте карты парами';
            coverWithBackImg();
            counterP.style.display = 'block';
            gameProcessInit();
        }, 5000);
    }

    // Инициализация обработчиков картинок

    function gameProcessInit() {
        let tds = document.querySelectorAll('td');
        for (let i = 0; i < tds.length; i++) {
            tds[i].addEventListener('click', sendToCheck);
        }
    }

    // Отправляем картинки на проверку

    function sendToCheck(e) {
        e.target.classList.remove('backImg');
        if(toCheck.indexOf(e.target) === -1) {
            toCheck.push(e.target);
            if (toCheck.length > 1) {
                check(toCheck);
                toCheck = [];
            }
        }
        
    }

    // проверка картинок и победа

    function check(arr) {
        if (arr[0].classList.value === arr[1].classList.value) {
            setTimeout( () => {
                p.innerHTML = 'Ура! Верно';
                showCount();
                arr.forEach( (item) => {
                    item.style.visibility = 'hidden';
                });
                guesses++;
                console.log(guesses);

                // победа в игре

                if (guesses === 8) {
                    p.innerHTML = 'Это победа. Вы победитель и в игре и по жизни! Мои поздравления.';
                    counterP.style.top = '40%';
                    counterP.style.left = '40%';
                    counterP.innerHTML = `Всего попыток ${count}`;
                }
            }, 500);

        } else {
            setTimeout( () => {
                p.innerHTML = 'Увы..неверная пара';
                showCount();
                arr.forEach( (item) => {
                    item.classList.toggle('backImg');
                });
            }, 500);

        }
    }

    // счётчик попыток

    function showCount() {
        counterP.innerHTML = `Попытки: ${++count}`;
    }

    // Заполнение игрового поля картинками

    function randomPics() {
        let pictureClasses = ['img1', 'img2', 'img3', 'img4', 'img5', 'img6', 'img7', 'img8'];
        let tds = document.querySelectorAll('td');
        tds = Array.prototype.slice.call(tds);
        for(let i = 0; i < pictureClasses.length; i++) {
            for (let j = 0; j < 2; j++) {
                let random = Math.floor(Math.random() * tds.length);
                tds[random].classList.add(pictureClasses[i]);
                tds[random].classList.toggle('backImg');
                tds.splice(random, 1);
            }
        }
    }

    // Рубашка для карт

    function coverWithBackImg () {
        let tds = document.querySelectorAll('td');
        for (let i = 0; i < tds.length; i++) {
            tds[i].classList.add('backImg');
        }
    }

};
