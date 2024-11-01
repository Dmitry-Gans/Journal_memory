import './App.css';
import LeftPanel from './layouts/LeftPanel/LeftPanel';
import Body from './layouts/Body/Body';
import Header from './components/Header/Header';
import JournalAddButton from './components/JournalAddButton/JournalAddButton';
import JournalList from './components/JournalList/JournalList';
import JournalForm from './components/JournalForm/JournalForm';
import { useLocalStorage } from './hooks/useLocalStorage.hook';

function mapItems(items) {
	if (!items) {
		console.log('Не грузит');
		return [];
	}
	console.log('Грузит');
	return items.map(i => ({
		...i,
		date: new Date(i.date)
	}));
}

function App() {
	// const INITIAL_DATA = [
	// {
	// 	"id": 1,
	// 	"title": "Подготовка к обновлению курсов",
	// 	"date": "2024/09/13",
	// 	"post": "Горные походы открывают удивительные природные ландшафты"
	// },
	// {
	// 	"id": 2,
	// 	"title": "Поход в горы",
	// 	"date": "2024/09/13",
	// 	"post": "Думал, что очень много времени"
	// },
	// {
	// 	"id": 3,
	// 	"title": "Поход в горы",
	// 	"date": "2024/09/13",
	// 	"post": "Думал, что очень много времени"
	// }
	// ];

	const [items, setItems] = useLocalStorage('data');

	const addItem = item => {
		setItems([
			...mapItems(items),
			{
				id: items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1,
				title: item.title,
				post: item.post,
				date: new Date(item.date)
			} //  преобразуем date в объект Date, чтобы привести формат даты к тому, который ожидается компонентом "JournalItem". Это поможет избежать ошибок, связанных с несовместимостью форматов.
		]);
	};

	return (
		<div className='app'>
			<LeftPanel>
				<Header />
				<JournalAddButton />
				<JournalList items={mapItems(items)} />
			</LeftPanel>
			<Body>
				<JournalForm onSubmit={addItem} />
			</Body>
		</div>
	);
}

export default App;
