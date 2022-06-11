
const player = document.querySelector('#text');
const boton = document.querySelector('#boton');
const results = document.querySelector('#result');

async function fetchData(url) {    
    const response = await fetch(url);
    if (!response.ok) {
        console.log("Error");
        return [];
    }
    const data = await response.json();
    return data;
} 

const search = async () => {
    const playerData = await fetchData(`https://www.balldontlie.io/api/v1/players?search=${player.value}`)
 
    if (playerData.data.length == 0) {
        console.log('Jugador no encontrado');
        results.textContent = 'Jugador no encontrado.'
    } else if (playerData.data.length === 1) {
        console.log('flipa')
        results.textContent = `${playerData.data[0].first_name} ${playerData.data[0].last_name}` ;
    } else {
        playerData.data.map(player => {
            //results.textContent = '';
            results.textContent += ' \nelias';
            //results.textContent += {player.first_name}' '${player.last_name} '<br/>' ;

 
        })
    }
    player.textContent = '';
    

    console.log(playerData)
}

boton.addEventListener('click', search);

