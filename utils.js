//funkcja czekania
const sleep = duration => new Promise(resolve => setTimeout(resolve, duration));
//czekaj na tablicę elementów
const waitForElAll = async (selector, duration) => {
    await sleep(duration);
    return document.querySelectorAll(selector).length ? document.querySelectorAll(selector) : waitForElAll(selector, duration);
};
//czekaj na element
const waitForEl = async (selector, duration) => {
    await sleep(duration);
    return document.querySelector(selector) || waitForEl(selector, duration);
};
//gotowe elementy HTML
const element = {
    //zwróć select z options
    select: (values, hadleChange, style) => {
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
    checkbox: (values, hadleChange, style) => {
        const div = document.createElement('div');
        values.forEach((options) => {
            const { value, text, checked } = options;
            const lbl = document.createElement('label');
            lbl.innerText = text||text===''?text: value || options;
            const check = document.createElement('input');
            Object.assign(check.style, style);
            check.value = value || options;
            check.type = 'checkbox';
            check.checked = checked;
            check.addEventListener('change', hadleChange);
            lbl.prepend(check);
            div.appendChild(lbl);
        })
        return div;
    },
    //zwróć grupę radio buttonów
    radio: (values, hadleChange, style) => {
        const div = document.createElement('div');
        values.forEach((options) => {
            const { value, text } = options;
            const lbl = document.createElement('label');
            lbl.innerText = text || value || options;
            const radio = document.createElement('input');
            Object.assign(radio.style, style);
            radio.value = value || options;
            radio.type = 'radio';
            radio.name = values.map(el => el?.value || el);
            radio.addEventListener('change', hadleChange)
            lbl.prepend(radio);
            div.appendChild(lbl);
        })
        return div;
    },
    //zwróć przycisk
    btn: (value, hadleClick, style) => {
        const inp = document.createElement('input');
        Object.assign(inp.style, {cursor:'pointer'}, style);
        inp.value = value || '';
        inp.type = 'button';
        inp.addEventListener('click', hadleClick)
        return inp;
    },
    txt: (value, text, hadleInput, style) => {
        const lbl = document.createElement('label');
        lbl.innerText = text || '';
        const inp = document.createElement('input');
        inp.value = value;
        inp.type = 'text';
        Object.assign(inp.style, style);
        inp.addEventListener('input', hadleInput);
        lbl.appendChild(inp);
        return lbl;
    },
    num: (value, text, hadleInput, range, style) => {
        const lbl = document.createElement('label');
        lbl.innerText = text || '';
        const inp = document.createElement('input');
        inp.type = 'number';
        inp.value = value;
        inp.min = range.min;
        inp.max = range.max;
        Object.assign(inp.style, style);
        inp.addEventListener('input', hadleInput);
        lbl.appendChild(inp);
        return lbl;
    },
};
//mapa polskich znaków
const polishChars = {
    'ą': 'a',
    'ć': 'c',
    'ę': 'e',
    'ł': 'l',
    'ń': 'n',
    'ó': 'o',
    'ś': 's',
    'ź': 'z',
    'ż': 'z',
    'Ą': 'A',
    'Ć': 'C',
    'Ę': 'E',
    'Ł': 'L',
    'Ń': 'N',
    'Ó': 'O',
    'Ś': 'S',
    'Ź': 'Z',
    'Ż': 'Z',
};
//usuń polskie litery z tekstu zastępując je łacińskimi
const replacePolish = (string) => string.replace(/[ąćęłńóśźżĄĆĘŁŃÓŚŹŻ]/g, (char) => polishChars[char] || char);
//zamień text na HTML
const stringToHTML = (str) => {
    const parser = new DOMParser();
    return parser.parseFromString(str, 'text/html');
};
//dekoduj pobrany buffer z iso
const bufferFromISO = (buffer) => {
    const decoder = new TextDecoder('ISO-8859-2');
    return decoder.decode(buffer);
};
//po zmianie textu na parametry metodą URLSearchParams mamy polskie litery encodowane do URI w utf8,
//funkcja robi to do iso88592
const urlSearchParamsISOString = (json) => {
    const text = new URLSearchParams(json).toString();
    const replacements = {
        '%C4%85': '%B1', // ą
        '%C4%87': '%E6', // ć
        '%C4%99': '%EA', // ę
        '%C5%82': '%B3', // ł
        '%C5%84': '%F1', // ń
        '%C3%B3': '%F3', // ó
        '%C5%9B': '%B6', // ś
        '%C5%BA': '%BC', // ź
        '%C5%BC': '%BF', // ż
        '%C4%84': '%A1', // Ą
        '%C4%86': '%C6', // Ć
        '%C4%98': '%CA', // Ę
        '%C5%81': '%A3', // Ł
        '%C5%83': '%D1', // Ń
        '%C3%93': '%D3', // Ó
        '%C5%9A': '%A6', // Ś
        '%C5%B9': '%AC', // Ź
        '%C5%BB': '%AF', // Ż
    };
    return text.replace(/%[0-9A-Fa-f]{2}%[0-9A-Fa-f]{2}/g, (match) => replacements[match] || match);
};
//kopiowanie textu do schowka po staremu
const _oldCopyToClipBoard = (str) => {
    const textArea = document.createElement('textarea');
    Object.assign(textArea.style, { position: 'fixed', opacity: 0 });
    textArea.value = str;
    document.body.prepend(textArea);
    textArea.select();
    document.execCommand?.('copy');
    textArea.remove();
}
//kopiowanie textu do schowka
const copyToClipBoard = async (str) => {
        try {
            await navigator.clipboard.writeText(text);
        } catch (error) {
            _oldCopyToClipBoard(str)
        }
}