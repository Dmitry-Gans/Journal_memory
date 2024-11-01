import { useEffect, useState } from 'react';

export function useLocalStorage(key) {
	const [data, setData] = useState();
	// Используем  хук, только для первого рендера
	useEffect(() => {
		const responce = JSON.parse(localStorage.getItem(key));
		if (responce) {
			setData(responce);
		}
	}, []);

	const saveData = newData => {
		localStorage.setItem(key, JSON.stringify(newData));
		setData(newData);
	};

	return [data, saveData];
}
