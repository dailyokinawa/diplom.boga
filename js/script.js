window.addEventListener("DOMContentLoaded", () => {

    // basket

    const basketProduct = document.querySelectorAll('.basket__product')

    if (basketProduct !== null) {

        basketProduct.forEach(function (wrapper) {

            const basketProductAmountValue = wrapper.querySelector('.basket__product-amount-value')
            const basketProductAmountBtnIncr = wrapper.querySelector('.basket__product-amount-btn-incr')
            const basketProductAmountBtnDecr = wrapper.querySelector('.basket__product-amount-btn-decr')
            const basketProductCostValue = wrapper.querySelector('.basket__product-cost-value')
            const basketProductCostValueHide = wrapper.querySelector('.basket__product-cost-value-hide')

            basketProductAmountBtnIncr.addEventListener('click', () => {
                basketProductAmountValue.innerHTML = Number(++basketProductAmountValue.innerHTML)
                basketProductCostValue.innerHTML = Number(basketProductCostValueHide.innerHTML * basketProductAmountValue.innerHTML)
            })

            basketProductAmountBtnDecr.addEventListener('click', () => {
                if (basketProductAmountValue.innerHTML > 1) {
                    basketProductAmountValue.innerHTML = Number(--basketProductAmountValue.innerHTML)
                    basketProductCostValue.innerHTML = Number(basketProductCostValueHide.innerHTML * basketProductAmountValue.innerHTML)
                }
            })

        })

    }

    // burger

    const burgerBtn = document.querySelector('.header__right')
    const burgerMenu = document.querySelector('.burger-menu')

    if (burgerBtn) {

        burgerBtn.addEventListener('click', () => {
            burgerMenu.classList.toggle('burger-menu--visible')
        })

    }

    // menu

    const menuCardBtns = document.querySelectorAll('.menu__card-btn');
    const linkBasket = document.querySelector('.link-basket');
    const linkBasketPrice = document.querySelector('.link-basket-price');

    let totalPrice = 0;

    if (linkBasket) {
        menuCardBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const card = btn.closest('.menu__card');
                const priceText = card.querySelector('.menu__card-price').textContent;
                const price = parseInt(priceText.replace('₽', '').trim());

                totalPrice += price;
                linkBasketPrice.textContent = `₽${totalPrice}`;

                linkBasket.classList.add('link-basket--visible');
            });
        });
    }

    // form

    const form = document.querySelector('.form')

    if (form) {
        new window.JustValidate('.form', {
            messages: {
                email: {
                    required: 'Введите E-mail'
                }
            },
            submitHandler: function (thisForm) {
                let formData = new FormData(thisForm);

                let xhr = new XMLHttpRequest();

                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4) {
                        if (xhr.status === 200) {
                            alert('Форма успешно отправлена')
                        }
                    }
                }

                xhr.open('POST', 'mail.php', true);
                xhr.send(formData);

                thisForm.reset();
            }
        })

    }

})

    // about-us

    let slideIndex = 1;
    showSlides(slideIndex);

    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    function currentSlide(n) {
        showSlides(slideIndex = n);
    }

    function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    
    if (n > slides.length) {slideIndex = 1}    
    if (n < 1) {slideIndex = slides.length}
    
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    
    slides[slideIndex - 1].style.display = "block";  
    dots[slideIndex - 1].className += " active";
}