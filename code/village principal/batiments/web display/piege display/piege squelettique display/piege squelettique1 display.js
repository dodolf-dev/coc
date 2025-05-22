import { piege_squelettique1 } from "/coc/code/village principal/batiments/database/data piege/data piege squelettique.js";
import { piege_squelettique1_nv_max_hdv } from "/coc/code/village principal/batiments/calculator/piege calc/piege squelettiques/piege squelettique1.calc.js";
import { calculerPrixRestantpiege_squelettique1 } from "/coc/code/village principal/batiments/calculator/piege calc/piege squelettiques/piege squelettique1.calc.js";
import { calculerTempsRestantpiege_squelettique1 } from "/coc/code/village principal/batiments/calculator/piege calc/piege squelettiques/piege squelettique1.calc.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";
import { formatPrix } from "/coc/code/outils/affichge nombre.js";


const piege_squelettique1_box = document.getElementById("piege_squelettique1_box");
const selectpiege_squelettique1 = document.getElementById("piege_squelettique1");
const imagepiege_squelettique1 = document.getElementById("image-piege_squelettique1");
const selectHdv = document.getElementById("hdv");
const infoContainer = document.createElement("div");
document.body.appendChild(infoContainer);

function updatepiege_squelettiqueOptions() {
    const hdvLevel = parseInt(selectHdv.value);
    const currentpiege_squelettiqueLevel = parseInt(selectpiege_squelettique1.value) || 0; // Récupérer l'ancien niveau

    // Filtrer les niveaux de piege_squelettique disponibles en fonction de l'HDV
    const piege_squelettiqueLevels = Object.entries(piege_squelettique1)
        .filter(([key, data]) => data.hdvrequis <= hdvLevel)
        .sort((a, b) => a[1].hdvrequis - b[1].hdvrequis);

    // Réinitialiser les options du select
    selectpiege_squelettique1.innerHTML = "";
    let selectedLevel = null;

    piege_squelettiqueLevels.forEach(([key, data]) => {
        const level = parseInt(key.split("_").pop());
        const option = document.createElement("option");
        option.value = level;
        option.textContent = `Piège squelettique 1 Niveau ${level}`;
        selectpiege_squelettique1.appendChild(option);

        // Si l'ancien niveau est toujours disponible, on le sélectionne
        if (level === currentpiege_squelettiqueLevel) {
            selectedLevel = level;
        }
    });

    // Si l'ancien niveau n'existe plus, prendre le niveau le plus bas possible
    if (!selectedLevel) {
        selectedLevel = piege_squelettiqueLevels.length ? parseInt(piege_squelettiqueLevels[0][0].split("_").pop()) : 0;
    }

    // Si aucun niveau n'est disponible, masquer le piege_squelettique 1
    if (piege_squelettiqueLevels.length === 0) {
        piege_squelettique1_box.style.display = "none";
        selectpiege_squelettique1.style.display = "none";
        imagepiege_squelettique1.style.display = "none";
        infoContainer.style.display = "none";
        piege_squelettique_block.style.display = "none";
    } else {
        piege_squelettique1_box.style.display = "block";
        selectpiege_squelettique1.style.display = "block";
        imagepiege_squelettique1.style.display = "block";
        infoContainer.style.display = "block";
        piege_squelettique_block.style.display = "block";
        selectpiege_squelettique1.value = selectedLevel;
        updatepiege_squelettique1Info();
    }
}

function updatepiege_squelettique1Info() {
    const niveau = `piege_squelettique1_nv_${selectpiege_squelettique1.value}`;
    const data = piege_squelettique1[niveau];
    const hdvNiveau = parseInt(document.getElementById("hdv").value, 10);
    const prixrestant = calculerPrixRestantpiege_squelettique1(parseInt(selectpiege_squelettique1.value, 10),piege_squelettique1_nv_max_hdv(hdvNiveau));
    const tempsRestant = calculerTempsRestantpiege_squelettique1(parseInt(selectpiege_squelettique1.value, 10), piege_squelettique1_nv_max_hdv(hdvNiveau));

    if (data) {
        imagepiege_squelettique1.src = data.image;
        imagepiege_squelettique1.alt = `piege_squelettique Niveau ${selectpiege_squelettique1.value}`;
    }

    if (prixrestant === 0) {
        document.getElementById("piege_squelettique1_prix_niveau").innerHTML = `Prix restant : max <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }
    else {
        document.getElementById("piege_squelettique1_prix_niveau").innerHTML = `Prix restant : ${formatPrix(prixrestant)} <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }

    if (tempsRestant === 0) {
        document.getElementById("piege_squelettique1_temps_niveau").innerHTML = `Temps restant: max <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
    else{
        document.getElementById("piege_squelettique1_temps_niveau").innerHTML = `Temps restant: ${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
}
selectHdv.addEventListener("change", updatepiege_squelettiqueOptions);
selectpiege_squelettique1.addEventListener("change", updatepiege_squelettique1Info);

updatepiege_squelettiqueOptions();