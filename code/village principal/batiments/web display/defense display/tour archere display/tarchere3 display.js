import { tour_archere3 } from "/coc/code/village principal/batiments/database/data defense/data tour archere.js";
import { tour_archere3_nv_max_hdv } from "/coc/code/village principal/batiments/calculator/defense calc/tour archeres/tour archere3.calc.js";
import { calculerPrixRestanttour_archere3 } from "/coc/code/village principal/batiments/calculator/defense calc/tour archeres/tour archere3.calc.js";
import { calculerTempsRestanttour_archere3 } from "/coc/code/village principal/batiments/calculator/defense calc/tour archeres/tour archere3.calc.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";
import { formatPrix } from "/coc/code/outils/affichge nombre.js";


const tour_archere3_box = document.getElementById("tour_archere3_box");
const selecttour_archere3 = document.getElementById("tour_archere3");
const imagetour_archere3 = document.getElementById("image-tour_archere3");
const selectHdv = document.getElementById("hdv");
const infoContainer = document.createElement("div");
document.body.appendChild(infoContainer);

function updateCanonOptions() {
    const hdvLevel = parseInt(selectHdv.value);
    const currentCanonLevel = parseInt(selecttour_archere3.value) || 0; // Récupérer l'ancien niveau

    // Filtrer les niveaux de Tour arhcere disponibles en fonction de l'HDV
    const canonLevels = Object.entries(tour_archere3)
        .filter(([key, data]) => data.hdvrequis <= hdvLevel)
        .sort((a, b) => a[1].hdvrequis - b[1].hdvrequis);

    // Réinitialiser les options du select
    selecttour_archere3.innerHTML = "";
    let selectedLevel = null;

    canonLevels.forEach(([key, data]) => {
        const level = parseInt(key.split("_").pop());
        const option = document.createElement("option");
        option.value = level;
        option.textContent = `Tour d'archère 3 Niveau ${level}`;
        selecttour_archere3.appendChild(option);

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
        tour_archere3_box.style.display = "none";
        selecttour_archere3.style.display = "none";
        imagetour_archere3.style.display = "none";
        infoContainer.style.display = "none";
    } else {
        tour_archere3_box.style.display = "block";
        selecttour_archere3.style.display = "block";
        imagetour_archere3.style.display = "block";
        infoContainer.style.display = "block";
        selecttour_archere3.value = selectedLevel;
        updatetour_archere3Info();
    }
}

function updatetour_archere3Info() {
    const niveau = `tour_archere3_nv_${selecttour_archere3.value}`;
    const data = tour_archere3[niveau];
    const hdvNiveau = parseInt(document.getElementById("hdv").value, 10);
    const prixrestant = calculerPrixRestanttour_archere3(parseInt(selecttour_archere3.value, 10),tour_archere3_nv_max_hdv(hdvNiveau));
    const tempsRestant = calculerTempsRestanttour_archere3(parseInt(selecttour_archere3.value, 10), tour_archere3_nv_max_hdv(hdvNiveau));

    if (data) {
        imagetour_archere3.src = data.image;
        imagetour_archere3.alt = `Tour arhcere Niveau ${selecttour_archere3.value}`;
    }if (prixrestant === 0) {
        document.getElementById("tour_archere3_prix_niveau").innerHTML = `Prix restant : max <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;    
    }
    else {
        document.getElementById("tour_archere3_prix_niveau").innerHTML = `Prix restant : ${formatPrix(prixrestant)} <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }
    if (tempsRestant === 0) {
        document.getElementById("tour_archere3_temps_niveau").innerHTML = `Temps restant: max <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
    else {
        document.getElementById("tour_archere3_temps_niveau").innerHTML = `Temps restant: ${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }}
selectHdv.addEventListener("change", updateCanonOptions);
selecttour_archere3.addEventListener("change", updatetour_archere3Info);

updateCanonOptions();