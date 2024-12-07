import styles from './JournalForm.module.css';
import Button from '../Button/Button';
import { useContext, useEffect, useReducer, useRef } from 'react';
import cn from 'classnames';
import { formReducer, INITIAL_STATE } from './JournalForm.state';
import Input from '../Input/Input';
import { UserContext } from '../../context/user.context';

function JournalForm({ onSubmit }) {
	// Используем хук useReducer для управления состоянием формы.
	// formState будет хранить текущее состояние, а dispatchForm — функцию для отправки действий редьюсеру.
	const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);

	// Деструктурируем свойства из formState для удобства доступа к состоянию формы.
	const { isValid, isFormReadyToSubmit, values } = formState;
	const titleRef = useRef();
	const dateRef = useRef();
	const postRef = useRef();
	const { userId } = useContext(UserContext);

	const focusError = isValid => {
		switch (true) {
		case !isValid.title:
			titleRef.current.focus();
			break;
		case !isValid.date:
			dateRef.current.focus();
			break;
		case !isValid.post:
			break;
		}
	};

	// useEffect будет следить за изменениями в объекте isValid и выполнять код, когда он изменится.
	useEffect(() => {
		// Объявляем переменную timerId для управления таймером.
		let timerId;
		// Проверяем, валидны ли все поля формы; если хотя бы одно поле не валидно,
		// устанавливаем таймаут на 2 секунды для автоматического сброса валидности.
		if (!isValid.date || !isValid.post || !isValid.title) {
			focusError(isValid);
			timerId = setTimeout(() => {
				// Отправляем действие 'RESET_VALIDITY' в редьюсер, чтобы сбросить состояние валидности полей.
				dispatchForm({ type: 'RESET_VALIDITY' });
			}, 2000);
		}

		// Функция очистки, которая срабатывает при размонтировании компонента или при следующем вызове useEffect.
		// Очищает таймер, чтобы избежать утечек памяти, если действие не выполнено.
		return () => clearTimeout(timerId);
	}, [isValid]); // Зависимость от isValid, чтобы срабатывать при его изменении.

	// Второй useEffect следит за изменением состояния isFormReadyToSubmit.
	useEffect(() => {
		// Если форма готова к отправке (все поля валидны), вызываем функцию onSubmit
		// с текущими значениями полей формы.
		if (isFormReadyToSubmit) {
			onSubmit(values);
			dispatchForm({ type: 'CLEAR' });
		}
	}, [isFormReadyToSubmit, values, onSubmit]); // Зависимость от isFormReadyToSubmit.

	useEffect(() => {
		dispatchForm({
			type: 'SET_VALUE',
			payload: { userId }
		});
	}, [userId]);

	// Обработчик события отправки формы.
	const addJournalItem = e => {
		e.preventDefault();
		// Отправляем действие 'SUBMIT' в редьюсер с собранными данными формы.
		dispatchForm({ type: 'SUBMIT' });
	};

	// Обновляем состояние с помощью dispatchForm с новыми значениями полей формы.
	const onChange = e => {
		dispatchForm({
			type: 'SET_VALUE',
			payload: { [e.target.name]: e.target.value }
		});
	};

	return (
		<form className={styles['journal-form']} onSubmit={addJournalItem}>
			<div>
				<Input
					ref={titleRef}
					isValid={isValid.title}
					type='text'
					value={values.title}
					onChange={onChange}
					name='title'
					appearance='title'
				/>
			</div>
			<div className={styles['form-row']}>
				<label className={styles['form-label']} htmlFor='date'>
					<img src='/icon_calendar.svg' alt='Иконка календаря' />
					<span>Дата</span>
				</label>
				<Input
					ref={dateRef}
					isValid={isValid.date}
					type='date'
					value={values.date}
					onChange={onChange}
					name='date'
					id='date'
				/>
			</div>
			<div className={styles['form-row']}>
				<label className={styles['form-label']} htmlFor='tag'>
					<img src='/icon_folder.svg' alt='Иконка папки' />
					<span>Метки</span>
				</label>
				<Input
					type='text'
					value={values.tag}
					onChange={onChange}
					name='tag'
					id='tag'
				/>
			</div>
			<textarea
				className={cn(styles.input, {
					[styles.invalid]: !isValid.post
				})}
				ref={postRef}
				value={values.post}
				onChange={onChange}
				name='post'
				id=''
				cols='30'
				rows='10'
			></textarea>
			<Button>Сохранить</Button>
		</form>
	);
}

export default JournalForm;
