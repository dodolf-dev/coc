import { tour_multi_equipee } from "/coc/code/village principal/batiments/database/data defense/data tour multi equipee.js";
import { tour_multi_equipee_nv_max_hdv } from "/coc/code/village principal/batiments/calculator/defense calc/tour multi equipee/tour multi equipee.calc.js";
import { calculerPrixRestanttour_multi_equipee } from "/coc/code/village principal/batiments/calculator/defense calc/tour multi equipee/tour multi equipee.calc.js";
import { calculerTempsRestanttour_multi_equipee } from "/coc/code/village principal/batiments/calculator/defense calc/tour multi equipee/tour multi equipee.calc.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";
import { formatPrix } from "/coc/code/outils/affichge nombre.js";

const tour_multi_equipee_box = document.getElementById("tour_multi_equipee_box");
const selecttour_multi_equipee = document.getElementById("tour_multi_equipee");
const imagetour_multi_equipee = document.getElementById("image-tour_multi_equipee");
const selectHdv = document.getElementById("hdv");
const infoContainer = document.createElement("div");
document.body.appendChild(infoContainer);

function updatearcxOptions() {
    const hdvLevel = parseInt(selectHdv.value);
    const currentarcxLevel = parseInt(selecttour_multi_equipee.value) || 0; // Récupérer l'ancien niveau

    // Filtrer les niveaux de arcx disponibles en fonction de l'HDV
    const arcxLevels = Object.entries(tour_multi_equipee)
        .filter(([key, data]) => data.hdvrequis <= hdvLevel)
        .sort((a, b) => a[1].hdvrequis - b[1].hdvrequis);

    // Réinitialiser les options du select
    selecttour_multi_equipee.innerHTML = "";
    let selectedLevel = null;

    arcxLevels.forEach(([key, data]) => {
        const level = parseInt(key.split("_").pop());
        const option = document.createElement("option");
        option.value = level;
        option.textContent = `tour multi equipee Niveau ${level}`;
        selecttour_multi_equipee.appendChild(option);

        // Si l'ancien niveau est toujours disponible, on le sélectionne
        if (level === currentarcxLevel) {
            selectedLevel = level;
        }
    });

    // Si l'ancien niveau n'existe plus, prendre le niveau le plus bas possible
    if (!selectedLevel) {
        selectedLevel = arcxLevels.length ? parseInt(arcxLevels[0][0].split("_").pop()) : 0;
    }

    // Si aucun niveau n'est disponible, masquer le arcx 1
    if (arcxLevels.length === 0) {
        tour_multi_equipee_box.style.display = "none";
        selecttour_multi_equipee.style.display = "none";
        imagetour_multi_equipee.style.display = "none";
        infoContainer.style.display = "none";
        tour_multi_equipee_block.style.display = "none";
    } else {
        tour_multi_equipee_box.style.display = "block";
        selecttour_multi_equipee.style.display = "block";
        imagetour_multi_equipee.style.display = "block";
        infoContainer.style.display = "block";
        tour_multi_equipee_block.style.display = "block";
        selecttour_multi_equipee.value = selectedLevel;
        updatetour_multi_equipeeInfo();
    }
}

function updatetour_multi_equipeeInfo() {
    /*
    if (parseInt(selecttour_multi_equipee.value) >= 1) {
        // Tour_archere 1
        const selectTour_archere1 = document.getElementById("tour_archere1");
        const tour_archere1_box = document.getElementById("tour_archere1_box");
        if (selectTour_archere1) {
            selectTour_archere1.value = 21;
            selectTour_archere1.dispatchEvent(new Event('change'));
            if (tour_archere1_box) tour_archere1_box.style.display = "none";
        }
        // Canon 1
        const selectCanon1 = document.getElementById("canon1");
        const canon1_box = document.getElementById("canon1_box");
        if (selectCanon1) {
            selectCanon1.value = 21;
            selectCanon1.dispatchEvent(new Event('change'));
            if (canon1_box) canon1_box.style.display = "none";
        }
        // Mortier 1
        const selectMortier1 = document.getElementById("mortier1");
        const mortier1_box = document.getElementById("mortier1_box");
        if (selectMortier1) {
            selectMortier1.value = 21;
            selectMortier1.dispatchEvent(new Event('change'));
            if (mortier1_box) mortier1_box.style.display = "none";
        }
    } else {
        // Afficher tour_archere1, canon1 et mortier1 si besoin
        const tour_archere1_box = document.getElementById("tour_archere1_box");
        const canon1_box = document.getElementById("canon1_box");
        const mortier1_box = document.getElementById("mortier1_box");
        if (tour_archere1_box) tour_archere1_box.style.display = "block";
        if (canon1_box) canon1_box.style.display = "block";
        if (mortier1_box) mortier1_box.style.display = "block";
    }
        */

    const niveau = `tour_multi_equipee_nv_${selecttour_multi_equipee.value}`;
    const data = tour_multi_equipee[niveau];
    const hdvNiveau = parseInt(document.getElementById("hdv").value, 10);
    const prixrestant = calculerPrixRestanttour_multi_equipee(parseInt(selecttour_multi_equipee.value, 10), tour_multi_equipee_nv_max_hdv(hdvNiveau));
    const tempsRestant = calculerTempsRestanttour_multi_equipee(parseInt(selecttour_multi_equipee.value, 10), tour_multi_equipee_nv_max_hdv(hdvNiveau));

    if (data) {
        imagetour_multi_equipee.src = data.image;
        imagetour_multi_equipee.alt = `tour multi equipee Niveau ${selecttour_multi_equipee.value}`;
    }if (prixrestant === 0) {
        document.getElementById("tour_multi_equipee_prix_niveau").innerHTML = `Prix restant : max <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;    
    }
    else {
        document.getElementById("tour_multi_equipee_prix_niveau").innerHTML = `Prix restant : ${formatPrix(prixrestant)} <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }
    if (tempsRestant === 0) {
        document.getElementById("tour_multi_equipee_temps_niveau").innerHTML = `Temps restant: max <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
    else {
        document.getElementById("tour_multi_equipee_temps_niveau").innerHTML = `Temps restant: ${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }}

selectHdv.addEventListener("change", updatearcxOptions);
selecttour_multi_equipee.addEventListener("change", updatetour_multi_equipeeInfo);

updatearcxOptions();