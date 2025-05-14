import { reservoir_elixir_noir } from "/coc/code/village principal/batiments/database/data ressource/data reservoir elixir noir.js";
import { reservoir_elixir_noir_nv_max_hdv } from "/coc/code/village principal/batiments/calculator/ressource calc/reservoir elixir noirs/reservoir elixir noir.calc.js";
import { calculerPrixRestantreservoir_elixir_noir } from "/coc/code/village principal/batiments/calculator/ressource calc/reservoir elixir noirs/reservoir elixir noir.calc.js";
import { calculerTempsRestantreservoir_elixir_noir } from "/coc/code/village principal/batiments/calculator/ressource calc/reservoir elixir noirs/reservoir elixir noir.calc.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";
import { formatPrix } from "/coc/code/outils/affichge nombre.js";


const reservoir_elixir_noir_box = document.getElementById("reservoir_elixir_noir_box");
const selectreservoir_elixir_noir = document.getElementById("reservoir_elixir_noir");
const imagereservoir_elixir_noir = document.getElementById("image-reservoir_elixir_noir");
const selectHdv = document.getElementById("hdv");
const infoContainer = document.createElement("div");
document.body.appendChild(infoContainer);

function updatereservoir_elixirOptions() {
    const hdvLevel = parseInt(selectHdv.value);
    const currentreservoir_elixirLevel = parseInt(selectreservoir_elixir_noir.value) || 0; // Récupérer l'ancien niveau

    // Filtrer les niveaux de reservoir_elixir disponibles en fonction de l'HDV
    const reservoir_elixirLevels = Object.entries(reservoir_elixir_noir)
        .filter(([key, data]) => data.hdvrequis <= hdvLevel)
        .sort((a, b) => a[1].hdvrequis - b[1].hdvrequis);

    // Réinitialiser les options du select
    selectreservoir_elixir_noir.innerHTML = "";
    let selectedLevel = null;

    reservoir_elixirLevels.forEach(([key, data]) => {
        const level = parseInt(key.split("_").pop());
        const option = document.createElement("option");
        option.value = level;
        option.textContent = `reservoir_elixir 1 Niveau ${level}`;
        selectreservoir_elixir_noir.appendChild(option);

        // Si l'ancien niveau est toujours disponible, on le sélectionne
        if (level === currentreservoir_elixirLevel) {
            selectedLevel = level;
        }
    });

    // Si l'ancien niveau n'existe plus, prendre le niveau le plus bas possible
    if (!selectedLevel) {
        selectedLevel = reservoir_elixirLevels.length ? parseInt(reservoir_elixirLevels[0][0].split("_").pop()) : 0;
    }

    // Si aucun niveau n'est disponible, masquer le reservoir_elixir 1
    if (reservoir_elixirLevels.length === 0) {
        reservoir_elixir_noir_box.style.display = "none";
        selectreservoir_elixir_noir.style.display = "none";
        imagereservoir_elixir_noir.style.display = "none";
        infoContainer.style.display = "none";
    } else {
        reservoir_elixir_noir_box.style.display = "block";
        selectreservoir_elixir_noir.style.display = "block";
        imagereservoir_elixir_noir.style.display = "block";
        infoContainer.style.display = "block";
        selectreservoir_elixir_noir.value = selectedLevel;
        updatereservoir_elixir_noirInfo();
    }
}

function updatereservoir_elixir_noirInfo() {
    const niveau = `reservoir_elixir_noir_nv_${selectreservoir_elixir_noir.value}`;
    const data = reservoir_elixir_noir[niveau];
    const hdvNiveau = parseInt(document.getElementById("hdv").value, 10);
    const prixrestant = calculerPrixRestantreservoir_elixir_noir(parseInt(selectreservoir_elixir_noir.value, 10),reservoir_elixir_noir_nv_max_hdv(hdvNiveau));
    const tempsRestant = calculerTempsRestantreservoir_elixir_noir(parseInt(selectreservoir_elixir_noir.value, 10), reservoir_elixir_noir_nv_max_hdv(hdvNiveau));

    if (data) {
        imagereservoir_elixir_noir.src = data.image;
        imagereservoir_elixir_noir.alt = `reservoir_elixir Niveau ${selectreservoir_elixir_noir.value}`;
    }
    document.getElementById("reservoir_elixir_noir_prix_niveau").innerHTML = `Prix restant : ${formatPrix(prixrestant)} <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    document.getElementById("reservoir_elixir_noir_temps_niveau").innerHTML = `Temps restant: ${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
}
selectHdv.addEventListener("change", updatereservoir_elixirOptions);
selectreservoir_elixir_noir.addEventListener("change", updatereservoir_elixir_noirInfo);

updatereservoir_elixirOptions();