const filter = () => {
    const menu = document.querySelector('.portfolio-menu'),
          items = menu.querySelectorAll('li'),
          contents = document.querySelectorAll('.portfolio-block'),
          no = document.querySelector('.portfolio-no');

    menu.addEventListener('click', (e) => {
        let target = e.target,
            btnName = target.classList.value;

        no.style.display = 'none';
        no.classList.remove('animated', 'fadeIn');

        contents.forEach(img => {
            img.style.display = 'none';
            img.classList.remove('animated', 'fadeIn');
            if (img.classList.contains(btnName)) {
                img.style.display = 'block';
            img.classList.add('animated', 'fadeIn');
            } else if (btnName == 'grandmother' || btnName == 'granddad') {
                no.style.display = 'block';
                no.classList.add('animated', 'fadeIn');
            }
        });

        if (target && target.tagName == 'LI') {
            items.forEach(btn => btn.classList.remove('active'));
            target.classList.add('active');
        }
    });
    
};

export default filter;