import { chasseuse_de_tete } from "/coc/code/village principal/laboratoire/database/data troupe elixir noir.js";
import { chasseuse_de_tete_nv_max_laboratoire } from "/coc/code/village principal/laboratoire/calculator/troupe elixir noir/chasseuse_de_tete.calc.js";
import { calculerPrixRestantchasseuse_de_tete } from "/coc/code/village principal/laboratoire/calculator/troupe elixir noir/chasseuse_de_tete.calc.js";
import { calculerTempsRestantchasseuse_de_tete } from "/coc/code/village principal/laboratoire/calculator/troupe elixir noir/chasseuse_de_tete.calc.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";
import { formatPrix } from "/coc/code/outils/affichge nombre.js";


const chasseuse_de_tete_box = document.getElementById("chasseuse_de_tete_box");
const selectchasseuse_de_tete = document.getElementById("chasseuse_de_tete");
const imagechasseuse_de_tete = document.getElementById("image-chasseuse_de_tete");
const selectlaboratoire = document.getElementById("laboratoire");
const infoContainer = document.createElement("div");
document.body.appendChild(infoContainer);

function updatechasseuse_de_teteOptions() {
    const laboratoireLevel = parseInt(selectlaboratoire.value);
    const currentchasseuse_de_teteLevel = parseInt(selectchasseuse_de_tete.value) || 0; // Récupérer l'ancien niveau

    // Filtrer les niveaux de chasseuse_de_tete disponibles en fonction de l'laboratoire
    const chasseuse_de_teteLevels = Object.entries(chasseuse_de_tete)
        .filter(([key, data]) => data.laboratoirerequis <= laboratoireLevel)
        .sort((a, b) => a[1].laboratoirerequis - b[1].laboratoirerequis);

    // Réinitialiser les options du select
    selectchasseuse_de_tete.innerHTML = "";
    let selectedLevel = null;

    chasseuse_de_teteLevels.forEach(([key, data]) => {
        const level = parseInt(key.split("_").pop());
        const option = document.createElement("option");
        option.value = level;
        option.textContent = `chasseuse_de_tete Niveau ${level}`;
        selectchasseuse_de_tete.appendChild(option);

        // Si l'ancien niveau est toujours disponible, on le sélectionne
        if (level === currentchasseuse_de_teteLevel) {
            selectedLevel = level;
        }
    });

    // Si l'ancien niveau n'existe plus, prendre le niveau le plus bas possible
    if (!selectedLevel) {
        selectedLevel = chasseuse_de_teteLevels.length ? parseInt(chasseuse_de_teteLevels[0][0].split("_").pop()) : 0;
    }

    // Si aucun niveau n'est disponible, masquer le chasseuse_de_tete 1
    if (chasseuse_de_teteLevels.length === 0) {
        chasseuse_de_tete_box.style.display = "none";
        selectchasseuse_de_tete.style.display = "none";
        imagechasseuse_de_tete.style.display = "none";
        infoContainer.style.display = "none";
    } else {
        chasseuse_de_tete_box.style.display = "block";
        selectchasseuse_de_tete.style.display = "block";
        imagechasseuse_de_tete.style.display = "block";
        infoContainer.style.display = "block";
        selectchasseuse_de_tete.value = selectedLevel;
        updatechasseuse_de_teteInfo();
    }
}

function updatechasseuse_de_teteInfo() {
    const niveau = `chasseuse_de_tete_nv_${selectchasseuse_de_tete.value}`;
    const data = chasseuse_de_tete[niveau];
    const laboratoireNiveau = parseInt(document.getElementById("laboratoire").value, 10);
    const prixrestant = calculerPrixRestantchasseuse_de_tete(parseInt(selectchasseuse_de_tete.value, 10),chasseuse_de_tete_nv_max_laboratoire(laboratoireNiveau));
    const tempsRestant = calculerTempsRestantchasseuse_de_tete(parseInt(selectchasseuse_de_tete.value, 10), chasseuse_de_tete_nv_max_laboratoire(laboratoireNiveau));

    if (data) {
        imagechasseuse_de_tete.src = data.image;
        imagechasseuse_de_tete.alt = `chasseuse_de_tete Niveau ${selectchasseuse_de_tete.value}`;
    }

    if (prixrestant === 0) {
        document.getElementById("chasseuse_de_tete_prix_niveau").innerHTML = `Prix restant : max <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }
    else {
        document.getElementById("chasseuse_de_tete_prix_niveau").innerHTML = `Prix restant : ${formatPrix(prixrestant)} <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }

    if (tempsRestant === 0) {
        document.getElementById("chasseuse_de_tete_temps_niveau").innerHTML = `Temps restant: max <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
    else{
        document.getElementById("chasseuse_de_tete_temps_niveau").innerHTML = `Temps restant: ${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
}
selectlaboratoire.addEventListener("change", updatechasseuse_de_teteOptions);
selectchasseuse_de_tete.addEventListener("change", updatechasseuse_de_teteInfo);

updatechasseuse_de_teteOptions();