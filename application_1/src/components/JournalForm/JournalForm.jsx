import { useState } from 'react';
import './JournalForm.css';
import Button from '../Button/Button';

function JournalForm() {
	const [inputData, setInputData] = useState('');

	const inputChange = e => {
		setInputData(e.target.value);
	};

	// 1. Извлечение данных формы:
	// new FormData(e.target) - создает объект FormData, содержащий все данные из формы, которая вызвала событие. e.target ссылается на элемент формы, который был отправлен.
	// 2. Преобразуем в объект:
	// Метод Object.fromEntries() принимает объект FormData и преобразует его в обычный объект JavaScript. Это позволит легко получить доступ к данным формы по ключам.

	const addJournalItem = e => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const formProps = Object.fromEntries(formData);
		console.log(formProps);
	};

	return (
		<form className='journal-form' onSubmit={addJournalItem}>
			<input type='text' name='title' />
			<input type='date' name='date' />
			<input type='text' name='tag' value={inputData} onChange={inputChange} />
			<textarea name='post' id='' cols='30' rows='10'></textarea>
			<Button text='Сохранить' />
		</form>
	);
}

export default JournalForm;
