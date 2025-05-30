import { extracteur_elixir3 } from "/coc/code/village principal/batiments/database/data ressource/data extracteur elixir.js";
import { extracteur_elixir3_nv_max_hdv } from "/coc/code/village principal/batiments/calculator/ressource calc/extracteur elixirs/extracteur elixir3.calc.js";
import { calculerPrixRestantextracteur_elixir3 } from "/coc/code/village principal/batiments/calculator/ressource calc/extracteur elixirs/extracteur elixir3.calc.js";
import { calculerTempsRestantextracteur_elixir3 } from "/coc/code/village principal/batiments/calculator/ressource calc/extracteur elixirs/extracteur elixir3.calc.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";
import { formatPrix } from "/coc/code/outils/affichge nombre.js";


const extracteur_elixir3_box = document.getElementById("extracteur_elixir3_box");
const selectextracteur_elixir3 = document.getElementById("extracteur_elixir3");
const imageextracteur_elixir3 = document.getElementById("image-extracteur_elixir3");
const selectHdv = document.getElementById("hdv");
const infoContainer = document.createElement("div");
document.body.appendChild(infoContainer);

function updateextracteur_elixirOptions() {
    const hdvLevel = parseInt(selectHdv.value);
    const currentextracteur_elixirLevel = parseInt(selectextracteur_elixir3.value) || 0; // Récupérer l'ancien niveau

    // Filtrer les niveaux de extracteur_elixir disponibles en fonction de l'HDV
    const extracteur_elixirLevels = Object.entries(extracteur_elixir3)
        .filter(([key, data]) => data.hdvrequis <= hdvLevel)
        .sort((a, b) => a[1].hdvrequis - b[1].hdvrequis);

    // Réinitialiser les options du select
    selectextracteur_elixir3.innerHTML = "";
    let selectedLevel = null;

    extracteur_elixirLevels.forEach(([key, data]) => {
        const level = parseInt(key.split("_").pop());
        const option = document.createElement("option");
        option.value = level;
        option.textContent = `Extracteur d'elixir 3 Niveau ${level}`;
        selectextracteur_elixir3.appendChild(option);

        // Si l'ancien niveau est toujours disponible, on le sélectionne
        if (level === currentextracteur_elixirLevel) {
            selectedLevel = level;
        }
    });

    // Si l'ancien niveau n'existe plus, prendre le niveau le plus bas possible
    if (!selectedLevel) {
        selectedLevel = extracteur_elixirLevels.length ? parseInt(extracteur_elixirLevels[0][0].split("_").pop()) : 0;
    }

    // Si aucun niveau n'est disponible, masquer le extracteur_elixir 1
    if (extracteur_elixirLevels.length === 0) {
        extracteur_elixir3_box.style.display = "none";
        selectextracteur_elixir3.style.display = "none";
        imageextracteur_elixir3.style.display = "none";
        infoContainer.style.display = "none";
    } else {
        extracteur_elixir3_box.style.display = "block";
        selectextracteur_elixir3.style.display = "block";
        imageextracteur_elixir3.style.display = "block";
        infoContainer.style.display = "block";
        selectextracteur_elixir3.value = selectedLevel;
        updateextracteur_elixir3Info();
    }
}

function updateextracteur_elixir3Info() {
    const niveau = `extracteur_elixir3_nv_${selectextracteur_elixir3.value}`;
    const data = extracteur_elixir3[niveau];
    const hdvNiveau = parseInt(document.getElementById("hdv").value, 10);
    const prixrestant = calculerPrixRestantextracteur_elixir3(parseInt(selectextracteur_elixir3.value, 10),extracteur_elixir3_nv_max_hdv(hdvNiveau));
    const tempsRestant = calculerTempsRestantextracteur_elixir3(parseInt(selectextracteur_elixir3.value, 10), extracteur_elixir3_nv_max_hdv(hdvNiveau));

    if (data) {
        imageextracteur_elixir3.src = data.image;
        imageextracteur_elixir3.alt = `extracteur_elixir Niveau ${selectextracteur_elixir3.value}`;
    }
    document.getElementById("extracteur_elixir3_prix_niveau").innerHTML = `Prix restant : ${formatPrix(prixrestant)} <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    document.getElementById("extracteur_elixir3_temps_niveau").innerHTML = `Temps restant: ${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
}
selectHdv.addEventListener("change", updateextracteur_elixirOptions);
selectextracteur_elixir3.addEventListener("change", updateextracteur_elixir3Info);

updateextracteur_elixirOptions();