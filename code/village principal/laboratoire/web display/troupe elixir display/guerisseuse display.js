import { guerisseuse } from "/coc/code/village principal/laboratoire/database/data troupe elixir.js";
import { guerisseuse_nv_max_laboratoire } from "/coc/code/village principal/laboratoire/calculator/troupe elixir/guerisseuse.calc.js";
import { calculerPrixRestantguerisseuse } from "/coc/code/village principal/laboratoire/calculator/troupe elixir/guerisseuse.calc.js";
import { calculerTempsRestantguerisseuse } from "/coc/code/village principal/laboratoire/calculator/troupe elixir/guerisseuse.calc.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";
import { formatPrix } from "/coc/code/outils/affichge nombre.js";


const guerisseuse_box = document.getElementById("guerisseuse_box");
const selectguerisseuse = document.getElementById("guerisseuse");
const imageguerisseuse = document.getElementById("image-guerisseuse");
const selectlaboratoire = document.getElementById("laboratoire");
const infoContainer = document.createElement("div");
document.body.appendChild(infoContainer);

function updateguerisseuseOptions() {
    const laboratoireLevel = parseInt(selectlaboratoire.value);
    const currentguerisseuseLevel = parseInt(selectguerisseuse.value) || 0; // Récupérer l'ancien niveau

    // Filtrer les niveaux de guerisseuse disponibles en fonction de l'laboratoire
    const guerisseuseLevels = Object.entries(guerisseuse)
        .filter(([key, data]) => data.laboratoirerequis <= laboratoireLevel)
        .sort((a, b) => a[1].laboratoirerequis - b[1].laboratoirerequis);

    // Réinitialiser les options du select
    selectguerisseuse.innerHTML = "";
    let selectedLevel = null;

    guerisseuseLevels.forEach(([key, data]) => {
        const level = parseInt(key.split("_").pop());
        const option = document.createElement("option");
        option.value = level;
        option.textContent = `guerisseuse Niveau ${level}`;
        selectguerisseuse.appendChild(option);

        // Si l'ancien niveau est toujours disponible, on le sélectionne
        if (level === currentguerisseuseLevel) {
            selectedLevel = level;
        }
    });

    // Si l'ancien niveau n'existe plus, prendre le niveau le plus bas possible
    if (!selectedLevel) {
        selectedLevel = guerisseuseLevels.length ? parseInt(guerisseuseLevels[0][0].split("_").pop()) : 0;
    }

    // Si aucun niveau n'est disponible, masquer le guerisseuse 1
    if (guerisseuseLevels.length === 0) {
        guerisseuse_box.style.display = "none";
        selectguerisseuse.style.display = "none";
        imageguerisseuse.style.display = "none";
        infoContainer.style.display = "none";
    } else {
        guerisseuse_box.style.display = "block";
        selectguerisseuse.style.display = "block";
        imageguerisseuse.style.display = "block";
        infoContainer.style.display = "block";
        selectguerisseuse.value = selectedLevel;
        updateguerisseuseInfo();
    }
}

function updateguerisseuseInfo() {
    const niveau = `guerisseuse_nv_${selectguerisseuse.value}`;
    const data = guerisseuse[niveau];
    const laboratoireNiveau = parseInt(document.getElementById("laboratoire").value, 10);
    const prixrestant = calculerPrixRestantguerisseuse(parseInt(selectguerisseuse.value, 10),guerisseuse_nv_max_laboratoire(laboratoireNiveau));
    const tempsRestant = calculerTempsRestantguerisseuse(parseInt(selectguerisseuse.value, 10), guerisseuse_nv_max_laboratoire(laboratoireNiveau));

    if (data) {
        imageguerisseuse.src = data.image;
        imageguerisseuse.alt = `guerisseuse Niveau ${selectguerisseuse.value}`;
    }

    if (prixrestant === 0) {
        document.getElementById("guerisseuse_prix_niveau").innerHTML = `Prix restant : max <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }
    else {
        document.getElementById("guerisseuse_prix_niveau").innerHTML = `Prix restant : ${formatPrix(prixrestant)} <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }

    if (tempsRestant === 0) {
        document.getElementById("guerisseuse_temps_niveau").innerHTML = `Temps restant: max <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
    else{
        document.getElementById("guerisseuse_temps_niveau").innerHTML = `Temps restant: ${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
}
selectlaboratoire.addEventListener("change", updateguerisseuseOptions);
selectguerisseuse.addEventListener("change", updateguerisseuseInfo);

updateguerisseuseOptions();