function toast ({title = '', message = '', type = 'info', duration = 3000}) {
    var main = document.getElementById('toast');
    if(main) {
        const toast = document.createElement('div');
        const icons = {
            success: 'fa-solid fa-circle-check',
            info: 'fa-solid fa-circle-info',
            warning: 'fa-solid fa-triangle-exclamation',
            error: 'fa-solid fa-circle-exclamation'
        }
        const icon = icons[type];
        const delay = (duration / 1000).toFixed(2);
        const timeFadeOut = 1000;

        const autoRemoveId = setTimeout(() => {
            main.removeChild(toast);
        },duration + timeFadeOut);

        toast.onclick = function(e) {
            if(e.target.closest('.toast__close'))
            {
                main.removeChild(toast);
                clearTimeout(autoRemoveId);
            }
        }
        toast.classList.add('toast', `toast--${type}`);
        toast.style.animation = `sildeInleft ease 0.5s, fadeOut linear ${(timeFadeOut / 1000).toFixed(2)}s ${delay}s forwards`;
        toast.innerHTML = `
            <div class="toast__icon">
                <i class="${icon}"></i>
            </div>
            <div class="toast__body">
                <h3 class="toast__title">${title}</h3>
                <p class="toast__msg">${message}</p>
            </div>
            <div class="toast__close">
                <i class="fa-solid fa-xmark"></i>
            </div>
        `;
        main.appendChild(toast);
    }
}

function showSuccessToast() {
    toast({
        title: 'Success',
        message: 'You have successfully been sent.',
        type: 'success',
        duration: 5000
    });
}
function showErrorToast() {
    toast({
        title: 'Error',
        message: 'Something went wrong.',
        type: 'error',
        duration: 5000
    });
}
