import { bombe2 } from "/coc/code/village principal/batiments/database/data piege/data bombe.js";
import { bombe2_nv_max_hdv } from "/coc/code/village principal/batiments/calculator/piege calc/bombes/bombe2.calc.js";
import { calculerPrixRestantbombe2 } from "/coc/code/village principal/batiments/calculator/piege calc/bombes/bombe2.calc.js";
import { calculerTempsRestantbombe2 } from "/coc/code/village principal/batiments/calculator/piege calc/bombes/bombe2.calc.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";
import { formatPrix } from "/coc/code/outils/affichge nombre.js";


const bombe2_box = document.getElementById("bombe2_box");
const selectbombe2 = document.getElementById("bombe2");
const imagebombe2 = document.getElementById("image-bombe2");
const selectHdv = document.getElementById("hdv");
const infoContainer = document.createElement("div");
document.body.appendChild(infoContainer);

function updatebombeOptions() {
    const hdvLevel = parseInt(selectHdv.value);
    const currentbombeLevel = parseInt(selectbombe2.value) || 0; // Récupérer l'ancien niveau

    // Filtrer les niveaux de bombe disponibles en fonction de l'HDV
    const bombeLevels = Object.entries(bombe2)
        .filter(([key, data]) => data.hdvrequis <= hdvLevel)
        .sort((a, b) => a[1].hdvrequis - b[1].hdvrequis);

    // Réinitialiser les options du select
    selectbombe2.innerHTML = "";
    let selectedLevel = null;

    bombeLevels.forEach(([key, data]) => {
        const level = parseInt(key.split("_").pop());
        const option = document.createElement("option");
        option.value = level;
        option.textContent = `bombe 2 Niveau ${level}`;
        selectbombe2.appendChild(option);

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
        bombe2_box.style.display = "none";
        selectbombe2.style.display = "none";
        imagebombe2.style.display = "none";
        infoContainer.style.display = "none";
    } else {
        bombe2_box.style.display = "block";
        selectbombe2.style.display = "block";
        imagebombe2.style.display = "block";
        infoContainer.style.display = "block";
        selectbombe2.value = selectedLevel;
        updatebombe2Info();
    }
}

function updatebombe2Info() {
    const niveau = `bombe2_nv_${selectbombe2.value}`;
    const data = bombe2[niveau];
    const hdvNiveau = parseInt(document.getElementById("hdv").value, 10);
    const prixrestant = calculerPrixRestantbombe2(parseInt(selectbombe2.value, 10),bombe2_nv_max_hdv(hdvNiveau));
    const tempsRestant = calculerTempsRestantbombe2(parseInt(selectbombe2.value, 10), bombe2_nv_max_hdv(hdvNiveau));

    if (data) {
        imagebombe2.src = data.image;
        imagebombe2.alt = `bombe Niveau ${selectbombe2.value}`;
    }

    if (prixrestant === 0) {
        document.getElementById("bombe2_prix_niveau").innerHTML = `Prix restant : max <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }
    else {
        document.getElementById("bombe2_prix_niveau").innerHTML = `Prix restant : ${formatPrix(prixrestant)} <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }

    if (tempsRestant === 0) {
        document.getElementById("bombe2_temps_niveau").innerHTML = `Temps restant: max <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
    else{
        document.getElementById("bombe2_temps_niveau").innerHTML = `Temps restant: ${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
}
selectHdv.addEventListener("change", updatebombeOptions);
selectbombe2.addEventListener("change", updatebombe2Info);

updatebombeOptions();
