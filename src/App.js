import { useState } from 'react';
import data from './data.json';
import styles from './App.module.css';

export const App = () => {
	const [operand1, setOperand1] = useState('');
	const [operator, setOperator] = useState('');
	const [operand2, setOperand2] = useState('');

	const onClickButton = ({ target }) => {
		const value = target.dataset.value;
		if (Number(value)) {
			if (operator === '') return setOperand1((operand1) => operand1 + value);
			setOperand2((operand2) => operand2 + value);
		} else if (value === '+' || value === '-') {
			setOperator(value);
		} else if (operand2 !== '' && value === '=') {
			switch (operator) {
				case '+':
					setOperand1(Number(operand1) + Number(operand2));
					setOperator('');
					setOperand2('');
					break;
				case '-':
					setOperand1(Number(operand1) - Number(operand2));
					setOperator('');
					setOperand2('');
					break;
				default:
					break;
			}
		} else if (value === 'C') {
			setOperand1('');
			setOperator('');
			setOperand2('');
		}
	};

	return (
		<div className={styles.app}>
			<div className={styles.display}>
				{operand1 !== '' ? `${operand1} ${operator} ${operand2}` : '0'}
			</div>
			<ul className={styles.list}>
				{data.map((item) => (
					<li
						className={
							styles.item +
							' ' +
							(item.type === 'zero'
								? styles['item--zero']
								: item.type === 'enter'
									? styles['item--enter']
									: '')
						}
						key={item.value}
					>
						<button
							className={
								styles.button +
								' ' +
								(item.type === 'operator'
									? styles['button--operator']
									: item.type === 'reset'
										? styles['button--reset']
										: item.type === 'enter'
											? styles['button--enter']
											: '')
							}
							data-value={item.value}
							onClick={onClickButton}
						>
							{item.value}
						</button>
					</li>
				))}
			</ul>
		</div>
	);
};
