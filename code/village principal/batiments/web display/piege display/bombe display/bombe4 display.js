import { bombe4 } from "/coc/code/village principal/batiments/database/data piege/data bombe.js";
import { bombe4_nv_max_hdv } from "/coc/code/village principal/batiments/calculator/piege calc/bombes/bombe4.calc.js";
import { calculerPrixRestantbombe4 } from "/coc/code/village principal/batiments/calculator/piege calc/bombes/bombe4.calc.js";
import { calculerTempsRestantbombe4 } from "/coc/code/village principal/batiments/calculator/piege calc/bombes/bombe4.calc.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";
import { formatPrix } from "/coc/code/outils/affichge nombre.js";


const bombe4_box = document.getElementById("bombe4_box");
const selectbombe4 = document.getElementById("bombe4");
const imagebombe4 = document.getElementById("image-bombe4");
const selectHdv = document.getElementById("hdv");
const infoContainer = document.createElement("div");
document.body.appendChild(infoContainer);

function updatebombeOptions() {
    const hdvLevel = parseInt(selectHdv.value);
    const currentbombeLevel = parseInt(selectbombe4.value) || 0; // Récupérer l'ancien niveau

    // Filtrer les niveaux de bombe disponibles en fonction de l'HDV
    const bombeLevels = Object.entries(bombe4)
        .filter(([key, data]) => data.hdvrequis <= hdvLevel)
        .sort((a, b) => a[1].hdvrequis - b[1].hdvrequis);

    // Réinitialiser les options du select
    selectbombe4.innerHTML = "";
    let selectedLevel = null;

    bombeLevels.forEach(([key, data]) => {
        const level = parseInt(key.split("_").pop());
        const option = document.createElement("option");
        option.value = level;
        option.textContent = `bombe 1 Niveau ${level}`;
        selectbombe4.appendChild(option);

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
        bombe4_box.style.display = "none";
        selectbombe4.style.display = "none";
        imagebombe4.style.display = "none";
        infoContainer.style.display = "none";
    } else {
        bombe4_box.style.display = "block";
        selectbombe4.style.display = "block";
        imagebombe4.style.display = "block";
        infoContainer.style.display = "block";
        selectbombe4.value = selectedLevel;
        updatebombe4Info();
    }
}

function updatebombe4Info() {
    const niveau = `bombe4_nv_${selectbombe4.value}`;
    const data = bombe4[niveau];
    const hdvNiveau = parseInt(document.getElementById("hdv").value, 10);
    const prixrestant = calculerPrixRestantbombe4(parseInt(selectbombe4.value, 10),bombe4_nv_max_hdv(hdvNiveau));
    const tempsRestant = calculerTempsRestantbombe4(parseInt(selectbombe4.value, 10), bombe4_nv_max_hdv(hdvNiveau));

    if (data) {
        imagebombe4.src = data.image;
        imagebombe4.alt = `bombe Niveau ${selectbombe4.value}`;
    }

    if (prixrestant === 0) {
        document.getElementById("bombe4_prix_niveau").innerHTML = `Prix restant : max <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }
    else {
        document.getElementById("bombe4_prix_niveau").innerHTML = `Prix restant : ${formatPrix(prixrestant)} <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }

    if (tempsRestant === 0) {
        document.getElementById("bombe4_temps_niveau").innerHTML = `Temps restant: max <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
    else{
        document.getElementById("bombe4_temps_niveau").innerHTML = `Temps restant: ${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
}
selectHdv.addEventListener("change", updatebombeOptions);
selectbombe4.addEventListener("change", updatebombe4Info);

updatebombeOptions();
