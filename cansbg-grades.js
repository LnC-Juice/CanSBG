function rendergrades() {   
    // console.log(document.querySelectorAll('.css-8oqple-text'))
    console.log(document.querySelectorAll('.percent'))
}
function buttonupdate(event) {
    console.log('test')
}

let apce = document.createElement('div')
apce.setAttribute('class', 'cansbg')
let apce_form = document.createElement('form')
let apce_form_input = document.createElement('input')
apce_form_input.setAttribute('type', 'radio')





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

        i.querySelector('input').addEventListener('click', buttonupdate())
    }
    rendergrades()
})
