
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
    const phoneMask = IMask(
        document.getElementById('tel'), {
            mask: '+{3}(000)000-00-00'
        });
})

// btnSub.addEventListener('click', () => {
//     document.querySelector('form').reset()
//     btnSub.disabled = true
// })
function isDisabled() {
    const btnSub = document.querySelector('#btn-submit-data')
    btnSub.disabled ? btnSub.disabled = false : btnSub.disabled = true
    btnSub.style.backgroundColor = '#4a148c'
}

// window.onpopstate = function(event) {
//     console.log("location: " + document.location + ", state: " + JSON.stringify(event.state));
//     //document.getElementById('check').removeAttribute('checked')
//
// };
//
// //let stackStates = []
// document.querySelector("body > header > nav > div > ul")
//     .addEventListener('click', function (e){
//         //e.preventDefault()
//         if(e.target.tagName !== 'A') return
//         //let target = e.target.href
//         history.pushState(null, null)
//     })
