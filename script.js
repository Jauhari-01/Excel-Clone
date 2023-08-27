const tHeadRow = document.getElementById('table-heading-row');
const tBody = document.getElementById('table-body');
const boldButton = document.getElementById('bold');
const italicsButton = document.getElementById('italics');
const underLineButton = document.getElementById('underline');

const columns = 26;
const rows = 100;

//
let currentCell;


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