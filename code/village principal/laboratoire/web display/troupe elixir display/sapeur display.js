import { sapeur } from "/coc/code/village principal/laboratoire/database/data troupe elixir.js";
import { sapeur_nv_max_laboratoire } from "/coc/code/village principal/laboratoire/calculator/troupe elixir/sapeur.calc.js";
import { calculerPrixRestantsapeur } from "/coc/code/village principal/laboratoire/calculator/troupe elixir/sapeur.calc.js";
import { calculerTempsRestantsapeur } from "/coc/code/village principal/laboratoire/calculator/troupe elixir/sapeur.calc.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";
import { formatPrix } from "/coc/code/outils/affichge nombre.js";


const sapeur_box = document.getElementById("sapeur_box");
const selectsapeur = document.getElementById("sapeur");
const imagesapeur = document.getElementById("image-sapeur");
const selectlaboratoire = document.getElementById("laboratoire");
const infoContainer = document.createElement("div");
document.body.appendChild(infoContainer);

function updatesapeurOptions() {
    const laboratoireLevel = parseInt(selectlaboratoire.value);
    const currentsapeurLevel = parseInt(selectsapeur.value) || 0; // Récupérer l'ancien niveau

    // Filtrer les niveaux de sapeur disponibles en fonction de l'laboratoire
    const sapeurLevels = Object.entries(sapeur)
        .filter(([key, data]) => data.laboratoirerequis <= laboratoireLevel)
        .sort((a, b) => a[1].laboratoirerequis - b[1].laboratoirerequis);

    // Réinitialiser les options du select
    selectsapeur.innerHTML = "";
    let selectedLevel = null;

    sapeurLevels.forEach(([key, data]) => {
        const level = parseInt(key.split("_").pop());
        const option = document.createElement("option");
        option.value = level;
        option.textContent = `sapeur Niveau ${level}`;
        selectsapeur.appendChild(option);

        // Si l'ancien niveau est toujours disponible, on le sélectionne
        if (level === currentsapeurLevel) {
            selectedLevel = level;
        }
    });

    // Si l'ancien niveau n'existe plus, prendre le niveau le plus bas possible
    if (!selectedLevel) {
        selectedLevel = sapeurLevels.length ? parseInt(sapeurLevels[0][0].split("_").pop()) : 0;
    }

    // Si aucun niveau n'est disponible, masquer le sapeur 1
    if (sapeurLevels.length === 0) {
        sapeur_box.style.display = "none";
        selectsapeur.style.display = "none";
        imagesapeur.style.display = "none";
        infoContainer.style.display = "none";
    } else {
        sapeur_box.style.display = "block";
        selectsapeur.style.display = "block";
        imagesapeur.style.display = "block";
        infoContainer.style.display = "block";
        selectsapeur.value = selectedLevel;
        updatesapeurInfo();
    }
}

function updatesapeurInfo() {
    const niveau = `sapeur_nv_${selectsapeur.value}`;
    const data = sapeur[niveau];
    const laboratoireNiveau = parseInt(document.getElementById("laboratoire").value, 10);
    const prixrestant = calculerPrixRestantsapeur(parseInt(selectsapeur.value, 10),sapeur_nv_max_laboratoire(laboratoireNiveau));
    const tempsRestant = calculerTempsRestantsapeur(parseInt(selectsapeur.value, 10), sapeur_nv_max_laboratoire(laboratoireNiveau));

    if (data) {
        imagesapeur.src = data.image;
        imagesapeur.alt = `sapeur Niveau ${selectsapeur.value}`;
    }

    if (prixrestant === 0) {
        document.getElementById("sapeur_prix_niveau").innerHTML = `Prix restant : max <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }
    else {
        document.getElementById("sapeur_prix_niveau").innerHTML = `Prix restant : ${formatPrix(prixrestant)} <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }

    if (tempsRestant === 0) {
        document.getElementById("sapeur_temps_niveau").innerHTML = `Temps restant: max <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
    else{
        document.getElementById("sapeur_temps_niveau").innerHTML = `Temps restant: ${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
}
selectlaboratoire.addEventListener("change", updatesapeurOptions);
selectsapeur.addEventListener("change", updatesapeurInfo);

updatesapeurOptions();