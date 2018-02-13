// начало игры

window.onload = () => {

    let startBtn = document.getElementById('startBtn');
    let counterP = document.getElementById('tryCounter');
    let p = document.getElementById('instructions');
    let guesses = 0;
    let count = 0;
    let toCheck = [];
    let views = document.querySelectorAll('.view');

    // view

    let config = [{
       hash: 'start',
       viewId: 'start-page'
    },{
        hash: 'game',
        viewId: 'game-page'
    }];

    class Router {
        constructor(config) {
            this.config = config;
            this.COMMON_VIEW_CLASS_NAME = 'view';
            this.ACTIVE_VIEW_CLASS_NAME = 'view-active';

            window.onhashchange = (e) => {
                this.handleHashChange(e);
            };
        }

        handleHashChange({newURL = '', oldURL = ''}) {
            if (Router.isSameURL(newURL, oldURL) || newURL.length === 0) {
                return;
            }

            let newHash = newURL.split('#')[1];
            const page = this.config.find(page => {
                return page.hash === newHash;
            });

            if (!page) {
                return;
            }

            this.render(page.viewId);
        }

        static isSameURL(newURL, oldURL) {
            return newURL === oldURL;
        }

        render(viewId) {
            const views = Array.from(document.querySelectorAll('.' + this.COMMON_VIEW_CLASS_NAME));
            const viewToRender = document.getElementById(viewId);

            if (viewToRender) {
                views.forEach(view => view.classList.remove(this.ACTIVE_VIEW_CLASS_NAME));
                viewToRender.classList.add(this.ACTIVE_VIEW_CLASS_NAME);
            }
        }
    }

    let router = new Router(config);

    // Старт игры по кнопке

    startBtn.addEventListener('click', startGame);

    function startGame() {
        startBtn.style.display = 'none';
        for (let i = 0; i < views.length; i++) {
            views[i].classList.toggle('view-active');
        }
        createTable();
        p.innerHTML = 'Вам необходимо запомнить расположение картинок. Поторопитесь!';
        setTimeout(() => {
            p.innerHTML = 'Теперь пора вспомнить увиденное, раскрывайте карты парами';
            coverWithBackImg();
            counterP.style.display = 'block';
            gameProcessInit();
        }, 5000);
    }

    // Создание таблицы

    function createTable() {
        let gameField = document.querySelector('.view-active .game-field'),
            table = document.createElement('table');
        for (let i = 0; i < 4; i++) {
            let tr = table.insertRow();
            for (let j = 0; j < 4; j++) {
                let td = tr.insertCell();
            }
        }
        gameField.appendChild(table);
        randomPics();
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
        if (toCheck.length === 2) return;
        e.target.classList.remove('backImg');
        if (toCheck.indexOf(e.target) === -1) {
            toCheck.push(e.target);
            if (toCheck.length > 1) {
                check(toCheck);
            }
        }
    }

    // проверка картинок и победа

    function check(arr) {
        if (arr[0].classList.value === arr[1].classList.value) {
            setTimeout(() => {
                p.innerHTML = 'Ура! Верно';
                showCount();
                arr.forEach((item) => {
                    item.style.visibility = 'hidden';
                });
                guesses++;
                toCheck = [];

                // победа в игре

                if (guesses === 8) {
                    endGame();
                }
            }, 500);
        } else {
            setTimeout(() => {
                p.innerHTML = 'Увы..неверная пара';
                toCheck = [];
                showCount();
                arr.forEach((item) => {
                    item.classList.toggle('backImg');
                });
            }, 500);
        }
    }

    // Победа

    function endGame() {
        p.innerHTML = 'Это победа. Вы победитель и в игре и по жизни! Мои поздравления.';
        counterP.style.position = 'relative';
        counterP.style.marginTop = '130px';
        counterP.innerHTML = `Всего попыток: ${count}`;
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
        for (let i = 0; i < pictureClasses.length; i++) {
            for (let j = 0; j < 2; j++) {
                let random = Math.floor(Math.random() * tds.length);
                tds[random].classList.add(pictureClasses[i]);
                tds.splice(random, 1);
            }
        }
    }

    // Рубашка для карт

    function coverWithBackImg() {
        let tds = document.querySelectorAll('td');
        for (let i = 0; i < tds.length; i++) {
            tds[i].classList.add('backImg');
        }
    }

    // Чит код "*" - мгновенная победа

    document.body.addEventListener('keypress', winSecret);

    function winSecret(e) {
        if (e.keyCode === 42) {
            startBtn.style.display = 'none';
            counterP.style.display = 'block';
            views[0].classList.remove('view-active');
            views[1].classList.add('view-active');
            if (document.querySelector('table')) document.querySelector('table').style.display = 'none';
            endGame();
        }
    }
};
