const suppExtension = {
    docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
}

const rightStyle = { position: 'absolute', right: '10px', top: '7.5px', };
const dropZoneStyle = {
    border: '2px dashed currentColor', padding: '10px',
    maxWidth: '250px', margin: '10px auto', textOverflow: 'ellipsis',
    whiteSpace: 'nowrap', overflow: 'hidden', position: 'relative'
}

const handleCancel = (e)=>{
    undoClearAFterAddFile(e.target.parentElement)
}

const closeButton = () =>{
    const btn = document.createElement('button');
    Object.assign(btn, { innerText:'x', onclick:handleCancel });
    Object.assign(btn.style, rightStyle);
    return btn;
}

const undoClearAFterAddFile= (element) => {
    element.children?.[0].remove();
    element.innerText = element.title;
    element.addEventListener('drop', handleDrop);
    element.addEventListener('dragover', handleDragOver);
    element.addEventListener('dragleave', handleDrop);
    Object.assign(element.style, dropZoneStyle);
    element.appendChild(addButtom());
}

const clearAfterAddFile = (element, name) => {
    element.children?.[0].remove();
    element.innerText = name;
    element.removeEventListener('drop', handleDrop);
    element.removeEventListener('dragover', handleDragOver);
    element.removeEventListener('dragleave', handleDrop);
    element.style.border = '2px solid transparent';
    element.style.color = '#000';
    element.appendChild(closeButton());
}

const getArrayBuffer = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = function (event) {
            resolve(event.target.result);
        };
        reader.onerror = function (error) {
            reject(error);
        };
        reader.readAsArrayBuffer(file);
    });
}


const handleDrop = (e) => {
    e.preventDefault();
    if (!isCorectFile(e.dataTransfer)) {
        return;
    }
    const [item] = e.dataTransfer.items;
    const file = item.getAsFile();
    clearAfterAddFile(e.target, file.name);
    //do things with file
};

const isCorectFile = (dataTransfer) => {
    if (dataTransfer?.items?.length !== 1) {
        return false;
    }
    const [file] = dataTransfer.items;
    if (!Object.values(suppExtension).includes(file.type)) {
        return false;
    }
    return true;
}

const handleDragOver = (e) => {
    e.preventDefault();
    if (!isCorectFile(e.dataTransfer)) {
        e.dataTransfer.dropEffect = "none";
        e.target.style.color = '#d13038';
        return;
    }
    e.target.style.color = '#92C7CF';
};

const handlechangeFile = function(e) {
    const file = e.target.files[0];
    const extension = file.name.split('.').pop().toLowerCase();
    if (!Object.keys(suppExtension).includes(extension)) {
        return;
    }
    clearAfterAddFile(this.parentElement, file.name);
    //do things with file
}

const handleDragLeave = (e) => {
    e.target.style.color = '#000';
}

const addButtom=()=>{
    const input = document.createElement('input');
    const btn = document.createElement('button');
    Object.assign(input,{type:'file',accept:'.' + Object.keys(suppExtension).join(', .'),onchange:handlechangeFile.bind(btn)});
    Object.assign(btn,{innerText:'wgraj',onclick:()=>input.click()});
    Object.assign(btn.style, rightStyle);
    return btn;
}

const fileDragger = () => {
    const dropZone = document.createElement('div');
    dropZone.title = 'spuść tutaj docx';
    dropZone.innerText = dropZone.title;
    Object.assign(dropZone.style, dropZoneStyle);
    dropZone.addEventListener('drop', handleDrop);
    dropZone.addEventListener('dragover', handleDragOver);
    dropZone.addEventListener('dragleave', handleDragLeave);
    const btn = addButtom();
    dropZone.appendChild(btn);
    return dropZone;
}