import { electro_titanide } from "/coc/code/village principal/laboratoire/database/data troupe elixir.js";
import { electro_titanide_nv_max_laboratoire } from "/coc/code/village principal/laboratoire/calculator/troupe elixir/electro_titanide.calc.js";
import { calculerPrixRestantelectro_titanide } from "/coc/code/village principal/laboratoire/calculator/troupe elixir/electro_titanide.calc.js";
import { calculerTempsRestantelectro_titanide } from "/coc/code/village principal/laboratoire/calculator/troupe elixir/electro_titanide.calc.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";
import { formatPrix } from "/coc/code/outils/affichge nombre.js";


const electro_titanide_box = document.getElementById("electro_titanide_box");
const selectelectro_titanide = document.getElementById("electro_titanide");
const imageelectro_titanide = document.getElementById("image-electro_titanide");
const selectlaboratoire = document.getElementById("laboratoire");
const infoContainer = document.createElement("div");
document.body.appendChild(infoContainer);

function updateelectro_titanideOptions() {
    const laboratoireLevel = parseInt(selectlaboratoire.value);
    const currentelectro_titanideLevel = parseInt(selectelectro_titanide.value) || 0; // Récupérer l'ancien niveau

    // Filtrer les niveaux de electro_titanide disponibles en fonction de l'laboratoire
    const electro_titanideLevels = Object.entries(electro_titanide)
        .filter(([key, data]) => data.laboratoirerequis <= laboratoireLevel)
        .sort((a, b) => a[1].laboratoirerequis - b[1].laboratoirerequis);

    // Réinitialiser les options du select
    selectelectro_titanide.innerHTML = "";
    let selectedLevel = null;

    electro_titanideLevels.forEach(([key, data]) => {
        const level = parseInt(key.split("_").pop());
        const option = document.createElement("option");
        option.value = level;
        option.textContent = `electro_titanide Niveau ${level}`;
        selectelectro_titanide.appendChild(option);

        // Si l'ancien niveau est toujours disponible, on le sélectionne
        if (level === currentelectro_titanideLevel) {
            selectedLevel = level;
        }
    });

    // Si l'ancien niveau n'existe plus, prendre le niveau le plus bas possible
    if (!selectedLevel) {
        selectedLevel = electro_titanideLevels.length ? parseInt(electro_titanideLevels[0][0].split("_").pop()) : 0;
    }

    // Si aucun niveau n'est disponible, masquer le electro_titanide 1
    if (electro_titanideLevels.length === 0) {
        electro_titanide_box.style.display = "none";
        selectelectro_titanide.style.display = "none";
        imageelectro_titanide.style.display = "none";
        infoContainer.style.display = "none";
    } else {
        electro_titanide_box.style.display = "block";
        selectelectro_titanide.style.display = "block";
        imageelectro_titanide.style.display = "block";
        infoContainer.style.display = "block";
        selectelectro_titanide.value = selectedLevel;
        updateelectro_titanideInfo();
    }
}

function updateelectro_titanideInfo() {
    const niveau = `electro_titanide_nv_${selectelectro_titanide.value}`;
    const data = electro_titanide[niveau];
    const laboratoireNiveau = parseInt(document.getElementById("laboratoire").value, 10);
    const prixrestant = calculerPrixRestantelectro_titanide(parseInt(selectelectro_titanide.value, 10),electro_titanide_nv_max_laboratoire(laboratoireNiveau));
    const tempsRestant = calculerTempsRestantelectro_titanide(parseInt(selectelectro_titanide.value, 10), electro_titanide_nv_max_laboratoire(laboratoireNiveau));

    if (data) {
        imageelectro_titanide.src = data.image;
        imageelectro_titanide.alt = `electro_titanide Niveau ${selectelectro_titanide.value}`;
    }

    if (prixrestant === 0) {
        document.getElementById("electro_titanide_prix_niveau").innerHTML = `Prix restant : max <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }
    else {
        document.getElementById("electro_titanide_prix_niveau").innerHTML = `Prix restant : ${formatPrix(prixrestant)} <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }

    if (tempsRestant === 0) {
        document.getElementById("electro_titanide_temps_niveau").innerHTML = `Temps restant: max <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
    else{
        document.getElementById("electro_titanide_temps_niveau").innerHTML = `Temps restant: ${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
}
selectlaboratoire.addEventListener("change", updateelectro_titanideOptions);
selectelectro_titanide.addEventListener("change", updateelectro_titanideInfo);

updateelectro_titanideOptions();