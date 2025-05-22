import { bombe_geante7 } from "/coc/code/village principal/batiments/database/data piege/data bombe geante.js";
import { bombe_geante7_nv_max_hdv } from "/coc/code/village principal/batiments/calculator/piege calc/bombe geantes/bombe geante7.calc.js";
import { calculerPrixRestantbombe_geante7 } from "/coc/code/village principal/batiments/calculator/piege calc/bombe geantes/bombe geante7.calc.js";
import { calculerTempsRestantbombe_geante7 } from "/coc/code/village principal/batiments/calculator/piege calc/bombe geantes/bombe geante7.calc.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";
import { formatPrix } from "/coc/code/outils/affichge nombre.js";


const bombe_geante7_box = document.getElementById("bombe_geante7_box");
const selectbombe_geante7 = document.getElementById("bombe_geante7");
const imagebombe_geante7 = document.getElementById("image-bombe_geante7");
const selectHdv = document.getElementById("hdv");
const infoContainer = document.createElement("div");
document.body.appendChild(infoContainer);

function updatebombe_geanteOptions() {
    const hdvLevel = parseInt(selectHdv.value);
    const currentbombe_geanteLevel = parseInt(selectbombe_geante7.value) || 0; // Récupérer l'ancien niveau

    // Filtrer les niveaux de bombe_geante disponibles en fonction de l'HDV
    const bombe_geanteLevels = Object.entries(bombe_geante7)
        .filter(([key, data]) => data.hdvrequis <= hdvLevel)
        .sort((a, b) => a[1].hdvrequis - b[1].hdvrequis);

    // Réinitialiser les options du select
    selectbombe_geante7.innerHTML = "";
    let selectedLevel = null;

    bombe_geanteLevels.forEach(([key, data]) => {
        const level = parseInt(key.split("_").pop());
        const option = document.createElement("option");
        option.value = level;
        option.textContent = `Bombe géante 7 Niveau ${level}`;
        selectbombe_geante7.appendChild(option);

        // Si l'ancien niveau est toujours disponible, on le sélectionne
        if (level === currentbombe_geanteLevel) {
            selectedLevel = level;
        }
    });

    // Si l'ancien niveau n'existe plus, prendre le niveau le plus bas possible
    if (!selectedLevel) {
        selectedLevel = bombe_geanteLevels.length ? parseInt(bombe_geanteLevels[0][0].split("_").pop()) : 0;
    }

    // Si aucun niveau n'est disponible, masquer le bombe_geante 1
    if (bombe_geanteLevels.length === 0) {
        bombe_geante7_box.style.display = "none";
        selectbombe_geante7.style.display = "none";
        imagebombe_geante7.style.display = "none";
        infoContainer.style.display = "none";
    } else {
        bombe_geante7_box.style.display = "block";
        selectbombe_geante7.style.display = "block";
        imagebombe_geante7.style.display = "block";
        infoContainer.style.display = "block";
        selectbombe_geante7.value = selectedLevel;
        updatebombe_geante7Info();
    }
}

function updatebombe_geante7Info() {
    const niveau = `bombe_geante7_nv_${selectbombe_geante7.value}`;
    const data = bombe_geante7[niveau];
    const hdvNiveau = parseInt(document.getElementById("hdv").value, 10);
    const prixrestant = calculerPrixRestantbombe_geante7(parseInt(selectbombe_geante7.value, 10),bombe_geante7_nv_max_hdv(hdvNiveau));
    const tempsRestant = calculerTempsRestantbombe_geante7(parseInt(selectbombe_geante7.value, 10), bombe_geante7_nv_max_hdv(hdvNiveau));

    if (data) {
        imagebombe_geante7.src = data.image;
        imagebombe_geante7.alt = `bombe_geante Niveau ${selectbombe_geante7.value}`;
    }

    if (prixrestant === 0) {
        document.getElementById("bombe_geante7_prix_niveau").innerHTML = `Prix restant : max <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }
    else {
        document.getElementById("bombe_geante7_prix_niveau").innerHTML = `Prix restant : ${formatPrix(prixrestant)} <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }

    if (tempsRestant === 0) {
        document.getElementById("bombe_geante7_temps_niveau").innerHTML = `Temps restant: max <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
    else{
        document.getElementById("bombe_geante7_temps_niveau").innerHTML = `Temps restant: ${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
}
selectHdv.addEventListener("change", updatebombe_geanteOptions);
selectbombe_geante7.addEventListener("change", updatebombe_geante7Info);

updatebombe_geanteOptions();