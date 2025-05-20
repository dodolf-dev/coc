import { bombe5 } from "/coc/code/village principal/batiments/database/data piege/data bombe.js";
import { bombe5_nv_max_hdv } from "/coc/code/village principal/batiments/calculator/piege calc/bombes/bombe5.calc.js";
import { calculerPrixRestantbombe5 } from "/coc/code/village principal/batiments/calculator/piege calc/bombes/bombe5.calc.js";
import { calculerTempsRestantbombe5 } from "/coc/code/village principal/batiments/calculator/piege calc/bombes/bombe5.calc.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";
import { formatPrix } from "/coc/code/outils/affichge nombre.js";


const bombe5_box = document.getElementById("bombe5_box");
const selectbombe5 = document.getElementById("bombe5");
const imagebombe5 = document.getElementById("image-bombe5");
const selectHdv = document.getElementById("hdv");
const infoContainer = document.createElement("div");
document.body.appendChild(infoContainer);

function updatebombeOptions() {
    const hdvLevel = parseInt(selectHdv.value);
    const currentbombeLevel = parseInt(selectbombe5.value) || 0; // Récupérer l'ancien niveau

    // Filtrer les niveaux de bombe disponibles en fonction de l'HDV
    const bombeLevels = Object.entries(bombe5)
        .filter(([key, data]) => data.hdvrequis <= hdvLevel)
        .sort((a, b) => a[1].hdvrequis - b[1].hdvrequis);

    // Réinitialiser les options du select
    selectbombe5.innerHTML = "";
    let selectedLevel = null;

    bombeLevels.forEach(([key, data]) => {
        const level = parseInt(key.split("_").pop());
        const option = document.createElement("option");
        option.value = level;
        option.textContent = `bombe 1 Niveau ${level}`;
        selectbombe5.appendChild(option);

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
        bombe5_box.style.display = "none";
        selectbombe5.style.display = "none";
        imagebombe5.style.display = "none";
        infoContainer.style.display = "none";
    } else {
        bombe5_box.style.display = "block";
        selectbombe5.style.display = "block";
        imagebombe5.style.display = "block";
        infoContainer.style.display = "block";
        selectbombe5.value = selectedLevel;
        updatebombe5Info();
    }
}

function updatebombe5Info() {
    const niveau = `bombe5_nv_${selectbombe5.value}`;
    const data = bombe5[niveau];
    const hdvNiveau = parseInt(document.getElementById("hdv").value, 10);
    const prixrestant = calculerPrixRestantbombe5(parseInt(selectbombe5.value, 10),bombe5_nv_max_hdv(hdvNiveau));
    const tempsRestant = calculerTempsRestantbombe5(parseInt(selectbombe5.value, 10), bombe5_nv_max_hdv(hdvNiveau));

    if (data) {
        imagebombe5.src = data.image;
        imagebombe5.alt = `bombe Niveau ${selectbombe5.value}`;
    }

    if (prixrestant === 0) {
        document.getElementById("bombe5_prix_niveau").innerHTML = `Prix restant : max <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }
    else {
        document.getElementById("bombe5_prix_niveau").innerHTML = `Prix restant : ${formatPrix(prixrestant)} <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }

    if (tempsRestant === 0) {
        document.getElementById("bombe5_temps_niveau").innerHTML = `Temps restant: max <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
    else{
        document.getElementById("bombe5_temps_niveau").innerHTML = `Temps restant: ${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
}
selectHdv.addEventListener("change", updatebombeOptions);
selectbombe5.addEventListener("change", updatebombe5Info);

updatebombeOptions();
