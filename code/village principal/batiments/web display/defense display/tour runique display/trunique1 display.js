import { tour_runique1 } from "/coc/code/village principal/batiments/database/data defense/data tour runique.js";
import { tour_runique1_nv_max_hdv } from "/coc/code/village principal/batiments/calculator/defense calc/tour runiques/tour runique1.calc.js";
import { calculerPrixRestanttour_runique1 } from "/coc/code/village principal/batiments/calculator/defense calc/tour runiques/tour runique1.calc.js";
import { calculerTempsRestanttour_runique1 } from "/coc/code/village principal/batiments/calculator/defense calc/tour runiques/tour runique1.calc.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";
import { formatPrix } from "/coc/code/outils/affichge nombre.js";


const tour_runique1_box = document.getElementById("tour_runique1_box");
const selecttour_runique1 = document.getElementById("tour_runique1");
const imagetour_runique1 = document.getElementById("image-tour_runique1");
const selectHdv = document.getElementById("hdv");
const infoContainer = document.createElement("div");
document.body.appendChild(infoContainer);

function updateCanonOptions() {
    const hdvLevel = parseInt(selectHdv.value);
    const currentCanonLevel = parseInt(selecttour_runique1.value) || 0; // Récupérer l'ancien niveau

    // Filtrer les niveaux de Tour arhcere disponibles en fonction de l'HDV
    const canonLevels = Object.entries(tour_runique1)
        .filter(([key, data]) => data.hdvrequis <= hdvLevel)
        .sort((a, b) => a[1].hdvrequis - b[1].hdvrequis);

    // Réinitialiser les options du select
    selecttour_runique1.innerHTML = "";
    let selectedLevel = null;

    canonLevels.forEach(([key, data]) => {
        const level = parseInt(key.split("_").pop());
        const option = document.createElement("option");
        option.value = level;
        option.textContent = `Tour runique 1 Niveau ${level}`;
        selecttour_runique1.appendChild(option);

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
        tour_runique1_box.style.display = "none";
        selecttour_runique1.style.display = "none";
        imagetour_runique1.style.display = "none";
        infoContainer.style.display = "none";
        tour_runique_block.style.display = "none";
    } else {
        tour_runique1_box.style.display = "block";
        selecttour_runique1.style.display = "block";
        imagetour_runique1.style.display = "block";
        infoContainer.style.display = "block";
        tour_runique_block.style.display = "block";
        selecttour_runique1.value = selectedLevel;
        updatetour_runique1Info();
    }
}

function updatetour_runique1Info() {
    const niveau = `tour_runique1_nv_${selecttour_runique1.value}`;
    const data = tour_runique1[niveau];
    const hdvNiveau = parseInt(document.getElementById("hdv").value, 10);
    const prixrestant = calculerPrixRestanttour_runique1(parseInt(selecttour_runique1.value, 10),tour_runique1_nv_max_hdv(hdvNiveau));
    const tempsRestant = calculerTempsRestanttour_runique1(parseInt(selecttour_runique1.value, 10), tour_runique1_nv_max_hdv(hdvNiveau));

    if (data) {
        imagetour_runique1.src = data.image;
        imagetour_runique1.alt = `Tour arhcere Niveau ${selecttour_runique1.value}`;
    }if (prixrestant === 0) {
        document.getElementById("tour_runique1_prix_niveau").innerHTML = `Prix restant : max <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;    
    }
    else {
        document.getElementById("tour_runique1_prix_niveau").innerHTML = `Prix restant : ${formatPrix(prixrestant)} <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }
    if (tempsRestant === 0) {
        document.getElementById("tour_runique1_temps_niveau").innerHTML = `Temps restant: max <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
    else {
        document.getElementById("tour_runique1_temps_niveau").innerHTML = `Temps restant: ${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }}
selectHdv.addEventListener("change", updateCanonOptions);
selecttour_runique1.addEventListener("change", updatetour_runique1Info);

updateCanonOptions();