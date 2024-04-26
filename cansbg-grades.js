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

function rendergrades() {   
    for (let i of document.querySelectorAll('#content table.course_details.student_grades tr')) {
        if (i.getAttribute('cansbg') == 'true') {
            if (!i.querySelector('.percent.cansbg')) {
                let _letter_td = letter_td.cloneNode()
                i.insertBefore(_letter_td, i.querySelector('.percent'))
            } else {
                i.querySelector('.percent.cansbg').stye.display = ''
            }
            let percent = parseFloat(i.querySelector('.percent:not(.cansbg)').textContent.split('%')[0])
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
            i.querySelector('.percent:not(.cansbg)').style.display = 'none'
            i.querySelector('.percent.cansbg').textContent = letter
        } else {
            if (i.querySelector('.percent.cansbg')) {
                i.querySelector('.percent.cansbg').style.display = 'none'
                i.querySelector('.percent:not(.cansbg)').style.display = ''
            }
        }
    }
}

function buttonupdate(x) {
    x.parentElement.parentElement.parentElement.parentElement.setAttribute('cansbg', x.checked) // tr
    rendergrades()
}

let apce = document.createElement('div')
apce.setAttribute('class', 'cansbg')
let apce_form = document.createElement('form')
let apce_form_input = document.createElement('input')
apce_form_input.setAttribute('type', 'checkbox')

let letter_td = document.createElement('td')
letter_td.setAttribute('class', 'percent cansbg')



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
    document.querySelectorAll('#content table.course_details.student_grades tr td.course form input').forEach(x => x.addEventListener('click', function() {buttonupdate(x)}))
    rendergrades()
})
