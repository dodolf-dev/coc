import { mine_chercheuse6 } from "/coc/code/village principal/batiments/database/data piege/data mine chercheuse.js";
import { mine_chercheuse6_nv_max_hdv } from "/coc/code/village principal/batiments/calculator/piege calc/mine chercheuses/mine chercheuse6.calc.js";
import { calculerPrixRestantmine_chercheuse6 } from "/coc/code/village principal/batiments/calculator/piege calc/mine chercheuses/mine chercheuse6.calc.js";
import { calculerTempsRestantmine_chercheuse6 } from "/coc/code/village principal/batiments/calculator/piege calc/mine chercheuses/mine chercheuse6.calc.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";
import { formatPrix } from "/coc/code/outils/affichge nombre.js";


const mine_chercheuse6_box = document.getElementById("mine_chercheuse6_box");
const selectmine_chercheuse6 = document.getElementById("mine_chercheuse6");
const imagemine_chercheuse6 = document.getElementById("image-mine_chercheuse6");
const selectHdv = document.getElementById("hdv");
const infoContainer = document.createElement("div");
document.body.appendChild(infoContainer);

function updatemine_chercheuseOptions() {
    const hdvLevel = parseInt(selectHdv.value);
    const currentmine_chercheuseLevel = parseInt(selectmine_chercheuse6.value) || 0; // Récupérer l'ancien niveau

    // Filtrer les niveaux de mine_chercheuse disponibles en fonction de l'HDV
    const mine_chercheuseLevels = Object.entries(mine_chercheuse6)
        .filter(([key, data]) => data.hdvrequis <= hdvLevel)
        .sort((a, b) => a[1].hdvrequis - b[1].hdvrequis);

    // Réinitialiser les options du select
    selectmine_chercheuse6.innerHTML = "";
    let selectedLevel = null;

    mine_chercheuseLevels.forEach(([key, data]) => {
        const level = parseInt(key.split("_").pop());
        const option = document.createElement("option");
        option.value = level;
        option.textContent = `mine_chercheuse 1 Niveau ${level}`;
        selectmine_chercheuse6.appendChild(option);

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
        mine_chercheuse6_box.style.display = "none";
        selectmine_chercheuse6.style.display = "none";
        imagemine_chercheuse6.style.display = "none";
        infoContainer.style.display = "none";
    } else {
        mine_chercheuse6_box.style.display = "block";
        selectmine_chercheuse6.style.display = "block";
        imagemine_chercheuse6.style.display = "block";
        infoContainer.style.display = "block";
        selectmine_chercheuse6.value = selectedLevel;
        updatemine_chercheuse6Info();
    }
}

function updatemine_chercheuse6Info() {
    const niveau = `mine_chercheuse6_nv_${selectmine_chercheuse6.value}`;
    const data = mine_chercheuse6[niveau];
    const hdvNiveau = parseInt(document.getElementById("hdv").value, 10);
    const prixrestant = calculerPrixRestantmine_chercheuse6(parseInt(selectmine_chercheuse6.value, 10),mine_chercheuse6_nv_max_hdv(hdvNiveau));
    const tempsRestant = calculerTempsRestantmine_chercheuse6(parseInt(selectmine_chercheuse6.value, 10), mine_chercheuse6_nv_max_hdv(hdvNiveau));

    if (data) {
        imagemine_chercheuse6.src = data.image;
        imagemine_chercheuse6.alt = `mine_chercheuse Niveau ${selectmine_chercheuse6.value}`;
    }

    if (prixrestant === 0) {
        document.getElementById("mine_chercheuse6_prix_niveau").innerHTML = `Prix restant : max <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }
    else {
        document.getElementById("mine_chercheuse6_prix_niveau").innerHTML = `Prix restant : ${formatPrix(prixrestant)} <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }

    if (tempsRestant === 0) {
        document.getElementById("mine_chercheuse6_temps_niveau").innerHTML = `Temps restant: max <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
    else{
        document.getElementById("mine_chercheuse6_temps_niveau").innerHTML = `Temps restant: ${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
}
selectHdv.addEventListener("change", updatemine_chercheuseOptions);
selectmine_chercheuse6.addEventListener("change", updatemine_chercheuse6Info);

updatemine_chercheuseOptions();