
// const win = window.querySelector('html')
// const cords = win.getBoundingClientRect()
// const mainHeight = document.querySelector('.height-main')
// mainHeight.style.height = window.innerHeight - 64 + 'px'
// document.onmousemove = (e) => {
//     console.log(e)
// }
document.addEventListener('DOMContentLoaded', function() {
    const elem = document.querySelectorAll('.sidenav');
    M.Sidenav.init(elem)
});
