// Adds support for Stadards Based Grading to Mastery Connect
// Copyright (C) 2024 LnC-Juice

// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.


// A = 81.25 - 100
// B = 62.5 - 81
// C = 50 - 62.25
// D = 37.5 - 49.75
// F = 0 - 37.25

// arrays are * 100
const SBL_A = [...Array(10001).keys()].slice(8125);
const SBL_B = [...Array(8125).keys()].slice(6250);
const SBL_C = [...Array(6250).keys()].slice(5000);
const SBL_D = [...Array(5000).keys()].slice(3750);
const SBL_F = [...Array(3750).keys()];

const A = [...Array(10001).keys()].slice(9000);
const B = [...Array(9000).keys()].slice(8000);
const C = [...Array(8000).keys()].slice(7000);
const D = [...Array(7000).keys()].slice(6000);
const F = [...Array(6000).keys()];

// elements to clone later
let apce = document.createElement('div');
apce.setAttribute('class', 'cansbg');
let apce_form = document.createElement('form');
let apce_form_input = document.createElement('input');
apce_form_input.setAttribute('type', 'checkbox');
apce_form_input.style.filter = 'grayscale(0.5)';

let td = document.createElement('td');
td.setAttribute('class', 'percent cansbg'); // percent to copy css



function apce_check() {
    for (let i of document.querySelectorAll('#content table.course_details.student_grades tr .course a')) {
        if (!(
            (i.textContent[0] === '*') |
            (i.textContent.slice(0,2) === 'CE') |
            (i.textContent.slice(0,2) === 'AP') |
            (i.textContent.slice(0,24) === 'Certified Ethical Hacker') | // CEH /= SBG
            (i.parentElement.parentElement.querySelector('.percent:not(.cansbg)').textContent == 'no grade') |
            (i.parentElement.parentElement.querySelector('.percent:not(.cansbg)').textContent == '--')
            )) {
                i.parentElement.querySelector('input').setAttribute('checked', ' ');
        }
        buttonupdate(i.parentElement.querySelector('input'));
    }
}


function rendergrade_sbg(i) { // split for modularity
    if (!i.querySelector('.percent.sbg.cansbg')) {
        let _td = td.cloneNode();
        _td.setAttribute('class', _td.getAttribute('class') + ' sbg');
        i.insertBefore(_td, i.querySelector('.percent:not(.cansbg)'));
    } else {
        i.querySelector('.percent.sbg.cansbg').style.display = '';
    }
    let percent = i.querySelector('.percent:not(.cansbg)');
    if (isNaN(percent)) {
        percent = parseFloat(percent.textContent.split('%')[0]);
    }
    else {
        return;
    }
    if (!isNaN(percent)) {
        let sbg = Math.round(percent/10*4)/10 + '/4';
        i.querySelector('.percent.sbg.cansbg').textContent = sbg;
    }
    i.querySelector('.percent:not(.cansbg)').style.display = 'none';
}

function rendergrade_letter(i) { // split for modularity
    if (!i.querySelector('.percent.letter.cansbg')) {
        let _td = td.cloneNode();
        _td.setAttribute('class', _td.getAttribute('class') + ' letter');
        i.insertBefore(_td, i.querySelector('.percent:not(.cansbg)'));
    } else {
        i.querySelector('.percent.letter.cansbg').style.display = '';
    }
    let percent = i.querySelector('.percent:not(.cansbg)');
    if (isNaN(percent)) {
        percent = parseFloat(percent.textContent.split('%')[0]);
    }
    else {
        return;
    }
    if (!isNaN(percent)) {
        let letter = '';
        if (SBL_A.includes(parseInt(percent*100))) {
            letter = 'A';
        } else if (SBL_B.includes(parseInt(percent*100))) {
            letter = 'B';
        } else if (SBL_C.includes(parseInt(percent*100))) {
            letter = 'C';
        } else if (SBL_D.includes(parseInt(percent*100))) {
            letter = 'D';
        } else if (SBL_F.includes(parseInt(percent*100))) {
            letter = 'F';
        } else {
            console.error('err in letter/gpa calc');
        };
        i.querySelector('.percent.letter.cansbg').textContent = letter;
    }
    i.querySelector('.percent:not(.cansbg)').style.display = 'none';
    if (i.querySelector('.percent.apce_letter.cansbg')) {
        i.querySelector('.percent.apce_letter.cansbg').style.display = 'none';
    }
}

function rendergrade_apce_letter(i) {
    if (!i.querySelector('.percent.apce_letter.cansbg')) {
        let _td = td.cloneNode();
        _td.setAttribute('class', _td.getAttribute('class') + ' apce_letter');
        i.insertBefore(_td, i.querySelector('.grading_period_dropdown'));
    } else {
        i.querySelector('.percent.apce_letter.cansbg').style.display = '';
    }
    let percent = i.querySelector('.percent:not(.cansbg)');
    if (isNaN(percent)) {
        percent = parseFloat(percent.textContent.split('%')[0]);
    }
    else {
        return;
    }
    if (!isNaN(percent)) {
        let letter = '';
        if (A.includes(parseInt(percent*100))) {
            letter = 'A';
        } else if (B.includes(parseInt(percent*100))) {
            letter = 'B';
        } else if (C.includes(parseInt(percent*100))) {
            letter = 'C';
        } else if (D.includes(parseInt(percent*100))) {
            letter = 'D';
        } else if (F.includes(parseInt(percent*100))) {
            letter = 'F';
        } else {
            console.error('err in letter/gpa calc');
        };
        i.querySelector('.percent.apce_letter.cansbg').textContent = letter;
    }
}

function rendergrade(i) {   
    if (i.getAttribute('cansbg') == 'true') {
        rendergrade_sbg(i);
        rendergrade_letter(i);
    } else {
        if (i.querySelector('.percent.cansbg')) {
            i.querySelectorAll('.percent.cansbg').forEach(x => x.style.display = 'none');
            i.querySelector('.percent:not(.cansbg)').style.display = '';
            rendergrade_apce_letter(i);
        }
    }
}

function rendergrades() { // seperated for performance
    for (let i of document.querySelectorAll('#content table.course_details.student_grades tr')) {
        rendergrade(i);
    }
}


function buttonupdate(x) {
    x.parentElement.parentElement.parentElement.parentElement.setAttribute('cansbg', x.checked); // tr
    rendergrade(x.parentElement.parentElement.parentElement.parentElement); // tr
}



window.addEventListener('pageshow', function() {
    for (let i of document.querySelectorAll('#content table.course_details.student_grades tr td.course')) {
        let ac = apce.cloneNode();
        let ac_form = apce_form.cloneNode();
        let ac_form_input = apce_form_input.cloneNode();
        ac_form.appendChild(ac_form_input);
        ac.appendChild(ac_form);
        i.insertBefore(ac, i.firstChild);
        i.style.display = 'flex';
        i.querySelector('form').style.margin = '0 20px 0 0';
        rendergrade_apce_letter(i.parentElement);
    }

    document.querySelectorAll('#content table.course_details.student_grades tr td.course form input').forEach(x => x.addEventListener('click', function() {buttonupdate(x)})); // for whatever reason ```x.addEventListener('click', buttonupdate(x)))``` dosen't work

    rendergrades();
    apce_check();
})
