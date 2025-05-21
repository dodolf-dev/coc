import { piege_ressort9 } from "/coc/code/village principal/batiments/database/data piege/data piege ressort.js";
import { piege_ressort9_nv_max_hdv } from "/coc/code/village principal/batiments/calculator/piege calc/piege ressorts/piege ressort9.calc.js";
import { calculerPrixRestantpiege_ressort9 } from "/coc/code/village principal/batiments/calculator/piege calc/piege ressorts/piege ressort9.calc.js";
import { calculerTempsRestantpiege_ressort9 } from "/coc/code/village principal/batiments/calculator/piege calc/piege ressorts/piege ressort9.calc.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";
import { formatPrix } from "/coc/code/outils/affichge nombre.js";


const piege_ressort9_box = document.getElementById("piege_ressort9_box");
const selectpiege_ressort9 = document.getElementById("piege_ressort9");
const imagepiege_ressort9 = document.getElementById("image-piege_ressort9");
const selectHdv = document.getElementById("hdv");
const infoContainer = document.createElement("div");
document.body.appendChild(infoContainer);

function updatepiege_ressortOptions() {
    const hdvLevel = parseInt(selectHdv.value);
    const currentpiege_ressortLevel = parseInt(selectpiege_ressort9.value) || 0; // Récupérer l'ancien niveau

    // Filtrer les niveaux de piege_ressort disponibles en fonction de l'HDV
    const piege_ressortLevels = Object.entries(piege_ressort9)
        .filter(([key, data]) => data.hdvrequis <= hdvLevel)
        .sort((a, b) => a[1].hdvrequis - b[1].hdvrequis);

    // Réinitialiser les options du select
    selectpiege_ressort9.innerHTML = "";
    let selectedLevel = null;

    piege_ressortLevels.forEach(([key, data]) => {
        const level = parseInt(key.split("_").pop());
        const option = document.createElement("option");
        option.value = level;
        option.textContent = `piege_ressort 1 Niveau ${level}`;
        selectpiege_ressort9.appendChild(option);

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
        piege_ressort9_box.style.display = "none";
        selectpiege_ressort9.style.display = "none";
        imagepiege_ressort9.style.display = "none";
        infoContainer.style.display = "none";
    } else {
        piege_ressort9_box.style.display = "block";
        selectpiege_ressort9.style.display = "block";
        imagepiege_ressort9.style.display = "block";
        infoContainer.style.display = "block";
        selectpiege_ressort9.value = selectedLevel;
        updatepiege_ressort9Info();
    }
}

function updatepiege_ressort9Info() {
    const niveau = `piege_ressort9_nv_${selectpiege_ressort9.value}`;
    const data = piege_ressort9[niveau];
    const hdvNiveau = parseInt(document.getElementById("hdv").value, 10);
    const prixrestant = calculerPrixRestantpiege_ressort9(parseInt(selectpiege_ressort9.value, 10),piege_ressort9_nv_max_hdv(hdvNiveau));
    const tempsRestant = calculerTempsRestantpiege_ressort9(parseInt(selectpiege_ressort9.value, 10), piege_ressort9_nv_max_hdv(hdvNiveau));

    if (data) {
        imagepiege_ressort9.src = data.image;
        imagepiege_ressort9.alt = `piege_ressort Niveau ${selectpiege_ressort9.value}`;
    }

    if (prixrestant === 0) {
        document.getElementById("piege_ressort9_prix_niveau").innerHTML = `Prix restant : max <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }
    else {
        document.getElementById("piege_ressort9_prix_niveau").innerHTML = `Prix restant : ${formatPrix(prixrestant)} <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }

    if (tempsRestant === 0) {
        document.getElementById("piege_ressort9_temps_niveau").innerHTML = `Temps restant: max <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
    else{
        document.getElementById("piege_ressort9_temps_niveau").innerHTML = `Temps restant: ${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
}
selectHdv.addEventListener("change", updatepiege_ressortOptions);
selectpiege_ressort9.addEventListener("change", updatepiege_ressort9Info);

updatepiege_ressortOptions();
