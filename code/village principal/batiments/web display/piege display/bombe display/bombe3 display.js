import { bombe3 } from "/coc/code/village principal/batiments/database/data piege/data bombe.js";
import { bombe3_nv_max_hdv } from "/coc/code/village principal/batiments/calculator/piege calc/bombes/bombe3.calc.js";
import { calculerPrixRestantbombe3 } from "/coc/code/village principal/batiments/calculator/piege calc/bombes/bombe3.calc.js";
import { calculerTempsRestantbombe3 } from "/coc/code/village principal/batiments/calculator/piege calc/bombes/bombe3.calc.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";
import { formatPrix } from "/coc/code/outils/affichge nombre.js";


const bombe3_box = document.getElementById("bombe3_box");
const selectbombe3 = document.getElementById("bombe3");
const imagebombe3 = document.getElementById("image-bombe3");
const selectHdv = document.getElementById("hdv");
const infoContainer = document.createElement("div");
document.body.appendChild(infoContainer);

function updatebombeOptions() {
    const hdvLevel = parseInt(selectHdv.value);
    const currentbombeLevel = parseInt(selectbombe3.value) || 0; // Récupérer l'ancien niveau

    // Filtrer les niveaux de bombe disponibles en fonction de l'HDV
    const bombeLevels = Object.entries(bombe3)
        .filter(([key, data]) => data.hdvrequis <= hdvLevel)
        .sort((a, b) => a[1].hdvrequis - b[1].hdvrequis);

    // Réinitialiser les options du select
    selectbombe3.innerHTML = "";
    let selectedLevel = null;

    bombeLevels.forEach(([key, data]) => {
        const level = parseInt(key.split("_").pop());
        const option = document.createElement("option");
        option.value = level;
        option.textContent = `bombe 1 Niveau ${level}`;
        selectbombe3.appendChild(option);

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
        bombe3_box.style.display = "none";
        selectbombe3.style.display = "none";
        imagebombe3.style.display = "none";
        infoContainer.style.display = "none";
    } else {
        bombe3_box.style.display = "block";
        selectbombe3.style.display = "block";
        imagebombe3.style.display = "block";
        infoContainer.style.display = "block";
        selectbombe3.value = selectedLevel;
        updatebombe3Info();
    }
}

function updatebombe3Info() {
    const niveau = `bombe3_nv_${selectbombe3.value}`;
    const data = bombe3[niveau];
    const hdvNiveau = parseInt(document.getElementById("hdv").value, 10);
    const prixrestant = calculerPrixRestantbombe3(parseInt(selectbombe3.value, 10),bombe3_nv_max_hdv(hdvNiveau));
    const tempsRestant = calculerTempsRestantbombe3(parseInt(selectbombe3.value, 10), bombe3_nv_max_hdv(hdvNiveau));

    if (data) {
        imagebombe3.src = data.image;
        imagebombe3.alt = `bombe Niveau ${selectbombe3.value}`;
    }

    if (prixrestant === 0) {
        document.getElementById("bombe3_prix_niveau").innerHTML = `Prix restant : max <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }
    else {
        document.getElementById("bombe3_prix_niveau").innerHTML = `Prix restant : ${formatPrix(prixrestant)} <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }

    if (tempsRestant === 0) {
        document.getElementById("bombe3_temps_niveau").innerHTML = `Temps restant: max <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
    else{
        document.getElementById("bombe3_temps_niveau").innerHTML = `Temps restant: ${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
}
selectHdv.addEventListener("change", updatebombeOptions);
selectbombe3.addEventListener("change", updatebombe3Info);

updatebombeOptions();
