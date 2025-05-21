import { bombe_geante4 } from "/coc/code/village principal/batiments/database/data piege/data bombe geante.js";
import { bombe_geante4_nv_max_hdv } from "/coc/code/village principal/batiments/calculator/piege calc/bombe geantes/bombe geante4.calc.js";
import { calculerPrixRestantbombe_geante4 } from "/coc/code/village principal/batiments/calculator/piege calc/bombe geantes/bombe geante4.calc.js";
import { calculerTempsRestantbombe_geante4 } from "/coc/code/village principal/batiments/calculator/piege calc/bombe geantes/bombe geante4.calc.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";
import { formatPrix } from "/coc/code/outils/affichge nombre.js";


const bombe_geante4_box = document.getElementById("bombe_geante4_box");
const selectbombe_geante4 = document.getElementById("bombe_geante4");
const imagebombe_geante4 = document.getElementById("image-bombe_geante4");
const selectHdv = document.getElementById("hdv");
const infoContainer = document.createElement("div");
document.body.appendChild(infoContainer);

function updatebombe_geanteOptions() {
    const hdvLevel = parseInt(selectHdv.value);
    const currentbombe_geanteLevel = parseInt(selectbombe_geante4.value) || 0; // Récupérer l'ancien niveau

    // Filtrer les niveaux de bombe_geante disponibles en fonction de l'HDV
    const bombe_geanteLevels = Object.entries(bombe_geante4)
        .filter(([key, data]) => data.hdvrequis <= hdvLevel)
        .sort((a, b) => a[1].hdvrequis - b[1].hdvrequis);

    // Réinitialiser les options du select
    selectbombe_geante4.innerHTML = "";
    let selectedLevel = null;

    bombe_geanteLevels.forEach(([key, data]) => {
        const level = parseInt(key.split("_").pop());
        const option = document.createElement("option");
        option.value = level;
        option.textContent = `bombe_geante 1 Niveau ${level}`;
        selectbombe_geante4.appendChild(option);

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
        bombe_geante4_box.style.display = "none";
        selectbombe_geante4.style.display = "none";
        imagebombe_geante4.style.display = "none";
        infoContainer.style.display = "none";
    } else {
        bombe_geante4_box.style.display = "block";
        selectbombe_geante4.style.display = "block";
        imagebombe_geante4.style.display = "block";
        infoContainer.style.display = "block";
        selectbombe_geante4.value = selectedLevel;
        updatebombe_geante4Info();
    }
}

function updatebombe_geante4Info() {
    const niveau = `bombe_geante4_nv_${selectbombe_geante4.value}`;
    const data = bombe_geante4[niveau];
    const hdvNiveau = parseInt(document.getElementById("hdv").value, 10);
    const prixrestant = calculerPrixRestantbombe_geante4(parseInt(selectbombe_geante4.value, 10),bombe_geante4_nv_max_hdv(hdvNiveau));
    const tempsRestant = calculerTempsRestantbombe_geante4(parseInt(selectbombe_geante4.value, 10), bombe_geante4_nv_max_hdv(hdvNiveau));

    if (data) {
        imagebombe_geante4.src = data.image;
        imagebombe_geante4.alt = `bombe_geante Niveau ${selectbombe_geante4.value}`;
    }

    if (prixrestant === 0) {
        document.getElementById("bombe_geante4_prix_niveau").innerHTML = `Prix restant : max <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }
    else {
        document.getElementById("bombe_geante4_prix_niveau").innerHTML = `Prix restant : ${formatPrix(prixrestant)} <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }

    if (tempsRestant === 0) {
        document.getElementById("bombe_geante4_temps_niveau").innerHTML = `Temps restant: max <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
    else{
        document.getElementById("bombe_geante4_temps_niveau").innerHTML = `Temps restant: ${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
}
selectHdv.addEventListener("change", updatebombe_geanteOptions);
selectbombe_geante4.addEventListener("change", updatebombe_geante4Info);

updatebombe_geanteOptions();