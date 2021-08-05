import { Container, Switch, withStyles } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import Definitions from './components/Definitions/Definition';
import Header from './components/Header/Header';

function App() {

	const [meanings, setMeanings] = useState([]);
	const [word, setWord] = useState("");
	const [language, setLanguage] = useState("en");
	const [lightMode, setLightMode] = useState(false);

	const ThemeSwitch = withStyles({
		switchBase: {
			color: grey[300],
			"&$checked": {
				color: grey[500],
			},
			"&$checked + $track": {
				backgroundColor: grey[500],
			},
		},
		checked: {},
		track: {},
	})(Switch);

	const dictionaryApi = async () => {
		try {

			const data = await axios.get(
				`https://api.dictionaryapi.dev/api/v2/entries/${language}/${word}
				`);

			setMeanings(data.data);

		} catch (error) {
			console.error(error);
		}
	}

	// --- on Mount
	useEffect(() => {
		dictionaryApi();
	}, [language, word]);

	return (
		<div
			className="App"
			style={{
				height: '100vh',
				backgroundColor: lightMode ? '#FFF' : '#282C34',
				color: lightMode ? '#000' : '#FFF',
				transition: 'all 0.5s linear'
			}}
		>
			<Container
				style={{
					display: 'flex',
					flexDirection: 'column',
					height: '100vh',
					justifyContent: 'space-evenly'
				}}
				maxWidth="md"
			>
				<div
					style={{
						position: 'absolute',
						top: 0,
						right: 15,
						paddingTop: 10
					}}
				>
					<span>{lightMode ? "Dark" : "Light"} mode</span>
					<ThemeSwitch
						checked={lightMode}
						onChange={() => setLightMode(!lightMode)}
					/>
				</div>
				<Header
					language={language}
					setLanguage={setLanguage}

					word={word}
					setWord={setWord}

					lightMode={lightMode}
				/>
				{
					meanings && <Definitions
						word={word}
						language={language}
						meanings={meanings}

						lightMode={lightMode}
					/>
				}
			</Container>
		</div>
	);
}

export default App;
