import {fetchData} from "../modules/fetchData.js";
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

let page = 37;
let print = true; 
let allTeamPlayers = [];

do {
    const tbody = document.querySelector('tbody');
    let enlace=true; //Para crear enlace en la primera columna de la tabla.

    let url = `https://www.balldontlie.io/api/v1/players?per_page=100&page=${page}`
    const allPlayers = await fetchData(url);
    const teamPlayers = allPlayers.data.filter(player => player.team.id == teamID);

    allTeamPlayers = [...allTeamPlayers, ...teamPlayers];

    const showPlayerInfo = (content, tr) => {
        const td = document.createElement('td');
        if (enlace) { //Para que el enlace solo salga en la primera columna. 
            const a = document.createElement('a');
            a.setAttribute('href', '#');
            td.appendChild(a);
            a.textContent = content;
            enlace = false;
        } else {
            td.textContent = content;
        }
        if (!print) tr.classList.add('colorTable') //Pinta un fila si y otra no con la clase.
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
    page++
} while (page <= 38)

/**
 * Al seleccionar un jugador de la tabla, guardamos en localStorage el nombre y la ID
 * para que al redirigir a la página de jugadores se imprima éste jugador.
 *  
 */
const selectPlayer = (e) => {
    allTeamPlayers.filter(player => {
        if (player.first_name + ' ' + player.last_name === e.target.textContent) {
            console.log("local", player)
            localStorage.setItem('playerSelected', {id: player.id});
        }
    });
}

//Seleccionar enlace del jugador en la tabla
const aa = document.querySelectorAll('table a');

for (const a of aa) {
    a.addEventListener('click', selectPlayer);
}
