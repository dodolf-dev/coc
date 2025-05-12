import { mortier2 } from "/coc/code/village principal/batiments/database/data defense/data mortier.js";
import { mortier2_nv_max_hdv } from "/coc/code/village principal/batiments/calculator/defense calc/mortiers/mortier2.calc.js";
import { calculerPrixRestantmortier2 } from "/coc/code/village principal/batiments/calculator/defense calc/mortiers/mortier2.calc.js";
import { calculerTempsRestantmortier2 } from "/coc/code/village principal/batiments/calculator/defense calc/mortiers/mortier2.calc.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";
import { formatPrix } from "/coc/code/outils/affichge nombre.js";


const mortier2_box = document.getElementById("mortier2_box");
const selectmortier2 = document.getElementById("mortier2");
const imagemortier2 = document.getElementById("image-mortier2");
const selectHdv = document.getElementById("hdv");
const infoContainer = document.createElement("div");
document.body.appendChild(infoContainer);

function updatemortierOptions() {
    const hdvLevel = parseInt(selectHdv.value);
    const currentmortierLevel = parseInt(selectmortier2.value) || 0; // Récupérer l'ancien niveau

    // Filtrer les niveaux de mortier disponibles en fonction de l'HDV
    const mortierLevels = Object.entries(mortier2)
        .filter(([key, data]) => data.hdvrequis <= hdvLevel)
        .sort((a, b) => a[1].hdvrequis - b[1].hdvrequis);

    // Réinitialiser les options du select
    selectmortier2.innerHTML = "";
    let selectedLevel = null;

    mortierLevels.forEach(([key, data]) => {
        const level = parseInt(key.split("_").pop());
        const option = document.createElement("option");
        option.value = level;
        option.textContent = `mortier 2 Niveau ${level}`;
        selectmortier2.appendChild(option);

        // Si l'ancien niveau est toujours disponible, on le sélectionne
        if (level === currentmortierLevel) {
            selectedLevel = level;
        }
    });

    // Si l'ancien niveau n'existe plus, prendre le niveau le plus bas possible
    if (!selectedLevel) {
        selectedLevel = mortierLevels.length ? parseInt(mortierLevels[0][0].split("_").pop()) : 0;
    }

    // Si aucun niveau n'est disponible, masquer le mortier 1
    if (mortierLevels.length === 0) {
        mortier2_box.style.display = "none";
        selectmortier2.style.display = "none";
        imagemortier2.style.display = "none";
        infoContainer.style.display = "none";
    } else {
        mortier2_box.style.display = "block";
        selectmortier2.style.display = "block";
        imagemortier2.style.display = "block";
        infoContainer.style.display = "block";
        selectmortier2.value = selectedLevel;
        updatemortier2Info();
    }
}

function updatemortier2Info() {
    const niveau = `mortier2_nv_${selectmortier2.value}`;
    const data = mortier2[niveau];
    const hdvNiveau = parseInt(document.getElementById("hdv").value, 10);
    const prixrestant = calculerPrixRestantmortier2(parseInt(selectmortier2.value, 10),mortier2_nv_max_hdv(hdvNiveau));
    const tempsRestant = calculerTempsRestantmortier2(parseInt(selectmortier2.value, 10), mortier2_nv_max_hdv(hdvNiveau));

    if (data) {
        imagemortier2.src = data.image;
        imagemortier2.alt = `mortier Niveau ${selectmortier2.value}`;
    }
    document.getElementById("mortier2_prix_niveau").innerHTML = `Prix restant : ${formatPrix(prixrestant)} <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    document.getElementById("mortier2_temps_niveau").innerHTML = `Temps restant: ${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
}
selectHdv.addEventListener("change", updatemortierOptions);
selectmortier2.addEventListener("change", updatemortier2Info);

updatemortierOptions();
