import { extracteur_elixir_noir1 } from "/coc/code/village principal/batiments/database/data ressource/data extracteur elixir noir.js";
import { extracteur_elixir_noir1_nv_max_hdv } from "/coc/code/village principal/batiments/calculator/ressource calc/extracteur elixir noirs/extracteur elixir noir1.calc.js";
import { calculerPrixRestantextracteur_elixir_noir1 } from "/coc/code/village principal/batiments/calculator/ressource calc/extracteur elixir noirs/extracteur elixir noir1.calc.js";
import { calculerTempsRestantextracteur_elixir_noir1 } from "/coc/code/village principal/batiments/calculator/ressource calc/extracteur elixir noirs/extracteur elixir noir1.calc.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";
import { formatPrix } from "/coc/code/outils/affichge nombre.js";


const extracteur_elixir_noir1_box = document.getElementById("extracteur_elixir_noir1_box");
const selectextracteur_elixir_noir1 = document.getElementById("extracteur_elixir_noir1");
const imageextracteur_elixir_noir1 = document.getElementById("image-extracteur_elixir_noir1");
const selectHdv = document.getElementById("hdv");
const infoContainer = document.createElement("div");
document.body.appendChild(infoContainer);

function updateextracteur_elixir_noirOptions() {
    const hdvLevel = parseInt(selectHdv.value);
    const currentextracteur_elixir_noirLevel = parseInt(selectextracteur_elixir_noir1.value) || 0; // Récupérer l'ancien niveau

    // Filtrer les niveaux de extracteur_elixir_noir disponibles en fonction de l'HDV
    const extracteur_elixir_noirLevels = Object.entries(extracteur_elixir_noir1)
        .filter(([key, data]) => data.hdvrequis <= hdvLevel)
        .sort((a, b) => a[1].hdvrequis - b[1].hdvrequis);

    // Réinitialiser les options du select
    selectextracteur_elixir_noir1.innerHTML = "";
    let selectedLevel = null;

    extracteur_elixir_noirLevels.forEach(([key, data]) => {
        const level = parseInt(key.split("_").pop());
        const option = document.createElement("option");
        option.value = level;
        option.textContent = `extracteur_elixir_noir 1 Niveau ${level}`;
        selectextracteur_elixir_noir1.appendChild(option);

        // Si l'ancien niveau est toujours disponible, on le sélectionne
        if (level === currentextracteur_elixir_noirLevel) {
            selectedLevel = level;
        }
    });

    // Si l'ancien niveau n'existe plus, prendre le niveau le plus bas possible
    if (!selectedLevel) {
        selectedLevel = extracteur_elixir_noirLevels.length ? parseInt(extracteur_elixir_noirLevels[0][0].split("_").pop()) : 0;
    }

    // Si aucun niveau n'est disponible, masquer le extracteur_elixir_noir 1
    if (extracteur_elixir_noirLevels.length === 0) {
        extracteur_elixir_noir1_box.style.display = "none";
        selectextracteur_elixir_noir1.style.display = "none";
        imageextracteur_elixir_noir1.style.display = "none";
        infoContainer.style.display = "none";
        extracteur_elixir_noir_block.style.display = "none";
    } else {
        extracteur_elixir_noir1_box.style.display = "block";
        selectextracteur_elixir_noir1.style.display = "block";
        imageextracteur_elixir_noir1.style.display = "block";
        infoContainer.style.display = "block";
        extracteur_elixir_noir_block.style.display = "block";
        selectextracteur_elixir_noir1.value = selectedLevel;
        updateextracteur_elixir_noir1Info();
    }
}

function updateextracteur_elixir_noir1Info() {
    const niveau = `extracteur_elixir_noir1_nv_${selectextracteur_elixir_noir1.value}`;
    const data = extracteur_elixir_noir1[niveau];
    const hdvNiveau = parseInt(document.getElementById("hdv").value, 10);
    const prixrestant = calculerPrixRestantextracteur_elixir_noir1(parseInt(selectextracteur_elixir_noir1.value, 10),extracteur_elixir_noir1_nv_max_hdv(hdvNiveau));
    const tempsRestant = calculerTempsRestantextracteur_elixir_noir1(parseInt(selectextracteur_elixir_noir1.value, 10), extracteur_elixir_noir1_nv_max_hdv(hdvNiveau));

    if (data) {
        imageextracteur_elixir_noir1.src = data.image;
        imageextracteur_elixir_noir1.alt = `extracteur_elixir_noir Niveau ${selectextracteur_elixir_noir1.value}`;
    }
    document.getElementById("extracteur_elixir_noir1_prix_niveau").innerHTML = `Prix restant : ${formatPrix(prixrestant)} <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    document.getElementById("extracteur_elixir_noir1_temps_niveau").innerHTML = `Temps restant: ${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
}
selectHdv.addEventListener("change", updateextracteur_elixir_noirOptions);
selectextracteur_elixir_noir1.addEventListener("change", updateextracteur_elixir_noir1Info);

updateextracteur_elixir_noirOptions();