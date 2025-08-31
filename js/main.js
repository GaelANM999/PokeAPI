//creación de variables para seleccionar el ID del HTML
let URL = "https://pokeapi.co/api/v2/pokemon/";
let img = document.querySelector("#imagen");
const pokeName = document.getElementById('pokeName');
let nameID = document.querySelector("#name");
let hp = document.querySelector("#hp");
let type = document.querySelector("#type");
let attack = document.querySelector("#attack");
let defense = document.querySelector("#defense");
let spAttack = document.querySelector("#spAttack");
let spDefense = document.querySelector("#spDefense");
let height = document.querySelector("#height");
let weight = document.querySelector("#weight");
let speed = document.querySelector("#speed");
let pokeAbilities = document.querySelector("#pokeAbilities");
let ability1 = document.querySelector("#ability1");
let ability2 = document.querySelector("#ability2");
const btn = document.querySelector("#button");


//acciones para buscar el pokemon
btn.addEventListener('click', searchPok);
pokeName.addEventListener('keydown', (e) => {
    if (e.key === "Enter") {
        searchPok();
        e.preventDefault();
    }
});

//funcion de buscar pokemon
async function searchPok() {
    //toma la URL de la API y le agrega el nombre del pokemon
    URL = "https://pokeapi.co/api/v2/pokemon/" + pokeName.value;

    try {
        //respuesta de la API
        let res = await fetch(URL);
        //por si no encuentra una respuesta (probablemente no existe el valor ingresado)
        if (!res.ok) {
            throw new Error(`Error HTTP: ${res.status}`);
        }
        //llama al JSON de la API
        data = await res.json();

        //Extrae el nombre del JSON y lo mete al texto con su ID
        let nameDex = data.name;
        nameID.innerText = capitalize(nameDex);

        //toma la ruta de la imagen
        img.src = data.sprites.front_default;

        //Busca por el array de stats hasta encontrar el HP 
        for (let i = 0; i < data.stats.length; i++) {
            if (data.stats[i].stat.name == "hp") {
                hp.innerText = data.stats[i].base_stat;
            }
        }

        //Se crea un array de tipos, recorre el array de la API y mete cada tipo al array del JS, de esta forma se muestran todos los tipos del pokemon
        let typos = [];
        for (let i = 0; i < data.types.length; i++) {
            typos[i] = data.types[i].type.name;
            type.innerText = typos;

        }
        if (typos.length > 1) {
            type.innerText = typos.join(', ');
        }

        //Recorre el array de stats hasta que el valor coincida con el que se busca, de ahí jala su stat básica y la agrega
        for (let i = 0; i < data.stats.length; i++) {
            if (data.stats[i].stat.name == "attack") {
                attack.innerText = data.stats[i].base_stat;
            }
        }

        for (let i = 0; i < data.stats.length; i++) {
            if (data.stats[i].stat.name == "defense") {
                defense.innerText = data.stats[i].base_stat;
            }
        }

        for (let i = 0; i < data.stats.length; i++) {
            if (data.stats[i].stat.name == "special-attack") {
                spAttack.innerText = data.stats[i].base_stat;
            }
        }

        for (let i = 0; i < data.stats.length; i++) {
            if (data.stats[i].stat.name == "special-defense") {
                spDefense.innerText = data.stats[i].base_stat;
            }
        }

        for (let i = 0; i < data.stats.length; i++) {
            if (data.stats[i].stat.name == "speed") {
                speed.innerText = data.stats[i].base_stat;
            }
        }

        //Fue lo más fácil solo busca ese valor en data(JSON) de la API
        height.innerText = data.height;
        weight.innerText = data.weight;

        //Crea un array de abilities para que con el for se recorra cada habilidad y la agregue a este array, del mismo modo a la variable abilitiesHTML se le agregan divs de HTML para cada habilidad que se va ingresando
        let abilities = [];
        let abilitiesHTML = "";
        for (let i = 0; i < data.abilities.length; i++) {
            abilities[i] = data.abilities[i].ability.name;
            abilitiesHTML += `<div id="ability${i}" class=" mt-4 inline-block bg-yellow-200 px-3 py-1 rounded-[12px] border border-black shadow-[-2px_2px_0_0_#EE8497]">${abilities[i]}</div>`;

        }
        //Mete el array HTML al HTML
        pokeAbilities.innerHTML = abilitiesHTML;


    }
    //Atrapa un error en caso de no encontrar el valor en la API
    catch (error) {
        console.error("Hubo algún error al obtener los datos", error);
    }
}

//Pone en mayuscula la primera letra de la palabra
function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}