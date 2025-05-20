import { tour_sorcier3 } from "/coc/code/village principal/batiments/database/data defense/data tour sorcier.js";
import { tour_sorcier3_nv_max_hdv } from "/coc/code/village principal/batiments/calculator/defense calc/tour sorciers/tour sorcier3.calc.js";
import { calculerPrixRestanttour_sorcier3 } from "/coc/code/village principal/batiments/calculator/defense calc/tour sorciers/tour sorcier3.calc.js";
import { calculerTempsRestanttour_sorcier3 } from "/coc/code/village principal/batiments/calculator/defense calc/tour sorciers/tour sorcier3.calc.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";
import { formatPrix } from "/coc/code/outils/affichge nombre.js";


const tour_sorcier3_box = document.getElementById("tour_sorcier3_box");
const selecttour_sorcier3 = document.getElementById("tour_sorcier3");
const imagetour_sorcier3 = document.getElementById("image-tour_sorcier3");
const selectHdv = document.getElementById("hdv");
const infoContainer = document.createElement("div");
document.body.appendChild(infoContainer);

function updateCanonOptions() {
    const hdvLevel = parseInt(selectHdv.value);
    const currentCanonLevel = parseInt(selecttour_sorcier3.value) || 0; // Récupérer l'ancien niveau

    // Filtrer les niveaux de Tour arhcere disponibles en fonction de l'HDV
    const canonLevels = Object.entries(tour_sorcier3)
        .filter(([key, data]) => data.hdvrequis <= hdvLevel)
        .sort((a, b) => a[1].hdvrequis - b[1].hdvrequis);

    // Réinitialiser les options du select
    selecttour_sorcier3.innerHTML = "";
    let selectedLevel = null;

    canonLevels.forEach(([key, data]) => {
        const level = parseInt(key.split("_").pop());
        const option = document.createElement("option");
        option.value = level;
        option.textContent = `Tour de sorcier 3 Niveau ${level}`;
        selecttour_sorcier3.appendChild(option);

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
        tour_sorcier3_box.style.display = "none";
        selecttour_sorcier3.style.display = "none";
        imagetour_sorcier3.style.display = "none";
        infoContainer.style.display = "none";
    } else {
        tour_sorcier3_box.style.display = "block";
        selecttour_sorcier3.style.display = "block";
        imagetour_sorcier3.style.display = "block";
        infoContainer.style.display = "block";
        selecttour_sorcier3.value = selectedLevel;
        updatetour_sorcier3Info();
    }
}

function updatetour_sorcier3Info() {
    const niveau = `tour_sorcier3_nv_${selecttour_sorcier3.value}`;
    const data = tour_sorcier3[niveau];
    const hdvNiveau = parseInt(document.getElementById("hdv").value, 10);
    const prixrestant = calculerPrixRestanttour_sorcier3(parseInt(selecttour_sorcier3.value, 10),tour_sorcier3_nv_max_hdv(hdvNiveau));
    const tempsRestant = calculerTempsRestanttour_sorcier3(parseInt(selecttour_sorcier3.value, 10), tour_sorcier3_nv_max_hdv(hdvNiveau));

    if (data) {
        imagetour_sorcier3.src = data.image;
        imagetour_sorcier3.alt = `Tour arhcere Niveau ${selecttour_sorcier3.value}`;
    }if (prixrestant === 0) {
        document.getElementById("tour_sorcier3_prix_niveau").innerHTML = `Prix restant : max <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;    
    }
    else {
        document.getElementById("tour_sorcier3_prix_niveau").innerHTML = `Prix restant : ${formatPrix(prixrestant)} <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }
    if (tempsRestant === 0) {
        document.getElementById("tour_sorcier3_temps_niveau").innerHTML = `Temps restant: max <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
    else {
        document.getElementById("tour_sorcier3_temps_niveau").innerHTML = `Temps restant: ${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }}
selectHdv.addEventListener("change", updateCanonOptions);
selecttour_sorcier3.addEventListener("change", updatetour_sorcier3Info);

updateCanonOptions();