document.addEventListener("DOMContentLoaded", function (event) {
	// Ищем в HTML документе для дальнейшего взаимодействия область для вывода списка постов
	const inputTitle = document.querySelector(`.input__title`);
	const inputText = document.querySelector(`.input__text`);
	const submitButton = document.querySelector(`.button`);
	const result = document.querySelector(`.result`);

	function createPost() {
		const inputTitleValue = inputTitle.value;
		const inputTextValue = inputText.value;
		//Методом fetch отправляем POST-запрос на указанный адрес
		fetch('https://jsonplaceholder.typicode.com/posts', {
				method: 'POST',
				body: JSON.stringify({
					title: inputTitleValue,
					body: inputTextValue,
				}),
				headers: {
					"Content-type": "application/json; charset=UTF-8"
				}
			})
			// в первом обработчике then преобразовываем данные в формат JSON
			.then(response => response.json())
			// в втором обработчике then добавляем посты на страницу
			.then((data) => {
				//Создаем новый элемент (тег div) для отображения поста
				const newPost = document.createElement(`div`);
				//Создаем новый элемент (тег h4) для отображения заголовка поста
				const title = document.createElement(`h4`);
				//Наполняем новый элемент контентом (значение тега h4 - заголовок поста)
				title.textContent = `${data.title}`
				title.style.fontWeight = "bold";
				//Вставляем новый элемент внутрь и в начало контейнера div-поста для вывода результата
				newPost.appendChild(title);
				// Создаем абзац для отображения текста поста
				const text = document.createElement(`p`);
				//Наполняем новый элемент контентом (значение тега p теперь текст поста)
				text.textContent = `${data.body}`
				//Вставляем новый элемент (текст поста) после его заголовка
				title.after(text);
				//Вставляем новый элемент (пост) вначало списка поля для постов
				result.prepend(newPost);
				//Очищаем поле ввода заголовка и текста поста
				inputTitle.value = "";
				inputText.value = "";
			})
			//catch сработает, если запросы then НЕ выполнены успешно (например, отвалился интернет)
			.catch(error => console.log(`Ошибка. Запрос не выполнен`, error))
	}
	//добавляем слушатель события на кнопку и вызываем функцию при нажатии
	submitButton.addEventListener('click', function (event) {
		//предотвращаем перезагрузку страницы и автоматическую отправку данных
		event.preventDefault();
		//вызываем функцию
		createPost();
	})
})