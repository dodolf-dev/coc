import { tour_archere5 } from "/coc/code/village principal/batiments/database/data defense/data tour archere.js";
import { tour_archere5_nv_max_hdv } from "/coc/code/village principal/batiments/calculator/defense calc/tour archeres/tour archere5.calc.js";
import { calculerPrixRestanttour_archere5 } from "/coc/code/village principal/batiments/calculator/defense calc/tour archeres/tour archere5.calc.js";
import { calculerTempsRestanttour_archere5 } from "/coc/code/village principal/batiments/calculator/defense calc/tour archeres/tour archere5.calc.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";
import { formatPrix } from "/coc/code/outils/affichge nombre.js";


const tour_archere5_box = document.getElementById("tour_archere5_box");
const selecttour_archere5 = document.getElementById("tour_archere5");
const imagetour_archere5 = document.getElementById("image-tour_archere5");
const selectHdv = document.getElementById("hdv");
const infoContainer = document.createElement("div");
document.body.appendChild(infoContainer);

function updateCanonOptions() {
    const hdvLevel = parseInt(selectHdv.value);
    const currentCanonLevel = parseInt(selecttour_archere5.value) || 0; // Récupérer l'ancien niveau

    // Filtrer les niveaux de Tour arhcere disponibles en fonction de l'HDV
    const canonLevels = Object.entries(tour_archere5)
        .filter(([key, data]) => data.hdvrequis <= hdvLevel)
        .sort((a, b) => a[1].hdvrequis - b[1].hdvrequis);

    // Réinitialiser les options du select
    selecttour_archere5.innerHTML = "";
    let selectedLevel = null;

    canonLevels.forEach(([key, data]) => {
        const level = parseInt(key.split("_").pop());
        const option = document.createElement("option");
        option.value = level;
        option.textContent = `Tour arhcere 5 Niveau ${level}`;
        selecttour_archere5.appendChild(option);

        // Si l'ancien niveau est toujours disponible, on le sélectionne
        if (level === currentCanonLevel) {
            selectedLevel = level;
        }
    });

    // Si l'ancien niveau n'existe plus, prendre le niveau le plus bas possible
    if (!selectedLevel) {
        selectedLevel = canonLevels.length ? parseInt(canonLevels[0][0].split("_").pop()) : 0;
    }

    // Si aucun niveau n'est disponible, masquer le Tour arhcere 1
    if (canonLevels.length === 0) {
        tour_archere5_box.style.display = "none";
        selecttour_archere5.style.display = "none";
        imagetour_archere5.style.display = "none";
        infoContainer.style.display = "none";
    } else {
        tour_archere5_box.style.display = "block";
        selecttour_archere5.style.display = "block";
        imagetour_archere5.style.display = "block";
        infoContainer.style.display = "block";
        selecttour_archere5.value = selectedLevel;
        updatetour_archere5Info();
    }
}

function updatetour_archere5Info() {
    const niveau = `tour_archere5_nv_${selecttour_archere5.value}`;
    const data = tour_archere5[niveau];
    const hdvNiveau = parseInt(document.getElementById("hdv").value, 10);
    const prixrestant = calculerPrixRestanttour_archere5(parseInt(selecttour_archere5.value, 10),tour_archere5_nv_max_hdv(hdvNiveau));
    const tempsRestant = calculerTempsRestanttour_archere5(parseInt(selecttour_archere5.value, 10), tour_archere5_nv_max_hdv(hdvNiveau));

    if (data) {
        imagetour_archere5.src = data.image;
        imagetour_archere5.alt = `Tour arhcere Niveau ${selecttour_archere5.value}`;
    }
    document.getElementById("tour_archere5_prix_niveau").innerHTML = `Prix restant : ${formatPrix(prixrestant)} <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    document.getElementById("tour_archere5_temps_niveau").innerHTML = `Temps restant: ${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
}
selectHdv.addEventListener("change", updateCanonOptions);
selecttour_archere5.addEventListener("change", updatetour_archere5Info);

updateCanonOptions();