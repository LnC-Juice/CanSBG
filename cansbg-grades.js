// A = 81.25 - 100
// B = 62.5 - 81
// C = 50 - 62.25
// D = 37.5 - 49.75
// F = 0 - 37.25

// arrays are * 100
const A = [...Array(10000).keys()].slice(8125);
const B = [...Array(8124).keys()].slice(6250);
const C = [...Array(6249).keys()].slice(5000);
const D = [...Array(4999).keys()].slice(3750);
const F = [...Array(3749).keys()];

// elements to clone later
let apce = document.createElement('div')
apce.setAttribute('class', 'cansbg')
let apce_form = document.createElement('form')
let apce_form_input = document.createElement('input')
apce_form_input.setAttribute('type', 'checkbox')
apce_form_input.style.filter = 'grayscale(0.5)'

let td = document.createElement('td')
td.setAttribute('class', 'percent cansbg') // percent to copy css



function apce_check() {
    for (let i of document.querySelectorAll('#content table.course_details.student_grades tr .course a')) {
        if (!(
            (i.textContent[0] === '*') |
            (i.textContent.slice(1,3) === 'CE') |
            (i.textContent.slice(1,3) === 'AP') |
            (i.textContent.slice(0,24) === 'Certified Ethical Hacker') | // CEH /= SBG
            (i.parentElement.parentElement.querySelector('.percent:not(.cansbg)').textContent == 'no grade') |
            (i.parentElement.parentElement.querySelector('.percent:not(.cansbg)').textContent == '--')
            )) {
                i.parentElement.querySelector('input').setAttribute('checked', ' ')
        }
        buttonupdate(i.parentElement.querySelector('input'))
    }
}



function rendergrades_sbg(i) { // split for modularity
    if (!i.querySelector('.percent.sbg.cansbg')) {
        let _td = td.cloneNode()
        _td.setAttribute('class', _td.getAttribute('class') + ' sbg')
        i.insertBefore(_td, i.querySelector('.percent:not(.cansbg)'))
    } else {
        i.querySelector('.percent.sbg.cansbg').style.display = ''
    }
    let percent = parseFloat(i.querySelector('.percent:not(.cansbg)').textContent.split('%')[0])
    if (!isNaN(percent)) {
        let sbg = Math.round(percent/10*4)/10 + '/4'
        i.querySelector('.percent.sbg.cansbg').textContent = sbg
    }
    i.querySelector('.percent:not(.cansbg)').style.display = 'none'
}


function rendergrades_letter(i) { // split for modularity
    if (!i.querySelector('.percent.letter.cansbg')) {
        let _td = td.cloneNode()
        _td.setAttribute('class', _td.getAttribute('class') + ' letter')
        i.insertBefore(_td, i.querySelector('.percent:not(.cansbg)'))
    } else {
        i.querySelector('.percent.letter.cansbg').style.display = ''
    }
    let percent = parseFloat(i.querySelector('.percent:not(.cansbg)').textContent.split('%')[0])
    if (!isNaN(percent)) {
        let letter = ''
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
            console.log('err in letter/gpa calc');
        };
        i.querySelector('.percent.letter.cansbg').textContent = letter
    }
    i.querySelector('.percent:not(.cansbg)').style.display = 'none'
}



function rendergrades() {   
    for (let i of document.querySelectorAll('#content table.course_details.student_grades tr')) {
        if (i.getAttribute('cansbg') == 'true') {
            rendergrades_sbg(i)
            rendergrades_letter(i)
        } else {
            if (i.querySelector('.percent.cansbg')) {
                i.querySelectorAll('.percent.cansbg').forEach(x => x.style.display = 'none')
                i.querySelector('.percent:not(.cansbg)').style.display = ''
            }
        }
    }
}


function buttonupdate(x) {
    x.parentElement.parentElement.parentElement.parentElement.setAttribute('cansbg', x.checked) // tr
    rendergrades()
}



window.addEventListener('pageshow', function() {
    for (let i of document.querySelectorAll('#content table.course_details.student_grades tr td.course')) {
        let ac = apce.cloneNode()
        let ac_form = apce_form.cloneNode()
        let ac_form_input = apce_form_input.cloneNode()
        ac_form.appendChild(ac_form_input)
        ac.appendChild(ac_form)
        i.insertBefore(ac, i.firstChild)
        i.style.display = 'flex'
        i.querySelector('form').style.margin = '0 20px 0 0'
    }
    document.querySelectorAll('#content table.course_details.student_grades tr td.course form input').forEach(x => x.addEventListener('click', function() {buttonupdate(x)})) // for whatever reason ```x.addEventListener('click', buttonupdate(x)))``` dosen't work
    apce_check()
    rendergrades()
})
