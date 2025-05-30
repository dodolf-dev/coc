import { def_anti_air2 } from "/coc/code/village principal/batiments/database/data defense/data def anti air.js";
import { def_anti_air2_nv_max_hdv } from "/coc/code/village principal/batiments/calculator/defense calc/anti aeriens/def anti air2.calc.js";
import { calculerPrixRestantdef_anti_air2 } from "/coc/code/village principal/batiments/calculator/defense calc/anti aeriens/def anti air2.calc.js";
import { calculerTempsRestantdef_anti_air2 } from "/coc/code/village principal/batiments/calculator/defense calc/anti aeriens/def anti air2.calc.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";
import { formatPrix } from "/coc/code/outils/affichge nombre.js";


const def_anti_air2_box = document.getElementById("def_anti_air2_box");
const selectdef_anti_air2 = document.getElementById("def_anti_air2");
const imagedef_anti_air2 = document.getElementById("image-def_anti_air2");
const selectHdv = document.getElementById("hdv");
const infoContainer = document.createElement("div");
document.body.appendChild(infoContainer);

function updatedef_anti_airOptions() {
    const hdvLevel = parseInt(selectHdv.value);
    const currentdef_anti_airLevel = parseInt(selectdef_anti_air2.value) || 0; // Récupérer l'ancien niveau

    // Filtrer les niveaux de def_anti_air disponibles en fonction de l'HDV
    const def_anti_airLevels = Object.entries(def_anti_air2)
        .filter(([key, data]) => data.hdvrequis <= hdvLevel)
        .sort((a, b) => a[1].hdvrequis - b[1].hdvrequis);

    // Réinitialiser les options du select
    selectdef_anti_air2.innerHTML = "";
    let selectedLevel = null;

    def_anti_airLevels.forEach(([key, data]) => {
        const level = parseInt(key.split("_").pop());
        const option = document.createElement("option");
        option.value = level;
        option.textContent = `défense anti aérienne 2 Niveau ${level}`;
        selectdef_anti_air2.appendChild(option);

        // Si l'ancien niveau est toujours disponible, on le sélectionne
        if (level === currentdef_anti_airLevel) {
            selectedLevel = level;
        }
    });

    // Si l'ancien niveau n'existe plus, prendre le niveau le plus bas possible
    if (!selectedLevel) {
        selectedLevel = def_anti_airLevels.length ? parseInt(def_anti_airLevels[0][0].split("_").pop()) : 0;
    }

    // Si aucun niveau n'est disponible, masquer le def_anti_air 1
    if (def_anti_airLevels.length === 0) {
        def_anti_air2_box.style.display = "none";
        selectdef_anti_air2.style.display = "none";
        imagedef_anti_air2.style.display = "none";
        infoContainer.style.display = "none";
    } else {
        def_anti_air2_box.style.display = "block";
        selectdef_anti_air2.style.display = "block";
        imagedef_anti_air2.style.display = "block";
        infoContainer.style.display = "block";
        selectdef_anti_air2.value = selectedLevel;
        updatedef_anti_air2Info();
    }
}

function updatedef_anti_air2Info() {
    const niveau = `def_anti_air2_nv_${selectdef_anti_air2.value}`;
    const data = def_anti_air2[niveau];
    const hdvNiveau = parseInt(document.getElementById("hdv").value, 10);
    const prixrestant = calculerPrixRestantdef_anti_air2(parseInt(selectdef_anti_air2.value, 10),def_anti_air2_nv_max_hdv(hdvNiveau));
    const tempsRestant = calculerTempsRestantdef_anti_air2(parseInt(selectdef_anti_air2.value, 10), def_anti_air2_nv_max_hdv(hdvNiveau));

    if (data) {
        imagedef_anti_air2.src = data.image;
        imagedef_anti_air2.alt = `def_anti_air Niveau ${selectdef_anti_air2.value}`;
    }
    if (prixrestant === 0) {
        document.getElementById("def_anti_air2_prix_niveau").innerHTML = `Prix restant : max <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;    
    }
    else {
        document.getElementById("def_anti_air2_prix_niveau").innerHTML = `Prix restant : ${formatPrix(prixrestant)} <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }
    if (tempsRestant === 0) {
        document.getElementById("def_anti_air2_temps_niveau").innerHTML = `Temps restant: max <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
    else {
        document.getElementById("def_anti_air2_temps_niveau").innerHTML = `Temps restant: ${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
}
selectHdv.addEventListener("change", updatedef_anti_airOptions);
selectdef_anti_air2.addEventListener("change", updatedef_anti_air2Info);

updatedef_anti_airOptions();
