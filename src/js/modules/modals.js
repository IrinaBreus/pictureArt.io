import calcScroll from './calcScroll';

const modals = () => {
    const scroll = calcScroll();

    let btnPressed = false;

    const bindModal = (triggerSelector, modalSelector, closeSelector, destroy = false) => {
        const trigger = document.querySelectorAll(triggerSelector),
              modal = document.querySelector(modalSelector),
              close = document.querySelector(closeSelector),
              windows = document.querySelectorAll('[data-modal]');

        trigger.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                
                btnPressed = true;
                if (destroy) {
                    btn.remove();
                }
                openModal();
            });
        });

        close.addEventListener('click', () => {
            closeModal();
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
        
        function openModal() {
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            document.body.style.marginRight = `${scroll}px`;
            modal.classList.add('animated', 'fadeIn');
        }

        function closeModal() {
            modal.style.display = 'none';
            document.body.style.overflow = '';
            document.body.style.marginRight = `0px`;
        }

        function closeAllModal() {
            windows.forEach(item => {
                item.style.display = 'none';
            });
        }
    };
    function showModalByTime(selector, time) {
        setTimeout(function() {
            let display;

            document.querySelectorAll('[data-modal]').forEach(item => {
                if (getComputedStyle(item).display !== 'none') {
                    display = 'block';
                }
            });

            if (!display) {
                document.querySelector(selector).style.display = 'block';
                document.body.style.overflow = 'hidden';
                document.body.style.marginRight = `${scroll}px`;
            }

        }, time);
    }

    function openByScroll(selector) {
        window.addEventListener('scroll', () => {
           if (!btnPressed && window.pageYOffset + document.documentElement.clientHeight >=
               document.documentElement.scrollHeight) {

               document.querySelector(selector).click();
           }
        });
    }

    bindModal('.button-design', '.popup-design', '.popup-design .popup-close');
    bindModal('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close');
    bindModal('.fixed-gift', '.popup-gift', '.popup-gift .popup-close', true);

    openByScroll('.fixed-gift');

    showModalByTime('.popup-consultation', 60000);
};

export default modals;