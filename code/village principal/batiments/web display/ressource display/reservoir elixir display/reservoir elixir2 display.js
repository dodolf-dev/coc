import { reservoir_elixir2 } from "/coc/code/village principal/batiments/database/data ressource/data reservoir elixir.js";
import { reservoir_elixir2_nv_max_hdv } from "/coc/code/village principal/batiments/calculator/ressource calc/reservoir elixirs/reservoir elixir2.calc.js";
import { calculerPrixRestantreservoir_elixir2 } from "/coc/code/village principal/batiments/calculator/ressource calc/reservoir elixirs/reservoir elixir2.calc.js";
import { calculerTempsRestantreservoir_elixir2 } from "/coc/code/village principal/batiments/calculator/ressource calc/reservoir elixirs/reservoir elixir2.calc.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";
import { formatPrix } from "/coc/code/outils/affichge nombre.js";


const reservoir_elixir2_box = document.getElementById("reservoir_elixir2_box");
const selectreservoir_elixir2 = document.getElementById("reservoir_elixir2");
const imagereservoir_elixir2 = document.getElementById("image-reservoir_elixir2");
const selectHdv = document.getElementById("hdv");
const infoContainer = document.createElement("div");
document.body.appendChild(infoContainer);

function updatereservoir_elixirOptions() {
    const hdvLevel = parseInt(selectHdv.value);
    const currentreservoir_elixirLevel = parseInt(selectreservoir_elixir2.value) || 0; // Récupérer l'ancien niveau

    // Filtrer les niveaux de reservoir_elixir disponibles en fonction de l'HDV
    const reservoir_elixirLevels = Object.entries(reservoir_elixir2)
        .filter(([key, data]) => data.hdvrequis <= hdvLevel)
        .sort((a, b) => a[1].hdvrequis - b[1].hdvrequis);

    // Réinitialiser les options du select
    selectreservoir_elixir2.innerHTML = "";
    let selectedLevel = null;

    reservoir_elixirLevels.forEach(([key, data]) => {
        const level = parseInt(key.split("_").pop());
        const option = document.createElement("option");
        option.value = level;
        option.textContent = `Reservoir d'elixir 2 Niveau ${level}`;
        selectreservoir_elixir2.appendChild(option);

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
        reservoir_elixir2_box.style.display = "none";
        selectreservoir_elixir2.style.display = "none";
        imagereservoir_elixir2.style.display = "none";
        infoContainer.style.display = "none";
    } else {
        reservoir_elixir2_box.style.display = "block";
        selectreservoir_elixir2.style.display = "block";
        imagereservoir_elixir2.style.display = "block";
        infoContainer.style.display = "block";
        selectreservoir_elixir2.value = selectedLevel;
        updatereservoir_elixir2Info();
    }
}

function updatereservoir_elixir2Info() {
    const niveau = `reservoir_elixir2_nv_${selectreservoir_elixir2.value}`;
    const data = reservoir_elixir2[niveau];
    const hdvNiveau = parseInt(document.getElementById("hdv").value, 10);
    const prixrestant = calculerPrixRestantreservoir_elixir2(parseInt(selectreservoir_elixir2.value, 10),reservoir_elixir2_nv_max_hdv(hdvNiveau));
    const tempsRestant = calculerTempsRestantreservoir_elixir2(parseInt(selectreservoir_elixir2.value, 10), reservoir_elixir2_nv_max_hdv(hdvNiveau));

    if (data) {
        imagereservoir_elixir2.src = data.image;
        imagereservoir_elixir2.alt = `reservoir_elixir Niveau ${selectreservoir_elixir2.value}`;
    }
    document.getElementById("reservoir_elixir2_prix_niveau").innerHTML = `Prix restant : ${formatPrix(prixrestant)} <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    document.getElementById("reservoir_elixir2_temps_niveau").innerHTML = `Temps restant: ${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
}
selectHdv.addEventListener("change", updatereservoir_elixirOptions);
selectreservoir_elixir2.addEventListener("change", updatereservoir_elixir2Info);

updatereservoir_elixirOptions();