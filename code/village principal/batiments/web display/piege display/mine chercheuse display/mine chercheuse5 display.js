import { mine_chercheuse5 } from "/coc/code/village principal/batiments/database/data piege/data mine chercheuse.js";
import { mine_chercheuse5_nv_max_hdv } from "/coc/code/village principal/batiments/calculator/piege calc/mine chercheuses/mine chercheuse5.calc.js";
import { calculerPrixRestantmine_chercheuse5 } from "/coc/code/village principal/batiments/calculator/piege calc/mine chercheuses/mine chercheuse5.calc.js";
import { calculerTempsRestantmine_chercheuse5 } from "/coc/code/village principal/batiments/calculator/piege calc/mine chercheuses/mine chercheuse5.calc.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";
import { formatPrix } from "/coc/code/outils/affichge nombre.js";


const mine_chercheuse5_box = document.getElementById("mine_chercheuse5_box");
const selectmine_chercheuse5 = document.getElementById("mine_chercheuse5");
const imagemine_chercheuse5 = document.getElementById("image-mine_chercheuse5");
const selectHdv = document.getElementById("hdv");
const infoContainer = document.createElement("div");
document.body.appendChild(infoContainer);

function updatemine_chercheuseOptions() {
    const hdvLevel = parseInt(selectHdv.value);
    const currentmine_chercheuseLevel = parseInt(selectmine_chercheuse5.value) || 0; // Récupérer l'ancien niveau

    // Filtrer les niveaux de mine_chercheuse disponibles en fonction de l'HDV
    const mine_chercheuseLevels = Object.entries(mine_chercheuse5)
        .filter(([key, data]) => data.hdvrequis <= hdvLevel)
        .sort((a, b) => a[1].hdvrequis - b[1].hdvrequis);

    // Réinitialiser les options du select
    selectmine_chercheuse5.innerHTML = "";
    let selectedLevel = null;

    mine_chercheuseLevels.forEach(([key, data]) => {
        const level = parseInt(key.split("_").pop());
        const option = document.createElement("option");
        option.value = level;
        option.textContent = `Mine chercheuse 5 Niveau ${level}`;
        selectmine_chercheuse5.appendChild(option);

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
        mine_chercheuse5_box.style.display = "none";
        selectmine_chercheuse5.style.display = "none";
        imagemine_chercheuse5.style.display = "none";
        infoContainer.style.display = "none";
    } else {
        mine_chercheuse5_box.style.display = "block";
        selectmine_chercheuse5.style.display = "block";
        imagemine_chercheuse5.style.display = "block";
        infoContainer.style.display = "block";
        selectmine_chercheuse5.value = selectedLevel;
        updatemine_chercheuse5Info();
    }
}

function updatemine_chercheuse5Info() {
    const niveau = `mine_chercheuse5_nv_${selectmine_chercheuse5.value}`;
    const data = mine_chercheuse5[niveau];
    const hdvNiveau = parseInt(document.getElementById("hdv").value, 10);
    const prixrestant = calculerPrixRestantmine_chercheuse5(parseInt(selectmine_chercheuse5.value, 10),mine_chercheuse5_nv_max_hdv(hdvNiveau));
    const tempsRestant = calculerTempsRestantmine_chercheuse5(parseInt(selectmine_chercheuse5.value, 10), mine_chercheuse5_nv_max_hdv(hdvNiveau));

    if (data) {
        imagemine_chercheuse5.src = data.image;
        imagemine_chercheuse5.alt = `mine_chercheuse Niveau ${selectmine_chercheuse5.value}`;
    }

    if (prixrestant === 0) {
        document.getElementById("mine_chercheuse5_prix_niveau").innerHTML = `Prix restant : max <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }
    else {
        document.getElementById("mine_chercheuse5_prix_niveau").innerHTML = `Prix restant : ${formatPrix(prixrestant)} <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }

    if (tempsRestant === 0) {
        document.getElementById("mine_chercheuse5_temps_niveau").innerHTML = `Temps restant: max <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
    else{
        document.getElementById("mine_chercheuse5_temps_niveau").innerHTML = `Temps restant: ${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
}
selectHdv.addEventListener("change", updatemine_chercheuseOptions);
selectmine_chercheuse5.addEventListener("change", updatemine_chercheuse5Info);

updatemine_chercheuseOptions();