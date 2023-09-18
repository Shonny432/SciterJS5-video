import { HomeFeatures } from './home-features';

export class App extends Element {
	constructor(props) {
		super();
	}


	render(props) {

		return (
			<body class='app-main'>
				<HomeFeatures />
			</body>
		);
	}
}
