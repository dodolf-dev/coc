import { piege_ressort5 } from "/coc/code/village principal/batiments/database/data piege/data piege ressort.js";
import { piege_ressort5_nv_max_hdv } from "/coc/code/village principal/batiments/calculator/piege calc/piege ressorts/piege ressort5.calc.js";
import { calculerPrixRestantpiege_ressort5 } from "/coc/code/village principal/batiments/calculator/piege calc/piege ressorts/piege ressort5.calc.js";
import { calculerTempsRestantpiege_ressort5 } from "/coc/code/village principal/batiments/calculator/piege calc/piege ressorts/piege ressort5.calc.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";
import { formatPrix } from "/coc/code/outils/affichge nombre.js";


const piege_ressort5_box = document.getElementById("piege_ressort5_box");
const selectpiege_ressort5 = document.getElementById("piege_ressort5");
const imagepiege_ressort5 = document.getElementById("image-piege_ressort5");
const selectHdv = document.getElementById("hdv");
const infoContainer = document.createElement("div");
document.body.appendChild(infoContainer);

function updatepiege_ressortOptions() {
    const hdvLevel = parseInt(selectHdv.value);
    const currentpiege_ressortLevel = parseInt(selectpiege_ressort5.value) || 0; // Récupérer l'ancien niveau

    // Filtrer les niveaux de piege_ressort disponibles en fonction de l'HDV
    const piege_ressortLevels = Object.entries(piege_ressort5)
        .filter(([key, data]) => data.hdvrequis <= hdvLevel)
        .sort((a, b) => a[1].hdvrequis - b[1].hdvrequis);

    // Réinitialiser les options du select
    selectpiege_ressort5.innerHTML = "";
    let selectedLevel = null;

    piege_ressortLevels.forEach(([key, data]) => {
        const level = parseInt(key.split("_").pop());
        const option = document.createElement("option");
        option.value = level;
        option.textContent = `piege_ressort 1 Niveau ${level}`;
        selectpiege_ressort5.appendChild(option);

        // Si l'ancien niveau est toujours disponible, on le sélectionne
        if (level === currentpiege_ressortLevel) {
            selectedLevel = level;
        }
    });

    // Si l'ancien niveau n'existe plus, prendre le niveau le plus bas possible
    if (!selectedLevel) {
        selectedLevel = piege_ressortLevels.length ? parseInt(piege_ressortLevels[0][0].split("_").pop()) : 0;
    }

    // Si aucun niveau n'est disponible, masquer le piege_ressort 1
    if (piege_ressortLevels.length === 0) {
        piege_ressort5_box.style.display = "none";
        selectpiege_ressort5.style.display = "none";
        imagepiege_ressort5.style.display = "none";
        infoContainer.style.display = "none";
    } else {
        piege_ressort5_box.style.display = "block";
        selectpiege_ressort5.style.display = "block";
        imagepiege_ressort5.style.display = "block";
        infoContainer.style.display = "block";
        selectpiege_ressort5.value = selectedLevel;
        updatepiege_ressort5Info();
    }
}

function updatepiege_ressort5Info() {
    const niveau = `piege_ressort5_nv_${selectpiege_ressort5.value}`;
    const data = piege_ressort5[niveau];
    const hdvNiveau = parseInt(document.getElementById("hdv").value, 10);
    const prixrestant = calculerPrixRestantpiege_ressort5(parseInt(selectpiege_ressort5.value, 10),piege_ressort5_nv_max_hdv(hdvNiveau));
    const tempsRestant = calculerTempsRestantpiege_ressort5(parseInt(selectpiege_ressort5.value, 10), piege_ressort5_nv_max_hdv(hdvNiveau));

    if (data) {
        imagepiege_ressort5.src = data.image;
        imagepiege_ressort5.alt = `piege_ressort Niveau ${selectpiege_ressort5.value}`;
    }

    if (prixrestant === 0) {
        document.getElementById("piege_ressort5_prix_niveau").innerHTML = `Prix restant : max <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }
    else {
        document.getElementById("piege_ressort5_prix_niveau").innerHTML = `Prix restant : ${formatPrix(prixrestant)} <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }

    if (tempsRestant === 0) {
        document.getElementById("piege_ressort5_temps_niveau").innerHTML = `Temps restant: max <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
    else{
        document.getElementById("piege_ressort5_temps_niveau").innerHTML = `Temps restant: ${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
}
selectHdv.addEventListener("change", updatepiege_ressortOptions);
selectpiege_ressort5.addEventListener("change", updatepiege_ressort5Info);

updatepiege_ressortOptions();
