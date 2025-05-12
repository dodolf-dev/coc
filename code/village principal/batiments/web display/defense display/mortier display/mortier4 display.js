import { mortier4 } from "/coc/code/village principal/batiments/database/data defense/data mortier.js";
import { mortier4_nv_max_hdv } from "/coc/code/village principal/batiments/calculator/defense calc/mortiers/mortier4.calc.js";
import { calculerPrixRestantmortier4 } from "/coc/code/village principal/batiments/calculator/defense calc/mortiers/mortier4.calc.js";
import { calculerTempsRestantmortier4 } from "/coc/code/village principal/batiments/calculator/defense calc/mortiers/mortier4.calc.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";
import { formatPrix } from "/coc/code/outils/affichge nombre.js";


const mortier4_box = document.getElementById("mortier4_box");
const selectmortier4 = document.getElementById("mortier4");
const imagemortier4 = document.getElementById("image-mortier4");
const selectHdv = document.getElementById("hdv");
const infoContainer = document.createElement("div");
document.body.appendChild(infoContainer);

function updatemortierOptions() {
    const hdvLevel = parseInt(selectHdv.value);
    const currentmortierLevel = parseInt(selectmortier4.value) || 0; // Récupérer l'ancien niveau

    // Filtrer les niveaux de mortier disponibles en fonction de l'HDV
    const mortierLevels = Object.entries(mortier4)
        .filter(([key, data]) => data.hdvrequis <= hdvLevel)
        .sort((a, b) => a[1].hdvrequis - b[1].hdvrequis);

    // Réinitialiser les options du select
    selectmortier4.innerHTML = "";
    let selectedLevel = null;

    mortierLevels.forEach(([key, data]) => {
        const level = parseInt(key.split("_").pop());
        const option = document.createElement("option");
        option.value = level;
        option.textContent = `mortier 4 Niveau ${level}`;
        selectmortier4.appendChild(option);

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
        mortier4_box.style.display = "none";
        selectmortier4.style.display = "none";
        imagemortier4.style.display = "none";
        infoContainer.style.display = "none";
    } else {
        mortier4_box.style.display = "block";
        selectmortier4.style.display = "block";
        imagemortier4.style.display = "block";
        infoContainer.style.display = "block";
        selectmortier4.value = selectedLevel;
        updatemortier4Info();
    }
}

function updatemortier4Info() {
    const niveau = `mortier4_nv_${selectmortier4.value}`;
    const data = mortier4[niveau];
    const hdvNiveau = parseInt(document.getElementById("hdv").value, 10);
    const prixrestant = calculerPrixRestantmortier4(parseInt(selectmortier4.value, 10),mortier4_nv_max_hdv(hdvNiveau));
    const tempsRestant = calculerTempsRestantmortier4(parseInt(selectmortier4.value, 10), mortier4_nv_max_hdv(hdvNiveau));

    if (data) {
        imagemortier4.src = data.image;
        imagemortier4.alt = `mortier Niveau ${selectmortier4.value}`;
    }
    document.getElementById("mortier4_prix_niveau").innerHTML = `Prix restant : ${formatPrix(prixrestant)} <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    document.getElementById("mortier4_temps_niveau").innerHTML = `Temps restant: ${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
}
selectHdv.addEventListener("change", updatemortierOptions);
selectmortier4.addEventListener("change", updatemortier4Info);

updatemortierOptions();
