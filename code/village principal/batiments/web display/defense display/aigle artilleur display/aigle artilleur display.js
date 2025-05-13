import { aigle_artilleur } from "/coc/code/village principal/batiments/database/data defense/data aigle artilleur.js";
import { aigle_artilleur_nv_max_hdv } from "/coc/code/village principal/batiments/calculator/defense calc/aigle artilleur/aigle artilleur.calc.js";
import { calculerPrixRestantaigle_artilleur } from "/coc/code/village principal/batiments/calculator/defense calc/aigle artilleur/aigle artilleur.calc.js";
import { calculerTempsRestantaigle_artilleur } from "/coc/code/village principal/batiments/calculator/defense calc/aigle artilleur/aigle artilleur.calc.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";
import { formatPrix } from "/coc/code/outils/affichge nombre.js";


const aigle_artilleur_box = document.getElementById("aigle_artilleur_box");
const selectaigle_artilleur = document.getElementById("aigle_artilleur");
const imageaigle_artilleur = document.getElementById("image-aigle_artilleur");
const selectHdv = document.getElementById("hdv");
const infoContainer = document.createElement("div");
document.body.appendChild(infoContainer);

function updatearcxOptions() {
    const hdvLevel = parseInt(selectHdv.value);
    const currentarcxLevel = parseInt(selectaigle_artilleur.value) || 0; // Récupérer l'ancien niveau

    // Filtrer les niveaux de arcx disponibles en fonction de l'HDV
    const arcxLevels = Object.entries(aigle_artilleur)
        .filter(([key, data]) => data.hdvrequis <= hdvLevel)
        .sort((a, b) => a[1].hdvrequis - b[1].hdvrequis);

    // Réinitialiser les options du select
    selectaigle_artilleur.innerHTML = "";
    let selectedLevel = null;

    arcxLevels.forEach(([key, data]) => {
        const level = parseInt(key.split("_").pop());
        const option = document.createElement("option");
        option.value = level;
        option.textContent = `arcx 1 Niveau ${level}`;
        selectaigle_artilleur.appendChild(option);

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
        aigle_artilleur_box.style.display = "none";
        selectaigle_artilleur.style.display = "none";
        imageaigle_artilleur.style.display = "none";
        infoContainer.style.display = "none";
    } else {
        aigle_artilleur_box.style.display = "block";
        selectaigle_artilleur.style.display = "block";
        imageaigle_artilleur.style.display = "block";
        infoContainer.style.display = "block";
        selectaigle_artilleur.value = selectedLevel;
        updateaigle_artilleurInfo();
    }
}

function updateaigle_artilleurInfo() {
    const niveau = `aigle_artilleur_nv_${selectaigle_artilleur.value}`;
    const data = aigle_artilleur[niveau];
    const hdvNiveau = parseInt(document.getElementById("hdv").value, 10);
    const prixrestant = calculerPrixRestantaigle_artilleur(parseInt(selectaigle_artilleur.value, 10),aigle_artilleur_nv_max_hdv(hdvNiveau));
    const tempsRestant = calculerTempsRestantaigle_artilleur(parseInt(selectaigle_artilleur.value, 10), aigle_artilleur_nv_max_hdv(hdvNiveau));

    if (data) {
        imageaigle_artilleur.src = data.image;
        imageaigle_artilleur.alt = `arcx Niveau ${selectaigle_artilleur.value}`;
    }
    document.getElementById("aigle_artilleur_prix_niveau").innerHTML = `Prix restant : ${formatPrix(prixrestant)} <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    document.getElementById("aigle_artilleur_temps_niveau").innerHTML = `Temps restant: ${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
}
selectHdv.addEventListener("change", updatearcxOptions);
selectaigle_artilleur.addEventListener("change", updateaigle_artilleurInfo);

updatearcxOptions();