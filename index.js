const guess = document.querySelector('.guess');
const checkButton = document.querySelector('.check');
const message = document.querySelector('.message');
const number = document.querySelector('.number');
const score = document.querySelector('.score');
const playAgain = document.querySelector('.play-again');
const highestScoreDisplay = document.querySelector('.high-score');
let scorePoints = 20;
score.innerText = scorePoints;

const numberMask = IMask(guess, {
	mask: Number, // enable number mask

	min: 0,
	max: 20,
});

const handleChange = (e) => {
	const input = e.target.value;

	Boolean(!input.length)
		? checkButton.setAttribute('disabled', 'true')
		: checkButton.removeAttribute('disabled');
};
const changeStylesWhenEndsGame = (styles) => {
	const gameView = document.querySelector('.game_view');
	for (let index = 0; index < styles.length - 1; index++) {
		// gameView.classList.add(styles[index])
		index <= 2
			? gameView.classList.add(styles[index])
			: gameView.classList.remove(styles[index]);
	}
};
const highestScoreValue = () =>
	sessionStorage.getItem('scores') === null
		? false
		: Math.max(...JSON.parse(sessionStorage.getItem('scores')));
const checkIfScoreIsHighest = (scoreStoredInSession, currentScore) => {
	if (currentScore >= scoreStoredInSession) {
		return document
			.querySelector('.game_display_score')
			.insertAdjacentHTML(
				'beforeend',
				'<p style="color:red">current highest score!!</p>'
			);
	}
};
function handleEndGame(gameData) {
	const { wonGame: won, outOfPoints: lose, scorePoints } = gameData;
	guess.value = '';
	guess.setAttribute('disabled', 'true');
	checkButton.setAttribute('disabled', 'true');
	const color = won === true && lose !== true ? 'green' : 'red';

	const stylesArray = [
		`bg-${color}-500`,
		'text-white',
		'border-white',
		'text-darkblue',
		' border-darkblue',
	];

	changeStylesWhenEndsGame(stylesArray);
	const h1 = document.querySelector('h1');

	h1.innerText = won === true ? 'number is...' : 'game-over ';

	won &&
		((highestScoreDisplay.innerText = highestScoreValue() || scorePoints),
		checkIfScoreIsHighest(highestScoreValue(), scorePoints));
}
const randomNum = Math.floor(Math.random() * (20 - 0 + 1)) + 0;
const changeMessage = (msg, element) => {
	element.innerHTML = msg;
};

document.addEventListener('load', changeMessage('start guessing', message));
guess.addEventListener('keyup', handleChange);
guess.addEventListener('focus', () => changeMessage('insert number', message));
guess.addEventListener('blur', () => changeMessage('start guessing', message));
playAgain.addEventListener('click', () => location.reload());

const handleClick = () => {
	const valueInput = Number(guess.value);

	const finishedGame = { wonGame: null, outOfPoints: null, scorePoints };
	valueInput !== randomNum
		? changeMessage('wrong number! ', message)
		: (changeMessage('right number ! 🤡🤡', message),
		  changeMessage(randomNum, number),
		  (finishedGame.wonGame = true));
	scorePoints--;

	score.innerText = scorePoints;
	if (finishedGame.wonGame)
		sessionStorage.getItem('scores') === null
			? sessionStorage.setItem('scores', JSON.stringify([scorePoints]))
			: sessionStorage.setItem(
					'scores',
					JSON.stringify([
						...JSON.parse(sessionStorage.getItem('scores')),
						scorePoints,
					])
			  );
	finishedGame.outOfPoints = scorePoints <= 0;
	(finishedGame.wonGame || finishedGame.outOfPoints) &&
		handleEndGame(finishedGame);
};
document.querySelector('.check').addEventListener('click', handleClick);
highestScoreDisplay.innerText = highestScoreValue() || 0;
