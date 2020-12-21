import {postData} from '../services/requests';
import calc from './calc';

const forms = () => {
    const form = document.querySelectorAll('form'),
          inputs = document.querySelectorAll('input'),
          upload = document.querySelectorAll('[name="upload"]');

    const message = {
        loading: "Отправка данных",
        success: "Спасибо, мы скоро с Вами свяжемся",
        failure: "Что-то пошло не так...",
        spinner: "assets/img/spinner.gif",
        ok: "assets/img/ok.png",
        fail: "assets/img/fail.png"
    };

    const path = {
        designer: 'assets/server.php',
        question: 'assets/question.php'
    };

    upload.forEach(item => {
        item.addEventListener('input', () => {
            console.log(item.files[0]);
            let dots;
            const arr = item.files[0].name.split('.');
            arr[0].length > 6 ? dots = "..." : dots = ".";
            const name = arr[0].substring(0, 6) + dots + arr[1];

            item.previousElementSibling.textContent = name;
        });
    });

    form.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            item.parentNode.append(statusMessage);

            item.classList.add('animated', 'fadeOutUp');
            setTimeout(() => {
                item.style.display = 'none';
            }, 400);

            let statusImg = document.createElement('img');
            statusImg.setAttribute('src', message.spinner);
            statusImg.classList.add('animated', 'fadeInUp');
            statusMessage.append(statusImg);

            let textMessage = document.createElement('div');
            textMessage.textContent = message.loading;
            statusMessage.append(textMessage);

            const state = calc();
            const formData = new FormData(item);
            let api;
            if (item.closest('.popup-design') || item.classList.contains('calc_form')) {
                for (let key in state) {
                    formData.append(key, state[key]);
                }
                api = path.designer;
                console.log(state);
            } else {
                api = path.question;
            }
            console.log(api);

            postData(api, formData)
            .then(res => {
                console.log(res);
                statusImg.setAttribute('src', message.ok);
                textMessage.textContent = message.success;
            }).catch(() => {
                statusImg.setAttribute('src', message.faile);
                textMessage.textContent = message.failure;
            }).finally(() => {
                inputs.forEach(input => {
                    input.value = '';
                });
                upload.forEach(item => {
                    item.previousElementSibling.textContent = 'Файл не выбран';
                });

                document.querySelector('#size').value = '';
                document.querySelector('#material').value = '';
                document.querySelector('#options').value = '0';
                document.querySelector('.calc .calc-price').textContent = 
                        'Для расчета нужно выбрать размер картины и материал картины';

                setTimeout(() => {
                    statusMessage.remove();
                    item.style.display = 'block';
                    item.classList.remove('fadeOutUp');
                    item.classList.add('fadeInUp');
                    
                }, 3000);
            });
        });
    });
};

export default forms;