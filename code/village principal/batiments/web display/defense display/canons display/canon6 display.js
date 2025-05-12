import { canon6 } from "/coc/code/village principal/batiments/database/data defense/data canon.js";
import { canon6_nv_max_hdv } from "/coc/code/village principal/batiments/calculator/defense calc/canons/canon6.calc.js";
import { calculerPrixRestantcanon6 } from "/coc/code/village principal/batiments/calculator/defense calc/canons/canon6.calc.js";
import { calculerTempsRestantcanon6 } from "/coc/code/village principal/batiments/calculator/defense calc/canons/canon6.calc.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";
import { formatPrix } from "/coc/code/outils/affichge nombre.js";

const canon6_box = document.getElementById("canon6_box");
const selectCanon6 = document.getElementById("canon6");
const imageCanon6 = document.getElementById("image-canon6");
const selectHdv = document.getElementById("hdv");
const infoContainer = document.createElement("div");
document.body.appendChild(infoContainer);

function updateCanonOptions() {
    const hdvLevel = parseInt(selectHdv.value);
    const currentCanonLevel = parseInt(selectCanon6.value) || 0;

    const canonLevels = Object.entries(canon6)
        .filter(([key, data]) => data.hdvrequis <= hdvLevel)
        .sort((a, b) => a[1].hdvrequis - b[1].hdvrequis);

    selectCanon6.innerHTML = "";
    let selectedLevel = null;

    canonLevels.forEach(([key, data]) => {
        const level = parseInt(key.split("_").pop());
        const option = document.createElement("option");
        option.value = level;
        option.textContent = `Canon 6 Niveau ${level}`;
        selectCanon6.appendChild(option);

        if (level === currentCanonLevel) {
            selectedLevel = level;
        }
    });

    if (!selectedLevel) {
        selectedLevel = canonLevels.length ? parseInt(canonLevels[0][0].split("_").pop()) : 0;
    }

    if (canonLevels.length === 0) {
        canon6_box.style.display = "none";
        selectCanon6.style.display = "none";
        imageCanon6.style.display = "none";
        infoContainer.style.display = "none";
    } else {
        canon6_box.style.display = "block";
        selectCanon6.style.display = "block";
        imageCanon6.style.display = "block";
        infoContainer.style.display = "block";
        selectCanon6.value = selectedLevel;
        updateCanon6Info();
    }
}

function updateCanon6Info() {
    const niveau = `canon6_nv_${selectCanon6.value}`;
    const data = canon6[niveau];
    const hdvNiveau = parseInt(document.getElementById("hdv").value, 10);
    const prixrestant = calculerPrixRestantcanon6(parseInt(selectCanon6.value, 10), canon6_nv_max_hdv(hdvNiveau));
    const tempsRestant = calculerTempsRestantcanon6(parseInt(selectCanon6.value, 10), canon6_nv_max_hdv(hdvNiveau));

    if (data) {
        imageCanon6.src = data.image;
        imageCanon6.alt = `Canon Niveau ${selectCanon6.value}`;
    }
    document.getElementById("canon6_prix_niveau").innerHTML = `Prix restant : ${formatPrix(prixrestant)} <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    document.getElementById("canon6_temps_niveau").innerHTML = `Temps restant: ${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
}

selectHdv.addEventListener("change", updateCanonOptions);
selectCanon6.addEventListener("change", updateCanon6Info);

updateCanonOptions();