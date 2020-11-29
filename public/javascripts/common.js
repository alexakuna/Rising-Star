
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
        const checkbox = form.querySelector('#check')
        const btn = form.querySelector('#btn-submit-data')
        const inputFiles = form.querySelector('#images-input')
        const video = form.querySelector('#video-file')
        const helperTextVideo = form.querySelector('#txt')

        video.addEventListener('change', () => {
            if (video.files.length) {
                if (video.files[0].size > 20000000) {
                    checkbox.checked = false
                    form.querySelector('.error-text-video').style.display = 'block'
                    btn.classList.add('disabled')
                    checkbox.disabled = true
                    helperTextVideo.disabled = true
                } else {
                    helperTextVideo.disabled = true
                    form.querySelector('.error-text-video').style.display = 'none'
                    checkbox.disabled = false
                }
            }
        })

        inputFiles.addEventListener('change', () => {
            const div = form.querySelector('.content-images')
                if(inputFiles.files.length > 3 || div.querySelectorAll('div').length > 3) {
                    console.log(inputFiles.files)
                    checkbox.checked = false
                    form.querySelector('.error-text-images').style.display = 'block'
                    btn.classList.add('disabled')
                    checkbox.disabled = true
                    div.querySelectorAll('div').forEach(i => i.remove())
                    inputFiles.value = ''
                    console.log(inputFiles.files)
                } else {
                    for (let i = 0; i < inputFiles.files.length; i++) {
                        let file = inputFiles.files[i];
                        const img = document.createElement('img')
                        const div1 = document.createElement('div')
                        div1.classList.add('col', 's12', 'm7')
                        const div2 = document.createElement('div')
                        div2.classList.add('card')
                        const div3 = document.createElement('div')
                        div3.classList.add('card-image')

                        img.file = file
                        div3.appendChild(img)
                        div2.appendChild(div3)
                        div1.appendChild(div2)
                        div.appendChild(div1)
                        const reader = new FileReader()
                        reader.onload = (function(aImg) {
                            return function(e) {
                                aImg.src = e.target.result
                            }
                        })(img)
                        reader.readAsDataURL(file);
                    }
                    form.querySelector('.error-text-images').style.display = 'none'
                    checkbox.disabled = false
                }
        })
        checkbox.addEventListener('click', () => {
            btn.classList.toggle('disabled')
        })
    }
})
