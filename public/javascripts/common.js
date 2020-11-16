
// const win = window.querySelector('html')
// const cords = win.getBoundingClientRect()
// const mainHeight = document.querySelector('.height-main')
// mainHeight.style.height = window.innerHeight - 64 + 'px'
// document.onmousemove = (e) => {
//     console.log(e)
// }
document.addEventListener('DOMContentLoaded' , function() {
    const elem = document.querySelectorAll('.sidenav')
    M.Sidenav.init(elem)
    const form = document.querySelector('.request-form')
    if(form) {
        form.querySelectorAll('label')
            .forEach(function (i) {

                if (i.className !== 'active' && i.value !== '') i.className = 'active'
            })
    }

})


function isDisabled() {
    const submit = document.querySelector('#btn-submit-data')
    submit.disabled = !submit.disabled
    submit.style.backgroundColor = '#4a148c'
}
