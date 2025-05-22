import { mine_chercheuse3 } from "/coc/code/village principal/batiments/database/data piege/data mine chercheuse.js";
import { mine_chercheuse3_nv_max_hdv } from "/coc/code/village principal/batiments/calculator/piege calc/mine chercheuses/mine chercheuse3.calc.js";
import { calculerPrixRestantmine_chercheuse3 } from "/coc/code/village principal/batiments/calculator/piege calc/mine chercheuses/mine chercheuse3.calc.js";
import { calculerTempsRestantmine_chercheuse3 } from "/coc/code/village principal/batiments/calculator/piege calc/mine chercheuses/mine chercheuse3.calc.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";
import { formatPrix } from "/coc/code/outils/affichge nombre.js";


const mine_chercheuse3_box = document.getElementById("mine_chercheuse3_box");
const selectmine_chercheuse3 = document.getElementById("mine_chercheuse3");
const imagemine_chercheuse3 = document.getElementById("image-mine_chercheuse3");
const selectHdv = document.getElementById("hdv");
const infoContainer = document.createElement("div");
document.body.appendChild(infoContainer);

function updatemine_chercheuseOptions() {
    const hdvLevel = parseInt(selectHdv.value);
    const currentmine_chercheuseLevel = parseInt(selectmine_chercheuse3.value) || 0; // Récupérer l'ancien niveau

    // Filtrer les niveaux de mine_chercheuse disponibles en fonction de l'HDV
    const mine_chercheuseLevels = Object.entries(mine_chercheuse3)
        .filter(([key, data]) => data.hdvrequis <= hdvLevel)
        .sort((a, b) => a[1].hdvrequis - b[1].hdvrequis);

    // Réinitialiser les options du select
    selectmine_chercheuse3.innerHTML = "";
    let selectedLevel = null;

    mine_chercheuseLevels.forEach(([key, data]) => {
        const level = parseInt(key.split("_").pop());
        const option = document.createElement("option");
        option.value = level;
        option.textContent = `Mine chercheuse 3 Niveau ${level}`;
        selectmine_chercheuse3.appendChild(option);

        // Si l'ancien niveau est toujours disponible, on le sélectionne
        if (level === currentmine_chercheuseLevel) {
            selectedLevel = level;
        }
    });

    // Si l'ancien niveau n'existe plus, prendre le niveau le plus bas possible
    if (!selectedLevel) {
        selectedLevel = mine_chercheuseLevels.length ? parseInt(mine_chercheuseLevels[0][0].split("_").pop()) : 0;
    }

    // Si aucun niveau n'est disponible, masquer le mine_chercheuse 1
    if (mine_chercheuseLevels.length === 0) {
        mine_chercheuse3_box.style.display = "none";
        selectmine_chercheuse3.style.display = "none";
        imagemine_chercheuse3.style.display = "none";
        infoContainer.style.display = "none";
    } else {
        mine_chercheuse3_box.style.display = "block";
        selectmine_chercheuse3.style.display = "block";
        imagemine_chercheuse3.style.display = "block";
        infoContainer.style.display = "block";
        selectmine_chercheuse3.value = selectedLevel;
        updatemine_chercheuse3Info();
    }
}

function updatemine_chercheuse3Info() {
    const niveau = `mine_chercheuse3_nv_${selectmine_chercheuse3.value}`;
    const data = mine_chercheuse3[niveau];
    const hdvNiveau = parseInt(document.getElementById("hdv").value, 10);
    const prixrestant = calculerPrixRestantmine_chercheuse3(parseInt(selectmine_chercheuse3.value, 10),mine_chercheuse3_nv_max_hdv(hdvNiveau));
    const tempsRestant = calculerTempsRestantmine_chercheuse3(parseInt(selectmine_chercheuse3.value, 10), mine_chercheuse3_nv_max_hdv(hdvNiveau));

    if (data) {
        imagemine_chercheuse3.src = data.image;
        imagemine_chercheuse3.alt = `mine_chercheuse Niveau ${selectmine_chercheuse3.value}`;
    }

    if (prixrestant === 0) {
        document.getElementById("mine_chercheuse3_prix_niveau").innerHTML = `Prix restant : max <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }
    else {
        document.getElementById("mine_chercheuse3_prix_niveau").innerHTML = `Prix restant : ${formatPrix(prixrestant)} <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }

    if (tempsRestant === 0) {
        document.getElementById("mine_chercheuse3_temps_niveau").innerHTML = `Temps restant: max <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
    else{
        document.getElementById("mine_chercheuse3_temps_niveau").innerHTML = `Temps restant: ${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
}
selectHdv.addEventListener("change", updatemine_chercheuseOptions);
selectmine_chercheuse3.addEventListener("change", updatemine_chercheuse3Info);

updatemine_chercheuseOptions();