// Function to generate random Integer between 0 - max (excluding max).
function genRandomNumber(max) {
    return Math.floor((Math.random() * max));
}

// Function to generate random triplets fo RGB code.
function genRGBTriplet() {
    let rgb = []
    for (let i = 0; i < 3; i++) {
        let num = genRandomNumber(256);
        rgb.push(num);
    }
    return `rgb(${rgb.join(", ")})`;
}

// Function for generating 6 rgb codes.
function gen_6_Colors() {
    for (let i = 0; i < 6; i++) {
        colorsArray.push(genRGBTriplet());
    }
}

// Function for shuffling background color of generated colors in an array.
function randomizeColorArray() {
    const arr1 = [];
    for (; ;) {
        let temp = genRandomNumber(6);
        if (!arr1.includes(temp)) {
            arr1.push(temp);
        }
        if (arr1.length === 6) {
            break;
        }
    }
    // console.log(arr1.toString());
    let colors = [];
    for (let i = 0; i < 6; i++) {
        colors.push(colorsArray[arr1[i]]);
    }
    // console.log(colors.toString());
    return colors;
}

// Function to randomize colors in color-blocks.
function randomizeColorBlocks() {
    for (let i = 0; i < blocks.length; i++) {
        blocks[i].style["backgroundColor"] = randomColors[i].toString();
    }
}

// Function to color all blocks same.
function colorAllBlocks(statusColor) {
    const blocks = document.querySelectorAll(".color-block")
    for (let i = 0; i < blocks.length; i++) {
        blocks[i].style.backgroundColor = statusColor;
    }
}

// Function to hide block.
function hideBlock(id) {
    id.style.display = 'none';
}

// Function for comparing colors
function compare(color) {
    const statusColor = document.getElementById("rgb-color").innerText; // Copies text from p#rgb-color
    if (color === statusColor) {
        colorAllBlocks(statusColor);
        return true;
    } else {
        return false;
    }
}

/*
    Here it starts:
    At page-load generates the 6 rgb codes to an array.
*/
const colorsArray = [];
gen_6_Colors();
let randomColors = randomizeColorArray(); // Assigns and randomizes colors in an array.

// Show 1st rgb on display (generated randomly).
document.getElementById("rgb-color").innerHTML = colorsArray[0].toString().toUpperCase();

// Show 6 color blocks randomized
const blocks = document.querySelectorAll('.color-block');
randomizeColorBlocks();

// Function clickBlock
function clickBlock(id) {
    const color = id.style.backgroundColor.toUpperCase();
    // document.getElementById("info").innerHTML = `Button is ${color}`;
    if (compare(color)) {
        document.getElementById("status").innerHTML = 'Correct!';
    } else {
        document.getElementById("status").innerHTML = 'Try Again!';
        hideBlock(id);
    }
}

//Restart the game when clicked on the restart button.
const restartBtn = document.querySelector("#restart");
restartBtn.addEventListener("click", function () {
    document.getElementById("status").innerHTML = 'Start Guessing!';
    colorsArray.splice(0,6);
    randomColors.splice(0,6);
    gen_6_Colors();
    randomColors = randomizeColorArray();
    document.getElementById("rgb-color").innerHTML = colorsArray[0].toString().toUpperCase();
    randomizeColorBlocks();
    const blocks = document.querySelectorAll("div")
    for (let i = 0; i < blocks.length; i++) {
        blocks[i].style.display = 'inline-block';
    }
})