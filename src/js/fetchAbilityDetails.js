const FetchAbilities = (unitName) => {


    let unit = [unitName]
    fetch('/src/json/abilities.json')
        .then((res) => {
            if (!res.ok) {
                throw new Error(`HTTP Error ${res.status}`);
            }
            return res.json();
        })
        .then((data) => {
            const abilities = data.abilities;
            const output = abilities.filter(a => (a.unit == unit));
            generateAbilityDetails(output);
        })
        .catch((error) => {
            console.error("Error fetching ability data:", error);
        });

    const generateAbilityDetails = (output) => {
        const abilityElement = document.getElementById("abilityDetails");
        let ab1 = output[0];
        let ab2 = output[1] ? output[1] : {};
        console.log(ab1);
        console.log(ab2);
        abilityElement.innerHTML = `
            <h1>Ability Details</h1>
            <div class="abilityName"><strong>Ability 1:</strong> ${ab1.name}</div>
            <img class="abilityIcon" src=${ab1.icon}>
            <div class="abilitydesc">${ab1.desc}</div>
            <br>
            <div class="level11"><strong>Level 11 Bonus:</strong> ${ab1.level11UpgradeBonus}</div>
            <br><br>
            <div class="abilityName">${ab2.name ? `<strong>Ability 2:</strong> ${ab2.name}` : ""}</div>
            <img class="abilityIcon" src=${ab2.icon || ""}>
            <div class="abilitydesc">${ab2.desc || ""}</div>
            <br>
            <div class="level11">${ab2.name ? `<strong>Level 11 Bonus:</strong> ${ab2.level11UpgradeBonus}` : ""}</div>
            <br><br>
            
        `;
    }


}


export default FetchAbilities;