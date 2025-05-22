import { mine_chercheuse4 } from "/coc/code/village principal/batiments/database/data piege/data mine chercheuse.js";
import { mine_chercheuse4_nv_max_hdv } from "/coc/code/village principal/batiments/calculator/piege calc/mine chercheuses/mine chercheuse4.calc.js";
import { calculerPrixRestantmine_chercheuse4 } from "/coc/code/village principal/batiments/calculator/piege calc/mine chercheuses/mine chercheuse4.calc.js";
import { calculerTempsRestantmine_chercheuse4 } from "/coc/code/village principal/batiments/calculator/piege calc/mine chercheuses/mine chercheuse4.calc.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";
import { formatPrix } from "/coc/code/outils/affichge nombre.js";


const mine_chercheuse4_box = document.getElementById("mine_chercheuse4_box");
const selectmine_chercheuse4 = document.getElementById("mine_chercheuse4");
const imagemine_chercheuse4 = document.getElementById("image-mine_chercheuse4");
const selectHdv = document.getElementById("hdv");
const infoContainer = document.createElement("div");
document.body.appendChild(infoContainer);

function updatemine_chercheuseOptions() {
    const hdvLevel = parseInt(selectHdv.value);
    const currentmine_chercheuseLevel = parseInt(selectmine_chercheuse4.value) || 0; // Récupérer l'ancien niveau

    // Filtrer les niveaux de mine_chercheuse disponibles en fonction de l'HDV
    const mine_chercheuseLevels = Object.entries(mine_chercheuse4)
        .filter(([key, data]) => data.hdvrequis <= hdvLevel)
        .sort((a, b) => a[1].hdvrequis - b[1].hdvrequis);

    // Réinitialiser les options du select
    selectmine_chercheuse4.innerHTML = "";
    let selectedLevel = null;

    mine_chercheuseLevels.forEach(([key, data]) => {
        const level = parseInt(key.split("_").pop());
        const option = document.createElement("option");
        option.value = level;
        option.textContent = `Mine chercheuse 4 Niveau ${level}`;
        selectmine_chercheuse4.appendChild(option);

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
        mine_chercheuse4_box.style.display = "none";
        selectmine_chercheuse4.style.display = "none";
        imagemine_chercheuse4.style.display = "none";
        infoContainer.style.display = "none";
    } else {
        mine_chercheuse4_box.style.display = "block";
        selectmine_chercheuse4.style.display = "block";
        imagemine_chercheuse4.style.display = "block";
        infoContainer.style.display = "block";
        selectmine_chercheuse4.value = selectedLevel;
        updatemine_chercheuse4Info();
    }
}

function updatemine_chercheuse4Info() {
    const niveau = `mine_chercheuse4_nv_${selectmine_chercheuse4.value}`;
    const data = mine_chercheuse4[niveau];
    const hdvNiveau = parseInt(document.getElementById("hdv").value, 10);
    const prixrestant = calculerPrixRestantmine_chercheuse4(parseInt(selectmine_chercheuse4.value, 10),mine_chercheuse4_nv_max_hdv(hdvNiveau));
    const tempsRestant = calculerTempsRestantmine_chercheuse4(parseInt(selectmine_chercheuse4.value, 10), mine_chercheuse4_nv_max_hdv(hdvNiveau));

    if (data) {
        imagemine_chercheuse4.src = data.image;
        imagemine_chercheuse4.alt = `mine_chercheuse Niveau ${selectmine_chercheuse4.value}`;
    }

    if (prixrestant === 0) {
        document.getElementById("mine_chercheuse4_prix_niveau").innerHTML = `Prix restant : max <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }
    else {
        document.getElementById("mine_chercheuse4_prix_niveau").innerHTML = `Prix restant : ${formatPrix(prixrestant)} <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }

    if (tempsRestant === 0) {
        document.getElementById("mine_chercheuse4_temps_niveau").innerHTML = `Temps restant: max <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
    else{
        document.getElementById("mine_chercheuse4_temps_niveau").innerHTML = `Temps restant: ${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
}
selectHdv.addEventListener("change", updatemine_chercheuseOptions);
selectmine_chercheuse4.addEventListener("change", updatemine_chercheuse4Info);

updatemine_chercheuseOptions();