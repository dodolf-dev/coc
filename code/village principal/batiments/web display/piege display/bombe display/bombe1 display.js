import { bombe1 } from "/coc/code/village principal/batiments/database/data piege/data bombe.js";
import { bombe1_nv_max_hdv } from "/coc/code/village principal/batiments/calculator/piege calc/bombes/bombe1.calc.js";
import { calculerPrixRestantbombe1 } from "/coc/code/village principal/batiments/calculator/piege calc/bombes/bombe1.calc.js";
import { calculerTempsRestantbombe1 } from "/coc/code/village principal/batiments/calculator/piege calc/bombes/bombe1.calc.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";
import { formatPrix } from "/coc/code/outils/affichge nombre.js";


const bombe1_box = document.getElementById("bombe1_box");
const selectbombe1 = document.getElementById("bombe1");
const imagebombe1 = document.getElementById("image-bombe1");
const selectHdv = document.getElementById("hdv");
const infoContainer = document.createElement("div");
document.body.appendChild(infoContainer);

function updatebombeOptions() {
    const hdvLevel = parseInt(selectHdv.value);
    const currentbombeLevel = parseInt(selectbombe1.value) || 0; // Récupérer l'ancien niveau

    // Filtrer les niveaux de bombe disponibles en fonction de l'HDV
    const bombeLevels = Object.entries(bombe1)
        .filter(([key, data]) => data.hdvrequis <= hdvLevel)
        .sort((a, b) => a[1].hdvrequis - b[1].hdvrequis);

    // Réinitialiser les options du select
    selectbombe1.innerHTML = "";
    let selectedLevel = null;

    bombeLevels.forEach(([key, data]) => {
        const level = parseInt(key.split("_").pop());
        const option = document.createElement("option");
        option.value = level;
        option.textContent = `bombe 1 Niveau ${level}`;
        selectbombe1.appendChild(option);

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
        bombe1_box.style.display = "none";
        selectbombe1.style.display = "none";
        imagebombe1.style.display = "none";
        infoContainer.style.display = "none";
    } else {
        bombe1_box.style.display = "block";
        selectbombe1.style.display = "block";
        imagebombe1.style.display = "block";
        infoContainer.style.display = "block";
        selectbombe1.value = selectedLevel;
        updatebombe1Info();
    }
}

function updatebombe1Info() {
    const niveau = `bombe1_nv_${selectbombe1.value}`;
    const data = bombe1[niveau];
    const hdvNiveau = parseInt(document.getElementById("hdv").value, 10);
    const prixrestant = calculerPrixRestantbombe1(parseInt(selectbombe1.value, 10),bombe1_nv_max_hdv(hdvNiveau));
    const tempsRestant = calculerTempsRestantbombe1(parseInt(selectbombe1.value, 10), bombe1_nv_max_hdv(hdvNiveau));

    if (data) {
        imagebombe1.src = data.image;
        imagebombe1.alt = `bombe Niveau ${selectbombe1.value}`;
    }

    if (prixrestant === 0) {
        document.getElementById("bombe1_prix_niveau").innerHTML = `Prix restant : max <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }
    else {
        document.getElementById("bombe1_prix_niveau").innerHTML = `Prix restant : ${formatPrix(prixrestant)} <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }

    if (tempsRestant === 0) {
        document.getElementById("bombe1_temps_niveau").innerHTML = `Temps restant: max <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
    else{
        document.getElementById("bombe1_temps_niveau").innerHTML = `Temps restant: ${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
}
selectHdv.addEventListener("change", updatebombeOptions);
selectbombe1.addEventListener("change", updatebombe1Info);

updatebombeOptions();
