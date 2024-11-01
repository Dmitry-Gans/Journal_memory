// Определяем начальное состояние формы
export const INITIAL_STATE = {
	// Объект isValid хранит информацию о валидности каждого поля формы
	isValid: {
		post: true,
		title: true,
		date: true
	},
	// Объект values хранит введенные пользователем значения полей формы
	values: {
		post: '', // Начальное значение поля 'post' - пустое
		title: '',
		date: '',
		tag: ''
	},
	// Булево значение, указывающее, готова ли форма к отправке
	isFormReadyToSubmit: false
};

// Функция reducer для обработки действий формы
export function formReducer(state, action) {
	// Определяем поведение на основе типа действия
	switch (action.type) {
	case 'SET_VALUE':
		return { ...state, values: {...state.values, ...action.payload} };

		// Если действие является сбросом валидности
	case 'RESET_VALIDITY':
		// Возвращаем предыдущее состояние, заменяя isValid на начальное состояние
		return { ...state, isValid: INITIAL_STATE.isValid };

	case 'CLEAR':
		return { ...state, values: INITIAL_STATE.values, isFormReadyToSubmit: false };

		// Если действие является отправкой формы
	case 'SUBMIT': {
		// Проверяем валидность заголовка: проверка длины строки
		const titleValidity = state.values.title?.trim().length; // Если поле 'title' не пустое, length будет больше 0; иначе - 0.

		// Проверяем валидность поста: проверка длины строки
		const postValidity = state.values.post?.trim().length;

		// Проверяем валидность даты (предполагается, что она должна быть просто задана)
		const dateValidity = state.values.date;

		// Возвращаем новое состояние формы с обновленными значениями и валидностью
		return {
			...state,
			// Объект isValid обновляется с текущими значениями валидности
			isValid: {
				post: postValidity, // Указываем валидность поля 'post'
				title: titleValidity,
				date: dateValidity
			},
			// Проверяем, готова ли форма к отправке: все поля должны быть валидны
			isFormReadyToSubmit: titleValidity && postValidity && dateValidity
		};
	}
	}
}
