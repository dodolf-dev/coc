import { arcx2 } from "/coc/code/village principal/batiments/database/data defense/data arcx.js";
import { arcx2_nv_max_hdv } from "/coc/code/village principal/batiments/calculator/defense calc/arcxs/arcx2.calc.js";
import { calculerPrixRestantarcx2 } from "/coc/code/village principal/batiments/calculator/defense calc/arcxs/arcx2.calc.js";
import { calculerTempsRestantarcx2 } from "/coc/code/village principal/batiments/calculator/defense calc/arcxs/arcx2.calc.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";
import { formatPrix } from "/coc/code/outils/affichge nombre.js";


const arcx2_box = document.getElementById("arcx2_box");
const selectarcx2 = document.getElementById("arcx2");
const imagearcx2 = document.getElementById("image-arcx2");
const selectHdv = document.getElementById("hdv");
const infoContainer = document.createElement("div");
document.body.appendChild(infoContainer);

function updatearcxOptions() {
    const hdvLevel = parseInt(selectHdv.value);
    const currentarcxLevel = parseInt(selectarcx2.value) || 0; // Récupérer l'ancien niveau

    // Filtrer les niveaux de arcx disponibles en fonction de l'HDV
    const arcxLevels = Object.entries(arcx2)
        .filter(([key, data]) => data.hdvrequis <= hdvLevel)
        .sort((a, b) => a[1].hdvrequis - b[1].hdvrequis);

    // Réinitialiser les options du select
    selectarcx2.innerHTML = "";
    let selectedLevel = null;

    arcxLevels.forEach(([key, data]) => {
        const level = parseInt(key.split("_").pop());
        const option = document.createElement("option");
        option.value = level;
        option.textContent = `Arc-x 2 Niveau ${level}`;
        selectarcx2.appendChild(option);

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
        arcx2_box.style.display = "none";
        selectarcx2.style.display = "none";
        imagearcx2.style.display = "none";
        infoContainer.style.display = "none";
    } else {
        arcx2_box.style.display = "block";
        selectarcx2.style.display = "block";
        imagearcx2.style.display = "block";
        infoContainer.style.display = "block";
        selectarcx2.value = selectedLevel;
        updatearcx2Info();
    }
}

function updatearcx2Info() {
    const niveau = `arcx2_nv_${selectarcx2.value}`;
    const data = arcx2[niveau];
    const hdvNiveau = parseInt(document.getElementById("hdv").value, 10);
    const prixrestant = calculerPrixRestantarcx2(parseInt(selectarcx2.value, 10),arcx2_nv_max_hdv(hdvNiveau));
    const tempsRestant = calculerTempsRestantarcx2(parseInt(selectarcx2.value, 10), arcx2_nv_max_hdv(hdvNiveau));

    if (data) {
        imagearcx2.src = data.image;
        imagearcx2.alt = `arcx Niveau ${selectarcx2.value}`;
    }
    document.getElementById("arcx2_prix_niveau").innerHTML = `Prix restant : ${formatPrix(prixrestant)} <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    document.getElementById("arcx2_temps_niveau").innerHTML = `Temps restant: ${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
}
selectHdv.addEventListener("change", updatearcxOptions);
selectarcx2.addEventListener("change", updatearcx2Info);

updatearcxOptions();