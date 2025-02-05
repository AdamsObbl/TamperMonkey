const mergeObjects = ({ element, option, value }) => {
    Object.assign(element[option], value);
}

const setOption = ({ element, option, value }) => {
    element[option] = value;
}

const assignOptions = (element) => ([option, value]) => {
    const isObject = typeof value === 'object' && value !== null;
    const data = { element, option, value };
    isObject ? mergeObjects(data) : setOption(data);
}

const insertAfterElement = (parent, child, element) => {
    const nextSibling = child?.nextSibling;
    child && nextSibling ? parent.insertBefore(element, nextSibling) : parent.appendChild(element);
}
const insertBeforeElement = (parent, child, element) => {
    child ? parent.insertBefore(element, child) : parent.prepend(element)
}

const insertChild = (parent, direction, child, element) => {
    switch (direction) {
        case 'before':
            insertBeforeElement(parent, child, element);
            break;
        case 'after':
            insertAfterElement(parent, child, element);
            break;
        default:
            parent.appendChild(element);
            break;
    }
}

export const craftelm = ({ type, ...options }, parent, direction, child) => {
    const element = document.createElement(type);
    Object.entries(options).forEach(assignOptions(element));
    insertChild(parent, direction, child, element);
    return element;
}