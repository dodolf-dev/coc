import { bombe_geante1 } from "/coc/code/village principal/batiments/database/data piege/data bombe geante.js";
import { bombe_geante1_nv_max_hdv } from "/coc/code/village principal/batiments/calculator/piege calc/bombe geantes/bombe geante1.calc.js";
import { calculerPrixRestantbombe_geante1 } from "/coc/code/village principal/batiments/calculator/piege calc/bombe geantes/bombe geante1.calc.js";
import { calculerTempsRestantbombe_geante1 } from "/coc/code/village principal/batiments/calculator/piege calc/bombe geantes/bombe geante1.calc.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";
import { formatPrix } from "/coc/code/outils/affichge nombre.js";


const bombe_geante1_box = document.getElementById("bombe_geante1_box");
const selectbombe_geante1 = document.getElementById("bombe_geante1");
const imagebombe_geante1 = document.getElementById("image-bombe_geante1");
const selectHdv = document.getElementById("hdv");
const infoContainer = document.createElement("div");
document.body.appendChild(infoContainer);

function updatebombe_geanteOptions() {
    const hdvLevel = parseInt(selectHdv.value);
    const currentbombe_geanteLevel = parseInt(selectbombe_geante1.value) || 0; // Récupérer l'ancien niveau

    // Filtrer les niveaux de bombe_geante disponibles en fonction de l'HDV
    const bombe_geanteLevels = Object.entries(bombe_geante1)
        .filter(([key, data]) => data.hdvrequis <= hdvLevel)
        .sort((a, b) => a[1].hdvrequis - b[1].hdvrequis);

    // Réinitialiser les options du select
    selectbombe_geante1.innerHTML = "";
    let selectedLevel = null;

    bombe_geanteLevels.forEach(([key, data]) => {
        const level = parseInt(key.split("_").pop());
        const option = document.createElement("option");
        option.value = level;
        option.textContent = `Bombe géante 1 Niveau ${level}`;
        selectbombe_geante1.appendChild(option);

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
        bombe_geante1_box.style.display = "none";
        selectbombe_geante1.style.display = "none";
        imagebombe_geante1.style.display = "none";
        infoContainer.style.display = "none";
        bombe_geante_block.style.display = "none";
    } else {
        bombe_geante1_box.style.display = "block";
        selectbombe_geante1.style.display = "block";
        imagebombe_geante1.style.display = "block";
        infoContainer.style.display = "block";
        bombe_geante_block.style.display = "block";
        selectbombe_geante1.value = selectedLevel;
        updatebombe_geante1Info();
    }
}

function updatebombe_geante1Info() {
    const niveau = `bombe_geante1_nv_${selectbombe_geante1.value}`;
    const data = bombe_geante1[niveau];
    const hdvNiveau = parseInt(document.getElementById("hdv").value, 10);
    const prixrestant = calculerPrixRestantbombe_geante1(parseInt(selectbombe_geante1.value, 10),bombe_geante1_nv_max_hdv(hdvNiveau));
    const tempsRestant = calculerTempsRestantbombe_geante1(parseInt(selectbombe_geante1.value, 10), bombe_geante1_nv_max_hdv(hdvNiveau));

    if (data) {
        imagebombe_geante1.src = data.image;
        imagebombe_geante1.alt = `bombe_geante Niveau ${selectbombe_geante1.value}`;
    }

    if (prixrestant === 0) {
        document.getElementById("bombe_geante1_prix_niveau").innerHTML = `Prix restant : max <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }
    else {
        document.getElementById("bombe_geante1_prix_niveau").innerHTML = `Prix restant : ${formatPrix(prixrestant)} <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }

    if (tempsRestant === 0) {
        document.getElementById("bombe_geante1_temps_niveau").innerHTML = `Temps restant: max <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
    else{
        document.getElementById("bombe_geante1_temps_niveau").innerHTML = `Temps restant: ${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
}
selectHdv.addEventListener("change", updatebombe_geanteOptions);
selectbombe_geante1.addEventListener("change", updatebombe_geante1Info);

updatebombe_geanteOptions();