const date = document.getElementById('date');
const time = document.getElementById('time');
const gameLoc = document.getElementById('loc');
const maxPlayers = document.getElementById('max-players');
const btnNewGame = document.getElementById('btn-newgame');
const gameCard = document.getElementById('up-games');

// ADD GAME //
let maxPl = [];

function addNewGame() {
  const cardHTML = `
    <div class="game">
    <img
      src="/football-field-astro-turf-surface-close-up-throw-kick-off-corner-area-lushed-green-pitch-192807692.jpeg"
     alt=""
    />
    <h5>GAME ON</h5>
    <small>${date.value},  ${time.value}</small>
    <small>Max Players: ${maxPlayers.value}</small>
    <small>${gameLoc.value}</small>
  </div>
  `;
  gameCard.innerHTML = cardHTML;
}

btnNewGame.addEventListener('click', (e) => {
  e.preventDefault();
  addNewGame();
  maxPl.push(Number(maxPlayers.value));
  document.getElementById('form').reset();
  document.querySelector('.new-game').style.display =
    'none';
});

////////////////  ADD PLAYERS  /////////////

const playersEl = document.querySelector('.players');
const inputEl = document.querySelector('.input-el');
const btnAddPlayer = document.querySelector(
  '.btn-add-player'
);
const btnGenTeams = document.querySelector(
  '.btn-generate-teams'
);

let playersArr = [];

//add players to playersList
btnAddPlayer.addEventListener('click', function () {
  addPlayer();
});

inputEl.addEventListener('keyup', function (event) {
  if (event.keyCode === 13) {
    addPlayer();
  }
});

function addPlayer() {
  if (!inputEl.value) {
    alert('Enter player name!');
  } else if (maxPl.length === 0) {
    alert('Enter max players allowed!');
  } else if (playersArr.length > maxPl - 1) {
    alert('Game is full!');
  } else {
    const newPlayer = document.createElement('li');
    newPlayer.textContent = inputEl.value;
    newPlayer.classList.add('player');
    playersEl.appendChild(newPlayer);

    const trashButton = document.createElement('button');
    trashButton.innerHTML =
      '<i class="fas delete fa-trash"></i>';
    newPlayer.appendChild(trashButton);

    newPlayer.addEventListener('click', function () {
      playersEl.removeChild(this);
      playersArr = playersArr.filter(
        (player) => player !== this.textContent
      );
    });

    playersArr.push(inputEl.value);
    inputEl.value = '';
  }
}

const resetBtn = document.querySelector('.btn-reset');
resetBtn.addEventListener('click', () => {
  location.reload();
});

// hide players list

const hideBtn = document.querySelector('.btn-hide');
const hideAll = document.querySelectorAll('.hide-all');

hideBtn.addEventListener('click', () => {
  playersEl.classList.toggle('hidden');
  hideAll.forEach((element) => {
    element.classList.toggle('hidden');
  });

  hideBtn.textContent = playersEl.classList.contains(
    'hidden'
  )
    ? 'Show'
    : 'Hide';
});

//randomise and divide
const teamOneEl = document.querySelector('.teamOne');
const teamTwoEl = document.querySelector('.teamTwo');

let allTeams = [];

btnGenTeams.addEventListener('click', function () {
  let shuffled = playersArr
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

  const teamSize = Math.ceil(shuffled.length / 2);

  let teamOne = shuffled.slice(0, teamSize);
  let teamTwo = shuffled.slice(teamSize);

  allTeams.push(teamOne, teamTwo);

  teamOneEl.innerHTML = '';
  for (let i = 0; i < teamOne.length; i++) {
    teamOneEl.innerHTML += `<li class="team-sheet-player">${teamOne[i]}</li>`;
  }

  teamTwoEl.innerHTML = '';
  for (let i = 0; i < teamTwo.length; i++) {
    teamTwoEl.innerHTML += `<li class="team-sheet-player">${teamTwo[i]}</li>`;
  }

  window.scrollTo(0, document.body.scrollHeight);

  allTeams = [];
});
