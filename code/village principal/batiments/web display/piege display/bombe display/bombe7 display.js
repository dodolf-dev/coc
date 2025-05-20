import { bombe7 } from "/coc/code/village principal/batiments/database/data piege/data bombe.js";
import { bombe7_nv_max_hdv } from "/coc/code/village principal/batiments/calculator/piege calc/bombes/bombe7.calc.js";
import { calculerPrixRestantbombe7 } from "/coc/code/village principal/batiments/calculator/piege calc/bombes/bombe7.calc.js";
import { calculerTempsRestantbombe7 } from "/coc/code/village principal/batiments/calculator/piege calc/bombes/bombe7.calc.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";
import { formatPrix } from "/coc/code/outils/affichge nombre.js";


const bombe7_box = document.getElementById("bombe7_box");
const selectbombe7 = document.getElementById("bombe7");
const imagebombe7 = document.getElementById("image-bombe7");
const selectHdv = document.getElementById("hdv");
const infoContainer = document.createElement("div");
document.body.appendChild(infoContainer);

function updatebombeOptions() {
    const hdvLevel = parseInt(selectHdv.value);
    const currentbombeLevel = parseInt(selectbombe7.value) || 0; // Récupérer l'ancien niveau

    // Filtrer les niveaux de bombe disponibles en fonction de l'HDV
    const bombeLevels = Object.entries(bombe7)
        .filter(([key, data]) => data.hdvrequis <= hdvLevel)
        .sort((a, b) => a[1].hdvrequis - b[1].hdvrequis);

    // Réinitialiser les options du select
    selectbombe7.innerHTML = "";
    let selectedLevel = null;

    bombeLevels.forEach(([key, data]) => {
        const level = parseInt(key.split("_").pop());
        const option = document.createElement("option");
        option.value = level;
        option.textContent = `bombe 1 Niveau ${level}`;
        selectbombe7.appendChild(option);

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
        bombe7_box.style.display = "none";
        selectbombe7.style.display = "none";
        imagebombe7.style.display = "none";
        infoContainer.style.display = "none";
    } else {
        bombe7_box.style.display = "block";
        selectbombe7.style.display = "block";
        imagebombe7.style.display = "block";
        infoContainer.style.display = "block";
        selectbombe7.value = selectedLevel;
        updatebombe7Info();
    }
}

function updatebombe7Info() {
    const niveau = `bombe7_nv_${selectbombe7.value}`;
    const data = bombe7[niveau];
    const hdvNiveau = parseInt(document.getElementById("hdv").value, 10);
    const prixrestant = calculerPrixRestantbombe7(parseInt(selectbombe7.value, 10),bombe7_nv_max_hdv(hdvNiveau));
    const tempsRestant = calculerTempsRestantbombe7(parseInt(selectbombe7.value, 10), bombe7_nv_max_hdv(hdvNiveau));

    if (data) {
        imagebombe7.src = data.image;
        imagebombe7.alt = `bombe Niveau ${selectbombe7.value}`;
    }

    if (prixrestant === 0) {
        document.getElementById("bombe7_prix_niveau").innerHTML = `Prix restant : max <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }
    else {
        document.getElementById("bombe7_prix_niveau").innerHTML = `Prix restant : ${formatPrix(prixrestant)} <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }

    if (tempsRestant === 0) {
        document.getElementById("bombe7_temps_niveau").innerHTML = `Temps restant: max <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
    else{
        document.getElementById("bombe7_temps_niveau").innerHTML = `Temps restant: ${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
}
selectHdv.addEventListener("change", updatebombeOptions);
selectbombe7.addEventListener("change", updatebombe7Info);

updatebombeOptions();
