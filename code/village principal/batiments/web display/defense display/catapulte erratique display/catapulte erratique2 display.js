import { catapulte_erratique2 } from "/coc/code/village principal/batiments/database/data defense/data catapulte erratique.js";
import { catapulte_erratique2_nv_max_hdv } from "/coc/code/village principal/batiments/calculator/defense calc/catapulte erratiques/catapulte erratique2.calc.js";
import { calculerPrixRestantcatapulte_erratique2 } from "/coc/code/village principal/batiments/calculator/defense calc/catapulte erratiques/catapulte erratique2.calc.js";
import { calculerTempsRestantcatapulte_erratique2 } from "/coc/code/village principal/batiments/calculator/defense calc/catapulte erratiques/catapulte erratique2.calc.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";
import { formatPrix } from "/coc/code/outils/affichge nombre.js";


const catapulte_erratique2_box = document.getElementById("catapulte_erratique2_box");
const selectcatapulte_erratique2 = document.getElementById("catapulte_erratique2");
const imagecatapulte_erratique2 = document.getElementById("image-catapulte_erratique2");
const selectHdv = document.getElementById("hdv");
const infoContainer = document.createElement("div");
document.body.appendChild(infoContainer);

function updatecatapulte_erratiqueOptions() {
    const hdvLevel = parseInt(selectHdv.value);
    const currentcatapulte_erratiqueLevel = parseInt(selectcatapulte_erratique2.value) || 0; // Récupérer l'ancien niveau

    // Filtrer les niveaux de catapulte_erratique disponibles en fonction de l'HDV
    const catapulte_erratiqueLevels = Object.entries(catapulte_erratique2)
        .filter(([key, data]) => data.hdvrequis <= hdvLevel)
        .sort((a, b) => a[1].hdvrequis - b[1].hdvrequis);

    // Réinitialiser les options du select
    selectcatapulte_erratique2.innerHTML = "";
    let selectedLevel = null;

    catapulte_erratiqueLevels.forEach(([key, data]) => {
        const level = parseInt(key.split("_").pop());
        const option = document.createElement("option");
        option.value = level;
        option.textContent = `Catapulte erratique 2 Niveau ${level}`;
        selectcatapulte_erratique2.appendChild(option);

        // Si l'ancien niveau est toujours disponible, on le sélectionne
        if (level === currentcatapulte_erratiqueLevel) {
            selectedLevel = level;
        }
    });

    // Si l'ancien niveau n'existe plus, prendre le niveau le plus bas possible
    if (!selectedLevel) {
        selectedLevel = catapulte_erratiqueLevels.length ? parseInt(catapulte_erratiqueLevels[0][0].split("_").pop()) : 0;
    }

    // Si aucun niveau n'est disponible, masquer le catapulte_erratique 1
    if (catapulte_erratiqueLevels.length === 0) {
        catapulte_erratique2_box.style.display = "none";
        selectcatapulte_erratique2.style.display = "none";
        imagecatapulte_erratique2.style.display = "none";
        infoContainer.style.display = "none";
    } else {
        catapulte_erratique2_box.style.display = "block";
        selectcatapulte_erratique2.style.display = "block";
        imagecatapulte_erratique2.style.display = "block";
        infoContainer.style.display = "block";
        selectcatapulte_erratique2.value = selectedLevel;
        updatecatapulte_erratique2Info();
    }
}

function updatecatapulte_erratique2Info() {
    const niveau = `catapulte_erratique2_nv_${selectcatapulte_erratique2.value}`;
    const data = catapulte_erratique2[niveau];
    const hdvNiveau = parseInt(document.getElementById("hdv").value, 10);
    const prixrestant = calculerPrixRestantcatapulte_erratique2(parseInt(selectcatapulte_erratique2.value, 10),catapulte_erratique2_nv_max_hdv(hdvNiveau));
    const tempsRestant = calculerTempsRestantcatapulte_erratique2(parseInt(selectcatapulte_erratique2.value, 10), catapulte_erratique2_nv_max_hdv(hdvNiveau));

    if (data) {
        imagecatapulte_erratique2.src = data.image;
        imagecatapulte_erratique2.alt = `catapulte_erratique Niveau ${selectcatapulte_erratique2.value}`;
    }
    document.getElementById("catapulte_erratique2_prix_niveau").innerHTML = `Prix restant : ${formatPrix(prixrestant)} <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    document.getElementById("catapulte_erratique2_temps_niveau").innerHTML = `Temps restant: ${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
}
selectHdv.addEventListener("change", updatecatapulte_erratiqueOptions);
selectcatapulte_erratique2.addEventListener("change", updatecatapulte_erratique2Info);

updatecatapulte_erratiqueOptions();