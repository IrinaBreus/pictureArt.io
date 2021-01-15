import {postData} from '../services/requests';

const drop = () => {
    // drag 
    // dragend
    // dragenter - объект над dropArea
    // dragexit
    // dragleave - объект за пределами dropArea
    // dragover - объект в движении над dropArea
    // dragstart
    // drop - объект отправлен в dropArea

    const fileInputs = document.querySelectorAll('[name="upload"]');

    ['dragenter', 'dragleave', 'dragover', 'drop'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, preventDefaults, false);
        });
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    function highLight(item) {
        item.closest('.file_upload').style.border = "1px solid #c51abb";
        item.closest('.file_upload').style.backgroundColor = "#eed4d2";
    }

    function unhighLight(item) {
        item.closest('.file_upload').style.border = "none";
        item.closest('.file_upload').style.backgroundColor = "";
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, () => highLight(input), false);
        });
    });

    ['dragleave', 'drop'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, () => unhighLight(input), false);
        });
    });

    fileInputs.forEach(input => {
        input.addEventListener('drop', (e) => {
            input.files = e.dataTransfer.files;

            if (input.closest('.main')) {
                const formData = new FormData();
                formData.append('file', input.files[0]);

                postData('assets/server.php', formData)
                .then(res => console.log(res));
            }
                        
            let dots;
            const arr = input.files[0].name.split('.');

            arr[0].length > 6 ? dots = '...' : dots = '.';
            const name = arr[0].substring(0, 6) + dots + arr[1];
            input.previousElementSibling.textContent = name;
        });
    });

    
};

export default drop;