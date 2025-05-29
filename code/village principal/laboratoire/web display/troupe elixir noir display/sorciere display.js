import { sorciere } from "/coc/code/village principal/laboratoire/database/data troupe elixir noir.js";
import { sorciere_nv_max_laboratoire } from "/coc/code/village principal/laboratoire/calculator/troupe elixir noir/sorciere.calc.js";
import { calculerPrixRestantsorciere } from "/coc/code/village principal/laboratoire/calculator/troupe elixir noir/sorciere.calc.js";
import { calculerTempsRestantsorciere } from "/coc/code/village principal/laboratoire/calculator/troupe elixir noir/sorciere.calc.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";
import { formatPrix } from "/coc/code/outils/affichge nombre.js";


const sorciere_box = document.getElementById("sorciere_box");
const selectsorciere = document.getElementById("sorciere");
const imagesorciere = document.getElementById("image-sorciere");
const selectlaboratoire = document.getElementById("laboratoire");
const infoContainer = document.createElement("div");
document.body.appendChild(infoContainer);

function updatesorciereOptions() {
    const laboratoireLevel = parseInt(selectlaboratoire.value);
    const currentsorciereLevel = parseInt(selectsorciere.value) || 0; // Récupérer l'ancien niveau

    // Filtrer les niveaux de sorciere disponibles en fonction de l'laboratoire
    const sorciereLevels = Object.entries(sorciere)
        .filter(([key, data]) => data.laboratoirerequis <= laboratoireLevel)
        .sort((a, b) => a[1].laboratoirerequis - b[1].laboratoirerequis);

    // Réinitialiser les options du select
    selectsorciere.innerHTML = "";
    let selectedLevel = null;

    sorciereLevels.forEach(([key, data]) => {
        const level = parseInt(key.split("_").pop());
        const option = document.createElement("option");
        option.value = level;
        option.textContent = `sorciere Niveau ${level}`;
        selectsorciere.appendChild(option);

        // Si l'ancien niveau est toujours disponible, on le sélectionne
        if (level === currentsorciereLevel) {
            selectedLevel = level;
        }
    });

    // Si l'ancien niveau n'existe plus, prendre le niveau le plus bas possible
    if (!selectedLevel) {
        selectedLevel = sorciereLevels.length ? parseInt(sorciereLevels[0][0].split("_").pop()) : 0;
    }

    // Si aucun niveau n'est disponible, masquer le sorciere 1
    if (sorciereLevels.length === 0) {
        sorciere_box.style.display = "none";
        selectsorciere.style.display = "none";
        imagesorciere.style.display = "none";
        infoContainer.style.display = "none";
    } else {
        sorciere_box.style.display = "block";
        selectsorciere.style.display = "block";
        imagesorciere.style.display = "block";
        infoContainer.style.display = "block";
        selectsorciere.value = selectedLevel;
        updatesorciereInfo();
    }
}

function updatesorciereInfo() {
    const niveau = `sorciere_nv_${selectsorciere.value}`;
    const data = sorciere[niveau];
    const laboratoireNiveau = parseInt(document.getElementById("laboratoire").value, 10);
    const prixrestant = calculerPrixRestantsorciere(parseInt(selectsorciere.value, 10),sorciere_nv_max_laboratoire(laboratoireNiveau));
    const tempsRestant = calculerTempsRestantsorciere(parseInt(selectsorciere.value, 10), sorciere_nv_max_laboratoire(laboratoireNiveau));

    if (data) {
        imagesorciere.src = data.image;
        imagesorciere.alt = `sorciere Niveau ${selectsorciere.value}`;
    }

    if (prixrestant === 0) {
        document.getElementById("sorciere_prix_niveau").innerHTML = `Prix restant : max <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }
    else {
        document.getElementById("sorciere_prix_niveau").innerHTML = `Prix restant : ${formatPrix(prixrestant)} <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }

    if (tempsRestant === 0) {
        document.getElementById("sorciere_temps_niveau").innerHTML = `Temps restant: max <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
    else{
        document.getElementById("sorciere_temps_niveau").innerHTML = `Temps restant: ${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
}
selectlaboratoire.addEventListener("change", updatesorciereOptions);
selectsorciere.addEventListener("change", updatesorciereInfo);

updatesorciereOptions();