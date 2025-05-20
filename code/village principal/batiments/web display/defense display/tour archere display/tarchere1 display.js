import { tour_archere1 } from "/coc/code/village principal/batiments/database/data defense/data tour archere.js";
import { tour_archere1_nv_max_hdv } from "/coc/code/village principal/batiments/calculator/defense calc/tour archeres/tour archere1.calc.js";
import { calculerPrixRestanttour_archere1 } from "/coc/code/village principal/batiments/calculator/defense calc/tour archeres/tour archere1.calc.js";
import { calculerTempsRestanttour_archere1 } from "/coc/code/village principal/batiments/calculator/defense calc/tour archeres/tour archere1.calc.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";
import { formatPrix } from "/coc/code/outils/affichge nombre.js";


const tour_archere1_box = document.getElementById("tour_archere1_box");
const selecttour_archere1 = document.getElementById("tour_archere1");
const imagetour_archere1 = document.getElementById("image-tour_archere1");
const selectHdv = document.getElementById("hdv");
const infoContainer = document.createElement("div");
document.body.appendChild(infoContainer);

function updateCanonOptions() {
    const hdvLevel = parseInt(selectHdv.value);
    const currentCanonLevel = parseInt(selecttour_archere1.value) || 0; // Récupérer l'ancien niveau

    // Filtrer les niveaux de Tour arhcere disponibles en fonction de l'HDV
    const canonLevels = Object.entries(tour_archere1)
        .filter(([key, data]) => data.hdvrequis <= hdvLevel)
        .sort((a, b) => a[1].hdvrequis - b[1].hdvrequis);

    // Réinitialiser les options du select
    selecttour_archere1.innerHTML = "";
    let selectedLevel = null;

    canonLevels.forEach(([key, data]) => {
        const level = parseInt(key.split("_").pop());
        const option = document.createElement("option");
        option.value = level;
        option.textContent = `Tour d'arhcère 1 Niveau ${level}`;
        selecttour_archere1.appendChild(option);

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
        tour_archere1_box.style.display = "none";
        selecttour_archere1.style.display = "none";
        imagetour_archere1.style.display = "none";
        infoContainer.style.display = "none";
        tour_archere_block.style.display = "none";
    } else {
        tour_archere1_box.style.display = "block";
        selecttour_archere1.style.display = "block";
        imagetour_archere1.style.display = "block";
        infoContainer.style.display = "block";
        tour_archere_block.style.display = "block";
        selecttour_archere1.value = selectedLevel;
        updatetour_archere1Info();
    }
}

function updatetour_archere1Info() {
    const niveau = `tour_archere1_nv_${selecttour_archere1.value}`;
    const data = tour_archere1[niveau];
    const hdvNiveau = parseInt(document.getElementById("hdv").value, 10);
    const prixrestant = calculerPrixRestanttour_archere1(parseInt(selecttour_archere1.value, 10),tour_archere1_nv_max_hdv(hdvNiveau));
    const tempsRestant = calculerTempsRestanttour_archere1(parseInt(selecttour_archere1.value, 10), tour_archere1_nv_max_hdv(hdvNiveau));

    if (data) {
        imagetour_archere1.src = data.image;
        imagetour_archere1.alt = `Tour arhcere Niveau ${selecttour_archere1.value}`;
    }if (prixrestant === 0) {
        document.getElementById("tour_archere1_prix_niveau").innerHTML = `Prix restant : max <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;    
    }
    else {
        document.getElementById("tour_archere1_prix_niveau").innerHTML = `Prix restant : ${formatPrix(prixrestant)} <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }
    if (tempsRestant === 0) {
        document.getElementById("tour_archere1_temps_niveau").innerHTML = `Temps restant: max <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
    else {
        document.getElementById("tour_archere1_temps_niveau").innerHTML = `Temps restant: ${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }}
selectHdv.addEventListener("change", updateCanonOptions);
selecttour_archere1.addEventListener("change", updatetour_archere1Info);

updateCanonOptions();