import { arcx3 } from "/coc/code/village principal/batiments/database/data defense/data arcx.js";
import { arcx3_nv_max_hdv } from "/coc/code/village principal/batiments/calculator/defense calc/arcxs/arcx3.calc.js";
import { calculerPrixRestantarcx3 } from "/coc/code/village principal/batiments/calculator/defense calc/arcxs/arcx3.calc.js";
import { calculerTempsRestantarcx3 } from "/coc/code/village principal/batiments/calculator/defense calc/arcxs/arcx3.calc.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";
import { formatPrix } from "/coc/code/outils/affichge nombre.js";


const arcx3_box = document.getElementById("arcx3_box");
const selectarcx3 = document.getElementById("arcx3");
const imagearcx3 = document.getElementById("image-arcx3");
const selectHdv = document.getElementById("hdv");
const infoContainer = document.createElement("div");
document.body.appendChild(infoContainer);

function updatearcxOptions() {
    const hdvLevel = parseInt(selectHdv.value);
    const currentarcxLevel = parseInt(selectarcx3.value) || 0; // Récupérer l'ancien niveau

    // Filtrer les niveaux de arcx disponibles en fonction de l'HDV
    const arcxLevels = Object.entries(arcx3)
        .filter(([key, data]) => data.hdvrequis <= hdvLevel)
        .sort((a, b) => a[1].hdvrequis - b[1].hdvrequis);

    // Réinitialiser les options du select
    selectarcx3.innerHTML = "";
    let selectedLevel = null;

    arcxLevels.forEach(([key, data]) => {
        const level = parseInt(key.split("_").pop());
        const option = document.createElement("option");
        option.value = level;
        option.textContent = `Arc-x 3 Niveau ${level}`;
        selectarcx3.appendChild(option);

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
        arcx3_box.style.display = "none";
        selectarcx3.style.display = "none";
        imagearcx3.style.display = "none";
        infoContainer.style.display = "none";
    } else {
        arcx3_box.style.display = "block";
        selectarcx3.style.display = "block";
        imagearcx3.style.display = "block";
        infoContainer.style.display = "block";
        selectarcx3.value = selectedLevel;
        updatearcx3Info();
    }
}

function updatearcx3Info() {
    const niveau = `arcx3_nv_${selectarcx3.value}`;
    const data = arcx3[niveau];
    const hdvNiveau = parseInt(document.getElementById("hdv").value, 10);
    const prixrestant = calculerPrixRestantarcx3(parseInt(selectarcx3.value, 10),arcx3_nv_max_hdv(hdvNiveau));
    const tempsRestant = calculerTempsRestantarcx3(parseInt(selectarcx3.value, 10), arcx3_nv_max_hdv(hdvNiveau));

    if (data) {
        imagearcx3.src = data.image;
        imagearcx3.alt = `arcx Niveau ${selectarcx3.value}`;
    }
    document.getElementById("arcx3_prix_niveau").innerHTML = `Prix restant : ${formatPrix(prixrestant)} <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    document.getElementById("arcx3_temps_niveau").innerHTML = `Temps restant: ${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
}
selectHdv.addEventListener("change", updatearcxOptions);
selectarcx3.addEventListener("change", updatearcx3Info);

updatearcxOptions();