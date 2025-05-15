import { canon_ricochet1 } from "/coc/code/village principal/batiments/database/data defense/data canon ricochet.js";
import { canon_ricochet1_nv_max_hdv } from "/coc/code/village principal/batiments/calculator/defense calc/canon ricochets/canon ricochet1.calc.js";
import { calculerPrixRestantcanon_ricochet1 } from "/coc/code/village principal/batiments/calculator/defense calc/canon ricochets/canon ricochet1.calc.js";
import { calculerTempsRestantcanon_ricochet1 } from "/coc/code/village principal/batiments/calculator/defense calc/canon ricochets/canon ricochet1.calc.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";
import { formatPrix } from "/coc/code/outils/affichge nombre.js";


const canon_ricochet1_box = document.getElementById("canon_ricochet1_box");
const selectCanon_ricochet1 = document.getElementById("canon_ricochet1");
const imageCanon_ricochet1 = document.getElementById("image-canon_ricochet1");
const selectHdv = document.getElementById("hdv");
const infoContainer = document.createElement("div");
document.body.appendChild(infoContainer);

function updateCanon_ricochetOptions() {
    const hdvLevel = parseInt(selectHdv.value);
    const currentCanon_ricochetLevel = parseInt(selectCanon_ricochet1.value) || 0; // Récupérer l'ancien niveau

    // Filtrer les niveaux de canon_ricochet disponibles en fonction de l'HDV
    const canon_ricochetLevels = Object.entries(canon_ricochet1)
        .filter(([key, data]) => data.hdvrequis <= hdvLevel)
        .sort((a, b) => a[1].hdvrequis - b[1].hdvrequis);

    // Réinitialiser les options du select
    selectCanon_ricochet1.innerHTML = "";
    let selectedLevel = null;

    canon_ricochetLevels.forEach(([key, data]) => {
        const level = parseInt(key.split("_").pop());
        const option = document.createElement("option");
        option.value = level;
        option.textContent = `Canon_ricochet 1 Niveau ${level}`;
        selectCanon_ricochet1.appendChild(option);

        // Si l'ancien niveau est toujours disponible, on le sélectionne
        if (level === currentCanon_ricochetLevel) {
            selectedLevel = level;
        }
    });

    // Si l'ancien niveau n'existe plus, prendre le niveau le plus bas possible
    if (!selectedLevel) {
        selectedLevel = canon_ricochetLevels.length ? parseInt(canon_ricochetLevels[0][0].split("_").pop()) : 0;
    }

    // Si aucun niveau n'est disponible, masquer le canon_ricochet 1
    if (canon_ricochetLevels.length === 0) {
        canon_ricochet1_box.style.display = "none";
        selectCanon_ricochet1.style.display = "none";
        imageCanon_ricochet1.style.display = "none";
        infoContainer.style.display = "none";
        canon_ricochet_block.style.display = "none";
    } else {
        canon_ricochet1_box.style.display = "block";
        selectCanon_ricochet1.style.display = "block";
        imageCanon_ricochet1.style.display = "block";
        infoContainer.style.display = "block";
        canon_ricochet_block.style.display = "block";
        selectCanon_ricochet1.value = selectedLevel;
        updateCanon_ricochet1Info();
    }
}

function updateCanon_ricochet1Info() {
    const niveau = `canon_ricochet1_nv_${selectCanon_ricochet1.value}`;
    const data = canon_ricochet1[niveau];
    const hdvNiveau = parseInt(document.getElementById("hdv").value, 10);
    const prixrestant = calculerPrixRestantcanon_ricochet1(parseInt(selectCanon_ricochet1.value, 10),canon_ricochet1_nv_max_hdv(hdvNiveau));
    const tempsRestant = calculerTempsRestantcanon_ricochet1(parseInt(selectCanon_ricochet1.value, 10), canon_ricochet1_nv_max_hdv(hdvNiveau));

    if (data) {
        imageCanon_ricochet1.src = data.image;
        imageCanon_ricochet1.alt = `Canon_ricochet Niveau ${selectCanon_ricochet1.value}`;
    }
    document.getElementById("canon_ricochet1_prix_niveau").innerHTML = `Prix restant : ${formatPrix(prixrestant)} <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    document.getElementById("canon_ricochet1_temps_niveau").innerHTML = `Temps restant: ${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
}
selectHdv.addEventListener("change", updateCanon_ricochetOptions);
selectCanon_ricochet1.addEventListener("change", updateCanon_ricochet1Info);

updateCanon_ricochetOptions();
