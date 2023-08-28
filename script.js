const tHeadRow = document.getElementById('table-heading-row');
const tBody = document.getElementById('table-body');
const boldButton = document.getElementById('bold');
const italicsButton = document.getElementById('italics');
const underLineButton = document.getElementById('underline');
const leftAlignBtn = document.getElementById('left-align');
const centerAlignBtn = document.getElementById('center-align');
const rightAlignBtn = document.getElementById('right-align');
const justifyAlignBtn = document.getElementById('justify-align');
const fontSizeDropDown = document.getElementById('font-size');
const fontStyleDropDown = document.getElementById('font-style');
const bgColorInput = document.getElementById('bg-color');
const fontColorInput = document.getElementById('text-color');
const copyContentbtn = document.getElementById('copyContent');
const cutContentbtn = document.getElementById('cutContent');
const pasteContentbtn = document.getElementById('pasteContent');
const uploadFile = document.getElementById('jsonFile');
const addSheetButton = document.getElementById('add-sheet-btn');
const sheetContainer = document.getElementById('sheet-button-container'); 

const columns = 26;
const rows = 100;

//
let numOfSheets = 1;
let currentSheetNo = 1;
let currentCell;
let copyObj = {}
let cutPres = false;
let matrix = new Array(rows);

//creating matrix for daunload
for(let row = 0 ; row < rows ; row++){
    matrix[row] = new Array(columns);
    for(let col = 0 ; col < columns ; col++){
        matrix[row][col] = {};
    }
}

// console.log(matrix);

//table related stuff
for(let col=0 ; col < columns  ; col++){
    let th = document.createElement('th');
    th.innerText= String.fromCharCode(col+65);
    tHeadRow.appendChild(th);
}

for(let row = 1 ; row<=rows ; row++){
    let tr = document.createElement('tr');
    let th = document.createElement('th');

    th.innerText = row;
    tr.appendChild(th);
    for(let col=0 ; col < columns  ; col++){
        let td = document.createElement('td');
        td.setAttribute('contenteditable','true');
        td.setAttribute('id',`${String.fromCharCode(col+65)}${row}`)
        td.addEventListener('focus',(event)=>onFocusFn(event));
        td.addEventListener('input',(event)=>onChangeFn(event));
        tr.appendChild(td);
    }
    tBody.append(tr);
}

function onFocusFn(event){
    currentCell = event.target;
    document.getElementById('current-cell').innerText = currentCell.id;
}
function onChangeFn(event){
    updateMatrix(event.target);
}
function updateMatrix(currentCell){
    let tempObj = {
        style:currentCell.style.cssText,
        text: currentCell.innerText,
        id: currentCell.id
    }
    let col = currentCell.id.charCodeAt(0)-65;
    let row = currentCell.id.substr(1)-1;
    // console.log(col);
    matrix[row][col] = tempObj;
}


//sheet related functions
addSheetButton.addEventListener('click',()=>{
    let btn = document.createElement('button');
    numOfSheets++;
    currentSheetNo = numOfSheets;
    btn.innerText=`Sheet${numOfSheets}`;
    btn.setAttribute('id',`Sheet${numOfSheets}`);
    sheetContainer.appendChild(btn);
})

//functions for editing

//bold function
boldButton.addEventListener('click',()=>{
    // if(currentCell.style.fontWeight === 'bold'){
    //     currentCell.style.fontWeight = 'normal';
    // }else
    //     currentCell.style.fontWeight = 'bold';

    currentCell.style.fontWeight = currentCell.style.fontWeight === 'bold' ? 'normal':'bold';
    updateMatrix(currentCell);
})

//Italics button
italicsButton.addEventListener('click',()=>{
    currentCell.style.fontStyle = currentCell.style.fontStyle === 'italic' ? 'normal':'italic';
    updateMatrix(currentCell);
})

//underline button
underLineButton.addEventListener('click',()=>{
    currentCell.style.textDecoration = currentCell.style.textDecoration === 'underline' ? 'none':'underline';
    updateMatrix(currentCell);
})

//Align content related functions
leftAlignBtn.addEventListener('click',()=>{
    currentCell.style.textAlign = currentCell.style.textAlign === 'left' ? 'none':'left';
    updateMatrix(currentCell);
})
centerAlignBtn.addEventListener('click',()=>{
    currentCell.style.textAlign = currentCell.style.textAlign === 'center' ? 'left':'center';
    updateMatrix(currentCell);
})
rightAlignBtn.addEventListener('click',()=>{
    currentCell.style.textAlign = currentCell.style.textAlign === 'right' ? 'left':'right';
    updateMatrix(currentCell);
})
justifyAlignBtn.addEventListener('click',()=>{
    currentCell.style.textAlign = currentCell.style.textAlign === 'justify' ? 'left':'justify';
    updateMatrix(currentCell);
})


// /Related with styling of font
//changing font size
fontSizeDropDown.addEventListener('change',()=>{
    currentCell.style.fontSize = fontSizeDropDown.value;
    updateMatrix(currentCell);
});

//font family
fontStyleDropDown.addEventListener('change',()=>{
    currentCell.style.fontFamily = fontStyleDropDown.value;
    updateMatrix(currentCell);
});

//bg color
bgColorInput.addEventListener('input',()=>{
    currentCell.style.backgroundColor = bgColorInput.value;
    updateMatrix(currentCell);
})
//font color
fontColorInput.addEventListener('input',()=>{
    currentCell.style.color = fontColorInput.value;
    updateMatrix(currentCell);
})


//Cut Copy Paste functionalities
copyContentbtn.addEventListener('click',()=>{
    copyObj ={
        style : currentCell.style.cssText,
        text : currentCell.innerText
    }
    cutPres = true;
    updateMatrix(currentCell);
})
cutContentbtn.addEventListener('click',()=>{
    copyObj ={
        style : currentCell.style.cssText,
        text : currentCell.innerText
    }
    cutPres = true;
    currentCell.style.cssText = "";
    currentCell.innerText = '';
    updateMatrix(currentCell);
})
pasteContentbtn.addEventListener('click',()=>{
    if(cutPres){
        currentCell.style.cssText = copyObj.style;
        currentCell.innerText = copyObj.text;
        updateMatrix(currentCell);
    }
})

//dawnload btn
function downloadJson(){
    const str = JSON.stringify(matrix);

    //text form of matrix --> piece of memory(downloadable)
    // application/json -> format for json
    const blob = new Blob([str],{type:'application/json'});


    //link created -> attach href
    //click link
    //delete link

    // now i need to create a dynamic link
    const link = document.createElement('a');
    // link.setAttribute('download','true');
    link.download = 'table.json';
    link.href = URL.createObjectURL(blob);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}


//upload file
uploadFile.addEventListener('change',uploadFileJsonFn);
function uploadFileJsonFn(event){
    const file = event.target.files[0];
    if(file){
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = function(e){
            const fileContent = e.target.result;
            try{
                matrix = JSON.parse(fileContent);
                matrix.forEach(row=>{
                    row.forEach(cell=>{
                        if(cell.id){
                            let cellToBeEdited = document.getElementById(cell.id);
                            cellToBeEdited.innerText = cell.text;
                            cellToBeEdited.style.cssText = cell.style;
                        }
                    })
                })
            }catch(err){
                console.log(err);
            }
        }
    }
}

