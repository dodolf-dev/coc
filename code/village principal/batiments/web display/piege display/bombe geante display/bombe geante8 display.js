import { bombe_geante8 } from "/coc/code/village principal/batiments/database/data piege/data bombe geante.js";
import { bombe_geante8_nv_max_hdv } from "/coc/code/village principal/batiments/calculator/piege calc/bombe geantes/bombe geante8.calc.js";
import { calculerPrixRestantbombe_geante8 } from "/coc/code/village principal/batiments/calculator/piege calc/bombe geantes/bombe geante8.calc.js";
import { calculerTempsRestantbombe_geante8 } from "/coc/code/village principal/batiments/calculator/piege calc/bombe geantes/bombe geante8.calc.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";
import { formatPrix } from "/coc/code/outils/affichge nombre.js";


const bombe_geante8_box = document.getElementById("bombe_geante8_box");
const selectbombe_geante8 = document.getElementById("bombe_geante8");
const imagebombe_geante8 = document.getElementById("image-bombe_geante8");
const selectHdv = document.getElementById("hdv");
const infoContainer = document.createElement("div");
document.body.appendChild(infoContainer);

function updatebombe_geanteOptions() {
    const hdvLevel = parseInt(selectHdv.value);
    const currentbombe_geanteLevel = parseInt(selectbombe_geante8.value) || 0; // Récupérer l'ancien niveau

    // Filtrer les niveaux de bombe_geante disponibles en fonction de l'HDV
    const bombe_geanteLevels = Object.entries(bombe_geante8)
        .filter(([key, data]) => data.hdvrequis <= hdvLevel)
        .sort((a, b) => a[1].hdvrequis - b[1].hdvrequis);

    // Réinitialiser les options du select
    selectbombe_geante8.innerHTML = "";
    let selectedLevel = null;

    bombe_geanteLevels.forEach(([key, data]) => {
        const level = parseInt(key.split("_").pop());
        const option = document.createElement("option");
        option.value = level;
        option.textContent = `Bombe géante 8 Niveau ${level}`;
        selectbombe_geante8.appendChild(option);

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
        bombe_geante8_box.style.display = "none";
        selectbombe_geante8.style.display = "none";
        imagebombe_geante8.style.display = "none";
        infoContainer.style.display = "none";
    } else {
        bombe_geante8_box.style.display = "block";
        selectbombe_geante8.style.display = "block";
        imagebombe_geante8.style.display = "block";
        infoContainer.style.display = "block";
        selectbombe_geante8.value = selectedLevel;
        updatebombe_geante8Info();
    }
}

function updatebombe_geante8Info() {
    const niveau = `bombe_geante8_nv_${selectbombe_geante8.value}`;
    const data = bombe_geante8[niveau];
    const hdvNiveau = parseInt(document.getElementById("hdv").value, 10);
    const prixrestant = calculerPrixRestantbombe_geante8(parseInt(selectbombe_geante8.value, 10),bombe_geante8_nv_max_hdv(hdvNiveau));
    const tempsRestant = calculerTempsRestantbombe_geante8(parseInt(selectbombe_geante8.value, 10), bombe_geante8_nv_max_hdv(hdvNiveau));

    if (data) {
        imagebombe_geante8.src = data.image;
        imagebombe_geante8.alt = `bombe_geante Niveau ${selectbombe_geante8.value}`;
    }

    if (prixrestant === 0) {
        document.getElementById("bombe_geante8_prix_niveau").innerHTML = `Prix restant : max <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }
    else {
        document.getElementById("bombe_geante8_prix_niveau").innerHTML = `Prix restant : ${formatPrix(prixrestant)} <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }

    if (tempsRestant === 0) {
        document.getElementById("bombe_geante8_temps_niveau").innerHTML = `Temps restant: max <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
    else{
        document.getElementById("bombe_geante8_temps_niveau").innerHTML = `Temps restant: ${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
}
selectHdv.addEventListener("change", updatebombe_geanteOptions);
selectbombe_geante8.addEventListener("change", updatebombe_geante8Info);

updatebombe_geanteOptions();