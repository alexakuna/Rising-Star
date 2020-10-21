
// const win = window.querySelector('html')
// const cords = win.getBoundingClientRect()
// const mainHeight = document.querySelector('.height-main')
// mainHeight.style.height = window.innerHeight - 64 + 'px'
// document.onmousemove = (e) => {
//     console.log(e)
// }
document.addEventListener('DOMContentLoaded', function() {
    //const close = document.querySelector('#btn-close')
    const elem = document.querySelectorAll('.sidenav');
    M.Sidenav.init(elem)
    // close.addEventListener('click', () => {
    //     elem[0].close()
    // } )
});


// console.log(document.querySelectorAll('[data-act="active"]'))
