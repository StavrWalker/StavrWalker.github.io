function newRecord(score) {
    let records = JSON.parse(localStorage["lr1.scores"] || "[]");
    let date = new Date();
    let record = {
        name: localStorage["lr1.username"],
        score: score,
        date: `${date.toLocaleDateString()} `,
        level: level,
        time: `${date.toLocaleTimeString()}`
    };
    records.push(record);
    localStorage["lr1.scores"] = JSON.stringify(records);
    renderRecords();
}

function renderRecords() {
    let records = JSON.parse(localStorage["lr1.scores"] || "[]");
    //sort
    records.sort((b, a) => {
        return parseInt(a.score, 10) - parseInt(b.score, 10)
    })
    scoresTable.children[1].innerHTML = ''
    records.forEach((element) => {
        let rowHTML = `
        <tr id=tableRow_${scoresTable.children.length - 1}>
            <td name=username>${element.name}</td>
            <td name=score>${element.score}</td>
            <td name=level>${element.level}</td>
            <td name=date>${element.date}</td>
            <td name=time>${element.time}</td>
        </tr>`;
        scoresTable.children[1].innerHTML += rowHTML;
    });

}

// TODO переделай
// var new_tbody = document.createElement('tbody');
// populate_with_new_rows(new_tbody);
// old_tbody.parentNode.replaceChild(new_tbody, old_tbody)