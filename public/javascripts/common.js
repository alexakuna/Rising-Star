
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
    if (document.getElementById('tel')) {
      const mask = IMask(
            document.getElementById('tel'), {
                mask: '+{3}(000)000-00-00'
        })
        window.onunload = () => {
            mask.destroy()
        }
    }
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

