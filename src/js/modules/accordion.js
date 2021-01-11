const accordion = (triggersSelector) => {
    const btns = document.querySelectorAll(triggersSelector);

    const closeWindows = (n) => {
        btns.forEach((btn, i) => {
            if (i !== n) {
                btn.classList.remove('active-style');
                btn.nextElementSibling.classList.remove('active-content');
                btn.nextElementSibling.style.maxHeight = '0px';
            }
        });
    };

    btns.forEach((btn, i) => {
        btn.addEventListener('click', function () {
            
            closeWindows(i);

            this.classList.toggle('active-style');
            this.nextElementSibling.classList.toggle('active-content');

            if (this.classList.contains('active-style')) {
                this.nextElementSibling.style.maxHeight = this.nextElementSibling.scrollHeight +  80 + 'px';
            } else {
                this.nextElementSibling.style.maxHeight = '0px';
            }
        });
    });
        
    
    
    
    //   blocks = document.querySelectorAll(itemSelector);

//     blocks.forEach(block => {
//         block.classList.add('animated', 'fadeInDown');
//     });

//     btns.forEach(btn => {
//         btn.addEventListener('click', function() {
//             if (!this.classList.contains('active')) {
//                 btns.forEach(btn => {
//                     btn.classList.remove('active', 'active-style');
//                 });
//                 this.classList.add('active', 'active-style');
//             }
//         });
//     });
};

export default accordion;