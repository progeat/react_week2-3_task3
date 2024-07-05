import { useState } from 'react';
import data from './data.json';
import styles from './App.module.css';

export const App = () => {
	const [operand1, setOperand1] = useState('');
	const [operator, setOperator] = useState('');
	const [operand2, setOperand2] = useState('');
	const [total, setTotal] = useState('0'); // поменять на display или output
	const [isResult, setResult] = useState(false); // поменять на total

	console.log(operand1, operator, operand2); // удалить

	const onClickButton = ({ target }) => {
		// разбить на два обработчика цифр и операторов
		const value = target.dataset.value;

		// если нажали на цифру
		if (Number(value)) {
			if (operator === '') {
				setOperand1(operand1 + value);
				setTotal(operand1 + value);
			} else {
				setOperand2(operand2 + value);
				setTotal(`${operand1} ${operator} ${operand2 + value}`);
			}
			// если нажали на оператор + или -
		} else if (value === '+' || value === '-') {
			// если было нажато равно
			if (isResult) {
				// меняем оператора если первый операнд отрицательное число
				if (operand1 < 0 && value === '+') {
					setTotal(`${operand1} - ${Math.abs(operand1)}`);
					setOperand2(Math.abs(operand1));
					setOperator('-');
				} else if (operand1 < 0 && value === '-') {
					setTotal(`${operand1} + ${Math.abs(operand1)}`);
					setOperand2(Math.abs(operand1));
					setOperator('+');
				} else {
					// если нажали равно повторно
					setTotal(`${operand1} ${value} ${operand1}`);
					setOperand2(operand1);
					setOperator(value);
				}
			} else {
				// условие чтобы присвоить первому операнду отрицательное значение
				if (value === '+' && operand1 === '') return;
				if (value === '-' && operand1 === '' && operand1 !== '-') {
					setOperand1('-');
					setTotal(`-`);
				} else {
					// просто добавляем оператора
					setTotal(`${operand1} ${value} ${operand2}`);
					setOperator(value);
				}
			}
			// если нажали равно
		} else if (operand2 !== '' && value === '=') {
			// выбираем операцию сложения или вычитания в зависимости от оператора
			switch (operator) {
				case '+':
					setTotal(`${Number(operand1) + Number(operand2)}`);
					setOperand1(`${Number(operand1) + Number(operand2)}`);
					setResult(true);
					break;
				case '-':
					setTotal(`${Number(operand1) - Number(operand2)}`);
					setOperand1(`${Number(operand1) - Number(operand2)}`);
					setResult(true);
					break;
				default:
					break;
			}
			// делаем сброс если нажали кнопку сброса
		} else if (value === 'C') {
			setOperand1('');
			setOperator('');
			setOperand2('');
			setTotal('0');
			setResult(false);
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
