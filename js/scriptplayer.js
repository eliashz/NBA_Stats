const player = document.querySelector('#text');
const boton = document.querySelector('#boton');
const result = document.querySelector('#result');

async function fetchData(url) {    
    const response = await fetch(url);
    if (!response.ok) {
        console.log("Error");
        return [];
    }
    const data = await response.json();
    return data;
} 

const searchPlayer = async (playerName) => {
    playerName ? '' : playerName = player.value;

    const playerData = await fetchData(`https://www.balldontlie.io/api/v1/players?search=${playerName}`)
    
    if (playerData.data.length == 0) {
        result.textContent = 'Jugador no encontrado.'
    } else if (playerData.data.length === 1) {
        result.textContent = `${playerData.data[0].first_name} ${playerData.data[0].last_name}` ;
    } else if (player) {
        result.textContent = '';
        playerData.data.map(player => {
            const div = document.createElement('div');
            div.setAttribute('class', 'playerName');
            div.textContent = `${player.first_name} ${player.last_name}`; 
            result.appendChild(div)
        })
        const playersDiv = document.querySelectorAll('.playerName');
    
        for (const playerDiv of playersDiv) {
            playerDiv.addEventListener('click', selectPlayer);
        }
    }
    player.value = '';
}

const playerFromTeamList = localStorage.getItem('playerFromList');

if (playerFromTeamList) {
    searchPlayer(playerFromTeamList)
    localStorage.removeItem('playerFromList');
}

const pressEnter = (e) => {
    if ((e.keyCode === 13) &&  (player.value !== '')){
        searchPlayer();
    }
}
boton.addEventListener('click', searchPlayer);
document.body.addEventListener('keydown', pressEnter);

const selectPlayer = (e) => {
    console.log(e.target.textContent)
}
