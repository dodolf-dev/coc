import { canon4 } from "/coc/code/village principal/batiments/database/data defense/data canon.js";
import { canon4_nv_max_hdv } from "/coc/code/village principal/batiments/calculator/defense calc/canons/canon4.calc.js";
import { calculerPrixRestantcanon4 } from "/coc/code/village principal/batiments/calculator/defense calc/canons/canon4.calc.js";
import { calculerTempsRestantcanon4 } from "/coc/code/village principal/batiments/calculator/defense calc/canons/canon4.calc.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";
import { formatPrix } from "/coc/code/outils/affichge nombre.js";

const canon4_box = document.getElementById("canon4_box");
const selectCanon4 = document.getElementById("canon4");
const imageCanon4 = document.getElementById("image-canon4");
const selectHdv = document.getElementById("hdv");
const infoContainer = document.createElement("div");
document.body.appendChild(infoContainer);

function updateCanonOptions() {
    const hdvLevel = parseInt(selectHdv.value);
    const currentCanonLevel = parseInt(selectCanon4.value) || 0;

    const canonLevels = Object.entries(canon4)
        .filter(([key, data]) => data.hdvrequis <= hdvLevel)
        .sort((a, b) => a[1].hdvrequis - b[1].hdvrequis);

    selectCanon4.innerHTML = "";
    let selectedLevel = null;

    canonLevels.forEach(([key, data]) => {
        const level = parseInt(key.split("_").pop());
        const option = document.createElement("option");
        option.value = level;
        option.textContent = `Canon 4 Niveau ${level}`;
        selectCanon4.appendChild(option);

        if (level === currentCanonLevel) {
            selectedLevel = level;
        }
    });

    if (!selectedLevel) {
        selectedLevel = canonLevels.length ? parseInt(canonLevels[0][0].split("_").pop()) : 0;
    }

    if (canonLevels.length === 0) {
        canon4_box.style.display = "none";
        selectCanon4.style.display = "none";
        imageCanon4.style.display = "none";
        infoContainer.style.display = "none";
    } else {
        canon4_box.style.display = "block";
        selectCanon4.style.display = "block";
        imageCanon4.style.display = "block";
        infoContainer.style.display = "block";
        selectCanon4.value = selectedLevel;
        updateCanon4Info();
    }
}

function updateCanon4Info() {
    const niveau = `canon4_nv_${selectCanon4.value}`;
    const data = canon4[niveau];
    const hdvNiveau = parseInt(document.getElementById("hdv").value, 10);
    const prixrestant = calculerPrixRestantcanon4(parseInt(selectCanon4.value, 10), canon4_nv_max_hdv(hdvNiveau));
    const tempsRestant = calculerTempsRestantcanon4(parseInt(selectCanon4.value, 10), canon4_nv_max_hdv(hdvNiveau));

    if (data) {
        imageCanon4.src = data.image;
        imageCanon4.alt = `Canon Niveau ${selectCanon4.value}`;
    }
    if (prixrestant === 0) {
        document.getElementById("canon4_prix_niveau").innerHTML = `Prix restant : max <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }
    else {
        canon4_prix_niveau.style.display = "";
        document.getElementById("canon4_prix_niveau").innerHTML = `Prix restant : ${formatPrix(prixrestant)} <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }

    if (tempsRestant === 0) {
        document.getElementById("canon4_temps_niveau").innerHTML = `Temps restant: max <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
    else{
        canon4_temps_niveau.style.display = "";
        document.getElementById("canon4_temps_niveau").innerHTML = `Temps restant: ${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
}

selectHdv.addEventListener("change", updateCanonOptions);
selectCanon4.addEventListener("change", updateCanon4Info);

updateCanonOptions();