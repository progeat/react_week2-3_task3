import { useState } from 'react';
import { DATA } from './constants';
import styles from './App.module.css';

export const App = () => {
	const [operand1, setOperand1] = useState('');
	const [operator, setOperator] = useState('');
	const [operand2, setOperand2] = useState('');
	const [total, setTotal] = useState('0');
	const [isResult, setIsResult] = useState(false);

	const onClickButton = ({ target }) => {
		const value = target.dataset.value;

		switch (!isNaN(Number(value)) || value) {
			case true:
				if (operator === '') {
					if (value === '0' && operand1 === '0') return;
					setOperand1((operand1 === '0' ? '' : operand1) + value);
					setTotal(`${(operand1 === '0' ? '' : operand1) + value}`);
				} else {
					if (value === '0' && operand2 === '0') return;
					if (isResult) {
						setOperand2(value);
						setTotal(`${operand1} ${operator} ${value}`);
						setIsResult(false);
					} else {
						setOperand2((operand2 === '0' ? '' : operand2) + value);
						setTotal(
							`${operand1} ${operator} ${(operand2 === '0' ? '' : operand2) + value}`,
						);
					}
				}
				break;

			case '+':
				if (operand1 === '') return;

				// если было нажато равно повторно
				if (isResult) {
					// меняем оператора если первый операнд отрицательное число
					if (operand1 < 0) {
						setTotal(`${operand1} - ${Math.abs(operand1)}`);
						setOperand2(`${Math.abs(operand1)}`);
						setOperator('-');
					} else {
						setTotal(`${operand1} ${value} ${operand1}`);
						setOperand2(operand1);
						setOperator(value);
					}
				} else {
					// добавляем оператора
					setTotal(`${operand1} ${value} ${operand2}`);
					setOperator(value);
				}
				break;

			case '-':
				// если было нажато равно повторно
				if (isResult) {
					// меняем оператора если первый операнд отрицательное число
					if (operand1 < 0) {
						setTotal(`${operand1} + ${Math.abs(operand1)}`);
						setOperand2(`${Math.abs(operand1)}`);
						setOperator('+');
					} else {
						setTotal(`${operand1} ${value} ${operand1}`);
						setOperand2(operand1);
						setOperator(value);
					}
				} else if (operand1 === '' && operand1 !== '-') {
					setOperand1('-');
					setTotal(`-`);
				} else if (operand1 !== '-') {
					// добавляем оператора
					setTotal(`${operand1} ${value} ${operand2}`);
					setOperator(value);
				}
				break;

			case '=':
				if (operand2 === '') return;
				// выбираем операцию сложения или вычитания в зависимости от оператора
				if (operator === '+') {
					setTotal(`${Number(operand1) + Number(operand2)}`);
					setOperand1(`${Number(operand1) + Number(operand2)}`);
					setIsResult(true);
				} else {
					setTotal(`${Number(operand1) - Number(operand2)}`);
					setOperand1(`${Number(operand1) - Number(operand2)}`);
					setIsResult(true);
				}
				break;

			case 'C':
				setOperand1('');
				setOperator('');
				setOperand2('');
				setTotal('0');
				setIsResult(false);
				break;

			default:
				break;
		}
	};

	return (
		<div className={styles.app}>
			<div
				className={
					styles.display +
					' ' +
					(isResult && !isNaN(Number(total)) ? styles['display--total'] : '')
				}
			>
				{total}
			</div>
			<ul className={styles.list} onClick={onClickButton}>
				{DATA.map((item) => (
					<li
						className={
							styles.item +
							' ' +
							(item === '0'
								? styles['item--zero']
								: item === '='
									? styles['item--enter']
									: '')
						}
						key={item}
					>
						<button
							className={
								styles.button +
								' ' +
								(item === '-' || item === '+'
									? styles['button--operator']
									: item === 'C'
										? styles['button--reset']
										: item === '='
											? styles['button--enter']
											: '')
							}
							data-value={item}
						>
							{/* если минус, ставим тире подлинее для дизайна*/}
							{item === '-' ? '–' : item}
						</button>
					</li>
				))}
			</ul>
		</div>
	);
};
