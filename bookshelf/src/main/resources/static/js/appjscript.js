var user = 'aclkey';
var counts = 'countskey';
var editBtns = document.getElementsByClassName("editbutton");
var deteleBtns = document.getElementsByClassName("delbutton");
var cartView = document.getElementsByClassName("cartref");

var menu01 = document.getElementById("menu01");
var menu02 = document.getElementById("menu02");
var menu03 = document.getElementById("menu03");

menu01.addEventListener("click", function() {
	selectViewForUsers();
});
menu02.addEventListener("click", function() {
	addBook();
});
menu03.addEventListener("click", function() {
	search();
});

function ajaxCallCommon(reqType, destUrl, callBack) {
	var xhr = new XMLHttpRequest();
	xhr.open(reqType, destUrl, true);
	xhr.send();

	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4 && xhr.status === 200) {
			var books = JSON.parse(xhr.responseText);
			callBack(books);
		}
	};

}

function ajaxCallPost(reqType, destUrl, postData, callBack) {
	var xhr = new XMLHttpRequest();
	xhr.open(reqType, destUrl, true);
	xhr.send(postData);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4 && xhr.status === 200) {
			var books = JSON.parse(xhr.responseText);
			callBack(books);
		}
	};
}

function selectViewForUsers() {
	var xhr = new XMLHttpRequest();
	xhr.open("POST", "bookshelf/sample");
	xhr.send();
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4 && xhr.status === 200) {
			sessionStorage.setItem(user, "admin");
			ajaxCallCommon("GET", 'bookshelf/all', mainViewTable);
		}
		if (xhr.readyState === 4 && xhr.status !== 200) {
			ajaxCallCommon("GET", 'bookshelf/all', mainViewTable);
			sessionStorage.setItem(user, "noadmin");
			document.getElementById("menu02").outerHTML = "";
		}

	};

}

function mainViewTable(jsonData) {
	var row = '';
	var buttonSection = '';

	/*
	 * --- Создание HTML-объекта - главной таблицы
	 */
	/*
	 * Таблица для администратора
	 */

	if (sessionStorage.getItem(user) === 'admin') {
		row += '<tr>' + '<th>' + "№" + '</th>' + '<th>' + "Название" + '</th>'
				+ '<th>' + "Автор" + '</th>' + '<th>' + "Серия" + '</th>'
				+ '<th>' + "Издательство" + '</th>' + '<th>' + "ISBN" + '</th>'
				+ '<th>' + "Опции" + '</th>' + '</tr>';

		jsonData.forEach(function(objBooks) {

			buttonSection = '<div class="optioncell"' + ' id="' + objBooks.id
					+ '">' + '<button class="editbutton">Изменить</button>'
					+ '<button class="delbutton">Удалить</button>';

			/*
			 * --- Тело главной таблицы
			 */

			row += '<tr id="' + objBooks.id + '">'
					+ '<td><a href="#" class="cartref">' + objBooks.id
					+ '</td>' + '<td>' + objBooks.title + '</td>' + '<td>'
					+ objBooks.author + '</td>' + '<td>' + objBooks.theme
					+ '</td>' + '<td>' + objBooks.publisher + '</td>' + '<td>'
					+ objBooks.isbn + '</td>' + '<td>' + buttonSection
					+ '</td>' + '</tr>';

		});

	}

	/*
	 * Таблица для пользователя
	 */

	if (sessionStorage.getItem(user) === 'noadmin') {
		row += '<tr>' + '<th>' + "№" + '</th>' + '<th>' + "Название" + '</th>'
				+ '<th>' + "Автор" + '</th>' + '<th>' + "Серия" + '</th>'
				+ '<th>' + "Издательство" + '</th>' + '<th>' + "ISBN" + '</th>'
				+ '</tr>';

		jsonData.forEach(function(objBooks) {

			/*
			 * --- Тело главной таблицы
			 */

			row += '<tr id="' + objBooks.id + '">'
					+ '<td><a href="#" class="cartref">' + objBooks.id
					+ '</td>' + '<td>' + objBooks.title + '</td>' + '<td>'
					+ objBooks.author + '</td>' + '<td>' + objBooks.theme
					+ '</td>' + '<td>' + objBooks.publisher + '</td>' + '<td>'
					+ objBooks.isbn + '</td>' + '</tr>';

		});

	}

	document.getElementById("maintable").innerHTML = '<table id="bookstable"></table>';
	document.getElementById("bookstable").innerHTML = row;

	/*
	 * -- Создание листнеров для элементов таблицы
	 */

	Array.from(editBtns).forEach(function(element) {
		element.addEventListener("click", editBook);
	});

	Array.from(deteleBtns).forEach(function(element) {
		element.addEventListener("click", deteleBook);
	});

	Array.from(cartView).forEach(function(element) {
		element.addEventListener("click", viewBook);
	});

}

function addBook() {

	/*
	 * -- Строим модальное окно и задаем содержимое
	 */

	document.getElementById("modalplace").className = "modal";
	var modal = document.querySelector(".modal");
	var overflow = document.createElement("div");
	var currentElement = document.getElementById("modal-entry");
	overflow.className = "overflow";
	document.body.appendChild(overflow);
	var height = modal.offsetHeight;
	modal.style.marginTop = -height / 2 + "px";
	modal.style.top = "50%";

	/*
	 * --- Создание HTML-объекта для модального окна
	 */

	currentElement.innerHTML = '<h4>Для добавления новой книги заполните карточку</h4>'
			+ '<form action="" method="post" id="form addbook"><label for="title" class="modal-form-label">Название</label>'
			+ '<input type="text" name="title" value="" maxlength="140" class="modal-form-input">'
			+ '<label for="author" class="modal-form-label">Автор</label>'
			+ '<input type="text" name="author" value="" maxlength="140" class="modal-form-input">'
			+ '<label for="theme" class="modal-form-label">Серия</label>'
			+ '<input type="text" name="theme" value="" maxlength="140" class="modal-form-input">'
			+ '<label for="isbn" class="modal-form-label">Издатетельство</label>'
			+ '<input type="text" name="publisher" value="" maxlength="140" class="modal-form-input">'
			+ '<label for="publisher" class="modal-form-label">ISBN</label>'
			+ '<input type="text" name="isbn" value="" maxlength="140" class="modal-form-input">'
			+ '<input type="submit" id="modaladd-yes-btn" value="Добавить" class="modaladd-button">'
			+ '<input type="button" id="modaladd-no-btn" value="Отмена" class="modaladd-button"></form>'
			+ ' <div id="modal-form-ready"></div>';

	/*
	 * -- Листнеры и обработка событий для функции добавления
	 */

	var addBtn = document.getElementById("form addbook");
	var cancelBtn = document.getElementById("modaladd-no-btn");

	addBtn.addEventListener("submit", function(e) {
		e.preventDefault();
		var formData = new FormData(addBtn);
		ajaxCallPost("POST", 'bookshelf/add', formData);
		setTimeout('', 1500);
		ajaxCallCommon("GET", 'bookshelf/all', mainViewTable);
		modal.style.top = "-100%";
		overflow.remove();
		currentElement.innerHTML = '';
		ajaxCallCommon("GET", 'bookshelf/all', mainViewTable);
	});
	cancelBtn.addEventListener("click", function() {
		modal.style.top = "-100%";
		overflow.remove();
		currentElement.innerHTML = '';
	});

}

function editBook() {

	/*
	 * -- Строим модальное окно и задаем содержимое
	 */

	var cartId = this.parentNode.id;
	ajaxCallCommon("GET", 'bookshelf/book/' + cartId, toEditBook);
	document.getElementById("modalplace").className = "modal";
	var modal = document.querySelector(".modal");
	var overflow = document.createElement("div");
	var currentElement = document.getElementById("modal-entry");
	overflow.className = "overflow";
	document.body.appendChild(overflow);
	var height = modal.offsetHeight;
	modal.style.marginTop = -height / 2 + "px";
	modal.style.top = "50%";

	currentElement.innerHTML = '<h4>Для изменения атрибутов книги номер '
			+ cartId + '</br> поменяйте значения в полях карточки</h4>'
			+ '<div id="carteditin"></div>';

	/*
	 * --- Создание HTML-объекта для модального окна с парсингом полученных
	 * данных
	 */

	function toEditBook(jsonData) {

		var cartelem = '';
		cartelem = '<form action="" method="post" id="form editbook">'
				+ '<label for="id" class="modal-form-label">Номер книги</label>'
				+ '<input type="text" readonly name="id" value="'
				+ jsonData.id
				+ '" maxlength="140" class="modal-form-input">'
				+ '<label for="title" class="modal-form-label">Название</label>'
				+ '<input type="text" name="title" value="'
				+ jsonData.title
				+ '" maxlength="140" class="modal-form-input">'
				+ '<label for="author" class="modal-form-label">Автор</label>'
				+ '<input type="text" name="author" value="'
				+ jsonData.author
				+ '" maxlength="140" class="modal-form-input">'
				+ '<label for="theme" class="modal-form-label">Серия</label>'
				+ '<input type="text" name="theme" value="'
				+ jsonData.theme
				+ '" maxlength="140" class="modal-form-input">'
				+ '<label for="isbn" class="modal-form-label">Издатетельство</label>'
				+ '<input type="text" name="publisher" value="'
				+ jsonData.publisher
				+ '" maxlength="140" class="modal-form-input">'
				+ '<label for="publisher" class="modal-form-label">ISBN</label>'
				+ '<input type="text" name="isbn" value="'
				+ jsonData.isbn
				+ '" maxlength="140" class="modal-form-input">'
				+ '<input type="submit" id="modaledit-yes-btn" value="Потвердить" class="modaledit-button">'
				+ '<input type="button" id="modaledit-no-btn" value="Отмена" class="modaledit-button""></form>';

		document.getElementById("carteditin").innerHTML = cartelem;

		/*
		 * -- Листнеры и обработка событий для функции изменения
		 */

		var editBtn = document.getElementById("form editbook");
		var cancelBtn = document.getElementById("modaledit-no-btn");

		editBtn.addEventListener("submit", function(e) {
			e.preventDefault();
			var formData = new FormData(editBtn);
			ajaxCallPost("POST", 'bookshelf/edit', formData);
			setTimeout('', 1500);
			ajaxCallCommon("GET", 'bookshelf/all', mainViewTable);
			modal.style.top = "-100%";
			overflow.remove();
			currentElement.innerHTML = '';
			ajaxCallCommon("GET", 'bookshelf/all', mainViewTable);
		});

		cancelBtn.addEventListener("click", function() {
			modal.style.top = "-100%";
			overflow.remove();
			currentElement.innerHTML = '';
		});
	}
	;

}

function deteleBook() {

	/*
	 * -- Строим модальное окно и задаем содержимое
	 */

	var cartId = this.parentNode.id;
	document.getElementById("modalplace").className = "modal-2";
	var modal = document.querySelector(".modal-2");
	var overflow = document.createElement("div");
	overflow.className = "overflow";
	document.body.appendChild(overflow);
	var height = modal.offsetHeight;
	modal.style.marginTop = -height / 2 + "px";
	modal.style.top = "50%";
	var currentElement = document.getElementById("modal-entry");

	/*
	 * --- Создание HTML-объекта для модального окна
	 */

	currentElement.innerHTML = '<h4>Вы действительно хотите удалить карточку номер '
			+ cartId
			+ ' ?</h4>'
			+ '<button id="modaldel-yes-btn" class="modaldelete-button">Да</button>'
			+ '<button id="modaldel-no-btn" class="modaldelete-button">Нет</button>';

	/*
	 * -- Листнеры и обработка событий для функции удаления
	 */

	var modalBtn1 = document.getElementById("modaldel-yes-btn");
	var modalBtn2 = document.getElementById("modaldel-no-btn");

	modalBtn1.addEventListener("click", function() {
		ajaxCallCommon("DELETE", 'bookshelf/flush/' + cartId);
		setTimeout('', 1500);
		ajaxCallCommon("GET", 'bookshelf/all', mainViewTable);
		modal.style.top = "-100%";
		overflow.remove();
		currentElement.innerHTML = '';
		ajaxCallCommon("GET", 'bookshelf/all', mainViewTable);
	});
	modalBtn2.addEventListener("click", function() {
		modal.style.top = "-100%";
		overflow.remove();
		currentElement.innerHTML = '';
	});
}

function viewBook() {

	/*
	 * -- Строим модальное окно и задаем содержимое
	 */

	var cartId = this.parentNode.parentNode.id;
	ajaxCallCommon("GET", 'bookshelf/book/' + cartId, toViewBook);
	document.getElementById("modalplace").className = "modal";
	var modal = document.querySelector(".modal");
	var overflow = document.createElement("div");
	var currentElement = document.getElementById("modal-entry");
	overflow.className = "overflow";
	document.body.appendChild(overflow);
	var height = modal.offsetHeight;
	modal.style.marginTop = -height / 2 + "px";
	modal.style.top = "50%";

	/*
	 * --- Создание HTML-объекта для модального окна
	 */

	currentElement.innerHTML = '<h4>Просмотр карточки номер '
			+ cartId
			+ '</h4>'
			+ '<div id="cartviewin"></div>'
			+ '<button id="modalview-no-btn" class="modalview-button">Закрыть</button>';

	/*
	 * --- Парсим полученые данные и помещаем в DOM
	 */

	function toViewBook(jsonData) {
		var cartelem = '';
		cartelem += '<div><br><br>' + '<p>' + 'Название: ' + jsonData.title
				+ '</p><br>' + '<p>' + 'Автор: ' + jsonData.author + '</p><br>'
				+ '<p>' + 'Серия: ' + jsonData.theme + '</p><br>' + '<p>'
				+ 'Издательство: ' + jsonData.publisher + '</p><br>' + '<p>'
				+ 'ISBN: ' + jsonData.isbn + '</p><br></div>';

		document.getElementById("cartviewin").innerHTML = cartelem;
	}
	;

	/*
	 * -- Листнеры и обработка событий для функции просмотра
	 */

	var closeBtn = document.getElementById("modalview-no-btn");
	closeBtn.addEventListener("click", function() {
		modal.style.top = "-100%";
		overflow.remove();
		currentElement.innerHTML = '';
	});
}

function search() {

	/*
	 * -- Строим модальное окно и задаем содержимое
	 */

	document.getElementById("modalplace").className = "modal";
	var modal = document.querySelector(".modal");
	var overflow = document.createElement("div");
	var currentElement = document.getElementById("modal-entry");
	overflow.className = "overflow";
	document.body.appendChild(overflow);
	var height = modal.offsetHeight;
	modal.style.marginTop = -height / 2 + "px";
	modal.style.top = "50%";

	/*
	 * --- Создание HTML-объекта для модального окна
	 */

	currentElement.innerHTML = '<h4>Для поиска заполните форму</h4>'
			+ '<form action="" method="post" id="form addbook"><label for="title" class="modal-form-label">Название</label>'
			+ '<input type="text" name="title" value="" maxlength="140" class="modal-form-input">'
			+ '<label for="author" class="modal-form-label">Автор</label>'
			+ '<input type="text" name="author" value="" maxlength="140" class="modal-form-input">'
			+ '<label for="theme" class="modal-form-label">Серия</label>'
			+ '<input type="text" name="theme" value="" maxlength="140" class="modal-form-input">'
			+ '<label for="isbn" class="modal-form-label">Издатетельство</label>'
			+ '<input type="text" name="publisher" value="" maxlength="140" class="modal-form-input">'
			+ '<label for="publisher" class="modal-form-label">ISBN</label>'
			+ '<input type="text" name="isbn" value="" maxlength="140" class="modal-form-input">'
			+ '<input type="submit" id="modaladd-yes-btn" value="Найти" class="modaladd-button">'
			+ '<input type="button" id="modaladd-no-btn" value="Отмена" class="modaladd-button"></form>'
			+ ' <div id="modal-form-ready"></div>';

	/*
	 * -- Листнеры и обработка событий для функции поиска
	 */

	var addBtn = document.getElementById("form addbook");
	var cancelBtn = document.getElementById("modaladd-no-btn");

	addBtn.addEventListener("submit", function(e) {
		e.preventDefault();
		var formData = new FormData(addBtn);
		ajaxCallPost("POST", 'bookshelf/search', formData, mainViewTable);
		modal.style.top = "-100%";
		overflow.remove();
		currentElement.innerHTML = '';
	});
	cancelBtn.addEventListener("click", function() {
		modal.style.top = "-100%";
		overflow.remove();
		currentElement.innerHTML = '';
	});

}

function paging() {
	/*
	 * -- Первоначальная инициализация переменных для пэйджинга
	 */

	var paginator = document.getElementById("pagination");
	var maxPages = 3;
	var curBtn = 1;
	var stepId = 3.0;

	/*
	 * --- Создание HTML-объекта для пэджинга
	 */

	function drawPaginator(curBtn, stepId) {

		getCountsOfBooks();
		var records = sessionStorage.getItem(counts);
		maxPages = Math.ceil(records / stepId) + 1;
		paginator.innerHTML = '';
		for (var i = 1; i < maxPages; i++) {
			paginator.innerHTML += '<a href="#" class="pagnref" name="' + i
					+ '">' + i + '</a>';
		}

		paginator.innerHTML += '<a href="" >' + '<select id="stepsize">'
				+ '<option value="1">1</option>'
				+ '<option value="3">3</option>'
				+ '<option value="5">5</option>'
				+ '<option value="10">10</option>'
				+ '<option value="15">15</option>'
				+ '<option value="20">20</option></select>';

		var pgnStep = document.getElementById("stepsize");
		var pgnBtn = document.getElementsByClassName("pagnref");

		Array.from(pgnBtn).forEach(function(element) {
			element.addEventListener("click", clickS);
		});

		pgnStep.addEventListener("click", stepS);
	}

	/*
	 * --- Обработка событий пэджинга
	 */

	drawPaginator(curBtn, stepId);

	function stepS(e) {
		e.preventDefault();
		stepId = this.value;
		ajaxCallCommon("GET", 'bookshelf/pages/' + curBtn + '/step/' + stepId,
				mainViewTable);
		drawPaginator(curBtn, stepId);
	}

	function clickS(e) {
		e.preventDefault();
		curBtn = this.name;
		ajaxCallCommon("GET", 'bookshelf/pages/' + curBtn + '/step/' + stepId,
				mainViewTable);
		rawPaginator(curBtn, stepId);
	}

}

function getCountsOfBooks() {
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "bookshelf/counts");
	xhr.send();
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4 && xhr.status === 200) {
			data = xhr.responseText;
			sessionStorage.setItem(counts, data);
		}
	};
}

selectViewForUsers();

paging();
