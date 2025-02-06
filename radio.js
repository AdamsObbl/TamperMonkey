import { craftelm } from "./craftelm.js";

export const radio = ({ size=16, hue, selector, options, name }) => {
    const allElm = document.querySelectorAll(selector);
    if (!allElm.length) {
        return;
    }

    const textContent = `
    ${selector} input+span{
        color: #767676;
        background-color: #fff;
        border-color:  currentColor;
    }
    ${selector} label:hover input+span{
        color: #4f4f4f;
    }
    ${selector} input:checked+span{
        box-shadow: inset 0 0 0 ${size/8}px white;
        color:hsl(${hue || 212}, 100.00%, 50.00%);
        background-color: currentColor;
        border-color: currentColor;
    }
    ${selector} label:hover input:checked+span{
        color:hsl(${hue || 212}, 100.00%, 39.20%);
    }
    `;
    craftelm({
        nodeName: 'style',
        textContent,
    }, document.head);

    const createRadio = parent => innerText => {
        const label = craftelm({
            nodeName: 'label',
            style: { display: 'flex', alignItems: 'center', },
        }, parent);

        const input = craftelm({
            nodeName: 'input',
            type: 'radio',
            name,
            value: innerText,
            style: { display: 'none' }
        }, label);

        const fakeInput = craftelm({
            nodeName: 'span',
            style: { display: 'block', borderStyle: 'solid', borderWidth: `${size/16}px`, height: `${size - 5}px`, aspectRatio: 1, borderRadius: '100%', marginRight:  `${size/5}px`,}
        }, label);

        const spanText = craftelm({
            nodeName: 'span',
            innerText,
            style: { fontSize: `${size}px` }
        }, label);
    }

    const createRadios = (element) => {
        options.forEach((createRadio(element)))
    }

    [...allElm].forEach(createRadios);
}