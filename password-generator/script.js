const lengthEl = document.getElementById('length');

const uppercase = document.getElementById('uppercase');

const lowercase = document.getElementById('lowercase');

const numbers = document.getElementById('numbers');

const symbols = document.getElementById('symbols');

const generatorBtn = document.querySelector('.generatorBtn');

const password = document.querySelector('.password');

const copyBtn = document.querySelector('.copyBtn');

generatorBtn.addEventListener('click', generatorPassword);

lengthEl.value = 20;
uppercase.checked = false;
lowercase.checked = false;
numbers.checked = false;
symbols.checked = false;


function generatorPassword() {
    let valuePs = [];
    const lengthString = lengthEl.value;

    if(uppercase.checked) {
        valuePs.push(getUppercaseLetter());
    }

    if(lowercase.checked) {
        valuePs.push(getLowercaseLetter());

    }

    if(numbers.checked) {
        valuePs.push(getNumberListLetter());
    }

    if(symbols.checked) {
        valuePs.push(getSymbolListLetter());
    }


    for (let i = valuePs.length; i < lengthString; i++) {
        const x = getRandomLetter();
        valuePs.push(x);
    }
    console.log(valuePs)
    password.innerText = valuePs.join("");
}

const uppercaseLetter = 'ABCDEFGHIJKLMNOPQRSTUVXYZ';
const lowercaseLetter = 'abcdefghijhlmnopqrstuvxyz';
const numberList = '0123456789';
const symbolList = '!@#$%^&*()_+=';

function getUppercaseLetter() {
    return uppercaseLetter[Math.floor(Math.random() * uppercaseLetter.length)];
}


function getLowercaseLetter() {
    return lowercaseLetter[Math.floor(Math.random() * lowercaseLetter.length)];
}


function getNumberListLetter() {
    return numberList[Math.floor(Math.random() * numberList.length)];
}


function getSymbolListLetter() {
    return symbolList[Math.floor(Math.random() * symbolList.length)];
}

function getRandomLetter() {
    const randomArr = [];
    if(uppercase.checked) {
        randomArr.push(getUppercaseLetter());
    }

    if(lowercase.checked) {
        randomArr.push(getLowercaseLetter());
    }

    if(numbers.checked) {
        randomArr.push(getNumberListLetter());
    }

    if(symbols.checked) {
        randomArr.push(getSymbolListLetter());
    }

    if(randomArr.length === 0) {
        return "";
    } else {
        return randomArr[Math.floor(Math.random() * randomArr.length)];
    }

}


copyBtn.addEventListener('click', () => {
    if (document.selection) {
        var range = document.body.createTextRange();
        range.moveToElementText(password);
        range.select().createTextRange();
        document.execCommand("copy");
        console.log(1);
      } else if (window.getSelection) {
        console.log(2);

        var range = document.createRange();
        range.selectNode(password);
        console.log(range);
        window.getSelection().addRange(range);
        document.execCommand("copy");
        alert("Text has been copied, now paste in the text-area")
      }
});


