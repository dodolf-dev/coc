import { bombe8 } from "/coc/code/village principal/batiments/database/data piege/data bombe.js";
import { bombe8_nv_max_hdv } from "/coc/code/village principal/batiments/calculator/piege calc/bombes/bombe8.calc.js";
import { calculerPrixRestantbombe8 } from "/coc/code/village principal/batiments/calculator/piege calc/bombes/bombe8.calc.js";
import { calculerTempsRestantbombe8 } from "/coc/code/village principal/batiments/calculator/piege calc/bombes/bombe8.calc.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";
import { formatPrix } from "/coc/code/outils/affichge nombre.js";


const bombe8_box = document.getElementById("bombe8_box");
const selectbombe8 = document.getElementById("bombe8");
const imagebombe8 = document.getElementById("image-bombe8");
const selectHdv = document.getElementById("hdv");
const infoContainer = document.createElement("div");
document.body.appendChild(infoContainer);

function updatebombeOptions() {
    const hdvLevel = parseInt(selectHdv.value);
    const currentbombeLevel = parseInt(selectbombe8.value) || 0; // Récupérer l'ancien niveau

    // Filtrer les niveaux de bombe disponibles en fonction de l'HDV
    const bombeLevels = Object.entries(bombe8)
        .filter(([key, data]) => data.hdvrequis <= hdvLevel)
        .sort((a, b) => a[1].hdvrequis - b[1].hdvrequis);

    // Réinitialiser les options du select
    selectbombe8.innerHTML = "";
    let selectedLevel = null;

    bombeLevels.forEach(([key, data]) => {
        const level = parseInt(key.split("_").pop());
        const option = document.createElement("option");
        option.value = level;
        option.textContent = `bombe 1 Niveau ${level}`;
        selectbombe8.appendChild(option);

        // Si l'ancien niveau est toujours disponible, on le sélectionne
        if (level === currentbombeLevel) {
            selectedLevel = level;
        }
    });

    // Si l'ancien niveau n'existe plus, prendre le niveau le plus bas possible
    if (!selectedLevel) {
        selectedLevel = bombeLevels.length ? parseInt(bombeLevels[0][0].split("_").pop()) : 0;
    }

    // Si aucun niveau n'est disponible, masquer le bombe 1
    if (bombeLevels.length === 0) {
        bombe8_box.style.display = "none";
        selectbombe8.style.display = "none";
        imagebombe8.style.display = "none";
        infoContainer.style.display = "none";
    } else {
        bombe8_box.style.display = "block";
        selectbombe8.style.display = "block";
        imagebombe8.style.display = "block";
        infoContainer.style.display = "block";
        selectbombe8.value = selectedLevel;
        updatebombe8Info();
    }
}

function updatebombe8Info() {
    const niveau = `bombe8_nv_${selectbombe8.value}`;
    const data = bombe8[niveau];
    const hdvNiveau = parseInt(document.getElementById("hdv").value, 10);
    const prixrestant = calculerPrixRestantbombe8(parseInt(selectbombe8.value, 10),bombe8_nv_max_hdv(hdvNiveau));
    const tempsRestant = calculerTempsRestantbombe8(parseInt(selectbombe8.value, 10), bombe8_nv_max_hdv(hdvNiveau));

    if (data) {
        imagebombe8.src = data.image;
        imagebombe8.alt = `bombe Niveau ${selectbombe8.value}`;
    }

    if (prixrestant === 0) {
        document.getElementById("bombe8_prix_niveau").innerHTML = `Prix restant : max <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }
    else {
        document.getElementById("bombe8_prix_niveau").innerHTML = `Prix restant : ${formatPrix(prixrestant)} <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }

    if (tempsRestant === 0) {
        document.getElementById("bombe8_temps_niveau").innerHTML = `Temps restant: max <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
    else{
        document.getElementById("bombe8_temps_niveau").innerHTML = `Temps restant: ${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
}
selectHdv.addEventListener("change", updatebombeOptions);
selectbombe8.addEventListener("change", updatebombe8Info);

updatebombeOptions();
