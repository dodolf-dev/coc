import { tour_sorcier4 } from "/coc/code/village principal/batiments/database/data defense/data tour sorcier.js";
import { tour_sorcier4_nv_max_hdv } from "/coc/code/village principal/batiments/calculator/defense calc/tour sorciers/tour sorcier4.calc.js";
import { calculerPrixRestanttour_sorcier4 } from "/coc/code/village principal/batiments/calculator/defense calc/tour sorciers/tour sorcier4.calc.js";
import { calculerTempsRestanttour_sorcier4 } from "/coc/code/village principal/batiments/calculator/defense calc/tour sorciers/tour sorcier4.calc.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";
import { formatPrix } from "/coc/code/outils/affichge nombre.js";


const tour_sorcier4_box = document.getElementById("tour_sorcier4_box");
const selecttour_sorcier4 = document.getElementById("tour_sorcier4");
const imagetour_sorcier4 = document.getElementById("image-tour_sorcier4");
const selectHdv = document.getElementById("hdv");
const infoContainer = document.createElement("div");
document.body.appendChild(infoContainer);

function updateCanonOptions() {
    const hdvLevel = parseInt(selectHdv.value);
    const currentCanonLevel = parseInt(selecttour_sorcier4.value) || 0; // Récupérer l'ancien niveau

    // Filtrer les niveaux de Tour arhcere disponibles en fonction de l'HDV
    const canonLevels = Object.entries(tour_sorcier4)
        .filter(([key, data]) => data.hdvrequis <= hdvLevel)
        .sort((a, b) => a[1].hdvrequis - b[1].hdvrequis);

    // Réinitialiser les options du select
    selecttour_sorcier4.innerHTML = "";
    let selectedLevel = null;

    canonLevels.forEach(([key, data]) => {
        const level = parseInt(key.split("_").pop());
        const option = document.createElement("option");
        option.value = level;
        option.textContent = `Tour de sorcier 4 Niveau ${level}`;
        selecttour_sorcier4.appendChild(option);

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
        tour_sorcier4_box.style.display = "none";
        selecttour_sorcier4.style.display = "none";
        imagetour_sorcier4.style.display = "none";
        infoContainer.style.display = "none";
    } else {
        tour_sorcier4_box.style.display = "block";
        selecttour_sorcier4.style.display = "block";
        imagetour_sorcier4.style.display = "block";
        infoContainer.style.display = "block";
        selecttour_sorcier4.value = selectedLevel;
        updatetour_sorcier4Info();
    }
}

function updatetour_sorcier4Info() {
    const niveau = `tour_sorcier4_nv_${selecttour_sorcier4.value}`;
    const data = tour_sorcier4[niveau];
    const hdvNiveau = parseInt(document.getElementById("hdv").value, 10);
    const prixrestant = calculerPrixRestanttour_sorcier4(parseInt(selecttour_sorcier4.value, 10),tour_sorcier4_nv_max_hdv(hdvNiveau));
    const tempsRestant = calculerTempsRestanttour_sorcier4(parseInt(selecttour_sorcier4.value, 10), tour_sorcier4_nv_max_hdv(hdvNiveau));

    if (data) {
        imagetour_sorcier4.src = data.image;
        imagetour_sorcier4.alt = `Tour arhcere Niveau ${selecttour_sorcier4.value}`;
    }if (prixrestant === 0) {
        document.getElementById("tour_sorcier4_prix_niveau").innerHTML = `Prix restant : max <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;    
    }
    else {
        document.getElementById("tour_sorcier4_prix_niveau").innerHTML = `Prix restant : ${formatPrix(prixrestant)} <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }
    if (tempsRestant === 0) {
        document.getElementById("tour_sorcier4_temps_niveau").innerHTML = `Temps restant: max <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
    else {
        document.getElementById("tour_sorcier4_temps_niveau").innerHTML = `Temps restant: ${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }}
selectHdv.addEventListener("change", updateCanonOptions);
selecttour_sorcier4.addEventListener("change", updatetour_sorcier4Info);

updateCanonOptions();