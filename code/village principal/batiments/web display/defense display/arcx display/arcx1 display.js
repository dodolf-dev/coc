import { arcx1 } from "/coc/code/village principal/batiments/database/data defense/data arcx.js";
import { arcx1_nv_max_hdv } from "/coc/code/village principal/batiments/calculator/defense calc/arcxs/arcx1.calc.js";
import { calculerPrixRestantarcx1 } from "/coc/code/village principal/batiments/calculator/defense calc/arcxs/arcx1.calc.js";
import { calculerTempsRestantarcx1 } from "/coc/code/village principal/batiments/calculator/defense calc/arcxs/arcx1.calc.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";
import { formatPrix } from "/coc/code/outils/affichge nombre.js";


const arcx1_box = document.getElementById("arcx1_box");
const selectarcx1 = document.getElementById("arcx1");
const imagearcx1 = document.getElementById("image-arcx1");
const selectHdv = document.getElementById("hdv");
const infoContainer = document.createElement("div");
document.body.appendChild(infoContainer);

function updatearcxOptions() {
    const hdvLevel = parseInt(selectHdv.value);
    const currentarcxLevel = parseInt(selectarcx1.value) || 0; // Récupérer l'ancien niveau

    // Filtrer les niveaux de arcx disponibles en fonction de l'HDV
    const arcxLevels = Object.entries(arcx1)
        .filter(([key, data]) => data.hdvrequis <= hdvLevel)
        .sort((a, b) => a[1].hdvrequis - b[1].hdvrequis);

    // Réinitialiser les options du select
    selectarcx1.innerHTML = "";
    let selectedLevel = null;

    arcxLevels.forEach(([key, data]) => {
        const level = parseInt(key.split("_").pop());
        const option = document.createElement("option");
        option.value = level;
        option.textContent = `Arc-x 1 Niveau ${level}`;
        selectarcx1.appendChild(option);

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
        arcx1_box.style.display = "none";
        selectarcx1.style.display = "none";
        imagearcx1.style.display = "none";
        infoContainer.style.display = "none";
        arcx_block.style.display = "none";
    } else {
        arcx1_box.style.display = "block";
        selectarcx1.style.display = "block";
        imagearcx1.style.display = "block";
        infoContainer.style.display = "block";
        arcx_block.style.display = "block";
        selectarcx1.value = selectedLevel;
        updatearcx1Info();
    }
}

function updatearcx1Info() {
    const niveau = `arcx1_nv_${selectarcx1.value}`;
    const data = arcx1[niveau];
    const hdvNiveau = parseInt(document.getElementById("hdv").value, 10);
    const prixrestant = calculerPrixRestantarcx1(parseInt(selectarcx1.value, 10),arcx1_nv_max_hdv(hdvNiveau));
    const tempsRestant = calculerTempsRestantarcx1(parseInt(selectarcx1.value, 10), arcx1_nv_max_hdv(hdvNiveau));

    if (data) {
        imagearcx1.src = data.image;
        imagearcx1.alt = `arcx Niveau ${selectarcx1.value}`;
    }
    if (prixrestant === 0) {
        document.getElementById("arcx1_prix_niveau").innerHTML = `Prix restant : max <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;    
    }
    else {
        document.getElementById("arcx1_prix_niveau").innerHTML = `Prix restant : ${formatPrix(prixrestant)} <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }
    if (tempsRestant === 0) {
        document.getElementById("arcx1_temps_niveau").innerHTML = `Temps restant: max <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
    else {
        document.getElementById("arcx1_temps_niveau").innerHTML = `Temps restant: ${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
}
selectHdv.addEventListener("change", updatearcxOptions);
selectarcx1.addEventListener("change", updatearcx1Info);

updatearcxOptions();