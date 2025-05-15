import { canon_ricochet2 } from "/coc/code/village principal/batiments/database/data defense/data canon ricochet.js";
import { canon_ricochet2_nv_max_hdv } from "/coc/code/village principal/batiments/calculator/defense calc/canon ricochets/canon ricochet2.calc.js";
import { calculerPrixRestantcanon_ricochet2 } from "/coc/code/village principal/batiments/calculator/defense calc/canon ricochets/canon ricochet2.calc.js";
import { calculerTempsRestantcanon_ricochet2 } from "/coc/code/village principal/batiments/calculator/defense calc/canon ricochets/canon ricochet2.calc.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";
import { formatPrix } from "/coc/code/outils/affichge nombre.js";


const canon_ricochet2_box = document.getElementById("canon_ricochet2_box");
const selectCanon_ricochet2 = document.getElementById("canon_ricochet2");
const imageCanon_ricochet2 = document.getElementById("image-canon_ricochet2");
const selectHdv = document.getElementById("hdv");
const infoContainer = document.createElement("div");
document.body.appendChild(infoContainer);

function updateCanon_ricochet2ptions() {
    const hdvLevel = parseInt(selectHdv.value);
    const currentCanon_ricochet2evel = parseInt(selectCanon_ricochet2.value) || 0; // Récupérer l'ancien niveau

    // Filtrer les niveaux de canon_ricochet2disponibles en fonction de l'HDV
    const canon_ricochet2evels = Object.entries(canon_ricochet2)
        .filter(([key, data]) => data.hdvrequis <= hdvLevel)
        .sort((a, b) => a[1].hdvrequis - b[1].hdvrequis);

    // Réinitialiser les options du select
    selectCanon_ricochet2.innerHTML = "";
    let selectedLevel = null;

    canon_ricochet2evels.forEach(([key, data]) => {
        const level = parseInt(key.split("_").pop());
        const option = document.createElement("option");
        option.value = level;
        option.textContent = `Canon_ricochet21 Niveau ${level}`;
        selectCanon_ricochet2.appendChild(option);

        // Si l'ancien niveau est toujours disponible, on le sélectionne
        if (level === currentCanon_ricochet2evel) {
            selectedLevel = level;
        }
    });

    // Si l'ancien niveau n'existe plus, prendre le niveau le plus bas possible
    if (!selectedLevel) {
        selectedLevel = canon_ricochet2evels.length ? parseInt(canon_ricochet2evels[0][0].split("_").pop()) : 0;
    }

    // Si aucun niveau n'est disponible, masquer le canon_ricochet21
    if (canon_ricochet2evels.length === 0) {
        canon_ricochet2_box.style.display = "none";
        selectCanon_ricochet2.style.display = "none";
        imageCanon_ricochet2.style.display = "none";
        infoContainer.style.display = "none";
    } else {
        canon_ricochet2_box.style.display = "block";
        selectCanon_ricochet2.style.display = "block";
        imageCanon_ricochet2.style.display = "block";
        infoContainer.style.display = "block";
        selectCanon_ricochet2.value = selectedLevel;
        updateCanon_ricochet2Info();
    }
}

function updateCanon_ricochet2Info() {
    const niveau = `canon_ricochet2_nv_${selectCanon_ricochet2.value}`;
    const data = canon_ricochet2[niveau];
    const hdvNiveau = parseInt(document.getElementById("hdv").value, 10);
    const prixrestant = calculerPrixRestantcanon_ricochet2(parseInt(selectCanon_ricochet2.value, 10),canon_ricochet2_nv_max_hdv(hdvNiveau));
    const tempsRestant = calculerTempsRestantcanon_ricochet2(parseInt(selectCanon_ricochet2.value, 10), canon_ricochet2_nv_max_hdv(hdvNiveau));

    if (data) {
        imageCanon_ricochet2.src = data.image;
        imageCanon_ricochet2.alt = `Canon_ricochet2Niveau ${selectCanon_ricochet2.value}`;
    }
    document.getElementById("canon_ricochet2_prix_niveau").innerHTML = `Prix restant : ${formatPrix(prixrestant)} <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    document.getElementById("canon_ricochet2_temps_niveau").innerHTML = `Temps restant: ${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
}
selectHdv.addEventListener("change", updateCanon_ricochet2ptions);
selectCanon_ricochet2.addEventListener("change", updateCanon_ricochet2Info);

updateCanon_ricochet2ptions();
