import './CardButton.css';
function CardButton({ children, className }) {
	const classMy = 'card-button' + (className ? ' ' + className : '');
	return <button className={classMy}>{children}</button>;
}

export default CardButton;
