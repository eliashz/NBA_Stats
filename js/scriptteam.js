;import {fetchData} from "../modules/fetchData.js";
;import {fetchDataPages} from "../modules/fetchDataPages.js";
import { inchesToCm, poundsToKg } from "../modules/weightHeight.js";

const teamID = localStorage.getItem('teamID');

const dataTeam = await fetchData(`https://www.balldontlie.io/api/v1/teams/`);

const team = dataTeam.data.filter(team => team.id == teamID);
//console.log(team)

const showTeamInfo = () => {
    const fragment = document.createDocumentFragment();
    const template = document.querySelector('#template-team').content;

    const teamDiv = template.cloneNode(true);

    teamDiv.querySelector('img').src += `${teamID}.png`; //Insercion de la imagen del logo
    teamDiv.querySelector('img').alt = team[0].name;

    teamDiv.querySelector('#team').textContent = team[0].full_name;
    teamDiv.querySelector('.name').textContent = `${team[0].conference} Conference`; 
    teamDiv.querySelector('.position').textContent = `${team[0].division} Division`; 
    teamDiv.querySelector('.number').textContent = `City of ${team[0].city}`; 

    fragment.appendChild(teamDiv);

    const teamsDiv = document.querySelector('header');
    teamsDiv.appendChild(fragment);
}
showTeamInfo()

const allPlayers = await fetchDataPages(`https://www.balldontlie.io/api/v1/players`);
const teamPlayers = allPlayers.filter(player => player.team.id == teamID);
//console.log(teamPlayers)

const tbody = document.querySelector('tbody');

let print=true; 
let enlace=true;
const showPlayerInfo = (content, tr) => {
    const td = document.createElement('td');
    if (enlace) { //Para que el lace solo salga en la primera columna. 
        const a = document.createElement('a');
        a.setAttribute('href', '/player.html');
        td.appendChild(a);
        a.textContent = content;
        enlace = false;
    } else {
        td.textContent = content;
    }
    if (print===false) tr.classList.add('colorTable') //Pinta un fila si y otra no con la clase.
    tr.appendChild(td);
    tbody.appendChild(tr);
}

teamPlayers.map(teamPlayer => {
    const tr = document.createElement('tr');
    showPlayerInfo(teamPlayer.first_name + ' ' + teamPlayer.last_name, tr);
    showPlayerInfo(teamPlayer.position, tr);
    showPlayerInfo(inchesToCm(teamPlayer.height_feet, teamPlayer.height_inches), tr)
    showPlayerInfo(poundsToKg(teamPlayer.weight_pounds), tr)
    print = !print;
    enlace = true;
})

/**
 * Al seleccionar un jugador de la tabla, guardamos en localStorage el nombre
 * para que al redirigir a la página de jugadores se imprima éste jugador.
 *  
 */
const selectPlayer = (e) => {
    localStoragesetItem('playerFromList', e.target.textContent);
}

const aa = document.querySelectorAll('table a')

for (const a of aa) {
    a.addEventListener('click', selectPlayer);
}