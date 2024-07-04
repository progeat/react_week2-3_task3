import { useState } from 'react';
import data from './data.json';
import styles from './App.module.css';

export const App = () => {
	const [operand1, setOperand1] = useState('');
	const [operator, setOperator] = useState('');
	const [operand2, setOperand2] = useState('');
	const [total, setTotal] = useState('0'); // поменять на display или output
	const [isResult, setResult] = useState(false); // поменять на total

	const onClickButton = ({ target }) => {
		const value = target.dataset.value;
		if (Number(value)) {
			if (operator === '') {
				setOperand1(operand1 + value);
				setTotal(operand1 + value);
			} else {
				setOperand2(operand2 + value);
				setTotal(`${operand1} ${operator} ${operand2 + value}`);
			}
		} else if (value === '+' || value === '-') {
			// if (!isNaN(Number(total)) && operand2 !== '') {
			if (isResult) {
				if (operand1 < 0 && value === '+') {
					setTotal(`${operand1} - ${Math.abs(operand1)}`);
					setOperand2(Math.abs(operand1));
					setOperator('-');
				} else if (operand1 < 0 && value === '-') {
					setTotal(`${operand1} + ${Math.abs(operand1)}`);
					setOperand2(Math.abs(operand1));
					setOperator('+');
				} else {
					setTotal(`${operand1} ${value} ${operand1}`);
					setOperand2(operand1);
					setOperator(value);
				}
			}
			setTotal(`${operand1} ${value} ${operand2}`);
			setOperator(value);
		} else if (operand2 !== '' && value === '=') {
			switch (operator) {
				case '+':
					setTotal(`${Number(operand1) + Number(operand2)}`);
					setOperand1(Number(operand1) + Number(operand2));
					break;
				case '-':
					setTotal(`${Number(operand1) - Number(operand2)}`);
					setOperand1(Number(operand1) - Number(operand2));
					break;
				default:
					break;
			}
		} else if (value === 'C') {
			setOperand1('');
			setOperator('');
			setOperand2('');
			setTotal('0');
		}
	};

	return (
		<div className={styles.app}>
			<div className={styles.display}>
				{/* {operand1 !== '' ? `${operand1} ${operator} ${operand2}` : '0'} */}
				{total}
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
