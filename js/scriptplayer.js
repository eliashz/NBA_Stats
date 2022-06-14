import { fetchData } from "../modules/fetchData.js";

const player = document.querySelector('#text');
const boton = document.querySelector('#boton');
const result = document.querySelector('#result');

let playerData;

const showPlayerInfo = async (id) => {
    let year = 2020;
    let playerById = await fetchData(`https://www.balldontlie.io/api/v1/season_averages?player_ids[]=${id}`);

    while (playerById.data.length === 0 && year > 2001 ) {
        playerById = await fetchData(`https://www.balldontlie.io/api/v1/season_averages?season=${year}&player_ids[]=${id}`);
        year--;
    }
    console.log(playerById)
}

const searchPlayer = async () => {
    playerData = await fetchData(`https://www.balldontlie.io/api/v1/players?search=${player.value}`);
    if (playerData.data.length == 0) { // La búsqueda no da ningún resultado.
        result.textContent = 'Jugador no encontrado.'
    } else if (playerData.data.length === 1) { // Las búsqueda da un resultado -> imprimir estadísticas 
        showPlayerInfo(playerData.data[0].id);
    } else if (player) { // La búsqueda da muchos resultados -> el usuario puede seleccionar de una lista
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
    player.value = '';//Vacía el inpu después de una búsqueda
}

const playerFromTeamList = localStorage.getItem('playerSelected');

if (playerFromTeamList) { //Comprobación de que hay algo en el localStorage
    localStorage.removeItem('playerSelected');
    showPlayerInfo(playerFromTeamList);
}

const pressEnter = (e) => { //Al pulsar enter realiza una búsqueda
    if ((e.keyCode === 13) &&  (player.value.length > 2)){
        searchPlayer();
    }
}

boton.addEventListener('click', searchPlayer);
document.body.addEventListener('keydown', pressEnter);

const selectPlayer = (e) => {
    playerData.data.filter(player => {
        if (player.first_name + ' ' + player.last_name == e.target.textContent) {
            showPlayerInfo(player.id);
        }
    });
}

