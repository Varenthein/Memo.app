const form = document.querySelector("form");
const memo_container = document.querySelector(".memo_container");
const notes = JSON.parse(localStorage.getItem('notes')) || [];

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let title = form.querySelector("input[name='title']").value;
  let desc = form.querySelector("input[name='desc']").value;
  let status = "default"; //set default class for panels
  let item = { title, desc, status};
  notes.push(item);
  localStorage.setItem('notes',JSON.stringify(notes)); //immediately save changes to localStrage
  updateHTML();
  form.reset();
});

memo_container.addEventListener('dblclick',(e) => {
    if(!e.target.matches('div.panel-heading')) return;
      const el = e.target.parentNode;
      const index = el.dataset.index;
      notes.splice(index,1);
      localStorage.setItem('notes', JSON.stringify(notes));
      updateHTML();
});

memo_container.addEventListener('click',(e) => {
    if(!e.target.matches('div a.btn-xs')) return;
    const el = e.target
    const index = el.parentNode.parentNode.dataset.index;
    notes[index].status = el.dataset.fun;
    localStorage.setItem('notes',JSON.stringify(notes));
    updateHTML();
});
function updateHTML() {
  memo_container.innerHTML = notes.map((note, i) => {
      return `
        <div class="panel panel-${note.status}" data-index="${i}" id="note_${i}">
          <div class="panel-heading">${note.title}</div>
          <p class="panel-body">${note.desc}</p>
          <div class="options">
            <strong>Opcje</strong>
            <hr>
            <a data-fun="warning" class="btn btn-warning btn-xs glyphicon glyphicon-fire">
            </a>
            <a data-fun="success" class="btn btn-success btn-xs glyphicon glyphicon-ok">
            </a>
            <a data-fun="info" class="btn btn-info btn-xs glyphicon glyphicon-thumbs-up">
            </a>
          </div>
        </div>
      `;
    }).join('');
}


updateHTML(); //update HTML from localstorage
