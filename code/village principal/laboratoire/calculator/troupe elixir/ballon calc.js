import { ballon } from "/coc/code/village principal/laboratoire/database/data troupe elixir.js";
import { ballon_nv_max_laboratoire } from "/coc/code/village principal/laboratoire/calculator/troupe elixir calc/ballon.calc.js";
import { calculerPrixRestantballon } from "/coc/code/village principal/laboratoire/calculator/troupe elixir calc/ballon.calc.js";
import { calculerTempsRestantballon } from "/coc/code/village principal/laboratoire/calculator/troupe elixir calc/ballon.calc.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";
import { formatPrix } from "/coc/code/outils/affichge nombre.js";


const ballon_box = document.getElementById("ballon_box");
const selectballon = document.getElementById("ballon");
const imageballon = document.getElementById("image-ballon");
const selectlaboratoire = document.getElementById("laboratoire");
const infoContainer = document.createElement("div");
document.body.appendChild(infoContainer);

function updateballonOptions() {
    const laboratoireLevel = parseInt(selectlaboratoire.value);
    const currentballonLevel = parseInt(selectballon.value) || 0; // Récupérer l'ancien niveau

    // Filtrer les niveaux de ballon disponibles en fonction de l'laboratoire
    const ballonLevels = Object.entries(ballon)
        .filter(([key, data]) => data.laboratoirerequis <= laboratoireLevel)
        .sort((a, b) => a[1].laboratoirerequis - b[1].laboratoirerequis);

    // Réinitialiser les options du select
    selectballon.innerHTML = "";
    let selectedLevel = null;

    ballonLevels.forEach(([key, data]) => {
        const level = parseInt(key.split("_").pop());
        const option = document.createElement("option");
        option.value = level;
        option.textContent = `ballon 1 Niveau ${level}`;
        selectballon.appendChild(option);

        // Si l'ancien niveau est toujours disponible, on le sélectionne
        if (level === currentballonLevel) {
            selectedLevel = level;
        }
    });

    // Si l'ancien niveau n'existe plus, prendre le niveau le plus bas possible
    if (!selectedLevel) {
        selectedLevel = ballonLevels.length ? parseInt(ballonLevels[0][0].split("_").pop()) : 0;
    }

    // Si aucun niveau n'est disponible, masquer le ballon 1
    if (ballonLevels.length === 0) {
        ballon_box.style.display = "none";
        selectballon.style.display = "none";
        imageballon.style.display = "none";
        infoContainer.style.display = "none";
    } else {
        ballon_box.style.display = "block";
        selectballon.style.display = "block";
        imageballon.style.display = "block";
        infoContainer.style.display = "block";
        selectballon.value = selectedLevel;
        updateballonInfo();
    }
}

function updateballonInfo() {
    const niveau = `ballon_nv_${selectballon.value}`;
    const data = ballon[niveau];
    const laboratoireNiveau = parseInt(document.getElementById("laboratoire").value, 10);
    const prixrestant = calculerPrixRestantballon(parseInt(selectballon.value, 10),ballon_nv_max_laboratoire(laboratoireNiveau));
    const tempsRestant = calculerTempsRestantballon(parseInt(selectballon.value, 10), ballon_nv_max_laboratoire(laboratoireNiveau));

    if (data) {
        imageballon.src = data.image;
        imageballon.alt = `ballon Niveau ${selectballon.value}`;
    }

    if (prixrestant === 0) {
        document.getElementById("ballon_prix_niveau").innerHTML = `Prix restant : max <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }
    else {
        document.getElementById("ballon_prix_niveau").innerHTML = `Prix restant : ${formatPrix(prixrestant)} <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }

    if (tempsRestant === 0) {
        document.getElementById("ballon_temps_niveau").innerHTML = `Temps restant: max <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
    else{
        document.getElementById("ballon_temps_niveau").innerHTML = `Temps restant: ${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
}
selectlaboratoire.addEventListener("change", updateballonOptions);
selectballon.addEventListener("change", updateballonInfo);

updateballonOptions();