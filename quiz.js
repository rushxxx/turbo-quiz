// 'use strict';

let progressBarNumber = 5;
let questionCounter = 0; //Tracks question number
let selections = []; //Array containing user choices
let selectedBrand;
let selectionsVal = []; //Array containing user choices values
let selectionsValIndex = 0;
let container = document.getElementById('container');
let quiz = document.querySelector('#quiz'); //Quiz div object
let hero = document.getElementById('hero');
let labelButton;
let progressBar = document.getElementById('progress-bar');
let svg = document.getElementById('progress-bar-svg');
let fz = 14; //Progress bar point font size (half)
let colorWhite = '#fff';
let colorMain = '#36a9ae';
let heroButton = document.getElementById('hero-button');
let nextButton = document.getElementById('next');
let prevButton = document.getElementById('prev');
let startButton = document.getElementById('start');
let goButton = document.getElementById('go');

let callbackForm = document.getElementById('callback-form');
let thanks = document.getElementById('thanks');
let mainWidth = window.innerWidth;
let mainHeight = window.innerHeight;
let inAnimateTime = 1000;
let outAnimateTime = 1000;
let broHideTime = 400;
let car = document.getElementById('car');
let carOptions;


// Обработчик кнопки "вперед на главной"
heroButton.addEventListener('click', function() {
	carOut(car);

	hero.classList.add('hide');
	setTimeout(function(){
		hero.classList.add('bro-hide');

		createProgressBar();
	}, broHideTime);
	quiz.classList.remove('bro-hide');
	quiz.classList.add('show');
	createNext();
});


// Обработчик кнопки "назад"
prevButton.addEventListener('click', function(e) {
	e.preventDefault();

	questionCounter--;
	if (questionCounter === 0){
		prevButton.style.display = 'none';
	}
	carOut(car);
	createNext();
});

// Обработчик кнопки "вперед"
nextButton.addEventListener('click', function(e) {
	e.preventDefault();

	questionCounter++;
	carOut(car);
	createNext();
});

// Обработчик кнопки "старт"
startButton.addEventListener('click', function(e) {
	e.preventDefault();

	questionCounter++;
	carOut(car);
	createNext();
});

function createNext(){
	let choiceElement;

	quiz.classList.add('hide');

	setTimeout(function(){
		carOptions = getCar();
		createCar();
	}, outAnimateTime);

	setTimeout(function(){

	// Очищаем quiz
	while (quiz.firstChild) {
		quiz.removeChild(quiz.firstChild);
	}

	// Вывод прогресс бара
	if (questionCounter > questions.question.length - 1) {
		progressBar.remove();
	} else {
		progressLineColor = document.querySelector('.progress-line-color');
		progressLineColor.parentNode.removeChild(progressLineColor);
		createProgressLine();
	}
	quiz.classList.remove('hide');

	if (questionCounter < 4){
		let questionElement = createQuestionElement(questionCounter);
		quiz.append(questionElement);
	}

	switch(questionCounter){
		case 0:
			choiceElement = createBrandElement();
			prevButton.style.display = 'none';
			break;
		case 1:
			let models = questions.model[selectionsVal[0]];
			choiceElement = createSliderElement(models);
			prevButton.style.display = 'inline-block';
			break;
		case 2:
			let years = questions.years;
			choiceElement = createSliderElement(years);
			nextButton.style.display = 'none';
			break;
		case 3:
			createComponentForm();
			nextButton.style.display = 'inline-block';
			setTimeout(function(){
				quiz.classList.remove('hide');
			}, 1000);
			break;
		case 4:
			createCallbackForm();
			displayForm();
			nextButton.style.display = 'none';
			prevButton.style.display = 'none';
			startButton.style.display = 'inline-block';
			break;
		case 5:
			createThanks();
			startButton.style.display = 'none';
			goButton.style.display = 'inline-block';
			break;
	}
	
	if (questionCounter < 3){
		quiz.append(choiceElement);
		setTimeout(choiceListen, 100);
	}

	}, broHideTime);	
}
// определяет на каком элементе li был клик
function choiceListen(){
	let elem = document.getElementById('choice');
	elem.addEventListener("click", function(event){
		let target = event.target.closest('li');
		if (!target) return;
		addChoice(target);
		questionCounter++;
		carOut(car);
		quiz.classList.add('hide');
		createNext();
	});
}
// Добавление выбранного пункта в массив
function addChoice(target){
	selectionsVal[questionCounter] = target.getAttribute('name');
}


// Создаем и возвращаем div который содержит вопрос
function createQuestionElement(index) {
	const qElement = document.createElement('div');
	qElement.classList.add('question');
	qElement.id = 'question';
	qElement.insertAdjacentHTML('beforeend', `
		<h2 class="question-title">Шаг ` + (index + 1) + `</h2>
		<p class="question-text">` + questions.question[index] + `</p>
	`);
	return qElement;
}
// Создаем и возвращаем блок с марками авто
function createBrandElement(){
	const cElement = document.createElement('ul');
	cElement.id = 'choice';
	cElement.classList.add('choice', 'bro-flex');
	for (let i = 0; i < questions.brand.length; i++){
	cElement.insertAdjacentHTML('beforeend', `
			<li class="choice-item" name="` + questions.brand[i] + `">
				<div class="choice-pic bro-pic" style="background-image: url(img/` + questions.brand[i] + `.png);"></div>
				<div class="choice-text">` + questions.brand[i] + `</div>
			</li>
	`);
	}
	return cElement;
}
// Создаем и возвращаем слайдер
function createSliderElement(elements){
	const cElement = document.createElement('ul');
	cElement.id = 'choice';
	cElement.classList.add('sliderVertical-list');
	
	for (let i = 0; i < elements.length; i++){
		cElement.insertAdjacentHTML('beforeend', `
			<li class="sliderVertical-item" name=` + elements[i] + `">
				` + elements[i] + `
			</li>`
		);
	};
	return cElement;
}

// Создаем форму названия детали
function createComponentForm(){
	quiz.insertAdjacentHTML('beforeend', `
	<form class="callback-form" id="component-form" method="POST">
		<div class="input_1">
			<input class="callback-form-item" id="input_3" type="text" name="answer" autocomplete="off">
			<span>Введите название детали</span>
		</div>
	</form>`
	);

	// Обработчик формы названия детали
	let componentForm = document.getElementById('component-form');
	let input = document.getElementById('input_3')
	componentForm.addEventListener('change', function(){
		selectionsVal[questionCounter] = input.value;
	});
	// Эффекты формы
	componentForm.addEventListener('focusin', function(){
		this.children[0].children[1].classList.add('active-input');
	});
	input.addEventListener('focusout', function(){
		if (this.value === ''){
		this.nextElementSibling.classList.remove('active-input');
		}
	});
}

// Создание формы обратной связи
function createCallbackForm(){
	quiz.insertAdjacentHTML('beforeend', `
	<form class="callback-form" id="callback-form" method="POST">
		<div class="input_1">
			<input class="callback-form-item" id="input_1" type="text" autocomplete="off">
			<span>Представьтесь пожалуйста</span>
		</div>
		<div class="input_1">
			<input class="callback-form-item" id="input_2" type="text" autocomplete="off">
			<span>Как с Вами связаться?</span>
		</div>
	</form>`
	);

	// Обработчик формы названия детали
	let callbackForm = document.getElementById('callback-form');
	let input_1 = document.getElementById('input_1');
	let input_2 = document.getElementById('input_2');

	
	// Эффекты формы
	input_1.addEventListener('focusin', function(){
		this.nextElementSibling.classList.add('active-input');
	});
	input_2.addEventListener('focusin', function(){
		this.nextElementSibling.classList.add('active-input');
		if (this.value === ''){
			this.parentElement.classList.add('active-input-text');
		}else{
			this.parentElement.classList.remove('active-input-text');
		}
	});
	input_1.addEventListener('focusout', function(){
		if (this.value === ''){
		this.nextElementSibling.classList.remove('active-input');
		}
	});
	input_2.addEventListener('focusout', function(){
		if (this.value === ''){
		this.nextElementSibling.classList.remove('active-input');
		this.parentElement.classList.remove('active-input-text');
		}
	});
	input_2.addEventListener('input', function(){
		if (this.value === ''){
			this.parentElement.classList.add('active-input-text');
		}else{
			this.parentElement.classList.remove('active-input-text');
		}
	})
}

// Создание блока "Спасибо"
function createThanks(){
	quiz.insertAdjacentHTML('beforeend', `
	<div class="thanks" id="thanks">
		<h2 class="thanks-title">Спасибо!</h2>
		<p class="thanks-text">Мы подбираем для Вас варианты!<br><br>В течении 5 минут с Вами свяжется наш менеджер и предложит Вам несколько достойных аналогов и самые доступные на рынке оригиналы!</p>
	</div>`
	);
}

// Создание скрытых инпутов формы обратной связи и запись в них ответов на вопросы
function displayForm() {
	let form = document.getElementById('callback-form');
	for (var i = 0; i < questions.question.length; i++) {
		var val = selectionsVal[i];
		form.insertAdjacentHTML('beforeend', `
			<input name="hide_` + i + `" class="callback-form-item-hide" type="text" value="` + val + `">
		`);
	}
	return form;
}

// Создание Элементов прогресс бара
function createProgressBar() {
	let elem = document.getElementById('progress-bar');
	let elemText = document.querySelector('.progress-bar-text');
	elemText.classList.remove('bro-hide');
	createLine(0, 0, elem.offsetWidth, 0, colorWhite, 'progress-line');
	createLine(0, 0, 0, 0, colorMain, 'progress-line-color');
}
// Создание линий прогресс бара
function createLine(x1, y1, x2, y2, color, classLine) {
	var line = document.createElementNS("http://www.w3.org/2000/svg", "line");
	line.setAttribute('x1', x1);
	line.setAttribute('y1', y1);
	line.setAttribute('x2', x2);
	line.setAttribute('y2', y2);
	line.setAttribute('stroke', color);
	line.setAttribute('class', classLine);
	svg.append(line); 
}
// Создание линии прогресса прогресс бара
function createProgressLine() {
	let elem = document.getElementById('progress-bar');
	let step = elem.offsetWidth / questions.question.length;
	let x = step * questionCounter;
	createLine(0, 0, x, 0, colorMain, 'progress-line-color');
}

// ---- Анимация машины ----

// Функция находит и возвращает характеристики машины
function getCar(){
	let side = getRandomIntMinMax(1, 4);
	// x1, y1, x2, y2 - координаты начальной и конечной точек движения
	// side - сторона начала движения(верх, низ, право, лево)
	// bg - в зависимости от куда выезжает машина, выбирается картинка
	// bgz - размер машины
	switch (side){
		case 1:
			x1 = getRandomIntMinMax(0, mainWidth * 5 / 6);
			x2 = x1;
			y1 = - mainHeight;
			y2 = mainHeight * 1.5;
			bg = 'img/bg_car_top.png';
			break;
		case 2:
			y1 = getRandomIntMinMax(0, mainHeight * 5 / 6);
			y2 = y1;
			x1 = mainWidth * 1.5;
			x2 = - mainWidth;
			bg = 'img/bg_car_right.png';
			break;
		case 3:
			x1 = getRandomIntMinMax(0, mainWidth * 5 / 6);
			x2 = x1;
			y1 = mainHeight * 1.5;
			y2 = - mainHeight;
			bg = 'img/bg_car_bottom.png';
			break;
		case 4:
			y1 = getRandomIntMinMax(0, mainHeight * 5 / 6);
			y2 = y1;
			x1 = - mainWidth;
			x2 = mainWidth * 1.5;
			bg = 'img/bg_car_left.png';
			break;
	}
	bgz = getRandomIntMinMax(150, 250);
	return [x1, y1, x2, y2, side, bg, bgz];
}

createCar();

function carAdd(elem){
	elem.style.transition = '0s';
	setTimeout(function(){
		elem.style.backgroundImage = 'url(' + carOptions[5] + ')';
		elem.style.backgroundSize = carOptions[6] + 'px';
		elem.style.backgroundPositionX = carOptions[0] + 'px';
		elem.style.backgroundPositionY = carOptions[1] + 'px';
	}, 10);
}

function carIn(elem){
	elem.style.transition = 'background-position ' + inAnimateTime / 1000 + 's';
	switch (carOptions[4]){
		case 1:
			elem.style.backgroundPositionY = '0px';
			break;
		case 2:
			elem.style.backgroundPositionX = (mainWidth * 4 / 5) + 'px';
			break;
		case 3:
			elem.style.backgroundPositionY = (mainHeight * 4 / 5) + 'px';
			break;
		case 4:
			elem.style.backgroundPositionX = '0px';
			break;
	}
}

function carOut(elem){
	elem.style.transition = 'background-position ' + outAnimateTime / 1000 + 's';
	elem.style.backgroundPositionX = carOptions[2] + 'px';
	elem.style.backgroundPositionY = carOptions[3] + 'px';
	setTimeout(function(){
		elem.style.backgroundImage = 'none';
		elem.style.transition = 'background-position 0s';
	}, outAnimateTime);
}


function createCar(){
	carOptions = getCar();
	setTimeout(function(){
		carAdd(car);
		setTimeout(function(){
			carIn(car)
		}, 100);
	}, 10);
	
}


// случайное число от min до max
function getRandomIntMinMax(min, max) {
	let rand = min + Math.random() * (max + 1 - min);
	return Math.floor(rand);
}

function getRandomInt(number) {
	return Math.floor(Math.random() * Math.floor(number));
}



