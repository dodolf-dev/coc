import { piege_squelettique4 } from "/coc/code/village principal/batiments/database/data piege/data piege squelettique.js";
import { piege_squelettique4_nv_max_hdv } from "/coc/code/village principal/batiments/calculator/piege calc/piege squelettiques/piege squelettique4.calc.js";
import { calculerPrixRestantpiege_squelettique4 } from "/coc/code/village principal/batiments/calculator/piege calc/piege squelettiques/piege squelettique4.calc.js";
import { calculerTempsRestantpiege_squelettique4 } from "/coc/code/village principal/batiments/calculator/piege calc/piege squelettiques/piege squelettique4.calc.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";
import { formatPrix } from "/coc/code/outils/affichge nombre.js";


const piege_squelettique4_box = document.getElementById("piege_squelettique4_box");
const selectpiege_squelettique4 = document.getElementById("piege_squelettique4");
const imagepiege_squelettique4 = document.getElementById("image-piege_squelettique4");
const selectHdv = document.getElementById("hdv");
const infoContainer = document.createElement("div");
document.body.appendChild(infoContainer);

function updatepiege_squelettiqueOptions() {
    const hdvLevel = parseInt(selectHdv.value);
    const currentpiege_squelettiqueLevel = parseInt(selectpiege_squelettique4.value) || 0; // Récupérer l'ancien niveau

    // Filtrer les niveaux de piege_squelettique disponibles en fonction de l'HDV
    const piege_squelettiqueLevels = Object.entries(piege_squelettique4)
        .filter(([key, data]) => data.hdvrequis <= hdvLevel)
        .sort((a, b) => a[1].hdvrequis - b[1].hdvrequis);

    // Réinitialiser les options du select
    selectpiege_squelettique4.innerHTML = "";
    let selectedLevel = null;

    piege_squelettiqueLevels.forEach(([key, data]) => {
        const level = parseInt(key.split("_").pop());
        const option = document.createElement("option");
        option.value = level;
        option.textContent = `piege_squelettique 1 Niveau ${level}`;
        selectpiege_squelettique4.appendChild(option);

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
        piege_squelettique4_box.style.display = "none";
        selectpiege_squelettique4.style.display = "none";
        imagepiege_squelettique4.style.display = "none";
        infoContainer.style.display = "none";
    } else {
        piege_squelettique4_box.style.display = "block";
        selectpiege_squelettique4.style.display = "block";
        imagepiege_squelettique4.style.display = "block";
        infoContainer.style.display = "block";
        selectpiege_squelettique4.value = selectedLevel;
        updatepiege_squelettique4Info();
    }
}

function updatepiege_squelettique4Info() {
    const niveau = `piege_squelettique4_nv_${selectpiege_squelettique4.value}`;
    const data = piege_squelettique4[niveau];
    const hdvNiveau = parseInt(document.getElementById("hdv").value, 10);
    const prixrestant = calculerPrixRestantpiege_squelettique4(parseInt(selectpiege_squelettique4.value, 10),piege_squelettique4_nv_max_hdv(hdvNiveau));
    const tempsRestant = calculerTempsRestantpiege_squelettique4(parseInt(selectpiege_squelettique4.value, 10), piege_squelettique4_nv_max_hdv(hdvNiveau));

    if (data) {
        imagepiege_squelettique4.src = data.image;
        imagepiege_squelettique4.alt = `piege_squelettique Niveau ${selectpiege_squelettique4.value}`;
    }

    if (prixrestant === 0) {
        document.getElementById("piege_squelettique4_prix_niveau").innerHTML = `Prix restant : max <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }
    else {
        document.getElementById("piege_squelettique4_prix_niveau").innerHTML = `Prix restant : ${formatPrix(prixrestant)} <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }

    if (tempsRestant === 0) {
        document.getElementById("piege_squelettique4_temps_niveau").innerHTML = `Temps restant: max <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
    else{
        document.getElementById("piege_squelettique4_temps_niveau").innerHTML = `Temps restant: ${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
}
selectHdv.addEventListener("change", updatepiege_squelettiqueOptions);
selectpiege_squelettique4.addEventListener("change", updatepiege_squelettique4Info);

updatepiege_squelettiqueOptions();