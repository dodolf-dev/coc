import { def_anti_air1 } from "/coc/code/village principal/batiments/database/data defense/data def anti air.js";
import { def_anti_air1_nv_max_hdv } from "/coc/code/village principal/batiments/calculator/defense calc/anti aeriens/def anti air1.calc.js";
import { calculerPrixRestantdef_anti_air1 } from "/coc/code/village principal/batiments/calculator/defense calc/anti aeriens/def anti air1.calc.js";
import { calculerTempsRestantdef_anti_air1 } from "/coc/code/village principal/batiments/calculator/defense calc/anti aeriens/def anti air1.calc.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";
import { formatPrix } from "/coc/code/outils/affichge nombre.js";


const def_anti_air1_box = document.getElementById("def_anti_air1_box");
const selectdef_anti_air1 = document.getElementById("def_anti_air1");
const imagedef_anti_air1 = document.getElementById("image-def_anti_air1");
const selectHdv = document.getElementById("hdv");
const infoContainer = document.createElement("div");
document.body.appendChild(infoContainer);

function updatedef_anti_airOptions() {
    const hdvLevel = parseInt(selectHdv.value);
    const currentdef_anti_airLevel = parseInt(selectdef_anti_air1.value) || 0; // Récupérer l'ancien niveau

    // Filtrer les niveaux de def_anti_air disponibles en fonction de l'HDV
    const def_anti_airLevels = Object.entries(def_anti_air1)
        .filter(([key, data]) => data.hdvrequis <= hdvLevel)
        .sort((a, b) => a[1].hdvrequis - b[1].hdvrequis);

    // Réinitialiser les options du select
    selectdef_anti_air1.innerHTML = "";
    let selectedLevel = null;

    def_anti_airLevels.forEach(([key, data]) => {
        const level = parseInt(key.split("_").pop());
        const option = document.createElement("option");
        option.value = level;
        option.textContent = `défense anti aérienne 1 Niveau ${level}`;
        selectdef_anti_air1.appendChild(option);

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
        def_anti_air1_box.style.display = "none";
        selectdef_anti_air1.style.display = "none";
        imagedef_anti_air1.style.display = "none";
        infoContainer.style.display = "none";
    } else {
        def_anti_air1_box.style.display = "block";
        selectdef_anti_air1.style.display = "block";
        imagedef_anti_air1.style.display = "block";
        infoContainer.style.display = "block";
        selectdef_anti_air1.value = selectedLevel;
        updatedef_anti_air1Info();
    }
}

function updatedef_anti_air1Info() {
    const niveau = `def_anti_air1_nv_${selectdef_anti_air1.value}`;
    const data = def_anti_air1[niveau];
    const hdvNiveau = parseInt(document.getElementById("hdv").value, 10);
    const prixrestant = calculerPrixRestantdef_anti_air1(parseInt(selectdef_anti_air1.value, 10),def_anti_air1_nv_max_hdv(hdvNiveau));
    const tempsRestant = calculerTempsRestantdef_anti_air1(parseInt(selectdef_anti_air1.value, 10), def_anti_air1_nv_max_hdv(hdvNiveau));

    if (data) {
        imagedef_anti_air1.src = data.image;
        imagedef_anti_air1.alt = `def_anti_air Niveau ${selectdef_anti_air1.value}`;
    }
    document.getElementById("def_anti_air1_prix_niveau").innerHTML = `Prix restant : ${formatPrix(prixrestant)} <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    document.getElementById("def_anti_air1_temps_niveau").innerHTML = `Temps restant: ${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
}
selectHdv.addEventListener("change", updatedef_anti_airOptions);
selectdef_anti_air1.addEventListener("change", updatedef_anti_air1Info);

updatedef_anti_airOptions();
