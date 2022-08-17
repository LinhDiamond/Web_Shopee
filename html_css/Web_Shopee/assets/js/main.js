const modal = document.querySelector('.modal')
const btnBacks = document.querySelectorAll('.js-btn-back')
const authForms = document.querySelectorAll('.auth-form')

// Đăng ký
    const btnResgiter = document.querySelector('.js-resgiter')
    const formResgiter = document.querySelector('.auth-form--resgiter')

    // Mở Form đăng kí 
    function openFormResgiter(){
        modal.classList.add('open')
        formResgiter.classList.add('open-form')
    }
    btnResgiter.addEventListener('click',openFormResgiter)

    // Hàm Đóng Form đăng kí
    function closeFormResgiter(){
        modal.classList.remove('open')
        formResgiter.classList.remove('open-form')
    }
    
// Đăng nhập
    const btnLogin = document.querySelector('.js-login')
    const formLogin = document.querySelector('.auth-form--login')
    
    // Mở Form đăng nhập
    function openFormLogin(){
        modal.classList.add('open')
        formLogin.classList.add('open-form')
    }
    btnLogin.addEventListener('click',openFormLogin)
    
    // Hàm Đóng Form đăng nhập
    function closeFormLogin(){
        modal.classList.remove('open')
        formLogin.classList.remove('open-form')
    }

// Đóng form Đăng nhập và đăng ký
for(const btnBack of btnBacks)
{
    btnBack.addEventListener('click',closeFormResgiter);
    btnBack.addEventListener('click',closeFormLogin);
}

modal.addEventListener('click',closeFormResgiter)
modal.addEventListener('click',closeFormLogin)
    // Ngăn chặn nổi bọt
    for(const authForm of authForms)
    {
        authForm.addEventListener('click', function(event){
            event.stopPropagation()
        })
    }

// Switch Form Đăng nhập và Đăng ký
const switchResgiter = document.querySelector('.js-switch-resgiter')
const switchLogin = document.querySelector('.js-switch-login')

switchResgiter.addEventListener('click',closeFormLogin)
switchResgiter.addEventListener('click',openFormResgiter)

switchLogin.addEventListener('click',closeFormResgiter)
switchLogin.addEventListener('click',openFormLogin)

// đăng nhập tài khoản
const btnLoginUser = document.querySelector('.js-btn-login-user')
const closeNavItems = document.querySelectorAll('.item-open-user')
const userNav = document.querySelector('.navbar__item-user')

function loginUser(){
    for(const closeNavItem of closeNavItems)
    {
        closeNavItem.classList.add('close')
    }
    userNav.classList.add('open')
    modal.classList.remove('open')
}
btnLoginUser.addEventListener('click',loginUser)

// Thoát tài khoản
const btnLogoutUser = document.querySelector('.js-logout')

btnLogoutUser.addEventListener('click', function (event){
    for(const closeNavItem of closeNavItems)
    {
        closeNavItem.classList.remove('close')
    }
    userNav.classList.remove('open')
})

// Like Product
const likeProducts = document.querySelectorAll('.js-products-item__like')
const likeEmpty = document.querySelector('.products-item__like-icon--empty')
const likeFill = document.querySelector('.products-item__like-icon--fill')

// Lỗi nút like sản phẩm
likeEmpty.addEventListener('click', function(event){
    for(const likeProduct of likeProducts)
    {
        this.likeProduct.classList.add('products-item__like--clicked')
        event.stopImmediatePropagation;
    }
})
likeFill.addEventListener('click', function(event){
    for (const likeProduct of likeProducts)
    {
        
        this.likeProduct.classList.remove('products-item__like--clicked')
        event.stopImmediatePropagation;
    }
})
