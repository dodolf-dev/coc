import { canon1 } from "/coc/code/village principal/batiments/database/data defense/data canon.js";
import { canon1_nv_max_hdv } from "/coc/code/village principal/batiments/calculator/defense calc/canons/canon1.calc.js";
import { calculerPrixRestantcanon1 } from "/coc/code/village principal/batiments/calculator/defense calc/canons/canon1.calc.js";
import { calculerTempsRestantcanon1 } from "/coc/code/village principal/batiments/calculator/defense calc/canons/canon1.calc.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";
import { formatPrix } from "/coc/code/outils/affichge nombre.js";


const canon1_box = document.getElementById("canon1_box");
const selectCanon1 = document.getElementById("canon1");
const imageCanon1 = document.getElementById("image-canon1");
const selectHdv = document.getElementById("hdv");
const infoContainer = document.createElement("div");
document.body.appendChild(infoContainer);

function updateCanonOptions() {
    const hdvLevel = parseInt(selectHdv.value);
    const currentCanonLevel = parseInt(selectCanon1.value) || 0; // Récupérer l'ancien niveau

    // Filtrer les niveaux de canon disponibles en fonction de l'HDV
    const canonLevels = Object.entries(canon1)
        .filter(([key, data]) => data.hdvrequis <= hdvLevel)
        .sort((a, b) => a[1].hdvrequis - b[1].hdvrequis);

    // Réinitialiser les options du select
    selectCanon1.innerHTML = "";
    let selectedLevel = null;

    canonLevels.forEach(([key, data]) => {
        const level = parseInt(key.split("_").pop());
        const option = document.createElement("option");
        option.value = level;
        option.textContent = `Canon 1 Niveau ${level}`;
        selectCanon1.appendChild(option);

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
        canon1_box.style.display = "none";
        selectCanon1.style.display = "none";
        imageCanon1.style.display = "none";
        infoContainer.style.display = "none";
    } else {
        canon1_box.style.display = "block";
        selectCanon1.style.display = "block";
        imageCanon1.style.display = "block";
        infoContainer.style.display = "block";
        selectCanon1.value = selectedLevel;
        updateCanon1Info();
    }
}

function updateCanon1Info() {
    const niveau = `canon1_nv_${selectCanon1.value}`;
    const data = canon1[niveau];
    const hdvNiveau = parseInt(document.getElementById("hdv").value, 10);
    const prixrestant = calculerPrixRestantcanon1(parseInt(selectCanon1.value, 10),canon1_nv_max_hdv(hdvNiveau));
    const tempsRestant = calculerTempsRestantcanon1(parseInt(selectCanon1.value, 10), canon1_nv_max_hdv(hdvNiveau));

    if (data) {
        imageCanon1.src = data.image;
        imageCanon1.alt = `Canon Niveau ${selectCanon1.value}`;
    }
    document.getElementById("canon1_prix_niveau").innerHTML = `Prix restant : ${formatPrix(prixrestant)} <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    document.getElementById("canon1_temps_niveau").innerHTML = `Temps restant: ${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
}
selectHdv.addEventListener("change", updateCanonOptions);
selectCanon1.addEventListener("change", updateCanon1Info);

updateCanonOptions();
