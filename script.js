const billEl = document.querySelector("#bill");
const numberOfPeopleEl = document.querySelector("#people");
const tipEl = document.querySelector("#tip");  // custom tip
const tipBtns = document.querySelectorAll(".tip-btn");  // tip buttons
const errorMsg = document.getElementById("error");

const tipPer = document.getElementById("tip-per");
const totalPer = document.getElementById("total-per");
let resetBtn = document.getElementById("reset");

let bill = null;
let people = 1;
let tip = null;
let personTip = null;
let personTotal = null;

// reset all setting 
reset();

// calculate tip per person function 
function calculateTip() {
    if (bill >= 0 && tip > 0 && people > 0) {
        personTip = parseFloat(((tip/100) * bill) / people);
        tipPer.textContent = `$${personTip.toFixed(2)}`;
    } else {
        tip = 0;
    }
}

// calculate total per person function 
function calculateTotal() {
    // enable the reset button 
    resetBtn.removeAttribute("disabled")
    calculateTip()
    if (bill >= 0 && people > 0) {
        personTotal = parseFloat((bill / people)) + personTip;
        totalPer.textContent = `$${personTotal.toFixed(2)}`;
    }
}

// event listener for bill information 
billEl.addEventListener("keyup", function(e) {
    if (this.value) {
        bill = parseFloat(e.target.value);
        calculateTotal();
    }
})

// event listener for custom tip 
tipEl.addEventListener("keyup", (e) => {
    tip = parseFloat(e.target.value);
    tipBtns.forEach((item) => {item.classList.remove("tip-btn-focus")});
    calculateTotal();
})

// event listener for tip buttons 
for (let i = 0; i < tipBtns.length; i++) {
    tipBtns[i].addEventListener("click", (e) => {
        tipBtns.forEach((item) => {item.classList.remove("tip-btn-focus")});
        e.target.classList.add("tip-btn-focus")
        tip = parseInt(e.target.value);
        calculateTotal();
    });
}

// event listener for number of people 
numberOfPeopleEl.addEventListener("keyup", (e) => {
    people = Number(e.target.value);
    console.log(people);
    if (people <= 0) {
        numberOfPeopleEl.classList.add("error-input");
        errorMsg.style.opacity = 1;
    } else {
        if (numberOfPeopleEl.classList.contains("error-input")){
            numberOfPeopleEl.classList.remove("error-input");
            errorMsg.style.opacity = 0;
        }
        calculateTotal();
    }
})

// reset function 
function reset() {
    bill = tip = personTip = personTotal = billEl.value = null;
    tipEl.value = null;
    numberOfPeopleEl.value = people = 1;
    tipPer.textContent = totalPer.textContent = "$0.00";
    resetBtn.setAttribute("disabled", true);
}

// reset button function 
resetBtn.addEventListener("click", function() {
    reset();
});
