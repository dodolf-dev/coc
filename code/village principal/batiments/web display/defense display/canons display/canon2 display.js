import { canon2 } from "/coc/code/village principal/batiments/database/data defense/data canon.js";
import { canon2_nv_max_hdv } from "/coc/code/village principal/batiments/calculator/defense calc/canons/canon2.calc.js";
import { calculerPrixRestantcanon2 } from "/coc/code/village principal/batiments/calculator/defense calc/canons/canon2.calc.js";
import { calculerTempsRestantcanon2 } from "/coc/code/village principal/batiments/calculator/defense calc/canons/canon2.calc.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";
import { formatPrix } from "/coc/code/outils/affichge nombre.js";


const canon2_box = document.getElementById("canon2_box");
const selectCanon2 = document.getElementById("canon2");
const imageCanon2 = document.getElementById("image-canon2");
const selectHdv = document.getElementById("hdv");
const infoContainer = document.createElement("div");
document.body.appendChild(infoContainer);

function updateCanonOptions() {
    const hdvLevel = parseInt(selectHdv.value);
    const currentCanonLevel = parseInt(selectCanon2.value) || 0; // Récupérer l'ancien niveau

    // Filtrer les niveaux de canon disponibles en fonction de l'HDV
    const canonLevels = Object.entries(canon2)
        .filter(([key, data]) => data.hdvrequis <= hdvLevel)
        .sort((a, b) => a[1].hdvrequis - b[1].hdvrequis);

    // Réinitialiser les options du select
    selectCanon2.innerHTML = "";
    let selectedLevel = null;

    canonLevels.forEach(([key, data]) => {
        const level = parseInt(key.split("_").pop());
        const option = document.createElement("option");
        option.value = level;
        option.textContent = `Canon 2 Niveau ${level}`;
        selectCanon2.appendChild(option);

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
        canon2_box.style.display = "none";
        selectCanon2.style.display = "none";
        imageCanon2.style.display = "none";
        infoContainer.style.display = "none";
    } else {
        canon2_box.style.display = "block";
        selectCanon2.style.display = "block";
        imageCanon2.style.display = "block";
        infoContainer.style.display = "block";
        selectCanon2.value = selectedLevel;
        updateCanon2Info();
    }
}

function updateCanon2Info() {
    const niveau = `canon2_nv_${selectCanon2.value}`;
    const data = canon2[niveau];
    const hdvNiveau = parseInt(document.getElementById("hdv").value, 10);
    const prixrestant = calculerPrixRestantcanon2(parseInt(selectCanon2.value, 10),canon2_nv_max_hdv(hdvNiveau));
    const tempsRestant = calculerTempsRestantcanon2(parseInt(selectCanon2.value, 10), canon2_nv_max_hdv(hdvNiveau));

    if (data) {
        imageCanon2.src = data.image;
        imageCanon2.alt = `Canon Niveau ${selectCanon2.value}`;
    }
    document.getElementById("canon2_prix_niveau").innerHTML = `Prix restant : ${formatPrix(prixrestant)} <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    document.getElementById("canon2_temps_niveau").innerHTML = `Temps restant: ${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
}
selectHdv.addEventListener("change", updateCanonOptions);
selectCanon2.addEventListener("change", updateCanon2Info);

updateCanonOptions();