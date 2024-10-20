#include <stdio.h>

int calculateRunningTotal(int n, int list_of_numbers[]) {
    // escribe aqui el codigo 



}

int main () {
    int n; 
    scanf ( "%d", &n);

    int list_of_numbers[n];
    for (int i = 0; i < n; i ++ ) {
        scanf("%d", &list_of_numbers[i]);
    };

    int result = calculateRunningTotal(n, list_of_numbers);
    printf("%d\n", result); 

    return 0;
}

function arrayProducts(n, arr) {
    let result = [];

    for (let i = 0; j < n; j++ ) {
        if (i !==j) {
            return[i] *= arr[j];
        }
    }
    return result;
}

const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl

// function to rotate the image articlockwise
function rotate_image(size, img) {
    // write here the code 


}

// read inpout values from stdin 
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// initialize variables 
let size; 
let img = [];

// read size 
rl.questions('', sizeInput => {
    size = parseInt(sizeInput);
    readRow(0);
});

// recursive function to read each row 
function readRow(rowIndex) {
 if(rowIndex < size ) {
    rl.questions(``, rowInput => {
        img.push(rowInput.trim().split(` `).map(Number));
        readRow(rowIndex + 1);
    });
 } else {
    // if all  rows are read, call rotate_image and display the result
    rotate_image(size, img);

    // print the rotated image without spaces after the last element
    for (let i = 0; i < size; ++i ) {
        console.log (img[i].join(` `));
    }

    rl.close();
 }
}


function decipher (ciphertext, needle) {
    // write here your code 


}

const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let ciphertext = '';
let knownWord = '';

rl.questions('', (ciphertextInput => {
    ciphertext = ciphertextInput;
    rl.questions('', (knownWordInput => {
        knownWord = knownWordInput;

        const plaintext = decipher(ciphertext, knownWord);
        console.log(plaintext);

        rl.close();
    }));
}));