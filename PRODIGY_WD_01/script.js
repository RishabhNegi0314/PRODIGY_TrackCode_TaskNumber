function showSidebar(){
    event.preventDefault();
    const sidebar = document.querySelector('.sidebar')
    sidebar.style.display = 'flex'
  }
  function hideSidebar(){
    event.preventDefault();
    const sidebar = document.querySelector('.sidebar')
    sidebar.style.display = 'none'
  }

window.addEventListener('scroll', function() {
    const nav = document.querySelector('.nav');
    if (window.scrollY > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});