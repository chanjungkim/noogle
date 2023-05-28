window.onload = init;

function init() {
    createMemoArea();
}

function createMemoArea() {
    const styleElement = createStyles();
    document.head.appendChild(styleElement);

    const memoContainer = createMemoContainer();

    const savedPosition = JSON.parse(localStorage.getItem('memo-pad-position'));
    if (savedPosition) {
        memoContainer.style.top = savedPosition.top;
        memoContainer.style.left = savedPosition.left;
    }

    const savedSize = JSON.parse(localStorage.getItem('memo-pad-size'));
    if (savedSize) {
        memoContainer.style.width = savedSize.width;
        memoContainer.style.height = savedSize.height;
    }

    const draggableHandle = createDraggableHandle();
    memoContainer.appendChild(draggableHandle);
    makeElementDraggable(draggableHandle, memoContainer);

    const memoTextarea = createMemoTextarea();
    const savedMemo = localStorage.getItem('memo');
    if (savedMemo) {
        memoTextarea.value = savedMemo;
    }
    memoContainer.appendChild(memoTextarea);

    const resizer = createResizer();
    memoContainer.appendChild(resizer);
    makeElementResizable(resizer, memoContainer);

    document.body.appendChild(memoContainer);
}

function createStyles() {
    const styleElement = document.createElement('style');
    const cssRules = `
        #memo-pad {
            position: fixed;
            top: 10px;
            left: 10px;
            width: 300px;
            height: 300px;
            border-radius: 5px;
            border: 1px solid #ccc;
            padding: 10px;
            resize: both;
            overflow: auto;
            z-index: 9999;
            background-color: #fdfd86;
            box-shadow: 2px 2px 5px rgba(0,0,0,0.5);
        }
        
        #memo-content {
            width: 100%;
            height: 100%;
            border: none;
            resize: none;
            background: transparent;
            font-size: 16px;
            font-family: 'Courier New', Courier, monospace;
            padding: 5px;
        }
    `;
    styleElement.textContent = cssRules;
    return styleElement;
}

function createMemoContainer() {
    const memoContainer = document.createElement('div');
    memoContainer.id = 'memo-pad';
    memoContainer.classList.add('draggable', 'resizable');
    return memoContainer;
}

function createMemoTextarea() {
    const memoTextarea = document.createElement('textarea');
    memoTextarea.id = 'memo-content';
    memoTextarea.addEventListener('input', () => {
        try {
            localStorage.setItem('memo', memoTextarea.value);
        } catch (error) {
            console.error('Error saving memo:', error);
        }
    });
    memoTextarea.addEventListener('keydown', event => event.stopPropagation());
    return memoTextarea;
}

function createDraggableHandle() {
    const handle = document.createElement('div');
    handle.style.width = '100%';
    handle.style.height = '20px';
    handle.style.backgroundColor = '#ccc';
    handle.style.cursor = 'move';
    handle.id = 'draggable-handle';
    return handle;
}

function makeElementDraggable(element, container) {
    let pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;

    element.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = containerDrag;
    }

    function containerDrag(e) {
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        container.style.top = (container.offsetTop - pos2) + "px";
        container.style.left = (container.offsetLeft - pos1) + "px";

        try {
            // Save position to localStorage
            localStorage.setItem('memo-pad-position', JSON.stringify({
                top: container.style.top,
                left: container.style.left
            }));
        } catch (error) {
            console.error('Error saving position:', error);
        }
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

function createResizer() {
    const resizer = document.createElement('div');
    resizer.style.width = '10px';
    resizer.style.height = '10px';
    resizer.style.border = '1px solid #ccc';
    resizer.style.position = 'absolute';
    resizer.style.right = '0';
    resizer.style.bottom = '0';
    resizer.style.cursor = 'nw-resize';
    resizer.id = 'resizer';
    return resizer;
}

function makeElementResizable(element, container) {
    element.onmousedown = initResize;

    function initResize(e) {
        e.preventDefault();
        document.onmousemove = resize;
        document.onmouseup = stopResize;
    }

    function resize(e) {
        container.style.width = e.clientX - container.offsetLeft + 'px';
        container.style.height = e.clientY - container.offsetTop + 'px';

        try {
            // Save size to localStorage
            localStorage.setItem('memo-pad-size', JSON.stringify({
                width: container.style.width,
                height: container.style.height
            }));
        } catch (error) {
            console.error('Error saving size:', error);
        }
    }

    function stopResize() {
        document.onmousemove = null;
        document.onmouseup = null;
    }
}