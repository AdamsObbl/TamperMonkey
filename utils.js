//funkcja czekania
const sleep = duration => new Promise(resolve => setTimeout(resolve, duration));
//czekaj na tablicę elementów
const waitForElAll = async (selector, duration) => {
    await sleep(duration);
    return document.querySelectorAll(selector).length ? document.querySelectorAll(selector) : waitForElAll(selector, duration);
}
//czekaj na element
const waitForEl = async (selector, duration) => {
    await sleep(duration);
    return document.querySelector(selector) || waitForEl(selector, duration);
}
//gotowe elementy HTML
const element = {
    //zwróć select z options
    select : (values, hadleChange, style) => {
        const select = document.createElement('select');
        Object.assign(select.style, style);
        const optionDef = document.createElement('option');
        optionDef.selected = true;
        optionDef.disabled = true;
        optionDef.value = -1;
        optionDef.innerText = 'wybierz..';
        select.appendChild(optionDef);
        values.forEach((options) => {
            const { value, text } = options;
            const option = document.createElement('option');
            option.value = value || options;
            option.innerText = text || value || options;
            select.appendChild(option);
        })
        select.addEventListener('change', hadleChange)
        return select;
    },
    //zwróć grupę checkboxów,
    checkbox : (values, hadleChange, style) => {
        const div = document.createElement('div');
        values.forEach((options) => {
            const { value, text } = options;
            const lbl = document.createElement('label');
            lbl.innerText =  text || value || options;
            const check = document.createElement('input');
            Object.assign(check.style, style);
            check.value = value || options;
            check.type = 'checkbox';
            check.addEventListener('change', hadleChange);
            lbl.prepend(check);
            div.appendChild(lbl);
        })
        return div;
    },
    //zwróć grupę radio buttonów
    radio : (values, hadleChange, style) => {
        const div = document.createElement('div');
        values.forEach((options) => {
            const { value, text } = options;
            const lbl = document.createElement('label');
            lbl.innerText = text || value || options;
            const radio = document.createElement('input');
            Object.assign(radio.style, style);
            radio.value = value || options;
            radio.type = 'radio';
            radio.name = values.map(el => el?.value||el);
            radio.addEventListener('change', hadleChange)
            lbl.prepend(radio);
            div.appendChild(lbl);
        })
        return div;
    },
    //zwróć przycisk
    btn : (value, hadleClick, style) => {
        const inp = document.createElement('input');
        Object.assign(inp.style, style);
        inp.value = value||'';
        inp.type = 'button';
        inp.addEventListener('click', hadleClick)
        return inp;
    }
}
