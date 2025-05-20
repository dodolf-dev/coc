import { bombe6 } from "/coc/code/village principal/batiments/database/data piege/data bombe.js";
import { bombe6_nv_max_hdv } from "/coc/code/village principal/batiments/calculator/piege calc/bombes/bombe6.calc.js";
import { calculerPrixRestantbombe6 } from "/coc/code/village principal/batiments/calculator/piege calc/bombes/bombe6.calc.js";
import { calculerTempsRestantbombe6 } from "/coc/code/village principal/batiments/calculator/piege calc/bombes/bombe6.calc.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";
import { formatPrix } from "/coc/code/outils/affichge nombre.js";


const bombe6_box = document.getElementById("bombe6_box");
const selectbombe6 = document.getElementById("bombe6");
const imagebombe6 = document.getElementById("image-bombe6");
const selectHdv = document.getElementById("hdv");
const infoContainer = document.createElement("div");
document.body.appendChild(infoContainer);

function updatebombeOptions() {
    const hdvLevel = parseInt(selectHdv.value);
    const currentbombeLevel = parseInt(selectbombe6.value) || 0; // Récupérer l'ancien niveau

    // Filtrer les niveaux de bombe disponibles en fonction de l'HDV
    const bombeLevels = Object.entries(bombe6)
        .filter(([key, data]) => data.hdvrequis <= hdvLevel)
        .sort((a, b) => a[1].hdvrequis - b[1].hdvrequis);

    // Réinitialiser les options du select
    selectbombe6.innerHTML = "";
    let selectedLevel = null;

    bombeLevels.forEach(([key, data]) => {
        const level = parseInt(key.split("_").pop());
        const option = document.createElement("option");
        option.value = level;
        option.textContent = `bombe 1 Niveau ${level}`;
        selectbombe6.appendChild(option);

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
        bombe6_box.style.display = "none";
        selectbombe6.style.display = "none";
        imagebombe6.style.display = "none";
        infoContainer.style.display = "none";
    } else {
        bombe6_box.style.display = "block";
        selectbombe6.style.display = "block";
        imagebombe6.style.display = "block";
        infoContainer.style.display = "block";
        selectbombe6.value = selectedLevel;
        updatebombe6Info();
    }
}

function updatebombe6Info() {
    const niveau = `bombe6_nv_${selectbombe6.value}`;
    const data = bombe6[niveau];
    const hdvNiveau = parseInt(document.getElementById("hdv").value, 10);
    const prixrestant = calculerPrixRestantbombe6(parseInt(selectbombe6.value, 10),bombe6_nv_max_hdv(hdvNiveau));
    const tempsRestant = calculerTempsRestantbombe6(parseInt(selectbombe6.value, 10), bombe6_nv_max_hdv(hdvNiveau));

    if (data) {
        imagebombe6.src = data.image;
        imagebombe6.alt = `bombe Niveau ${selectbombe6.value}`;
    }

    if (prixrestant === 0) {
        document.getElementById("bombe6_prix_niveau").innerHTML = `Prix restant : max <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }
    else {
        document.getElementById("bombe6_prix_niveau").innerHTML = `Prix restant : ${formatPrix(prixrestant)} <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }

    if (tempsRestant === 0) {
        document.getElementById("bombe6_temps_niveau").innerHTML = `Temps restant: max <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
    else{
        document.getElementById("bombe6_temps_niveau").innerHTML = `Temps restant: ${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
}
selectHdv.addEventListener("change", updatebombeOptions);
selectbombe6.addEventListener("change", updatebombe6Info);

updatebombeOptions();
