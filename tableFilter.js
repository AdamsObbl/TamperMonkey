const { replacePolish  } = require('./utils.js');

    //funkcja zwracająca pasek informujący
    const loadingUi = (text) => {
        const ui = document.createElement('div');
        Object.assign(ui.style, {
            position: 'fixed',
            display: 'flex',
            flexDirection: 'column',
            left: '50%',
            top: '50%',
            background: 'white',
            padding: '20px',
            transform: 'translate(-50%, -50%)',
            boxShadow: '2px 2px 5px black',
            zIndex: '11',
            maxHeight: '400px',
            overflow: 'auto',
        });
        ui.innerText = text;
        ui.id = 'saveReportTOTXT'
        return ui;
    }

    // Funkcja filtrująca
    const filterStrings = (cell, index, rowData) =>
        cell === '' || rowData[index].includes(cell);

    // Funkcja aktualizująca wiersze
    const updateRows = (indx, rows, rowsData, filterCells,loading) => {
        if (indx >= rows.length) {
            loading.remove();
            return;
        }
        const check = filterCells.every((cell, index) => filterStrings(cell, index, rowsData[indx]));
        rows[indx].style.display = check ? 'table-row' : 'none';
        loading.innerText = 'czekaj... pozostało mi ' + (rows.length - indx) + ' do sprawdzenia';
        requestAnimationFrame(() => updateRows(indx + 1, rows, rowsData, filterCells,loading));
    };

    // Funkcja obsługująca filtrowanie podczas pisania w inputach
    const handleInputFilter = (table,filterRow) => {
        const loading = loadingUi('czekaj..');
        document.body.appendChild(loading);
        const rows = table.rows;
        const rowsData = [...rows].map(row => [...row.cells].map(cell => replacePolish(cell.innerText.toLowerCase())));
        const filterCells = [...filterRow.cells].map(cell => replacePolish(cell.firstChild.value.toLowerCase()));
        updateRows(2, rows, rowsData, filterCells,loading);
    };

    // Funkcja debounce
    function debounce(func, wait) {
        let timeout;
        return function (...args) {
            const context = this;
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(context, args), wait);
        };
    }

    // Funkcja dodająca nagłówek filtrujący
    const addFiltrationHeader = (table,filterRow) => {
        const cell = filterRow.insertCell();
        const inp = document.createElement('input');
        inp.style.width = 'calc(100% - 5px)';
        const handleInputFilterDebounced = debounce(handleInputFilter, 500);
        inp.addEventListener('input', (e) => handleInputFilterDebounced(table,filterRow));
        cell.appendChild(inp);
    }

    // Funkcja dodająca filtrację do tabeli
    const addFiltration = (table) => {
        const [header] = table.rows;
        const filterRow = table.insertRow(0);
        [...header.cells].forEach(()=>addFiltrationHeader(table,filterRow));
    }