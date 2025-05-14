import { arcx4 } from "/coc/code/village principal/batiments/database/data defense/data arcx.js";
import { arcx4_nv_max_hdv } from "/coc/code/village principal/batiments/calculator/defense calc/arcxs/arcx4.calc.js";
import { calculerPrixRestantarcx4 } from "/coc/code/village principal/batiments/calculator/defense calc/arcxs/arcx4.calc.js";
import { calculerTempsRestantarcx4 } from "/coc/code/village principal/batiments/calculator/defense calc/arcxs/arcx4.calc.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";
import { formatPrix } from "/coc/code/outils/affichge nombre.js";


const arcx4_box = document.getElementById("arcx4_box");
const selectarcx4 = document.getElementById("arcx4");
const imagearcx4 = document.getElementById("image-arcx4");
const selectHdv = document.getElementById("hdv");
const infoContainer = document.createElement("div");
document.body.appendChild(infoContainer);

function updatearcxOptions() {
    const hdvLevel = parseInt(selectHdv.value);
    const currentarcxLevel = parseInt(selectarcx4.value) || 0; // Récupérer l'ancien niveau

    // Filtrer les niveaux de arcx disponibles en fonction de l'HDV
    const arcxLevels = Object.entries(arcx4)
        .filter(([key, data]) => data.hdvrequis <= hdvLevel)
        .sort((a, b) => a[1].hdvrequis - b[1].hdvrequis);

    // Réinitialiser les options du select
    selectarcx4.innerHTML = "";
    let selectedLevel = null;

    arcxLevels.forEach(([key, data]) => {
        const level = parseInt(key.split("_").pop());
        const option = document.createElement("option");
        option.value = level;
        option.textContent = `Arc-x 4 Niveau ${level}`;
        selectarcx4.appendChild(option);

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
        arcx4_box.style.display = "none";
        selectarcx4.style.display = "none";
        imagearcx4.style.display = "none";
        infoContainer.style.display = "none";
    } else {
        arcx4_box.style.display = "block";
        selectarcx4.style.display = "block";
        imagearcx4.style.display = "block";
        infoContainer.style.display = "block";
        selectarcx4.value = selectedLevel;
        updatearcx4Info();
    }
}

function updatearcx4Info() {
    const niveau = `arcx4_nv_${selectarcx4.value}`;
    const data = arcx4[niveau];
    const hdvNiveau = parseInt(document.getElementById("hdv").value, 10);
    const prixrestant = calculerPrixRestantarcx4(parseInt(selectarcx4.value, 10),arcx4_nv_max_hdv(hdvNiveau));
    const tempsRestant = calculerTempsRestantarcx4(parseInt(selectarcx4.value, 10), arcx4_nv_max_hdv(hdvNiveau));

    if (data) {
        imagearcx4.src = data.image;
        imagearcx4.alt = `arcx Niveau ${selectarcx4.value}`;
    }
    document.getElementById("arcx4_prix_niveau").innerHTML = `Prix restant : ${formatPrix(prixrestant)} <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    document.getElementById("arcx4_temps_niveau").innerHTML = `Temps restant: ${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
}
selectHdv.addEventListener("change", updatearcxOptions);
selectarcx4.addEventListener("change", updatearcx4Info);

updatearcxOptions();