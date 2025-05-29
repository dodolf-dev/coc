import { gobelin } from "/coc/code/village principal/laboratoire/database/data troupe elixir.js";
import { gobelin_nv_max_laboratoire } from "/coc/code/village principal/laboratoire/calculator/troupe elixir/gobelin.calc.js";
import { calculerPrixRestantgobelin } from "/coc/code/village principal/laboratoire/calculator/troupe elixir/gobelin.calc.js";
import { calculerTempsRestantgobelin } from "/coc/code/village principal/laboratoire/calculator/troupe elixir/gobelin.calc.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";
import { formatPrix } from "/coc/code/outils/affichge nombre.js";


const gobelin_box = document.getElementById("gobelin_box");
const selectgobelin = document.getElementById("gobelin");
const imagegobelin = document.getElementById("image-gobelin");
const selectlaboratoire = document.getElementById("laboratoire");
const infoContainer = document.createElement("div");
document.body.appendChild(infoContainer);

function updategobelinOptions() {
    const laboratoireLevel = parseInt(selectlaboratoire.value);
    const currentgobelinLevel = parseInt(selectgobelin.value) || 0; // Récupérer l'ancien niveau

    // Filtrer les niveaux de gobelin disponibles en fonction de l'laboratoire
    const gobelinLevels = Object.entries(gobelin)
        .filter(([key, data]) => data.laboratoirerequis <= laboratoireLevel)
        .sort((a, b) => a[1].laboratoirerequis - b[1].laboratoirerequis);

    // Réinitialiser les options du select
    selectgobelin.innerHTML = "";
    let selectedLevel = null;

    gobelinLevels.forEach(([key, data]) => {
        const level = parseInt(key.split("_").pop());
        const option = document.createElement("option");
        option.value = level;
        option.textContent = `gobelin Niveau ${level}`;
        selectgobelin.appendChild(option);

        // Si l'ancien niveau est toujours disponible, on le sélectionne
        if (level === currentgobelinLevel) {
            selectedLevel = level;
        }
    });

    // Si l'ancien niveau n'existe plus, prendre le niveau le plus bas possible
    if (!selectedLevel) {
        selectedLevel = gobelinLevels.length ? parseInt(gobelinLevels[0][0].split("_").pop()) : 0;
    }

    // Si aucun niveau n'est disponible, masquer le gobelin 1
    if (gobelinLevels.length === 0) {
        gobelin_box.style.display = "none";
        selectgobelin.style.display = "none";
        imagegobelin.style.display = "none";
        infoContainer.style.display = "none";
    } else {
        gobelin_box.style.display = "block";
        selectgobelin.style.display = "block";
        imagegobelin.style.display = "block";
        infoContainer.style.display = "block";
        selectgobelin.value = selectedLevel;
        updategobelinInfo();
    }
}

function updategobelinInfo() {
    const niveau = `gobelin_nv_${selectgobelin.value}`;
    const data = gobelin[niveau];
    const laboratoireNiveau = parseInt(document.getElementById("laboratoire").value, 10);
    const prixrestant = calculerPrixRestantgobelin(parseInt(selectgobelin.value, 10),gobelin_nv_max_laboratoire(laboratoireNiveau));
    const tempsRestant = calculerTempsRestantgobelin(parseInt(selectgobelin.value, 10), gobelin_nv_max_laboratoire(laboratoireNiveau));

    if (data) {
        imagegobelin.src = data.image;
        imagegobelin.alt = `gobelin Niveau ${selectgobelin.value}`;
    }

    if (prixrestant === 0) {
        document.getElementById("gobelin_prix_niveau").innerHTML = `Prix restant : max <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }
    else {
        document.getElementById("gobelin_prix_niveau").innerHTML = `Prix restant : ${formatPrix(prixrestant)} <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }

    if (tempsRestant === 0) {
        document.getElementById("gobelin_temps_niveau").innerHTML = `Temps restant: max <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
    else{
        document.getElementById("gobelin_temps_niveau").innerHTML = `Temps restant: ${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
}
selectlaboratoire.addEventListener("change", updategobelinOptions);
selectgobelin.addEventListener("change", updategobelinInfo);

updategobelinOptions();