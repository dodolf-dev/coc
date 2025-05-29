import { pekka } from "/coc/code/village principal/laboratoire/database/data troupe elixir.js";
import { pekka_nv_max_laboratoire } from "/coc/code/village principal/laboratoire/calculator/troupe elixir/pekka.calc.js";
import { calculerPrixRestantpekka } from "/coc/code/village principal/laboratoire/calculator/troupe elixir/pekka.calc.js";
import { calculerTempsRestantpekka } from "/coc/code/village principal/laboratoire/calculator/troupe elixir/pekka.calc.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";
import { formatPrix } from "/coc/code/outils/affichge nombre.js";


const pekka_box = document.getElementById("pekka_box");
const selectpekka = document.getElementById("pekka");
const imagepekka = document.getElementById("image-pekka");
const selectlaboratoire = document.getElementById("laboratoire");
const infoContainer = document.createElement("div");
document.body.appendChild(infoContainer);

function updatepekkaOptions() {
    const laboratoireLevel = parseInt(selectlaboratoire.value);
    const currentpekkaLevel = parseInt(selectpekka.value) || 0; // Récupérer l'ancien niveau

    // Filtrer les niveaux de pekka disponibles en fonction de l'laboratoire
    const pekkaLevels = Object.entries(pekka)
        .filter(([key, data]) => data.laboratoirerequis <= laboratoireLevel)
        .sort((a, b) => a[1].laboratoirerequis - b[1].laboratoirerequis);

    // Réinitialiser les options du select
    selectpekka.innerHTML = "";
    let selectedLevel = null;

    pekkaLevels.forEach(([key, data]) => {
        const level = parseInt(key.split("_").pop());
        const option = document.createElement("option");
        option.value = level;
        option.textContent = `pekka Niveau ${level}`;
        selectpekka.appendChild(option);

        // Si l'ancien niveau est toujours disponible, on le sélectionne
        if (level === currentpekkaLevel) {
            selectedLevel = level;
        }
    });

    // Si l'ancien niveau n'existe plus, prendre le niveau le plus bas possible
    if (!selectedLevel) {
        selectedLevel = pekkaLevels.length ? parseInt(pekkaLevels[0][0].split("_").pop()) : 0;
    }

    // Si aucun niveau n'est disponible, masquer le pekka 1
    if (pekkaLevels.length === 0) {
        pekka_box.style.display = "none";
        selectpekka.style.display = "none";
        imagepekka.style.display = "none";
        infoContainer.style.display = "none";
    } else {
        pekka_box.style.display = "block";
        selectpekka.style.display = "block";
        imagepekka.style.display = "block";
        infoContainer.style.display = "block";
        selectpekka.value = selectedLevel;
        updatepekkaInfo();
    }
}

function updatepekkaInfo() {
    const niveau = `pekka_nv_${selectpekka.value}`;
    const data = pekka[niveau];
    const laboratoireNiveau = parseInt(document.getElementById("laboratoire").value, 10);
    const prixrestant = calculerPrixRestantpekka(parseInt(selectpekka.value, 10),pekka_nv_max_laboratoire(laboratoireNiveau));
    const tempsRestant = calculerTempsRestantpekka(parseInt(selectpekka.value, 10), pekka_nv_max_laboratoire(laboratoireNiveau));

    if (data) {
        imagepekka.src = data.image;
        imagepekka.alt = `pekka Niveau ${selectpekka.value}`;
    }

    if (prixrestant === 0) {
        document.getElementById("pekka_prix_niveau").innerHTML = `Prix restant : max <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }
    else {
        document.getElementById("pekka_prix_niveau").innerHTML = `Prix restant : ${formatPrix(prixrestant)} <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }

    if (tempsRestant === 0) {
        document.getElementById("pekka_temps_niveau").innerHTML = `Temps restant: max <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
    else{
        document.getElementById("pekka_temps_niveau").innerHTML = `Temps restant: ${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
}
selectlaboratoire.addEventListener("change", updatepekkaOptions);
selectpekka.addEventListener("change", updatepekkaInfo);

updatepekkaOptions();