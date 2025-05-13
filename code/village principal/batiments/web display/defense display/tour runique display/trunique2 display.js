import { tour_runique2 } from "/coc/code/village principal/batiments/database/data defense/data tour runique.js";
import { tour_runique2_nv_max_hdv } from "/coc/code/village principal/batiments/calculator/defense calc/tour runiques/tour runique2.calc.js";
import { calculerPrixRestanttour_runique2 } from "/coc/code/village principal/batiments/calculator/defense calc/tour runiques/tour runique2.calc.js";
import { calculerTempsRestanttour_runique2 } from "/coc/code/village principal/batiments/calculator/defense calc/tour runiques/tour runique2.calc.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";
import { formatPrix } from "/coc/code/outils/affichge nombre.js";


const tour_runique2_box = document.getElementById("tour_runique2_box");
const selecttour_runique2 = document.getElementById("tour_runique2");
const imagetour_runique2 = document.getElementById("image-tour_runique2");
const selectHdv = document.getElementById("hdv");
const infoContainer = document.createElement("div");
document.body.appendChild(infoContainer);

function updateCanonOptions() {
    const hdvLevel = parseInt(selectHdv.value);
    const currentCanonLevel = parseInt(selecttour_runique2.value) || 0; // Récupérer l'ancien niveau

    // Filtrer les niveaux de Tour arhcere disponibles en fonction de l'HDV
    const canonLevels = Object.entries(tour_runique2)
        .filter(([key, data]) => data.hdvrequis <= hdvLevel)
        .sort((a, b) => a[1].hdvrequis - b[1].hdvrequis);

    // Réinitialiser les options du select
    selecttour_runique2.innerHTML = "";
    let selectedLevel = null;

    canonLevels.forEach(([key, data]) => {
        const level = parseInt(key.split("_").pop());
        const option = document.createElement("option");
        option.value = level;
        option.textContent = `Tour de runique 2 Niveau ${level}`;
        selecttour_runique2.appendChild(option);

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
        tour_runique2_box.style.display = "none";
        selecttour_runique2.style.display = "none";
        imagetour_runique2.style.display = "none";
        infoContainer.style.display = "none";
    } else {
        tour_runique2_box.style.display = "block";
        selecttour_runique2.style.display = "block";
        imagetour_runique2.style.display = "block";
        infoContainer.style.display = "block";
        selecttour_runique2.value = selectedLevel;
        updatetour_runique2Info();
    }
}

function updatetour_runique2Info() {
    const niveau = `tour_runique2_nv_${selecttour_runique2.value}`;
    const data = tour_runique2[niveau];
    const hdvNiveau = parseInt(document.getElementById("hdv").value, 10);
    const prixrestant = calculerPrixRestanttour_runique2(parseInt(selecttour_runique2.value, 10),tour_runique2_nv_max_hdv(hdvNiveau));
    const tempsRestant = calculerTempsRestanttour_runique2(parseInt(selecttour_runique2.value, 10), tour_runique2_nv_max_hdv(hdvNiveau));

    if (data) {
        imagetour_runique2.src = data.image;
        imagetour_runique2.alt = `Tour arhcere Niveau ${selecttour_runique2.value}`;
    }
    document.getElementById("tour_runique2_prix_niveau").innerHTML = `Prix restant : ${formatPrix(prixrestant)} <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    document.getElementById("tour_runique2_temps_niveau").innerHTML = `Temps restant: ${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
}
selectHdv.addEventListener("change", updateCanonOptions);
selecttour_runique2.addEventListener("change", updatetour_runique2Info);

updateCanonOptions();