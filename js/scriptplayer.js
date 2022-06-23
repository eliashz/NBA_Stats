import { fetchData } from "../modules/fetchData.js";

const player = document.querySelector('#text');
const boton = document.querySelector('#boton');
const result = document.querySelector('#result');

let playerData;

const selectYear = () => {
    let x = document.getElementById("year").selectedIndex;
    let y = document.getElementById("year").options;
    return y[x].text;
}

const showPlayerInfo = async (player, year=2021) => {
    console.log(player)
    /* let year = 2020; */
    //let playerById = await fetchData(`https://www.balldontlie.io/api/v1/season_averages?player_ids[]=${id}`);
    
    let playerById = await fetchData(`https://www.balldontlie.io/api/v1/season_averages?season=${year}&player_ids[]=${player.id}`);
    
    /* while (playerById.data.length === 0 && year > 2001 ) {
        playerById = await fetchData(`https://www.balldontlie.io/api/v1/season_averages?season=${year}&player_ids[]=${id}`);
        year--;
    } */
    if (playerById.data.length === 0) {
        result.textContent = `No hay datos de *** en ${year}`;
    }
    console.log(playerById)
}

const searchPlayer = async () => {
    let year = selectYear();
    console.log(year)
    playerData = await fetchData(`https://www.balldontlie.io/api/v1/players?search=${player.value}`);
    if (playerData.data.length == 0) { // La búsqueda no da ningún resultado.
        result.textContent = 'Jugador no encontrado.'
    } else if (playerData.data.length === 1) { // Las búsqueda da un resultado -> imprimir estadísticas 
        showPlayerInfo(playerData.data[0], year);
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
    player.value = ''; //Vacía el input después de una búsqueda
}

const playerFromTeamList = localStorage.getItem('playerSelected');

console.log("local", )
if (playerFromTeamList) { //Comprobación de que hay algo en el localStorage
    localStorage.removeItem('playerSelected');
    showPlayerInfo(JSON.parse(playerFromTeamList), 2021);
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
            showPlayerInfo(player.id, selectYear());
        }
    });
}

