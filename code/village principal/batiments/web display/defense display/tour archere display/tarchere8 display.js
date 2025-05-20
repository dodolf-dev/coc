import { tour_archere8 } from "/coc/code/village principal/batiments/database/data defense/data tour archere.js";
import { tour_archere8_nv_max_hdv } from "/coc/code/village principal/batiments/calculator/defense calc/tour archeres/tour archere8.calc.js";
import { calculerPrixRestanttour_archere8 } from "/coc/code/village principal/batiments/calculator/defense calc/tour archeres/tour archere8.calc.js";
import { calculerTempsRestanttour_archere8 } from "/coc/code/village principal/batiments/calculator/defense calc/tour archeres/tour archere8.calc.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";
import { formatPrix } from "/coc/code/outils/affichge nombre.js";


const tour_archere8_box = document.getElementById("tour_archere8_box");
const selecttour_archere8 = document.getElementById("tour_archere8");
const imagetour_archere8 = document.getElementById("image-tour_archere8");
const selectHdv = document.getElementById("hdv");
const infoContainer = document.createElement("div");
document.body.appendChild(infoContainer);

function updateCanonOptions() {
    const hdvLevel = parseInt(selectHdv.value);
    const currentCanonLevel = parseInt(selecttour_archere8.value) || 0; // Récupérer l'ancien niveau

    // Filtrer les niveaux de Tour arhcere disponibles en fonction de l'HDV
    const canonLevels = Object.entries(tour_archere8)
        .filter(([key, data]) => data.hdvrequis <= hdvLevel)
        .sort((a, b) => a[1].hdvrequis - b[1].hdvrequis);

    // Réinitialiser les options du select
    selecttour_archere8.innerHTML = "";
    let selectedLevel = null;

    canonLevels.forEach(([key, data]) => {
        const level = parseInt(key.split("_").pop());
        const option = document.createElement("option");
        option.value = level;
        option.textContent = `Tour d'archère 8 Niveau ${level}`;
        selecttour_archere8.appendChild(option);

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
        tour_archere8_box.style.display = "none";
        selecttour_archere8.style.display = "none";
        imagetour_archere8.style.display = "none";
        infoContainer.style.display = "none";
    } else {
        tour_archere8_box.style.display = "block";
        selecttour_archere8.style.display = "block";
        imagetour_archere8.style.display = "block";
        infoContainer.style.display = "block";
        selecttour_archere8.value = selectedLevel;
        updatetour_archere8Info();
    }
}

function updatetour_archere8Info() {
    const niveau = `tour_archere8_nv_${selecttour_archere8.value}`;
    const data = tour_archere8[niveau];
    const hdvNiveau = parseInt(document.getElementById("hdv").value, 10);
    const prixrestant = calculerPrixRestanttour_archere8(parseInt(selecttour_archere8.value, 10),tour_archere8_nv_max_hdv(hdvNiveau));
    const tempsRestant = calculerTempsRestanttour_archere8(parseInt(selecttour_archere8.value, 10), tour_archere8_nv_max_hdv(hdvNiveau));

    if (data) {
        imagetour_archere8.src = data.image;
        imagetour_archere8.alt = `Tour arhcere Niveau ${selecttour_archere8.value}`;
    }if (prixrestant === 0) {
        document.getElementById("tour_archere8_prix_niveau").innerHTML = `Prix restant : max <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;    
    }
    else {
        document.getElementById("tour_archere8_prix_niveau").innerHTML = `Prix restant : ${formatPrix(prixrestant)} <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }
    if (tempsRestant === 0) {
        document.getElementById("tour_archere8_temps_niveau").innerHTML = `Temps restant: max <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
    else {
        document.getElementById("tour_archere8_temps_niveau").innerHTML = `Temps restant: ${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }}
selectHdv.addEventListener("change", updateCanonOptions);
selecttour_archere8.addEventListener("change", updatetour_archere8Info);

updateCanonOptions();