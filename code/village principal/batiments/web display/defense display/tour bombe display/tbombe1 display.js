import { tour_bombe1 } from "/coc/code/village principal/batiments/database/data defense/data tour bombe.js";
import { tour_bombe1_nv_max_hdv } from "/coc/code/village principal/batiments/calculator/defense calc/tour bombes/tour bombe1.calc.js";
import { calculerPrixRestanttour_bombe1 } from "/coc/code/village principal/batiments/calculator/defense calc/tour bombes/tour bombe1.calc.js";
import { calculerTempsRestanttour_bombe1 } from "/coc/code/village principal/batiments/calculator/defense calc/tour bombes/tour bombe1.calc.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";
import { formatPrix } from "/coc/code/outils/affichge nombre.js";


const tour_bombe1_box = document.getElementById("tour_bombe1_box");
const selecttour_bombe1 = document.getElementById("tour_bombe1");
const imagetour_bombe1 = document.getElementById("image-tour_bombe1");
const selectHdv = document.getElementById("hdv");
const infoContainer = document.createElement("div");
document.body.appendChild(infoContainer);

function updateCanonOptions() {
    const hdvLevel = parseInt(selectHdv.value);
    const currentCanonLevel = parseInt(selecttour_bombe1.value) || 0; // Récupérer l'ancien niveau

    // Filtrer les niveaux de Tour bombe disponibles en fonction de l'HDV
    const canonLevels = Object.entries(tour_bombe1)
        .filter(([key, data]) => data.hdvrequis <= hdvLevel)
        .sort((a, b) => a[1].hdvrequis - b[1].hdvrequis);

    // Réinitialiser les options du select
    selecttour_bombe1.innerHTML = "";
    let selectedLevel = null;

    canonLevels.forEach(([key, data]) => {
        const level = parseInt(key.split("_").pop());
        const option = document.createElement("option");
        option.value = level;
        option.textContent = `Tour à bombe 1 Niveau ${level}`;
        selecttour_bombe1.appendChild(option);

        // Si l'ancien niveau est toujours disponible, on le sélectionne
        if (level === currentCanonLevel) {
            selectedLevel = level;
        }
    });

    // Si l'ancien niveau n'existe plus, prendre le niveau le plus bas possible
    if (!selectedLevel) {
        selectedLevel = canonLevels.length ? parseInt(canonLevels[0][0].split("_").pop()) : 0;
    }

    // Si aucun niveau n'est disponible, masquer le Tour bombe 1
    if (canonLevels.length === 0) {
        tour_bombe1_box.style.display = "none";
        selecttour_bombe1.style.display = "none";
        imagetour_bombe1.style.display = "none";
        infoContainer.style.display = "none";
        tour_bombe_block.style.display = "none";
    } else {
        tour_bombe1_box.style.display = "block";
        selecttour_bombe1.style.display = "block";
        imagetour_bombe1.style.display = "block";
        infoContainer.style.display = "block";
        tour_bombe_block.style.display = "block";
        selecttour_bombe1.value = selectedLevel;
        updatetour_bombe1Info();
    }
}

function updatetour_bombe1Info() {
    const niveau = `tour_bombe1_nv_${selecttour_bombe1.value}`;
    const data = tour_bombe1[niveau];
    const hdvNiveau = parseInt(document.getElementById("hdv").value, 10);
    const prixrestant = calculerPrixRestanttour_bombe1(parseInt(selecttour_bombe1.value, 10),tour_bombe1_nv_max_hdv(hdvNiveau));
    const tempsRestant = calculerTempsRestanttour_bombe1(parseInt(selecttour_bombe1.value, 10), tour_bombe1_nv_max_hdv(hdvNiveau));

    if (data) {
        imagetour_bombe1.src = data.image;
        imagetour_bombe1.alt = `Tour bombe Niveau ${selecttour_bombe1.value}`;
    }if (prixrestant === 0) {
        document.getElementById("tour_bombe1_prix_niveau").innerHTML = `Prix restant : max <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;    
    }
    else {
        document.getElementById("tour_bombe1_prix_niveau").innerHTML = `Prix restant : ${formatPrix(prixrestant)} <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }
    if (tempsRestant === 0) {
        document.getElementById("tour_bombe1_temps_niveau").innerHTML = `Temps restant: max <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
    else {
        document.getElementById("tour_bombe1_temps_niveau").innerHTML = `Temps restant: ${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }}
selectHdv.addEventListener("change", updateCanonOptions);
selecttour_bombe1.addEventListener("change", updatetour_bombe1Info);

updateCanonOptions();