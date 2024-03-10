const createModal = (title, content) => {
    const modal = document.createElement('div');
    let _title = title || 'Modal';
    let _content = content;
    let _colorBar = 200;
    let isDragging = false;
    let offsetX, offsetY;

    const handleStartMove = (e) => {
        isDragging = true;
        Object.assign(e.target.style, {
            cursor: 'grabbing',
        });
        offsetX = e.clientX - modal.getBoundingClientRect().left;
        offsetY = e.clientY - modal.getBoundingClientRect().top;
        document.body.style.userSelect = 'none';
    }

    const handleMove = (e) => {
        if (isDragging) {
            modal.style.left = (e.clientX - offsetX) + 'px';
            modal.style.top = (e.clientY - offsetY) + 'px';
            modal.style.transform = '';
        }
    }

    const handleEndMove = () => {
        isDragging = false;
        document.body.style.userSelect = 'auto';
    }

    const handleMouseDown = (e) => {
        if (!modal.contains(e.target)) {
            modal.style.display = 'none';
        }
    }

    const show = () => {
        modal.style.display = 'flex';
        document.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('mousemove', handleMove);
        document.addEventListener('mouseup', handleEndMove);
    }

    const hide = () => {
        modal.style.display = 'none';
        document.removeEventListener('mousedown', handleMouseDown);
        document.removeEventListener('mousemove', handleMove);
        document.removeEventListener('mouseup', handleEndMove);
    }

    const titleTextModal = () => {
        const span = document.createElement('span');
        Object.assign(span.style, {
            color: 'white',
            fontSize: 'medium',
            padding: '5px',
            display: 'flex',
            alignItems: 'center',
        });
        Object.defineProperty(modal, 'Title', {
            get: ()=> _title,
            set: (newTitle)=> {
                _title = newTitle;
                span.innerText = _title;
            }
        });
        span.innerText = _title;
        return modal.appendChild(span);
    }

    const closeModal = () => {
        const input = document.createElement('input');
        Object.assign(input.style, {
            color: 'white',
            backgroundColor: 'transparent',
            fontSize: 'medium',
            cursor: 'pointer',
            border: 'none',
            padding: '8px 15px'
        });
        input.type = 'button';
        input.value = 'x';
        input.addEventListener('mouseenter', () => { input.style.backgroundColor = '#E81123' });
        input.addEventListener('mouseleave', () => { input.style.backgroundColor = 'transparent' });
        input.addEventListener('click', hide);
        return modal.appendChild(input);
    }

    const titleBarModal = () => {
        const div = document.createElement('div');
        Object.assign(div.style, {
            display: 'flex',
            justifyContent: 'space-between',
            cursor: 'grab',
            background: 'hsl(196, 100%, 29%)',
            background: `linear-gradient(90deg, hsla(${_colorBar}, 100%, 29%,1) 0%, hsla(${_colorBar}, 86%, 25%,1) 35%, hsla(${_colorBar}, 100%, 39%,1) 100%)`,
        });
        Object.defineProperty(modal, 'colorBar', {
            get: ()=> _colorBar,
            set: (newColor)=> {
                _colorBar = newColor;
                div.style.background= `linear-gradient(90deg, hsla(${_colorBar}, 100%, 29%,1) 0%, hsla(${_colorBar}, 86%, 25%,1) 35%, hsla(${_colorBar}, 100%, 39%,1) 100%)`;
            }
        });
        div.addEventListener('mousedown', handleStartMove);
        div.addEventListener('mouseup', (e) => { e.target.style.cursor = 'grab'; });
        div.titleText = titleTextModal();
        div.appendChild(div.titleText);
        div.closeModal = closeModal();
        div.appendChild(div.closeModal);
        return modal.appendChild(div);
    }

    const bodyModal = () => {
        const div = document.createElement('div');
        Object.assign(div.style, {
            color: 'black',
            minHeight: '35px',
            padding: '5px'
        })
        Object.defineProperty(modal, 'Content', {
            get: ()=> _content,
            set: (newContent)=> {
                _content = newContent;
                div.innerText = _content;
            }
        });
        _content && (div.innerText = _content);
        return modal.appendChild(div);
    }

    const footerModal = () => {
        const div = document.createElement('div');
        Object.assign(div.style, {
            color: 'black',
            fontSize: '0.75em',
            padding: '5px'
        })
        return modal.appendChild(div);
    }

    const modalStyle = {
        position: 'fixed',
        display: 'none',
        flexDirection: 'column',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        boxShadow: '2px 2px 5px black',
        borderRadius: '5px',
        overflow: 'hidden',
        zIndex: 2147483647,
    }

    Object.assign(modal.style, modalStyle);

    return Object.assign(document.body.appendChild(modal), {
        show, hide,
        titleBar: titleBarModal(),
        body: bodyModal(),
        footer: footerModal(),
    });
}