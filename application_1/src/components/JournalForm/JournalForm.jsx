import styles from './JournalForm.module.css';
import Button from '../Button/Button';
import { useState } from 'react';
import cn from 'classnames';

function JournalForm({ onSubmit }) {
	// Состояние для хранения валидности полей формы:
	const [formValidState, setFormValidState] = useState({
		title: true,
		post: true,
		date: true
	});

	// 1. Извлечение данных формы:
	// new FormData(e.target) - создает объект FormData, содержащий все данные из формы, которая вызвала событие. e.target ссылается на элемент формы, который был отправлен.
	// 2. Преобразуем в объект:
	// Метод Object.fromEntries() принимает объект FormData и преобразует его в обычный объект JavaScript. Это позволит легко получить доступ к данным формы по ключам.

	const addJournalItem = e => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const formProps = Object.fromEntries(formData);
		// Все проверки на валидность полей формы:
		let isFormValid = true;
		if (!formProps.title?.trim().length) {
			setFormValidState(prevState => ({ ...prevState, title: false }));
			isFormValid = false;
		} else {
			setFormValidState(prevState => ({ ...prevState, title: true }));
		}
		if (!formProps.post?.trim().length) {
			setFormValidState(prevState => ({ ...prevState, post: false }));
			isFormValid = false;
		} else {
			setFormValidState(prevState => ({ ...prevState, post: true }));
		}
		if (!formProps.date) {
			setFormValidState(prevState => ({ ...prevState, date: false }));
			isFormValid = false;
		} else {
			setFormValidState(prevState => ({ ...prevState, date: true }));
		}
		if (!isFormValid) {
			return; // Если форма невалидна, не отправляем данные
		}

		onSubmit(formProps);
		e.target.reset(); // Обнуляем инпуты после отправки формы.
	};

	return (
		<form className={styles['journal-form']} onSubmit={addJournalItem}>
			<div>
				<input
					// Пример работы библиотеки "classname":
					className={cn(styles['input-title'], {
						[styles.invalid]: !formValidState.title
					})}
					type='text'
					name='title'
				/>
			</div>
			<div className={styles['form-row']}>
				<label className={styles['form-label']} htmlFor='date'>
					<img src='/icon_calendar.svg' alt='Иконка календаря' />
					<span>Дата</span>
				</label>
				<input
					className={cn(styles.input, {
						[styles.invalid]: !formValidState.date
					})}
					type='date'
					name='date'
					id='date'
				/>
			</div>
			<div className={styles['form-row']}>
				<label className={styles['form-label']} htmlFor='tag'>
					<img src='/icon_folder.svg' alt='Иконка папки' />
					<span>Метки</span>
				</label>
				<input className={styles.input} type='text' name='tag' id='tag' />
			</div>
			<textarea
				className={cn(styles.input, {
					[styles.invalid]: !formValidState.post
				})}
				name='post'
				id=''
				cols='30'
				rows='10'
			></textarea>
			<Button text='Сохранить' />
		</form>
	);
}

export default JournalForm;
