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
const element = () => {
    //zwróć select z options
    const select = (values, hadleChange, style) => {
        const select = document.createElement('select');
        Object.assign(select.style, style);
        const optionDef = document.createElement('option');
        optionDef.selected = true;
        optionDef.disabled = true;
        optionDef.value = -1;
        optionDef.innerText = 'wybierz..';
        select.appendChild(optionDef);
        values.forEach(({ value, text }) => {
            const option = document.createElement('option');
            option.value = value;
            option.innerText = text || value;
            select.appendChild(option);
        })
        select.addEventListener('change', hadleChange)
        return select;
    }
    //zwróć grupę checkboxów,
    const checkbox = (values, hadleChange) => {
        const div = document.createElement('div');
        values.forEach(({ value, text }) => {
            const lbl = document.createElement('label');
            lbl.innerText = text || value;
            const radio = document.createElement('input');
            radio.value = value;
            radio.type = 'checkbox';
            radio.addEventListener('change', hadleChange);
            lbl.prepend(radio);
            div.appendChild(lbl);
        })
        return div;
    }
    return { select, checkbox }
}
