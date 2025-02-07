import { craftelm } from "./craftelm.js";


export const checkbox = ({ size = 16, hue, selector, options }) => {

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
        position: relative;
        color:hsl(${hue || 212}, 100.00%, 50.00%);
        color:hsl(${hue || 212}, 100.00%, 50.00%);
        background-color: currentColor;
        border-color: currentColor;
    }
    ${selector} input:checked+span:before{
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        clip-path: polygon(37% 60%, 78% 9%, 93% 21%, 39% 88%, 8% 57%, 21% 43%);
        background-color: #ffffff
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
            type: 'checkbox',
            name: innerText,
            style: { display: 'none' }
        }, label);

        const fakeInput = craftelm({
            nodeName: 'span',
            style: { display: 'block', borderStyle: 'solid', borderWidth: `${size/(16/1)}px`, borderRadius: `${size/(16/2)}px`, height: `${size/(16/11)}px`, aspectRatio: 1, marginRight: `${size/(16/3)}px`, }
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