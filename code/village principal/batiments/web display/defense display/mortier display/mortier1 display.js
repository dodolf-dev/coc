import { mortier1 } from "/coc/code/village principal/batiments/database/data defense/data mortier.js";
import { mortier1_nv_max_hdv } from "/coc/code/village principal/batiments/calculator/defense calc/mortiers/mortier1.calc.js";
import { calculerPrixRestantmortier1 } from "/coc/code/village principal/batiments/calculator/defense calc/mortiers/mortier1.calc.js";
import { calculerTempsRestantmortier1 } from "/coc/code/village principal/batiments/calculator/defense calc/mortiers/mortier1.calc.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";
import { formatPrix } from "/coc/code/outils/affichge nombre.js";


const mortier1_box = document.getElementById("mortier1_box");
const selectmortier1 = document.getElementById("mortier1");
const imagemortier1 = document.getElementById("image-mortier1");
const selectHdv = document.getElementById("hdv");
const infoContainer = document.createElement("div");
document.body.appendChild(infoContainer);

function updatemortierOptions() {
    const hdvLevel = parseInt(selectHdv.value);
    const currentmortierLevel = parseInt(selectmortier1.value) || 0; // Récupérer l'ancien niveau

    // Filtrer les niveaux de mortier disponibles en fonction de l'HDV
    const mortierLevels = Object.entries(mortier1)
        .filter(([key, data]) => data.hdvrequis <= hdvLevel)
        .sort((a, b) => a[1].hdvrequis - b[1].hdvrequis);

    // Réinitialiser les options du select
    selectmortier1.innerHTML = "";
    let selectedLevel = null;

    mortierLevels.forEach(([key, data]) => {
        const level = parseInt(key.split("_").pop());
        const option = document.createElement("option");
        option.value = level;
        option.textContent = `mortier 1 Niveau ${level}`;
        selectmortier1.appendChild(option);

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
        mortier1_box.style.display = "none";
        selectmortier1.style.display = "none";
        imagemortier1.style.display = "none";
        infoContainer.style.display = "none";
        mortier_block.style.display = "none";
    } else {
        mortier1_box.style.display = "block";
        selectmortier1.style.display = "block";
        imagemortier1.style.display = "block";
        infoContainer.style.display = "block";
        mortier_block.style.display = "block";
        selectmortier1.value = selectedLevel;
        updatemortier1Info();
    }
}

function updatemortier1Info() {
    const niveau = `mortier1_nv_${selectmortier1.value}`;
    const data = mortier1[niveau];
    const hdvNiveau = parseInt(document.getElementById("hdv").value, 10);
    const prixrestant = calculerPrixRestantmortier1(parseInt(selectmortier1.value, 10),mortier1_nv_max_hdv(hdvNiveau));
    const tempsRestant = calculerTempsRestantmortier1(parseInt(selectmortier1.value, 10), mortier1_nv_max_hdv(hdvNiveau));

    if (data) {
        imagemortier1.src = data.image;
        imagemortier1.alt = `mortier Niveau ${selectmortier1.value}`;
    }    if (prixrestant === 0) {
        document.getElementById("mortier1_prix_niveau").innerHTML = `Prix restant : max <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;    
    }
    else {
        document.getElementById("mortier1_prix_niveau").innerHTML = `Prix restant : ${formatPrix(prixrestant)} <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }
    if (tempsRestant === 0) {
        document.getElementById("mortier1_temps_niveau").innerHTML = `Temps restant: max <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
    else {
        document.getElementById("mortier1_temps_niveau").innerHTML = `Temps restant: ${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }}
selectHdv.addEventListener("change", updatemortierOptions);
selectmortier1.addEventListener("change", updatemortier1Info);

updatemortierOptions();