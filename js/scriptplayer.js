import { fetchData } from "../modules/fetchData.js";
import { inchesToCm, poundsToKg } from "../modules/weightHeight.js";

const player = document.querySelector('#text');
const boton = document.querySelector('#boton');
const result = document.querySelector('#result');

let playerData;

const selectYear = () => {
    let x = document.getElementById("year").selectedIndex;
    let y = document.getElementById("year").options;
    return y[x].text;
}

const showTable = (content, tbody, tr) => {
    const td = document.createElement('td');
    
    td.textContent = content;
    tr.appendChild(td);
    tbody.appendChild(tr);
} 

const showPlayerInfo = async (player, year=2021) => {
    let playerById = await fetchData(`https://www.balldontlie.io/api/v1/season_averages?season=${year}&player_ids[]=${player.id}`);

    if (playerById.data.length >= 1){
        /* result.innerHTML = '';
        document.querySelector('.buscador').innerHTML = ''; */

        const fragment = document.createDocumentFragment();
        const template = document.querySelector('#template-team').content;

        const playerDiv = template.cloneNode(true);

        playerDiv.querySelector('img').src += `${player.team.id}.png`;
        playerDiv.querySelector('img').alt = player.team.full_name;

        playerDiv.querySelector('#team').innerHTML = player.first_name + ' ' + player.last_name;
        playerDiv.querySelector('.name').textContent = `POSICION: ${player.position}`; 
        playerDiv.querySelector('.position').textContent = `Altura: ${inchesToCm(player.height_feet, player.height_inches)} | Peso: ${poundsToKg(player.weight_pounds)}`

        fragment.appendChild(playerDiv);

        const playersDiv = document.querySelector('header');
        playersDiv.appendChild(fragment);
    
        //Template de la tabla
        const fragment2 = document.createDocumentFragment();
        const template2 = document.querySelector('#template-table').content;
        
        const tableDiv = template2.cloneNode(true);
        
        tableDiv.querySelector('tbody');
        
        const tbody = tableDiv.querySelector('tbody');
        const tr = document.createElement('tr');

        showTable(playerById.data[0].season, tbody, tr);
        showTable(playerById.data[0].games_played, tbody, tr);
        showTable(playerById.data[0].min, tbody, tr);
        showTable(playerById.data[0].pts, tbody, tr);
        showTable(playerById.data[0].reb, tbody, tr);
        showTable(playerById.data[0].ast, tbody, tr);
        showTable(playerById.data[0].stl, tbody, tr);
        showTable(playerById.data[0].blk, tbody, tr);
        showTable(playerById.data[0].turnover, tbody, tr);

        fragment2.appendChild(tableDiv);

        const tablesDiv = document.querySelector('section');
        tablesDiv.appendChild(fragment2);
    } else {
        result.textContent = player.first_name + ' ' + player.last_name + ' no jugó el año ' + year + '.';
    }
}

const searchPlayer = async () => {
    let year = selectYear();
    playerData = await fetchData(`https://www.balldontlie.io/api/v1/players?search=${player.value}`);

    if (playerData.data.length == 0) { // La búsqueda no da ningún resultado.
        result.textContent = 'Jugador no encontrado.'
        player.value = ''; //Vacía el input después de una búsqueda
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
}

const playerFromTeamList = localStorage.getItem('playerSelected');
console.log(playerFromTeamList)

if (playerFromTeamList) { //Comprobación de que hay algo en el localStorage
    localStorage.removeItem('playerSelected');
    showPlayerInfo(JSON.parse(playerFromTeamList), 2021);
} else { //Imprimir buscador
    const fragment = document.createDocumentFragment();
    const template = document.querySelector("#template-buscador").content;

    const buscadorDiv = template.cloneNode(true);

    fragment.appendChild(buscadorDiv);

    const header = document.querySelector('header');
    header.appendChild(fragment);
    
    boton.addEventListener('click', searchPlayer);
    document.body.addEventListener('keydown', pressEnter);

    const pressEnter = (e) => { //Al pulsar enter realiza una búsqueda
        if ((e.keyCode === 13) &&  (player.value.length > 2)){
            searchPlayer();
        }
    }   
}
const selectPlayer = (e) => {
    playerData.data.filter(player => {
        if (player.first_name + ' ' + player.last_name == e.target.textContent) {
            showPlayerInfo(player, selectYear());
        }
    });
}