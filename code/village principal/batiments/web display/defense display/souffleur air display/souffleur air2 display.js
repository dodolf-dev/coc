import { souffleur_air2 } from "/coc/code/village principal/batiments/database/data defense/data souffleur air.js";
import { souffleur_air2_nv_max_hdv } from "/coc/code/village principal/batiments/calculator/defense calc/souffleur airs/souffleur air2.calc.js";
import { calculerPrixRestantsouffleur_air2 } from "/coc/code/village principal/batiments/calculator/defense calc/souffleur airs/souffleur air2.calc.js";
import { calculerTempsRestantsouffleur_air2 } from "/coc/code/village principal/batiments/calculator/defense calc/souffleur airs/souffleur air2.calc.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";
import { formatPrix } from "/coc/code/outils/affichge nombre.js";


const souffleur_air2_box = document.getElementById("souffleur_air2_box");
const selectsouffleur_air2 = document.getElementById("souffleur_air2");
const imagesouffleur_air2 = document.getElementById("image-souffleur_air2");
const selectHdv = document.getElementById("hdv");
const infoContainer = document.createElement("div");
document.body.appendChild(infoContainer);

function updatesouffleur_airOptions() {
    const hdvLevel = parseInt(selectHdv.value);
    const currentsouffleur_airLevel = parseInt(selectsouffleur_air2.value) || 0; // Récupérer l'ancien niveau

    // Filtrer les niveaux de souffleur_air disponibles en fonction de l'HDV
    const souffleur_airLevels = Object.entries(souffleur_air2)
        .filter(([key, data]) => data.hdvrequis <= hdvLevel)
        .sort((a, b) => a[1].hdvrequis - b[1].hdvrequis);

    // Réinitialiser les options du select
    selectsouffleur_air2.innerHTML = "";
    let selectedLevel = null;

    souffleur_airLevels.forEach(([key, data]) => {
        const level = parseInt(key.split("_").pop());
        const option = document.createElement("option");
        option.value = level;
        option.textContent = `souffleur d'air 2 Niveau ${level}`;
        selectsouffleur_air2.appendChild(option);

        // Si l'ancien niveau est toujours disponible, on le sélectionne
        if (level === currentsouffleur_airLevel) {
            selectedLevel = level;
        }
    });

    // Si l'ancien niveau n'existe plus, prendre le niveau le plus bas possible
    if (!selectedLevel) {
        selectedLevel = souffleur_airLevels.length ? parseInt(souffleur_airLevels[0][0].split("_").pop()) : 0;
    }

    // Si aucun niveau n'est disponible, masquer le souffleur_air 1
    if (souffleur_airLevels.length === 0) {
        souffleur_air2_box.style.display = "none";
        selectsouffleur_air2.style.display = "none";
        imagesouffleur_air2.style.display = "none";
        infoContainer.style.display = "none";
    } else {
        souffleur_air2_box.style.display = "block";
        selectsouffleur_air2.style.display = "block";
        imagesouffleur_air2.style.display = "block";
        infoContainer.style.display = "block";
        selectsouffleur_air2.value = selectedLevel;
        updatesouffleur_air2Info();
    }
}

function updatesouffleur_air2Info() {
    const niveau = `souffleur_air2_nv_${selectsouffleur_air2.value}`;
    const data = souffleur_air2[niveau];
    const hdvNiveau = parseInt(document.getElementById("hdv").value, 10);
    const prixrestant = calculerPrixRestantsouffleur_air2(parseInt(selectsouffleur_air2.value, 10),souffleur_air2_nv_max_hdv(hdvNiveau));
    const tempsRestant = calculerTempsRestantsouffleur_air2(parseInt(selectsouffleur_air2.value, 10), souffleur_air2_nv_max_hdv(hdvNiveau));

    if (data) {
        imagesouffleur_air2.src = data.image;
        imagesouffleur_air2.alt = `souffleur_air Niveau ${selectsouffleur_air2.value}`;
    }
    document.getElementById("souffleur_air2_prix_niveau").innerHTML = `Prix restant : ${formatPrix(prixrestant)} <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    document.getElementById("souffleur_air2_temps_niveau").innerHTML = `Temps restant: ${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
}
selectHdv.addEventListener("change", updatesouffleur_airOptions);
selectsouffleur_air2.addEventListener("change", updatesouffleur_air2Info);

updatesouffleur_airOptions();