import { tour_archere6 } from "/coc/code/village principal/batiments/database/data defense/data tour archere.js";
import { tour_archere6_nv_max_hdv } from "/coc/code/village principal/batiments/calculator/defense calc/tour archeres/tour archere6.calc.js";
import { calculerPrixRestanttour_archere6 } from "/coc/code/village principal/batiments/calculator/defense calc/tour archeres/tour archere6.calc.js";
import { calculerTempsRestanttour_archere6 } from "/coc/code/village principal/batiments/calculator/defense calc/tour archeres/tour archere6.calc.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";
import { formatPrix } from "/coc/code/outils/affichge nombre.js";


const tour_archere6_box = document.getElementById("tour_archere6_box");
const selecttour_archere6 = document.getElementById("tour_archere6");
const imagetour_archere6 = document.getElementById("image-tour_archere6");
const selectHdv = document.getElementById("hdv");
const infoContainer = document.createElement("div");
document.body.appendChild(infoContainer);

function updateCanonOptions() {
    const hdvLevel = parseInt(selectHdv.value);
    const currentCanonLevel = parseInt(selecttour_archere6.value) || 0; // Récupérer l'ancien niveau

    // Filtrer les niveaux de Tour arhcere disponibles en fonction de l'HDV
    const canonLevels = Object.entries(tour_archere6)
        .filter(([key, data]) => data.hdvrequis <= hdvLevel)
        .sort((a, b) => a[1].hdvrequis - b[1].hdvrequis);

    // Réinitialiser les options du select
    selecttour_archere6.innerHTML = "";
    let selectedLevel = null;

    canonLevels.forEach(([key, data]) => {
        const level = parseInt(key.split("_").pop());
        const option = document.createElement("option");
        option.value = level;
        option.textContent = `Tour d'archère 6 Niveau ${level}`;
        selecttour_archere6.appendChild(option);

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
        tour_archere6_box.style.display = "none";
        selecttour_archere6.style.display = "none";
        imagetour_archere6.style.display = "none";
        infoContainer.style.display = "none";
    } else {
        tour_archere6_box.style.display = "block";
        selecttour_archere6.style.display = "block";
        imagetour_archere6.style.display = "block";
        infoContainer.style.display = "block";
        selecttour_archere6.value = selectedLevel;
        updatetour_archere6Info();
    }
}

function updatetour_archere6Info() {
    const niveau = `tour_archere6_nv_${selecttour_archere6.value}`;
    const data = tour_archere6[niveau];
    const hdvNiveau = parseInt(document.getElementById("hdv").value, 10);
    const prixrestant = calculerPrixRestanttour_archere6(parseInt(selecttour_archere6.value, 10),tour_archere6_nv_max_hdv(hdvNiveau));
    const tempsRestant = calculerTempsRestanttour_archere6(parseInt(selecttour_archere6.value, 10), tour_archere6_nv_max_hdv(hdvNiveau));

    if (data) {
        imagetour_archere6.src = data.image;
        imagetour_archere6.alt = `Tour arhcere Niveau ${selecttour_archere6.value}`;
    }
    document.getElementById("tour_archere6_prix_niveau").innerHTML = `Prix restant : ${formatPrix(prixrestant)} <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    document.getElementById("tour_archere6_temps_niveau").innerHTML = `Temps restant: ${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
}
selectHdv.addEventListener("change", updateCanonOptions);
selecttour_archere6.addEventListener("change", updatetour_archere6Info);

updateCanonOptions();