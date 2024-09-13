import './JournalList.css';
import CardButton from '../CardButton/CardButton';
import JournalItem from '../JournalItem/JournalItem';

function JournalList({ items }) {
	if (items.length === 0) {
		return <p>Записей пока нет, добавьте первую</p>;
	}

	const sortItems = (a, b) => {
		if (a.date > b.date) {
			return -1;
		} else if (a.date < b.date) {
			return 1;
		} else {
			return 0;
		}
	};

	return (
		<>
			{items.sort(sortItems).map(item => (
				<CardButton key={item.id}>
					<JournalItem title={item.title} post={item.post} date={item.date} />
				</CardButton>
			))}
		</>
	);
}

export default JournalList;
