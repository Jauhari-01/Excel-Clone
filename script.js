const tHeadRow = document.getElementById('table-heading-row');
const tBody = document.getElementById('table-body');

const columns = 26;
const rows = 100;


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
        // th.innerText= String.fromCharCode(col+65);
        tr.appendChild(td);
    }

    tBody.append(tr);
}