import './CardButton.css';
function CardButton({ children, className, ...props }) {
	const classMy = 'card-button' + (className ? ' ' + className : '');
	return <button className={classMy} {...props}>{children}</button>;
}

export default CardButton;
