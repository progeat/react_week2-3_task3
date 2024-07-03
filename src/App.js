import styles from './App.module.css';

export const App = () => {
	return (
		<div className={styles.app}>
			<div className={styles.display}>123+100</div>
			<ul className={styles.list}>
				<li className={styles.item + ' ' + styles['item--reset']}>
					<button className={styles.button + ' ' + styles['button--reset']}>
						C
					</button>
				</li>
				<li className={styles.item}>
					<button className={styles.button}>7</button>
				</li>
				<li className={styles.item}>
					<button className={styles.button}>8</button>
				</li>
				<li className={styles.item}>
					<button className={styles.button}>9</button>
				</li>
				<li className={styles.item}>
					<button className={styles.button}>4</button>
				</li>
				<li className={styles.item}>
					<button className={styles.button}>5</button>
				</li>
				<li className={styles.item}>
					<button className={styles.button}>6</button>
				</li>
				<li className={styles.item}>
					<button className={styles.button}>1</button>
				</li>
				<li className={styles.item}>
					<button className={styles.button}>2</button>
				</li>
				<li className={styles.item}>
					<button className={styles.button}>3</button>
				</li>
				<li className={styles.item + ' ' + styles['item--zero']}>
					<button className={styles.button}>0</button>
				</li>
				<li
					className={
						styles.item +
						' ' +
						styles['item--operator'] +
						' ' +
						styles['item--operator-plus']
					}
				>
					<button className={styles.button + ' ' + styles['button--operator']}>
						+
					</button>
				</li>
				<li className={styles.item + ' ' + styles['item--operator']}>
					<button className={styles.button + ' ' + styles['button--operator']}>
						-
					</button>
				</li>
				<li className={styles.item + ' ' + styles['item--enter']}>
					<button className={styles.button + ' ' + styles['button--enter']}>
						=
					</button>
				</li>
			</ul>
		</div>
	);
};
