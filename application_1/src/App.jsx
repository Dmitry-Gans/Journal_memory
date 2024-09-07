import './App.css';
import LeftPanel from './layouts/LeftPanel/LeftPanel';
import Body from './layouts/Body/Body';
import Header from './components/Header/Header';
import JournalAddButton from './components/JournalAddButton/JournalAddButton';
import JournalList from './components/JournalList/JournalList';
import JournalForm from './components/JournalForm/JournalForm';
import { useState } from 'react';

function App() {
	const INITIAL_DATA = [
		{
			id: 1,
			title: 'Подготовка к обновлению курсов',
			date: new Date(),
			text: 'Горные походы открывают удивительные природные ландшафты'
		},
		{
			id: 2,
			title: 'Поход в горы',
			date: new Date(),
			text: 'Думал, что очень много времени'
		},
		{
			id: 3,
			title: 'Поход в горы',
			date: new Date(),
			text: 'Думал, что очень много времени'
		}
	];

	const [items, setItems] = useState(INITIAL_DATA);

	const addItem = item => {
		// Меняю значение при помощи функции, а не на прямую через [...items, item], для избежания конфликтов в асинхроне, чтобы setItems запомниал предыдущее значение именно каждого срабатывания вызова. Счиатется более безопасным и качетсвенным способом.
		setItems(oldItems => [
			...oldItems,
			{
				id: oldItems.length > 0 ? Math.max(...oldItems.map(i => i.id)) + 1 : 1,
				title: item.title,
				text: item.text,
				date: new Date(item.date)
			} //  преобразуем date в объект Date, чтобы привести формат даты к тому, который ожидается компонентом "JournalItem". Это поможет избежать ошибок, связанных с несовместимостью форматов.
		]);
	};

	return (
		<div className='app'>
			<LeftPanel>
				<Header />
				<JournalAddButton />
				<JournalList items={items} />
			</LeftPanel>
			<Body>
				<JournalForm onSubmit={addItem} />
			</Body>
		</div>
	);
}

export default App;
