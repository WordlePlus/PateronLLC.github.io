import logo from './logo.svg';
import Game from './components/Game.js';
import BoardArea from './components/BoardArea.js';
import './App.css';

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />

				<Game />
			</header>
		</div>
	);
}

export default App;
