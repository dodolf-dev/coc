import { tour_archere2 } from "/coc/code/village principal/batiments/database/data defense/data tour archere.js";
import { tour_archere2_nv_max_hdv } from "/coc/code/village principal/batiments/calculator/defense calc/tour archeres/tour archere2.calc.js";
import { calculerPrixRestanttour_archere2 } from "/coc/code/village principal/batiments/calculator/defense calc/tour archeres/tour archere2.calc.js";
import { calculerTempsRestanttour_archere2 } from "/coc/code/village principal/batiments/calculator/defense calc/tour archeres/tour archere2.calc.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";
import { formatPrix } from "/coc/code/outils/affichge nombre.js";


const tour_archere2_box = document.getElementById("tour_archere2_box");
const selecttour_archere2 = document.getElementById("tour_archere2");
const imagetour_archere2 = document.getElementById("image-tour_archere2");
const selectHdv = document.getElementById("hdv");
const infoContainer = document.createElement("div");
document.body.appendChild(infoContainer);

function updatetour_archereOptions() {
    const hdvLevel = parseInt(selectHdv.value);
    const currenttour_archereLevel = parseInt(selecttour_archere2.value) || 0; // Récupérer l'ancien niveau

    // Filtrer les niveaux de tour_archere disponibles en fonction de l'HDV
    const tour_archereLevels = Object.entries(tour_archere2)
        .filter(([key, data]) => data.hdvrequis <= hdvLevel)
        .sort((a, b) => a[1].hdvrequis - b[1].hdvrequis);

    // Réinitialiser les options du select
    selecttour_archere2.innerHTML = "";
    let selectedLevel = null;

    tour_archereLevels.forEach(([key, data]) => {
        const level = parseInt(key.split("_").pop());
        const option = document.createElement("option");
        option.value = level;
        option.textContent = `Tour d'archère 2 Niveau ${level}`;
        selecttour_archere2.appendChild(option);

        // Si l'ancien niveau est toujours disponible, on le sélectionne
        if (level === currenttour_archereLevel) {
            selectedLevel = level;
        }
    });

    // Si l'ancien niveau n'existe plus, prendre le niveau le plus bas possible
    if (!selectedLevel) {
        selectedLevel = tour_archereLevels.length ? parseInt(tour_archereLevels[0][0].split("_").pop()) : 0;
    }

    // Si aucun niveau n'est disponible, masquer le tour_archere 1
    if (tour_archereLevels.length === 0) {
        tour_archere2_box.style.display = "none";
        selecttour_archere2.style.display = "none";
        imagetour_archere2.style.display = "none";
        infoContainer.style.display = "none";
    } else {
        tour_archere2_box.style.display = "block";
        selecttour_archere2.style.display = "block";
        imagetour_archere2.style.display = "block";
        infoContainer.style.display = "block";
        selecttour_archere2.value = selectedLevel;
        updatetour_archere2Info();
    }
}

function updatetour_archere2Info() {
    const niveau = `tour_archere2_nv_${selecttour_archere2.value}`;
    const data = tour_archere2[niveau];
    const hdvNiveau = parseInt(document.getElementById("hdv").value, 10);
    const prixrestant = calculerPrixRestanttour_archere2(parseInt(selecttour_archere2.value, 10),tour_archere2_nv_max_hdv(hdvNiveau));
    const tempsRestant = calculerTempsRestanttour_archere2(parseInt(selecttour_archere2.value, 10), tour_archere2_nv_max_hdv(hdvNiveau));

    if (data) {
        imagetour_archere2.src = data.image;
        imagetour_archere2.alt = `tour_archere Niveau ${selecttour_archere2.value}`;
    }if (prixrestant === 0) {
        document.getElementById("tour_archere2_prix_niveau").innerHTML = `Prix restant : max <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;    
    }
    else {
        document.getElementById("tour_archere2_prix_niveau").innerHTML = `Prix restant : ${formatPrix(prixrestant)} <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }
    if (tempsRestant === 0) {
        document.getElementById("tour_archere2_temps_niveau").innerHTML = `Temps restant: max <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
    else {
        document.getElementById("tour_archere2_temps_niveau").innerHTML = `Temps restant: ${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }}
selectHdv.addEventListener("change", updatetour_archereOptions);
selecttour_archere2.addEventListener("change", updatetour_archere2Info);

updatetour_archereOptions();