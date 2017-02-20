const form = document.querySelector("form");
const memo_container = document.querySelector(".memo_container");
const notes = JSON.parse(localStorage.getItem('notes')) || [];

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let title = form.querySelector("input[name='title']").value;
  let desc = form.querySelector("input[name='desc']").value;
  let item = { title, desc };
  notes.push(item);
  localStorage.setItem('notes',JSON.stringify(notes)); //immediately save changes to localStrage
  updateHTML();
});

memo_container.addEventListener('dblclick',(e) => {
    if(!e.target.matches('div.panel-heading')) return; // skip this unless it's an input
    const el = e.target.parentNode;
    const index = el.dataset.index;
    notes.splice(index,1);
    localStorage.setItem('notes', JSON.stringify(notes));
    updateHTML();
});

function updateHTML() {
  memo_container.innerHTML = notes.map((note, i) => {
      return `
        <div class="panel panel-default" data-index="${i}" id="note_${i}">
          <div class="panel-heading">${note.title}</div>
          <p class="panel-body">${note.desc}</p>
        </div>
      `;
    }).join('');
}


updateHTML(); //update HTML from localstorage
