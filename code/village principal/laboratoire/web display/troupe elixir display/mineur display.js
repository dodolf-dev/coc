import { mineur } from "/coc/code/village principal/laboratoire/database/data troupe elixir.js";
import { mineur_nv_max_laboratoire } from "/coc/code/village principal/laboratoire/calculator/troupe elixir/mineur.calc.js";
import { calculerPrixRestantmineur } from "/coc/code/village principal/laboratoire/calculator/troupe elixir/mineur.calc.js";
import { calculerTempsRestantmineur } from "/coc/code/village principal/laboratoire/calculator/troupe elixir/mineur.calc.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";
import { formatPrix } from "/coc/code/outils/affichge nombre.js";


const mineur_box = document.getElementById("mineur_box");
const selectmineur = document.getElementById("mineur");
const imagemineur = document.getElementById("image-mineur");
const selectlaboratoire = document.getElementById("laboratoire");
const infoContainer = document.createElement("div");
document.body.appendChild(infoContainer);

function updatemineurOptions() {
    const laboratoireLevel = parseInt(selectlaboratoire.value);
    const currentmineurLevel = parseInt(selectmineur.value) || 0; // Récupérer l'ancien niveau

    // Filtrer les niveaux de mineur disponibles en fonction de l'laboratoire
    const mineurLevels = Object.entries(mineur)
        .filter(([key, data]) => data.laboratoirerequis <= laboratoireLevel)
        .sort((a, b) => a[1].laboratoirerequis - b[1].laboratoirerequis);

    // Réinitialiser les options du select
    selectmineur.innerHTML = "";
    let selectedLevel = null;

    mineurLevels.forEach(([key, data]) => {
        const level = parseInt(key.split("_").pop());
        const option = document.createElement("option");
        option.value = level;
        option.textContent = `mineur Niveau ${level}`;
        selectmineur.appendChild(option);

        // Si l'ancien niveau est toujours disponible, on le sélectionne
        if (level === currentmineurLevel) {
            selectedLevel = level;
        }
    });

    // Si l'ancien niveau n'existe plus, prendre le niveau le plus bas possible
    if (!selectedLevel) {
        selectedLevel = mineurLevels.length ? parseInt(mineurLevels[0][0].split("_").pop()) : 0;
    }

    // Si aucun niveau n'est disponible, masquer le mineur 1
    if (mineurLevels.length === 0) {
        mineur_box.style.display = "none";
        selectmineur.style.display = "none";
        imagemineur.style.display = "none";
        infoContainer.style.display = "none";
    } else {
        mineur_box.style.display = "block";
        selectmineur.style.display = "block";
        imagemineur.style.display = "block";
        infoContainer.style.display = "block";
        selectmineur.value = selectedLevel;
        updatemineurInfo();
    }
}

function updatemineurInfo() {
    const niveau = `mineur_nv_${selectmineur.value}`;
    const data = mineur[niveau];
    const laboratoireNiveau = parseInt(document.getElementById("laboratoire").value, 10);
    const prixrestant = calculerPrixRestantmineur(parseInt(selectmineur.value, 10),mineur_nv_max_laboratoire(laboratoireNiveau));
    const tempsRestant = calculerTempsRestantmineur(parseInt(selectmineur.value, 10), mineur_nv_max_laboratoire(laboratoireNiveau));

    if (data) {
        imagemineur.src = data.image;
        imagemineur.alt = `mineur Niveau ${selectmineur.value}`;
    }

    if (prixrestant === 0) {
        document.getElementById("mineur_prix_niveau").innerHTML = `Prix restant : max <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }
    else {
        document.getElementById("mineur_prix_niveau").innerHTML = `Prix restant : ${formatPrix(prixrestant)} <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }

    if (tempsRestant === 0) {
        document.getElementById("mineur_temps_niveau").innerHTML = `Temps restant: max <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
    else{
        document.getElementById("mineur_temps_niveau").innerHTML = `Temps restant: ${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
}
selectlaboratoire.addEventListener("change", updatemineurOptions);
selectmineur.addEventListener("change", updatemineurInfo);

updatemineurOptions();