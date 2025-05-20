import { mortier3 } from "/coc/code/village principal/batiments/database/data defense/data mortier.js";
import { mortier3_nv_max_hdv } from "/coc/code/village principal/batiments/calculator/defense calc/mortiers/mortier3.calc.js";
import { calculerPrixRestantmortier3 } from "/coc/code/village principal/batiments/calculator/defense calc/mortiers/mortier3.calc.js";
import { calculerTempsRestantmortier3 } from "/coc/code/village principal/batiments/calculator/defense calc/mortiers/mortier3.calc.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";
import { formatPrix } from "/coc/code/outils/affichge nombre.js";


const mortier3_box = document.getElementById("mortier3_box");
const selectmortier3 = document.getElementById("mortier3");
const imagemortier3 = document.getElementById("image-mortier3");
const selectHdv = document.getElementById("hdv");
const infoContainer = document.createElement("div");
document.body.appendChild(infoContainer);

function updatemortierOptions() {
    const hdvLevel = parseInt(selectHdv.value);
    const currentmortierLevel = parseInt(selectmortier3.value) || 0; // Récupérer l'ancien niveau

    // Filtrer les niveaux de mortier disponibles en fonction de l'HDV
    const mortierLevels = Object.entries(mortier3)
        .filter(([key, data]) => data.hdvrequis <= hdvLevel)
        .sort((a, b) => a[1].hdvrequis - b[1].hdvrequis);

    // Réinitialiser les options du select
    selectmortier3.innerHTML = "";
    let selectedLevel = null;

    mortierLevels.forEach(([key, data]) => {
        const level = parseInt(key.split("_").pop());
        const option = document.createElement("option");
        option.value = level;
        option.textContent = `mortier 3 Niveau ${level}`;
        selectmortier3.appendChild(option);

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
        mortier3_box.style.display = "none";
        selectmortier3.style.display = "none";
        imagemortier3.style.display = "none";
        infoContainer.style.display = "none";
    } else {
        mortier3_box.style.display = "block";
        selectmortier3.style.display = "block";
        imagemortier3.style.display = "block";
        infoContainer.style.display = "block";
        selectmortier3.value = selectedLevel;
        updatemortier3Info();
    }
}

function updatemortier3Info() {
    const niveau = `mortier3_nv_${selectmortier3.value}`;
    const data = mortier3[niveau];
    const hdvNiveau = parseInt(document.getElementById("hdv").value, 10);
    const prixrestant = calculerPrixRestantmortier3(parseInt(selectmortier3.value, 10),mortier3_nv_max_hdv(hdvNiveau));
    const tempsRestant = calculerTempsRestantmortier3(parseInt(selectmortier3.value, 10), mortier3_nv_max_hdv(hdvNiveau));

    if (data) {
        imagemortier3.src = data.image;
        imagemortier3.alt = `mortier Niveau ${selectmortier3.value}`;
    }if (prixrestant === 0) {
        document.getElementById("mortier3_prix_niveau").innerHTML = `Prix restant : max <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;    
    }
    else {
        document.getElementById("mortier3_prix_niveau").innerHTML = `Prix restant : ${formatPrix(prixrestant)} <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }
    if (tempsRestant === 0) {
        document.getElementById("mortier3_temps_niveau").innerHTML = `Temps restant: max <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
    else {
        document.getElementById("mortier3_temps_niveau").innerHTML = `Temps restant: ${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }}
selectHdv.addEventListener("change", updatemortierOptions);
selectmortier3.addEventListener("change", updatemortier3Info);

updatemortierOptions();
