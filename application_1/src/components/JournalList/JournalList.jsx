import './JournalList.css';
import CardButton from '../CardButton/CardButton';
import JournalItem from '../JournalItem/JournalItem';
import { useContext, useMemo } from 'react';
import { UserContext } from '../../context/user.context';

function JournalList({ items }) {
	const { userId } = useContext(UserContext);

	const sortItems = (a, b) => {
		if (a.date > b.date) {
			return -1;
		} else if (a.date < b.date) {
			return 1;
		} else {
			return 0;
		}
	};

	const filteredItems = useMemo(
		() => items.filter(el => el.userId === userId).sort(sortItems),
		[items, userId]
	);

	if (items.length === 0) {
		return <p>Записей пока нет, добавьте первую</p>;
	}

	return (
		<>
			{filteredItems.map(item => (
				<CardButton key={item.id}>
					<JournalItem title={item.title} post={item.post} date={item.date} />
				</CardButton>
			))}
		</>
	);
}

export default JournalList;
