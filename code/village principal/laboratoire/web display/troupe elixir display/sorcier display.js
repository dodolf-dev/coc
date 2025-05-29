import { sorcier } from "/coc/code/village principal/laboratoire/database/data troupe elixir.js";
import { sorcier_nv_max_laboratoire } from "/coc/code/village principal/laboratoire/calculator/troupe elixir/sorcier.calc.js";
import { calculerPrixRestantsorcier } from "/coc/code/village principal/laboratoire/calculator/troupe elixir/sorcier.calc.js";
import { calculerTempsRestantsorcier } from "/coc/code/village principal/laboratoire/calculator/troupe elixir/sorcier.calc.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";
import { formatPrix } from "/coc/code/outils/affichge nombre.js";


const sorcier_box = document.getElementById("sorcier_box");
const selectsorcier = document.getElementById("sorcier");
const imagesorcier = document.getElementById("image-sorcier");
const selectlaboratoire = document.getElementById("laboratoire");
const infoContainer = document.createElement("div");
document.body.appendChild(infoContainer);

function updatesorcierOptions() {
    const laboratoireLevel = parseInt(selectlaboratoire.value);
    const currentsorcierLevel = parseInt(selectsorcier.value) || 0; // Récupérer l'ancien niveau

    // Filtrer les niveaux de sorcier disponibles en fonction de l'laboratoire
    const sorcierLevels = Object.entries(sorcier)
        .filter(([key, data]) => data.laboratoirerequis <= laboratoireLevel)
        .sort((a, b) => a[1].laboratoirerequis - b[1].laboratoirerequis);

    // Réinitialiser les options du select
    selectsorcier.innerHTML = "";
    let selectedLevel = null;

    sorcierLevels.forEach(([key, data]) => {
        const level = parseInt(key.split("_").pop());
        const option = document.createElement("option");
        option.value = level;
        option.textContent = `sorcier Niveau ${level}`;
        selectsorcier.appendChild(option);

        // Si l'ancien niveau est toujours disponible, on le sélectionne
        if (level === currentsorcierLevel) {
            selectedLevel = level;
        }
    });

    // Si l'ancien niveau n'existe plus, prendre le niveau le plus bas possible
    if (!selectedLevel) {
        selectedLevel = sorcierLevels.length ? parseInt(sorcierLevels[0][0].split("_").pop()) : 0;
    }

    // Si aucun niveau n'est disponible, masquer le sorcier 1
    if (sorcierLevels.length === 0) {
        sorcier_box.style.display = "none";
        selectsorcier.style.display = "none";
        imagesorcier.style.display = "none";
        infoContainer.style.display = "none";
    } else {
        sorcier_box.style.display = "block";
        selectsorcier.style.display = "block";
        imagesorcier.style.display = "block";
        infoContainer.style.display = "block";
        selectsorcier.value = selectedLevel;
        updatesorcierInfo();
    }
}

function updatesorcierInfo() {
    const niveau = `sorcier_nv_${selectsorcier.value}`;
    const data = sorcier[niveau];
    const laboratoireNiveau = parseInt(document.getElementById("laboratoire").value, 10);
    const prixrestant = calculerPrixRestantsorcier(parseInt(selectsorcier.value, 10),sorcier_nv_max_laboratoire(laboratoireNiveau));
    const tempsRestant = calculerTempsRestantsorcier(parseInt(selectsorcier.value, 10), sorcier_nv_max_laboratoire(laboratoireNiveau));

    if (data) {
        imagesorcier.src = data.image;
        imagesorcier.alt = `sorcier Niveau ${selectsorcier.value}`;
    }

    if (prixrestant === 0) {
        document.getElementById("sorcier_prix_niveau").innerHTML = `Prix restant : max <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }
    else {
        document.getElementById("sorcier_prix_niveau").innerHTML = `Prix restant : ${formatPrix(prixrestant)} <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }

    if (tempsRestant === 0) {
        document.getElementById("sorcier_temps_niveau").innerHTML = `Temps restant: max <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
    else{
        document.getElementById("sorcier_temps_niveau").innerHTML = `Temps restant: ${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
}
selectlaboratoire.addEventListener("change", updatesorcierOptions);
selectsorcier.addEventListener("change", updatesorcierInfo);

updatesorcierOptions();