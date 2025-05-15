import { multi_tour_archere2 } from "/coc/code/village principal/batiments/database/data defense/data multi tour archere.js";
import { multi_tour_archere2_nv_max_hdv } from "/coc/code/village principal/batiments/calculator/defense calc/multi tour archeres/multi tour archere2.calc.js";
import { calculerPrixRestantmulti_tour_archere2 } from "/coc/code/village principal/batiments/calculator/defense calc/multi tour archeres/multi tour archere2.calc.js";
import { calculerTempsRestantmulti_tour_archere2 } from "/coc/code/village principal/batiments/calculator/defense calc/multi tour archeres/multi tour archere2.calc.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";
import { formatPrix } from "/coc/code/outils/affichge nombre.js";


const multi_tour_archere2_box = document.getElementById("multi_tour_archere2_box");
const selectmulti_tour_archere2 = document.getElementById("multi_tour_archere2");
const imagemulti_tour_archere2 = document.getElementById("image-multi_tour_archere2");
const selectHdv = document.getElementById("hdv");
const infoContainer = document.createElement("div");
document.body.appendChild(infoContainer);

function updatemulti_tour_archereOptions() {
    const hdvLevel = parseInt(selectHdv.value);
    const currentmulti_tour_archereLevel = parseInt(selectmulti_tour_archere2.value) || 0; // Récupérer l'ancien niveau

    // Filtrer les niveaux de multi_tour_archere disponibles en fonction de l'HDV
    const multi_tour_archereLevels = Object.entries(multi_tour_archere2)
        .filter(([key, data]) => data.hdvrequis <= hdvLevel)
        .sort((a, b) => a[1].hdvrequis - b[1].hdvrequis);

    // Réinitialiser les options du select
    selectmulti_tour_archere2.innerHTML = "";
    let selectedLevel = null;

    multi_tour_archereLevels.forEach(([key, data]) => {
        const level = parseInt(key.split("_").pop());
        const option = document.createElement("option");
        option.value = level;
        option.textContent = `multi_Tour d'archère 2 Niveau ${level}`;
        selectmulti_tour_archere2.appendChild(option);

        // Si l'ancien niveau est toujours disponible, on le sélectionne
        if (level === currentmulti_tour_archereLevel) {
            selectedLevel = level;
        }
    });

    // Si l'ancien niveau n'existe plus, prendre le niveau le plus bas possible
    if (!selectedLevel) {
        selectedLevel = multi_tour_archereLevels.length ? parseInt(multi_tour_archereLevels[0][0].split("_").pop()) : 0;
    }

    // Si aucun niveau n'est disponible, masquer le multi_tour_archere 1
    if (multi_tour_archereLevels.length === 0) {
        multi_tour_archere2_box.style.display = "none";
        selectmulti_tour_archere2.style.display = "none";
        imagemulti_tour_archere2.style.display = "none";
        infoContainer.style.display = "none";
    } else {
        multi_tour_archere2_box.style.display = "block";
        selectmulti_tour_archere2.style.display = "block";
        imagemulti_tour_archere2.style.display = "block";
        infoContainer.style.display = "block";
        selectmulti_tour_archere2.value = selectedLevel;
        updatemulti_tour_archere2Info();
    }
}

function updatemulti_tour_archere2Info() {
    const niveau = `multi_tour_archere2_nv_${selectmulti_tour_archere2.value}`;
    const data = multi_tour_archere2[niveau];
    const hdvNiveau = parseInt(document.getElementById("hdv").value, 10);
    const prixrestant = calculerPrixRestantmulti_tour_archere2(parseInt(selectmulti_tour_archere2.value, 10),multi_tour_archere2_nv_max_hdv(hdvNiveau));
    const tempsRestant = calculerTempsRestantmulti_tour_archere2(parseInt(selectmulti_tour_archere2.value, 10), multi_tour_archere2_nv_max_hdv(hdvNiveau));

    if (data) {
        imagemulti_tour_archere2.src = data.image;
        imagemulti_tour_archere2.alt = `multi_tour_archere Niveau ${selectmulti_tour_archere2.value}`;
    }
    document.getElementById("multi_tour_archere2_prix_niveau").innerHTML = `Prix restant : ${formatPrix(prixrestant)} <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    document.getElementById("multi_tour_archere2_temps_niveau").innerHTML = `Temps restant: ${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
}
selectHdv.addEventListener("change", updatemulti_tour_archereOptions);
selectmulti_tour_archere2.addEventListener("change", updatemulti_tour_archere2Info);

updatemulti_tour_archereOptions();