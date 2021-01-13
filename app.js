//jshint esversion:9
const mainEl = document.getElementById('main');
const addUserBtn = document.getElementById('add_user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show_millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate_wealth');


let data = [];

// FETCH RANDOM USER AND ADD MONEY
async function getRandomUser() {
    const reqLink = await fetch('https://randomuser.me/api');
    const data = await reqLink.json();
    const user = data.results[0];
    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    };

    addData(newUser);
}

function addData(obj) {
    data.push(obj);
    updateDOM();
}

function updateDOM(providedData = data) {
    // Clean main div
    mainEl.innerHTML = `<h2><strong>Person</strong> Wealth</h2>`;
    providedData.forEach(item => {
        const elem = document.createElement('div');
        elem.classList.add('person');
        elem.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
        mainEl.appendChild(elem);
    });
}

// Format money as number 

function formatMoney(money) {
    return '$' + money.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}


// Double the Wealth 
function doubleMoney() {
    data = data.map(user => {
        return {
            ...user,
            money: user.money * 2
        };
    });
    updateDOM();
}

// Sorting users by the richest
function sortByRichest() {
    data.sort((a, b) => b.money - a.money);
    updateDOM();
}

// Shwow only millioniaires 
function showMillionaires() {
    data = data.filter(user => user.money > 1000000);
    updateDOM();
}

// Calculate Wealth 
function calculateWealth(){
    const wealth = data.reduce((acc, user) => (acc += user.money), 0);
    console.log(formatMoney(wealth));

    const wealthEl = document.createElement('div');
    wealthEl.innerHTML = `<h3>Total Wealth <strong id="wealth">${formatMoney(wealth)}</strong></h3>`;
        
    mainEl.appendChild(wealthEl);

}

// Listeners 

addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairesBtn.addEventListener('click', showMillionaires);
calculateWealthBtn.addEventListener('click', calculateWealth);
























