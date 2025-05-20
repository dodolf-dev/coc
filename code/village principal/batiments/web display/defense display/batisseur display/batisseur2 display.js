import { batisseur2 } from "/coc/code/village principal/batiments/database/data defense/data batisseur.js";
import { batisseur2_nv_max_hdv } from "/coc/code/village principal/batiments/calculator/defense calc/batisseurs/batisseur2.calc.js";
import { calculerPrixRestantbatisseur2 } from "/coc/code/village principal/batiments/calculator/defense calc/batisseurs/batisseur2.calc.js";
import { calculerTempsRestantbatisseur2 } from "/coc/code/village principal/batiments/calculator/defense calc/batisseurs/batisseur2.calc.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";
import { formatPrix } from "/coc/code/outils/affichge nombre.js";


const batisseur2_box = document.getElementById("batisseur2_box");
const selectbatisseur2 = document.getElementById("batisseur2");
const imagebatisseur2 = document.getElementById("image-batisseur2");
const selectHdv = document.getElementById("hdv");
const infoContainer = document.createElement("div");
document.body.appendChild(infoContainer);

function updatebatisseurOptions() {
    const hdvLevel = parseInt(selectHdv.value);
    const currentbatisseurLevel = parseInt(selectbatisseur2.value) || 0; // Récupérer l'ancien niveau

    // Filtrer les niveaux de batisseur disponibles en fonction de l'HDV
    const batisseurLevels = Object.entries(batisseur2)
        .filter(([key, data]) => data.hdvrequis <= hdvLevel)
        .sort((a, b) => a[1].hdvrequis - b[1].hdvrequis);

    // Réinitialiser les options du select
    selectbatisseur2.innerHTML = "";
    let selectedLevel = null;

    batisseurLevels.forEach(([key, data]) => {
        const level = parseInt(key.split("_").pop());
        const option = document.createElement("option");
        option.value = level;
        option.textContent = `Bâtisseur 2 Niveau ${level}`;
        selectbatisseur2.appendChild(option);

        // Si l'ancien niveau est toujours disponible, on le sélectionne
        if (level === currentbatisseurLevel) {
            selectedLevel = level;
        }
    });

    // Si l'ancien niveau n'existe plus, prendre le niveau le plus bas possible
    if (!selectedLevel) {
        selectedLevel = batisseurLevels.length ? parseInt(batisseurLevels[0][0].split("_").pop()) : 0;
    }

    // Si aucun niveau n'est disponible, masquer le batisseur 1
    if (batisseurLevels.length === 0) {
        batisseur2_box.style.display = "none";
        selectbatisseur2.style.display = "none";
        imagebatisseur2.style.display = "none";
        infoContainer.style.display = "none";
    } else {
        batisseur2_box.style.display = "block";
        selectbatisseur2.style.display = "block";
        imagebatisseur2.style.display = "block";
        infoContainer.style.display = "block";
        selectbatisseur2.value = selectedLevel;
        updatebatisseur2Info();
    }
}

function updatebatisseur2Info() {
    const niveau = `batisseur2_nv_${selectbatisseur2.value}`;
    const data = batisseur2[niveau];
    const hdvNiveau = parseInt(document.getElementById("hdv").value, 10);
    const prixrestant = calculerPrixRestantbatisseur2(parseInt(selectbatisseur2.value, 10),batisseur2_nv_max_hdv(hdvNiveau));
    const tempsRestant = calculerTempsRestantbatisseur2(parseInt(selectbatisseur2.value, 10), batisseur2_nv_max_hdv(hdvNiveau));

    if (data) {
        imagebatisseur2.src = data.image;
        imagebatisseur2.alt = `batisseur Niveau ${selectbatisseur2.value}`;
    }
    if (prixrestant === 0) {
        document.getElementById("batisseur2_prix_niveau").innerHTML = `Prix restant : max <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;    
    }
    else {
        document.getElementById("batisseur2_prix_niveau").innerHTML = `Prix restant : ${formatPrix(prixrestant)} <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }
    if (tempsRestant === 0) {
        document.getElementById("batisseur2_temps_niveau").innerHTML = `Temps restant: max <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
    else {
        document.getElementById("batisseur2_temps_niveau").innerHTML = `Temps restant: ${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
}
selectHdv.addEventListener("change", updatebatisseurOptions);
selectbatisseur2.addEventListener("change", updatebatisseur2Info);

updatebatisseurOptions();
