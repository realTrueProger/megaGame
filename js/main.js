// Заполнение игрового поля картинками

function randomPics() {
    let pictureClasses = ['img1', 'img2', 'img3', 'img4', 'img5', 'img6', 'img7', 'img8'];
    let tds = document.querySelectorAll('td');
    tds = Array.prototype.slice.call(tds);
    for(let i = 0; i < pictureClasses.length; i++) {
        for (let j = 0; j < 2; j++) {
            let random = Math.floor(Math.random() * tds.length);
            tds[random].classList.add(pictureClasses[i]);
            tds.splice(random, 1);
        }
    }
}

function coverWithBackImg () {
    let tds = document.querySelectorAll('td');
    for (let i = 0; i < tds.length; i++) {
        tds[i].classList.add('backImg');
    }
}

//randomPics();
coverWithBackImg();
