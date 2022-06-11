import fetchData from "../modules/fetchData"

const player = document.querySelector('#text')
const boton = document.querySelector('#boton')
const playerData = await fetchData(`https://www.balldontlie.io/api/v1/players?search=${text}`);

const search = () => {
    const text = player.value.toLowerCase()
    console.log(playerData)
}

boton.addEventListener('click', search);

