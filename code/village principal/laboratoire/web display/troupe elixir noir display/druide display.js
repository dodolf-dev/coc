import { druide } from "/coc/code/village principal/laboratoire/database/data troupe elixir noir.js";
import { druide_nv_max_laboratoire } from "/coc/code/village principal/laboratoire/calculator/troupe elixir noir/druide.calc.js";
import { calculerPrixRestantdruide } from "/coc/code/village principal/laboratoire/calculator/troupe elixir noir/druide.calc.js";
import { calculerTempsRestantdruide } from "/coc/code/village principal/laboratoire/calculator/troupe elixir noir/druide.calc.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";
import { formatPrix } from "/coc/code/outils/affichge nombre.js";


const druide_box = document.getElementById("druide_box");
const selectdruide = document.getElementById("druide");
const imagedruide = document.getElementById("image-druide");
const selectlaboratoire = document.getElementById("laboratoire");
const infoContainer = document.createElement("div");
document.body.appendChild(infoContainer);

function updatedruideOptions() {
    const laboratoireLevel = parseInt(selectlaboratoire.value);
    const currentdruideLevel = parseInt(selectdruide.value) || 0; // Récupérer l'ancien niveau

    // Filtrer les niveaux de druide disponibles en fonction de l'laboratoire
    const druideLevels = Object.entries(druide)
        .filter(([key, data]) => data.laboratoirerequis <= laboratoireLevel)
        .sort((a, b) => a[1].laboratoirerequis - b[1].laboratoirerequis);

    // Réinitialiser les options du select
    selectdruide.innerHTML = "";
    let selectedLevel = null;

    druideLevels.forEach(([key, data]) => {
        const level = parseInt(key.split("_").pop());
        const option = document.createElement("option");
        option.value = level;
        option.textContent = `druide Niveau ${level}`;
        selectdruide.appendChild(option);

        // Si l'ancien niveau est toujours disponible, on le sélectionne
        if (level === currentdruideLevel) {
            selectedLevel = level;
        }
    });

    // Si l'ancien niveau n'existe plus, prendre le niveau le plus bas possible
    if (!selectedLevel) {
        selectedLevel = druideLevels.length ? parseInt(druideLevels[0][0].split("_").pop()) : 0;
    }

    // Si aucun niveau n'est disponible, masquer le druide 1
    if (druideLevels.length === 0) {
        druide_box.style.display = "none";
        selectdruide.style.display = "none";
        imagedruide.style.display = "none";
        infoContainer.style.display = "none";
    } else {
        druide_box.style.display = "block";
        selectdruide.style.display = "block";
        imagedruide.style.display = "block";
        infoContainer.style.display = "block";
        selectdruide.value = selectedLevel;
        updatedruideInfo();
    }
}

function updatedruideInfo() {
    const niveau = `druide_nv_${selectdruide.value}`;
    const data = druide[niveau];
    const laboratoireNiveau = parseInt(document.getElementById("laboratoire").value, 10);
    const prixrestant = calculerPrixRestantdruide(parseInt(selectdruide.value, 10),druide_nv_max_laboratoire(laboratoireNiveau));
    const tempsRestant = calculerTempsRestantdruide(parseInt(selectdruide.value, 10), druide_nv_max_laboratoire(laboratoireNiveau));

    if (data) {
        imagedruide.src = data.image;
        imagedruide.alt = `druide Niveau ${selectdruide.value}`;
    }

    if (prixrestant === 0) {
        document.getElementById("druide_prix_niveau").innerHTML = `Prix restant : max <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }
    else {
        document.getElementById("druide_prix_niveau").innerHTML = `Prix restant : ${formatPrix(prixrestant)} <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }

    if (tempsRestant === 0) {
        document.getElementById("druide_temps_niveau").innerHTML = `Temps restant: max <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
    else{
        document.getElementById("druide_temps_niveau").innerHTML = `Temps restant: ${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
}
selectlaboratoire.addEventListener("change", updatedruideOptions);
selectdruide.addEventListener("change", updatedruideInfo);

updatedruideOptions();