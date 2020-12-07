const calcScroll = () => {
    let div = document.createElement('div');

    div.style.width = '50px';
    div.style.height = '50px';
    div.style.overflowY = 'scroll';
    div.style.visibility = 'hidden';

    document.body.append(div);

    let scrollWith = div.offsetWidth - div.clientWidth;

    div.remove();

    return scrollWith;
};

export default calcScroll;