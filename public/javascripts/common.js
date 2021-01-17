
document.addEventListener('DOMContentLoaded' , function() {
    const form = document.querySelector('.request-form')
    const nav = document.querySelectorAll('.sidenav')
    M.Sidenav.init(nav)
    if(form) {

        const modalEl = form.querySelectorAll('.modal');
        const modalInstances = M.Modal.init(modalEl, {dismissible: false})

        const urlVideo = form.querySelector('#txt')
        const ok = document.querySelector('#doneMessage')
        const checkbox = form.querySelector('#check')
        const btn = form.querySelector('#btn-submit-data')
        const inputFiles = form.querySelector('#images-input')
        const inputInvoice = form.querySelector('#images-input-invoice')
        const video = form.querySelector('#video-file')
        const helperTextVideo = form.querySelector('#txt')
        const err = form.querySelector('.error-text-images')
        const err2 = form.querySelector('.error-text-invoice')
        const err3 = form.querySelector('.error-text-images-art')
        const artImages = form.querySelector('#images-input-art')

        form.querySelectorAll('label')
            .forEach(function (i) {
                if (i.className !== 'active' && i.value !== '') i.className = 'active'
            })
        if(ok.dataset.done) {
            M.toast({html: ok.dataset.done, inDuration: 1700})
        }

        video.addEventListener('change', () => {
            if (video.files.length) {
                form.querySelector('.size_video_file')
                    .innerHTML = `Size: ${(video.files[0].size / 1000000).toFixed()} mb`
                if (video.files[0].size > 1024 * 1024 * 300) {
                    checkbox.checked = false
                    form.querySelector('.error-text-video').style.display = 'block'
                    btn.classList.add('disabled')
                    checkbox.disabled = true
                    helperTextVideo.disabled = true
                    video.value = ''
                } else {
                    helperTextVideo.disabled = true
                    form.querySelector('.error-text-video').style.display = 'none'
                    checkbox.disabled = false
                }
            }
        })
        inputInvoice.addEventListener('change', () => {
            const block = form.querySelector('.content-images-invoice')
            if(!inputInvoice.files.length || inputInvoice.files.length > 1) {
                checkbox.checked = false
                err2.style.display = 'block'
                btn.classList.add('disabled')
                checkbox.disabled = true
                block.querySelectorAll('.main-div').forEach(i => i.remove())
                inputFiles.value = ''
            } else {
                if(block.querySelectorAll('.main-div').length) block.querySelectorAll('.main-div')[0].remove()
                previewImages(block, inputInvoice.files, err2)
            }
        })
        inputFiles.addEventListener('change', () => {
            const div = form.querySelector('.content-images')
            const divs = div.querySelectorAll('.main-div')
                if(inputFiles.files.length > 3 || inputFiles.files.length === 0) {
                    divs.forEach(i => i.remove())
                    errHelper(err)
                } else {
                    if(divs.length >= 3) {
                        divs.forEach(i => i.remove())
                        errHelper(err)
                        return
                    }
                        previewImages(div, inputFiles.files, err)
                }
        })

        artImages.addEventListener('change', () => {
            const div = form.querySelector('.content-images-art')
            const divs = div.querySelectorAll('.main-div')
            if(artImages.files.length > 8 || artImages.files.length === 0) {
                divs.forEach(i => i.remove())
                errHelper(err3)
            } else {
                if(divs.length >= 8) {
                    divs.forEach(i => i.remove())
                    errHelper(err3)
                    return
                }
                previewImages(div, artImages.files, err3)
            }
        })

        checkbox.addEventListener('click', () => {
            btn.classList.toggle('disabled')
        })

        function previewImages(div, filesImg, error) {
            for (let i = 0; i < filesImg.length; i++) {
                let file = filesImg[i];
                const img = document.createElement('img')
                const div1 = document.createElement('div')
                div1.classList.add('col', 's6', 'm4', 'l4', 'main-div')
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
            error.style.display = 'none'
            checkbox.disabled = false
        }
        function errHelper(err) {
            checkbox.checked = false
            err.style.display = 'block'
            btn.classList.add('disabled')
            checkbox.disabled = true
            inputFiles.value = ''
        }
        function deleteAllImages() {
            form.querySelectorAll('.main-div').forEach(i => i.remove())
        }
        const genre = form.querySelector('#gen')
        const genreContainer = form.querySelector('#nomination')
        const clearInputNom = form.querySelector('#clear-input')

        form.querySelector('#nom').addEventListener('change',  (e) => {
            if(e.target.value) {
                clearInputNom.style.display = 'block'
            } else {
                clearInputNom.style.display = ''
            }
        })
        clearInputNom.addEventListener('click', () => {
            const nominationInput = form.querySelector('#nom')
            nominationInput.value = ''
            nominationInput.classList.remove('valid')
            clearInputNom.style.display = ''
        })
        genre.onchange = function renderDataOptions(e) {
            hideOrVisibleInputFotArt(e)
            const options = genreContainer.querySelectorAll('option')
            const nominationInput = form.querySelector('#nom')
            nominationInput.value = ''
            if(options.length) options.forEach(i => i.remove())
            const data = {
                nomination: e.target.value
            }
            fetch('http://localhost:4200/get-nomination-data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(data)
            })
                .then(data => data.json())
                .then(result => {
                    result.data[0][e.target.value].forEach(i => {
                        const option = document.createElement('option')
                        option.value = i
                        genreContainer.appendChild(option)
                    })
                })
        }
        function hideOrVisibleInputFotArt(e) {
            const art = form.querySelector('.art-block-images')
            if(e.target.value === 'art') {
                art.style.display = 'block'
            } else {
                art.style.display = 'none'
            }
        }
        btn.addEventListener('click', () => {
            const validator = new FormValidator('request_form', [{
                name: 'country',
                display: 'required',
                rules: 'required'
            }, {
                name: 'city',
                display: 'required',
                rules: 'required'
            }, {
                name: 'name_organisation',
                display: 'required',
                rules: 'required'
            }, {
                name: 'pip',
                display: 'required',
                rules: 'required'
            }, {
                name: 'email',
                display: 'required',
                rules: 'valid_email'
            }, {
                name: 'genre',
                display: 'required',
                rules: 'required'
            }, {
                name: 'nomination',
                display: 'required',
                rules: 'required'
            }, {
                name: 'age',
                display: 'required',
                rules: 'required'
            }, {
                name: 'name_performance',
                display: 'required',
                rules: 'required'
            }, {
                name: 'tel',
                display: 'required',
                rules: 'numeric'
            },{
                name: 'pip_getter',
                display: 'required',
                rules: 'required'
            }, {
                name: 'image',
                display: 'required',
                rules: 'required'
            }, {
                name: 'invoice',
                display: 'required',
                rules: 'required'
            }, {
                name: 'check_box',
                display: 'required',
                rules: 'required'
            }], function(errors, event) {
                if (errors.length > 0) {
                    event.preventDefault()
                } else {
                    modalInstances[0].open()
                }
            })
        })
        urlVideo.addEventListener('change', (e) => {
            const el = e.target
            if(el.value) {
                const i = form.querySelector('.insert_link')
                i.style.display = 'block'
                i.addEventListener('click', () => {
                    console.log('test')
                    urlVideo.disabled = false
                    urlVideo.value = ''
                    video.value = ''
                })
            }
        })
        form.querySelector('#reset-form').addEventListener('click', () => {
            deleteAllImages()
            form.querySelector('.size_video_file').innerHTML = ''
            form.reset()
            if(!form.querySelector('#btn-submit-data').disabled) {
                form.querySelector('#btn-submit-data').classList.add('disabled')
            }
        })
    }
})
