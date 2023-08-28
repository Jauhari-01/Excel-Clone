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

const columns = 26;
const rows = 100;

//
let currentCell;
let copyObj = {

}


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
        tr.appendChild(td);
    }
    tBody.append(tr);
}

function onFocusFn(event){
    currentCell = event.target;
    document.getElementById('current-cell').innerText = currentCell.id;
}

//functions for editing

//bold function
boldButton.addEventListener('click',()=>{
    // if(currentCell.style.fontWeight === 'bold'){
    //     currentCell.style.fontWeight = 'normal';
    // }else
    //     currentCell.style.fontWeight = 'bold';

    currentCell.style.fontWeight = currentCell.style.fontWeight === 'bold' ? 'normal':'bold';
})

//Italics button
italicsButton.addEventListener('click',()=>{
    currentCell.style.fontStyle = currentCell.style.fontStyle === 'italic' ? 'normal':'italic';
})

//underline button
underLineButton.addEventListener('click',()=>{
    currentCell.style.textDecoration = currentCell.style.textDecoration === 'underline' ? 'none':'underline';
})

//Align content related functions
leftAlignBtn.addEventListener('click',()=>{
    currentCell.style.textAlign = currentCell.style.textAlign === 'left' ? 'none':'left';
})
centerAlignBtn.addEventListener('click',()=>{
    currentCell.style.textAlign = currentCell.style.textAlign === 'center' ? 'left':'center';
})
rightAlignBtn.addEventListener('click',()=>{
    currentCell.style.textAlign = currentCell.style.textAlign === 'right' ? 'left':'right';
})
justifyAlignBtn.addEventListener('click',()=>{
    currentCell.style.textAlign = currentCell.style.textAlign === 'justify' ? 'left':'justify';
})


// /Related with styling of font
//changing font size
fontSizeDropDown.addEventListener('change',()=>{
    currentCell.style.fontSize = fontSizeDropDown.value;
});

//font family
fontStyleDropDown.addEventListener('change',()=>{
    currentCell.style.fontFamily = fontStyleDropDown.value;
});

//bg color
bgColorInput.addEventListener('input',()=>{
    currentCell.style.backgroundColor = bgColorInput.value;
})
//font color
fontColorInput.addEventListener('input',()=>{
    currentCell.style.color = fontColorInput.value;
})


//Cut Copy Paste functionalities
copyContentbtn.addEventListener('click',()=>{
    copyObj ={
        style : currentCell.style.cssText,
        text : currentCell.innerText
    }
})
cutContentbtn.addEventListener('click',()=>{
    copyObj ={
        style : currentCell.style.cssText,
        text : currentCell.innerText
    }
    currentCell.style.cssText = "";
    currentCell.innerText = '';
})
pasteContentbtn.addEventListener('click',()=>{
    currentCell.style.cssText = copyObj.style;
    currentCell.innerText = copyObj.text;
})
