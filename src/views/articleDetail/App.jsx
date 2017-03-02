import React from "react";
import styles from "./index.scss";

export default class App extends React.Component {
	render() {
		return (
			<div>
				<p>This React project just works including <span className={styles.redBg}>module</span> local styles.
				</p>
				<p>Hello Enjoy!</p>
			</div>
		)
	}
}
