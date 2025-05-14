import { monolithe } from "/coc/code/village principal/batiments/database/data defense/data monolithe.js";
import { monolithe_nv_max_hdv } from "/coc/code/village principal/batiments/calculator/defense calc/monolithe/monolithe.calc.js";
import { calculerPrixRestantmonolithe } from "/coc/code/village principal/batiments/calculator/defense calc/monolithe/monolithe.calc.js";
import { calculerTempsRestantmonolithe } from "/coc/code/village principal/batiments/calculator/defense calc/monolithe/monolithe.calc.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";
import { formatPrix } from "/coc/code/outils/affichge nombre.js";


const monolithe_box = document.getElementById("monolithe_box");
const selectmonolithe = document.getElementById("monolithe");
const imagemonolithe = document.getElementById("image-monolithe");
const selectHdv = document.getElementById("hdv");
const infoContainer = document.createElement("div");
document.body.appendChild(infoContainer);

function updatearcxOptions() {
    const hdvLevel = parseInt(selectHdv.value);
    const currentarcxLevel = parseInt(selectmonolithe.value) || 0; // Récupérer l'ancien niveau

    // Filtrer les niveaux de arcx disponibles en fonction de l'HDV
    const arcxLevels = Object.entries(monolithe)
        .filter(([key, data]) => data.hdvrequis <= hdvLevel)
        .sort((a, b) => a[1].hdvrequis - b[1].hdvrequis);

    // Réinitialiser les options du select
    selectmonolithe.innerHTML = "";
    let selectedLevel = null;

    arcxLevels.forEach(([key, data]) => {
        const level = parseInt(key.split("_").pop());
        const option = document.createElement("option");
        option.value = level;
        option.textContent = `arcx 1 Niveau ${level}`;
        selectmonolithe.appendChild(option);

        // Si l'ancien niveau est toujours disponible, on le sélectionne
        if (level === currentarcxLevel) {
            selectedLevel = level;
        }
    });

    // Si l'ancien niveau n'existe plus, prendre le niveau le plus bas possible
    if (!selectedLevel) {
        selectedLevel = arcxLevels.length ? parseInt(arcxLevels[0][0].split("_").pop()) : 0;
    }

    // Si aucun niveau n'est disponible, masquer le arcx 1
    if (arcxLevels.length === 0) {
        monolithe_box.style.display = "none";
        selectmonolithe.style.display = "none";
        imagemonolithe.style.display = "none";
        infoContainer.style.display = "none";
        monolithe_block.style.display = "none";
    } else {
        monolithe_box.style.display = "block";
        selectmonolithe.style.display = "block";
        imagemonolithe.style.display = "block";
        infoContainer.style.display = "block";
        monolithe_block.style.display ="block";
        selectmonolithe.value = selectedLevel;
        updatemonolitheInfo();
    }
}

function updatemonolitheInfo() {
    const niveau = `monolithe_nv_${selectmonolithe.value}`;
    const data = monolithe[niveau];
    const hdvNiveau = parseInt(document.getElementById("hdv").value, 10);
    const prixrestant = calculerPrixRestantmonolithe(parseInt(selectmonolithe.value, 10),monolithe_nv_max_hdv(hdvNiveau));
    const tempsRestant = calculerTempsRestantmonolithe(parseInt(selectmonolithe.value, 10), monolithe_nv_max_hdv(hdvNiveau));

    if (data) {
        imagemonolithe.src = data.image;
        imagemonolithe.alt = `arcx Niveau ${selectmonolithe.value}`;
    }
    document.getElementById("monolithe_prix_niveau").innerHTML = `Prix restant : ${formatPrix(prixrestant)} <img src="/coc/image/village principal/ressource/elixir-noir.png" alt="elixir-noir" class="icone-ressource">`;
    document.getElementById("monolithe_temps_niveau").innerHTML = `Temps restant: ${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
}
selectHdv.addEventListener("change", updatearcxOptions);
selectmonolithe.addEventListener("change", updatemonolitheInfo);

updatearcxOptions();