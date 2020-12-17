const calc = () => {
    const size = document.querySelector('#size'),
          material = document.querySelector('#material'),
          options = document.querySelector('#options'),
          promocode = document.querySelector('.promocode'),
          result = document.querySelector('.calc-price');

    let sum = 0,
        n = document.querySelector('#size, #material, #options').options.selectedIndex;
    
    const calcFunc = () => {
        sum = Math.round((+size.value) * (+material.value) + (+options.value));

        if (size.value == '' || material.value == '') {
            result.textContent = "Пожалуйста, выберите размер и материал картины";
        } else if (promocode.value === 'IWANTPOPART') {
            result.textContent = Math.round(sum * 0.7);
        } else {
            result.textContent = sum;
        }
        
    };
    
    size.addEventListener('change', calcFunc);
    material.addEventListener('change', calcFunc);
    options.addEventListener('change', calcFunc);
    promocode.addEventListener('input', calcFunc);
    
    return {
        'size' : size[n].text,
        'material' : material[n].text,
        'options' : options[n].text,
        'promocode' : promocode.value
    };
    
};

export default calc;