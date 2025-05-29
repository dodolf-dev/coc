import { bouliste } from "/coc/code/village principal/laboratoire/database/data troupe elixir noir.js";
import { bouliste_nv_max_laboratoire } from "/coc/code/village principal/laboratoire/calculator/troupe elixir noir/bouliste.calc.js";
import { calculerPrixRestantbouliste } from "/coc/code/village principal/laboratoire/calculator/troupe elixir noir/bouliste.calc.js";
import { calculerTempsRestantbouliste } from "/coc/code/village principal/laboratoire/calculator/troupe elixir noir/bouliste.calc.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";
import { formatPrix } from "/coc/code/outils/affichge nombre.js";


const bouliste_box = document.getElementById("bouliste_box");
const selectbouliste = document.getElementById("bouliste");
const imagebouliste = document.getElementById("image-bouliste");
const selectlaboratoire = document.getElementById("laboratoire");
const infoContainer = document.createElement("div");
document.body.appendChild(infoContainer);

function updateboulisteOptions() {
    const laboratoireLevel = parseInt(selectlaboratoire.value);
    const currentboulisteLevel = parseInt(selectbouliste.value) || 0; // Récupérer l'ancien niveau

    // Filtrer les niveaux de bouliste disponibles en fonction de l'laboratoire
    const boulisteLevels = Object.entries(bouliste)
        .filter(([key, data]) => data.laboratoirerequis <= laboratoireLevel)
        .sort((a, b) => a[1].laboratoirerequis - b[1].laboratoirerequis);

    // Réinitialiser les options du select
    selectbouliste.innerHTML = "";
    let selectedLevel = null;

    boulisteLevels.forEach(([key, data]) => {
        const level = parseInt(key.split("_").pop());
        const option = document.createElement("option");
        option.value = level;
        option.textContent = `bouliste Niveau ${level}`;
        selectbouliste.appendChild(option);

        // Si l'ancien niveau est toujours disponible, on le sélectionne
        if (level === currentboulisteLevel) {
            selectedLevel = level;
        }
    });

    // Si l'ancien niveau n'existe plus, prendre le niveau le plus bas possible
    if (!selectedLevel) {
        selectedLevel = boulisteLevels.length ? parseInt(boulisteLevels[0][0].split("_").pop()) : 0;
    }

    // Si aucun niveau n'est disponible, masquer le bouliste 1
    if (boulisteLevels.length === 0) {
        bouliste_box.style.display = "none";
        selectbouliste.style.display = "none";
        imagebouliste.style.display = "none";
        infoContainer.style.display = "none";
    } else {
        bouliste_box.style.display = "block";
        selectbouliste.style.display = "block";
        imagebouliste.style.display = "block";
        infoContainer.style.display = "block";
        selectbouliste.value = selectedLevel;
        updateboulisteInfo();
    }
}

function updateboulisteInfo() {
    const niveau = `bouliste_nv_${selectbouliste.value}`;
    const data = bouliste[niveau];
    const laboratoireNiveau = parseInt(document.getElementById("laboratoire").value, 10);
    const prixrestant = calculerPrixRestantbouliste(parseInt(selectbouliste.value, 10),bouliste_nv_max_laboratoire(laboratoireNiveau));
    const tempsRestant = calculerTempsRestantbouliste(parseInt(selectbouliste.value, 10), bouliste_nv_max_laboratoire(laboratoireNiveau));

    if (data) {
        imagebouliste.src = data.image;
        imagebouliste.alt = `bouliste Niveau ${selectbouliste.value}`;
    }

    if (prixrestant === 0) {
        document.getElementById("bouliste_prix_niveau").innerHTML = `Prix restant : max <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }
    else {
        document.getElementById("bouliste_prix_niveau").innerHTML = `Prix restant : ${formatPrix(prixrestant)} <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }

    if (tempsRestant === 0) {
        document.getElementById("bouliste_temps_niveau").innerHTML = `Temps restant: max <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
    else{
        document.getElementById("bouliste_temps_niveau").innerHTML = `Temps restant: ${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
}
selectlaboratoire.addEventListener("change", updateboulisteOptions);
selectbouliste.addEventListener("change", updateboulisteInfo);

updateboulisteOptions();