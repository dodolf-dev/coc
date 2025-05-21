import { giga_bombe } from "/coc/code/village principal/batiments/database/data piege/data giga bombe.js";
import { giga_bombe_nv_max_hdv } from "/coc/code/village principal/batiments/calculator/piege calc/giga bombe/giga bombe.calc.js";
import { calculerPrixRestantgiga_bombe } from "/coc/code/village principal/batiments/calculator/piege calc/giga bombe/giga bombe.calc.js";
import { calculerTempsRestantgiga_bombe } from "/coc/code/village principal/batiments/calculator/piege calc/giga bombe/giga bombe.calc.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";
import { formatPrix } from "/coc/code/outils/affichge nombre.js";


const giga_bombe_box = document.getElementById("giga_bombe_box");
const selectgiga_bombe = document.getElementById("giga_bombe");
const imagegiga_bombe = document.getElementById("image-giga_bombe");
const selectHdv = document.getElementById("hdv");
const infoContainer = document.createElement("div");
document.body.appendChild(infoContainer);

function updatebombeOptions() {
    const hdvLevel = parseInt(selectHdv.value);
    const currentbombeLevel = parseInt(selectgiga_bombe.value) || 0; // Récupérer l'ancien niveau

    // Filtrer les niveaux de bombe disponibles en fonction de l'HDV
    const bombeLevels = Object.entries(giga_bombe)
        .filter(([key, data]) => data.hdvrequis <= hdvLevel)
        .sort((a, b) => a[1].hdvrequis - b[1].hdvrequis);

    // Réinitialiser les options du select
    selectgiga_bombe.innerHTML = "";
    let selectedLevel = null;

    bombeLevels.forEach(([key, data]) => {
        const level = parseInt(key.split("_").pop());
        const option = document.createElement("option");
        option.value = level;
        option.textContent = `bombe 1 Niveau ${level}`;
        selectgiga_bombe.appendChild(option);

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
        giga_bombe_box.style.display = "none";
        selectgiga_bombe.style.display = "none";
        imagegiga_bombe.style.display = "none";
        infoContainer.style.display = "none";
    } else {
        giga_bombe_box.style.display = "block";
        selectgiga_bombe.style.display = "block";
        imagegiga_bombe.style.display = "block";
        infoContainer.style.display = "block";
        selectgiga_bombe.value = selectedLevel;
        updategiga_bombeInfo();
    }
}

function updategiga_bombeInfo() {
    const niveau = `giga_bombe_nv_${selectgiga_bombe.value}`;
    const data = giga_bombe[niveau];
    const hdvNiveau = parseInt(document.getElementById("hdv").value, 10);
    const prixrestant = calculerPrixRestantgiga_bombe(parseInt(selectgiga_bombe.value, 10),giga_bombe_nv_max_hdv(hdvNiveau));
    const tempsRestant = calculerTempsRestantgiga_bombe(parseInt(selectgiga_bombe.value, 10), giga_bombe_nv_max_hdv(hdvNiveau));

    if (data) {
        imagegiga_bombe.src = data.image;
        imagegiga_bombe.alt = `bombe Niveau ${selectgiga_bombe.value}`;
    }

    if (prixrestant === 0) {
        document.getElementById("giga_bombe_prix_niveau").innerHTML = `Prix restant : max <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }
    else {
        document.getElementById("giga_bombe_prix_niveau").innerHTML = `Prix restant : ${formatPrix(prixrestant)} <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }

    if (tempsRestant === 0) {
        document.getElementById("giga_bombe_temps_niveau").innerHTML = `Temps restant: max <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
    else{
        document.getElementById("giga_bombe_temps_niveau").innerHTML = `Temps restant: ${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
}
selectHdv.addEventListener("change", updatebombeOptions);
selectgiga_bombe.addEventListener("change", updategiga_bombeInfo);

updatebombeOptions();