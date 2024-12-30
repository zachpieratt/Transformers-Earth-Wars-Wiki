import FetchAbilities from './fetchAbilityDetails';

document.addEventListener("DOMContentLoaded", function () {
    const factionsDropdown = document.getElementById("factions");
    const classDropdown = document.getElementById("classSelect");
    let currentData = [];

    // Load correct JSON File based on selected faction
    const fetchFactionData = () => {
        const selectedFaction = factionsDropdown.value;
        let jsonFile;

        document.getElementById("gridContainer").classList.add("show");

        if (selectedFaction === 'Autobots') {
            jsonFile = "/src/json/autobots.json";
        } else if (selectedFaction === 'Decepticons') {
            jsonFile = "/src/json/decepticons.json";
        } else {
            console.error("Invalid faction selected.");
            return;
        }

        fetch(jsonFile)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP Error ${res.status}`);
                }
                return res.json();
            })
            .then((data) => {
                currentData = data.units;
                generateUnitGrid(currentData);
            })
            .catch((error) => {
                console.error("Error fetching faction data:", error);
            });
    };

    // Create popup of selected unit when grid item is clicked on
    const unitContainer = document.getElementById("unitContainer");
    const showUnitDetails = (unit) => {
        unitContainer.innerHTML = `
            <div class="unit-details">
                <button id="closePopup">&#x25c0; Back</button>
                <h2 class="popupUnitName">${unit.name}</h2>
                <div id="class">
                    <div><strong>Class:</strong> ${unit.class}</div>
                    <img src="/src/assets/classes/${unit.class}.png" class="classIcon">
                </div>
                <div class="rarityContainer">
                    <div><strong>Max Rarity: </strong></div>
                    <div style="color:yellow;">${unit.maxRarity === 4 ? "  ★★★★ " : "  ★★★★★ "}</div>
                </div>
                <div><strong>Rival:</strong> ${unit.rival}</div>
                <p>${unit.bio || "No description available."}</p>
                <div><strong>Passive Ability:</strong> ${unit.passiveAbility}</div>
                <div id="abilityDetails"></div>
                <img src="${unit.art}" alt="${unit.name} Art"/>
            </div>
        `;
        unitContainer.style.display = "block";

        document.getElementById("closePopup").addEventListener("click", () => {
            unitContainer.style.display = "none";
        });

        unitContainer.querySelector(".unit-details").addEventListener("click", (event) => {
            event.stopPropagation();
        });

        document.addEventListener("click", closeOnOutsideClick);
    };

    const closeOnOutsideClick = () => {
        unitContainer.style.display = "none";
        document.removeEventListener("click", closeOnOutsideClick);
    };

    factionsDropdown.addEventListener("change", function () {
        fetchFactionData();
        classDropdown.disabled = false;
        classDropdown.value = "default";
    });

    // Generate grid of units matching selected parameters
    const generateUnitGrid = (data) => {
        let output = '';
        const orderedData = data.sort((a, b) => a.name.localeCompare(b.name));
        orderedData.forEach((unit, index) => {
            output += `
                <div class="grid-item" data-index="${index}">
                    <div class="unit-name">${unit.name}</div>
                    <div class="unit-class">${unit.class}</div>
                    <img src="${unit.art}" alt="${unit.name} Art" class="unit-art"/>
                </div>
            `;
        });

        const gridContainer = document.getElementById("gridContainer");
        gridContainer.innerHTML = output;

        const gridItems = gridContainer.querySelectorAll(".grid-item");
        gridItems.forEach(item => {
            item.addEventListener("click", function (event) {
                const unitIndex = this.getAttribute("data-index");
                const unit = orderedData[unitIndex];
                showUnitDetails(unit);
                FetchAbilities(unit.abilities[0]?.name || null, unit.abilities[1]?.name || null);
                event.stopPropagation();
            });
        });
    };

    // Filter units by selected class
    const filterUnitsByClass = () => {
        const selectedClass = classDropdown.value;
        const filteredData = selectedClass === "default" ? currentData : currentData.filter(unit => unit.class === selectedClass);
        generateUnitGrid(filteredData);
    };

    classDropdown.addEventListener("change", filterUnitsByClass);
});
