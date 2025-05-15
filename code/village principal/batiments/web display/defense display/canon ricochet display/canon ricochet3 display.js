import { canon_ricochet3 } from "/coc/code/village principal/batiments/database/data defense/data canon ricochet.js";
import { canon_ricochet3_nv_max_hdv } from "/coc/code/village principal/batiments/calculator/defense calc/canon ricochets/canon ricochet3.calc.js";
import { calculerPrixRestantcanon_ricochet3 } from "/coc/code/village principal/batiments/calculator/defense calc/canon ricochets/canon ricochet3.calc.js";
import { calculerTempsRestantcanon_ricochet3 } from "/coc/code/village principal/batiments/calculator/defense calc/canon ricochets/canon ricochet3.calc.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";
import { formatPrix } from "/coc/code/outils/affichge nombre.js";


const canon_ricochet3_box = document.getElementById("canon_ricochet3_box");
const selectCanon_ricochet3 = document.getElementById("canon_ricochet3");
const imageCanon_ricochet3 = document.getElementById("image-canon_ricochet3");
const selectHdv = document.getElementById("hdv");
const infoContainer = document.createElement("div");
document.body.appendChild(infoContainer);

function updateCanonOptions() {
    const hdvLevel = parseInt(selectHdv.value);
    const currentCanonLevel = parseInt(selectCanon_ricochet3.value) || 0; // Récupérer l'ancien niveau

    // Filtrer les niveaux de canon disponibles en fonction de l'HDV
    const canonLevels = Object.entries(canon_ricochet3)
        .filter(([key, data]) => data.hdvrequis <= hdvLevel)
        .sort((a, b) => a[1].hdvrequis - b[1].hdvrequis);

    // Réinitialiser les options du select
    selectCanon_ricochet3.innerHTML = "";
    let selectedLevel = null;

    canonLevels.forEach(([key, data]) => {
        const level = parseInt(key.split("_").pop());
        const option = document.createElement("option");
        option.value = level;
        option.textContent = `Canon 1 Niveau ${level}`;
        selectCanon_ricochet3.appendChild(option);

        // Si l'ancien niveau est toujours disponible, on le sélectionne
        if (level === currentCanonLevel) {
            selectedLevel = level;
        }
    });

    // Si l'ancien niveau n'existe plus, prendre le niveau le plus bas possible
    if (!selectedLevel) {
        selectedLevel = canonLevels.length ? parseInt(canonLevels[0][0].split("_").pop()) : 0;
    }

    // Si aucun niveau n'est disponible, masquer le canon 1
    if (canonLevels.length === 0) {
        canon_ricochet3_box.style.display = "none";
        selectCanon_ricochet3.style.display = "none";
        imageCanon_ricochet3.style.display = "none";
        infoContainer.style.display = "none";
    } else {
        canon_ricochet3_box.style.display = "block";
        selectCanon_ricochet3.style.display = "block";
        imageCanon_ricochet3.style.display = "block";
        infoContainer.style.display = "block";
        selectCanon_ricochet3.value = selectedLevel;
        updateCanon_ricochet3Info();
    }
}

function updateCanon_ricochet3Info() {
    const niveau = `canon_ricochet3_nv_${selectCanon_ricochet3.value}`;
    const data = canon_ricochet3[niveau];
    const hdvNiveau = parseInt(document.getElementById("hdv").value, 10);
    const prixrestant = calculerPrixRestantcanon_ricochet3(parseInt(selectCanon_ricochet3.value, 10),canon_ricochet3_nv_max_hdv(hdvNiveau));
    const tempsRestant = calculerTempsRestantcanon_ricochet3(parseInt(selectCanon_ricochet3.value, 10), canon_ricochet3_nv_max_hdv(hdvNiveau));

    if (data) {
        imageCanon_ricochet3.src = data.image;
        imageCanon_ricochet3.alt = `Canon Niveau ${selectCanon_ricochet3.value}`;
    }
    document.getElementById("canon_ricochet3_prix_niveau").innerHTML = `Prix restant : ${formatPrix(prixrestant)} <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    document.getElementById("canon_ricochet3_temps_niveau").innerHTML = `Temps restant: ${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
}
selectHdv.addEventListener("change", updateCanonOptions);
selectCanon_ricochet3.addEventListener("change", updateCanon_ricochet3Info);

updateCanonOptions();
