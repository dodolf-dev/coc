import { barbare } from "/coc/code/village principal/laboratoire/database/data troupe elixir.js";
import { barbare_nv_max_laboratoire } from "/coc/code/village principal/laboratoire/calculator/troupe elixir calc/barbare.calc.js";
import { calculerPrixRestantbarbare } from "/coc/code/village principal/laboratoire/calculator/troupe elixir calc/barbare.calc.js";
import { calculerTempsRestantbarbare } from "/coc/code/village principal/laboratoire/calculator/troupe elixir calc/barbare.calc.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";
import { formatPrix } from "/coc/code/outils/affichge nombre.js";


const barbare_box = document.getElementById("barbare_box");
const selectbarbare = document.getElementById("barbare");
const imagebarbare = document.getElementById("image-barbare");
const selectlaboratoire = document.getElementById("laboratoire");
const infoContainer = document.createElement("div");
document.body.appendChild(infoContainer);

function updatebarbareOptions() {
    const laboratoireLevel = parseInt(selectlaboratoire.value);
    const currentbarbareLevel = parseInt(selectbarbare.value) || 0; // Récupérer l'ancien niveau

    // Filtrer les niveaux de barbare disponibles en fonction de l'laboratoire
    const barbareLevels = Object.entries(barbare)
        .filter(([key, data]) => data.laboratoirerequis <= laboratoireLevel)
        .sort((a, b) => a[1].laboratoirerequis - b[1].laboratoirerequis);

    // Réinitialiser les options du select
    selectbarbare.innerHTML = "";
    let selectedLevel = null;

    barbareLevels.forEach(([key, data]) => {
        const level = parseInt(key.split("_").pop());
        const option = document.createElement("option");
        option.value = level;
        option.textContent = `barbare 1 Niveau ${level}`;
        selectbarbare.appendChild(option);

        // Si l'ancien niveau est toujours disponible, on le sélectionne
        if (level === currentbarbareLevel) {
            selectedLevel = level;
        }
    });

    // Si l'ancien niveau n'existe plus, prendre le niveau le plus bas possible
    if (!selectedLevel) {
        selectedLevel = barbareLevels.length ? parseInt(barbareLevels[0][0].split("_").pop()) : 0;
    }

    // Si aucun niveau n'est disponible, masquer le barbare 1
    if (barbareLevels.length === 0) {
        barbare_box.style.display = "none";
        selectbarbare.style.display = "none";
        imagebarbare.style.display = "none";
        infoContainer.style.display = "none";
    } else {
        barbare_box.style.display = "block";
        selectbarbare.style.display = "block";
        imagebarbare.style.display = "block";
        infoContainer.style.display = "block";
        selectbarbare.value = selectedLevel;
        updatebarbareInfo();
    }
}

function updatebarbareInfo() {
    const niveau = `barbare_nv_${selectbarbare.value}`;
    const data = barbare[niveau];
    const laboratoireNiveau = parseInt(document.getElementById("laboratoire").value, 10);
    const prixrestant = calculerPrixRestantbarbare(parseInt(selectbarbare.value, 10),barbare_nv_max_laboratoire(laboratoireNiveau));
    const tempsRestant = calculerTempsRestantbarbare(parseInt(selectbarbare.value, 10), barbare_nv_max_laboratoire(laboratoireNiveau));

    if (data) {
        imagebarbare.src = data.image;
        imagebarbare.alt = `barbare Niveau ${selectbarbare.value}`;
    }

    if (prixrestant === 0) {
        document.getElementById("barbare_prix_niveau").innerHTML = `Prix restant : max <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }
    else {
        document.getElementById("barbare_prix_niveau").innerHTML = `Prix restant : ${formatPrix(prixrestant)} <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }

    if (tempsRestant === 0) {
        document.getElementById("barbare_temps_niveau").innerHTML = `Temps restant: max <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
    else{
        document.getElementById("barbare_temps_niveau").innerHTML = `Temps restant: ${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
}
selectlaboratoire.addEventListener("change", updatebarbareOptions);
selectbarbare.addEventListener("change", updatebarbareInfo);

updatebarbareOptions();