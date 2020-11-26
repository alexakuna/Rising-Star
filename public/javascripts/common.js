
document.addEventListener('DOMContentLoaded' , function() {
    const elem = document.querySelectorAll('.sidenav')
    M.Sidenav.init(elem)
    const form = document.querySelector('.request-form')
    if(form) {
        form.querySelectorAll('label')
            .forEach(function (i) {

                if (i.className !== 'active' && i.value !== '') i.className = 'active'
            })

        const ok = document.getElementById('doneMessage')
        if(ok.dataset.done) {
            M.toast({html: ok.dataset.done, inDuration: 2000})
        }
    }
    if (document.getElementById('tel')) {
      const mask = IMask(
            document.getElementById('tel'), {
                mask: '+00(000)000-00-00',
              lazy: false
        })
        window.onunload = () => {
            mask.destroy()
            //instanceSelect.destroy()
        }
    }
})
const btnSub = document.querySelector('#btn-submit-data')
// btnSub.addEventListener('click', (e) => {
//     checkSelect(e)
// })
function isDisabled() {
    btnSub.disabled ? btnSub.disabled = false : btnSub.disabled = true
    btnSub.style.backgroundColor = '#4a148c'
}

// function checkSelect(e) {
//     const input = document.querySelector('.helper-text-genre')
//     const options = Array.from(document.querySelectorAll('.input-select-genre select option'))
//     if(options.some(i => (i.selected && i.value === ''))) {
//         input.classList.add('show-helper-text')
//         e.preventDefault()
//     } else {
//         input.classList.remove('show-helper-text')
//     }
// }
