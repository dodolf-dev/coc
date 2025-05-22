import { piege_ressort2 } from "/coc/code/village principal/batiments/database/data piege/data piege ressort.js";
import { piege_ressort2_nv_max_hdv } from "/coc/code/village principal/batiments/calculator/piege calc/piege ressorts/piege ressort2.calc.js";
import { calculerPrixRestantpiege_ressort2 } from "/coc/code/village principal/batiments/calculator/piege calc/piege ressorts/piege ressort2.calc.js";
import { calculerTempsRestantpiege_ressort2 } from "/coc/code/village principal/batiments/calculator/piege calc/piege ressorts/piege ressort2.calc.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";
import { formatPrix } from "/coc/code/outils/affichge nombre.js";


const piege_ressort2_box = document.getElementById("piege_ressort2_box");
const selectpiege_ressort2 = document.getElementById("piege_ressort2");
const imagepiege_ressort2 = document.getElementById("image-piege_ressort2");
const selectHdv = document.getElementById("hdv");
const infoContainer = document.createElement("div");
document.body.appendChild(infoContainer);

function updatepiege_ressort2ptions() {
    const hdvLevel = parseInt(selectHdv.value);
    const currentpiege_ressort2evel = parseInt(selectpiege_ressort2.value) || 0; // Récupérer l'ancien niveau

    // Filtrer les niveaux de piege_ressort2disponibles en fonction de l'HDV
    const piege_ressort2evels = Object.entries(piege_ressort2)
        .filter(([key, data]) => data.hdvrequis <= hdvLevel)
        .sort((a, b) => a[1].hdvrequis - b[1].hdvrequis);

    // Réinitialiser les options du select
    selectpiege_ressort2.innerHTML = "";
    let selectedLevel = null;

    piege_ressort2evels.forEach(([key, data]) => {
        const level = parseInt(key.split("_").pop());
        const option = document.createElement("option");
        option.value = level;
        option.textContent = `Piège ressort 2 Niveau ${level}`;
        selectpiege_ressort2.appendChild(option);

        // Si l'ancien niveau est toujours disponible, on le sélectionne
        if (level === currentpiege_ressort2evel) {
            selectedLevel = level;
        }
    });

    // Si l'ancien niveau n'existe plus, prendre le niveau le plus bas possible
    if (!selectedLevel) {
        selectedLevel = piege_ressort2evels.length ? parseInt(piege_ressort2evels[0][0].split("_").pop()) : 0;
    }

    // Si aucun niveau n'est disponible, masquer le piege_ressort21
    if (piege_ressort2evels.length === 0) {
        piege_ressort2_box.style.display = "none";
        selectpiege_ressort2.style.display = "none";
        imagepiege_ressort2.style.display = "none";
        infoContainer.style.display = "none";
    } else {
        piege_ressort2_box.style.display = "block";
        selectpiege_ressort2.style.display = "block";
        imagepiege_ressort2.style.display = "block";
        infoContainer.style.display = "block";
        selectpiege_ressort2.value = selectedLevel;
        updatepiege_ressort2Info();
    }
}

function updatepiege_ressort2Info() {
    const niveau = `piege_ressort2_nv_${selectpiege_ressort2.value}`;
    const data = piege_ressort2[niveau];
    const hdvNiveau = parseInt(document.getElementById("hdv").value, 10);
    const prixrestant = calculerPrixRestantpiege_ressort2(parseInt(selectpiege_ressort2.value, 10),piege_ressort2_nv_max_hdv(hdvNiveau));
    const tempsRestant = calculerTempsRestantpiege_ressort2(parseInt(selectpiege_ressort2.value, 10), piege_ressort2_nv_max_hdv(hdvNiveau));

    if (data) {
        imagepiege_ressort2.src = data.image;
        imagepiege_ressort2.alt = `piege_ressort2Niveau ${selectpiege_ressort2.value}`;
    }

    if (prixrestant === 0) {
        document.getElementById("piege_ressort2_prix_niveau").innerHTML = `Prix restant : max <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }
    else {
        document.getElementById("piege_ressort2_prix_niveau").innerHTML = `Prix restant : ${formatPrix(prixrestant)} <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }

    if (tempsRestant === 0) {
        document.getElementById("piege_ressort2_temps_niveau").innerHTML = `Temps restant: max <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
    else{
        document.getElementById("piege_ressort2_temps_niveau").innerHTML = `Temps restant: ${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
}
selectHdv.addEventListener("change", updatepiege_ressort2ptions);
selectpiege_ressort2.addEventListener("change", updatepiege_ressort2Info);

updatepiege_ressort2ptions();
