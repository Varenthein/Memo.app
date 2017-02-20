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

function updateHTML() {
  memo_container.innerHTML = notes.map((note, i) => {
      return `
        <div id="note_${i}">
          <h2>${note.title}</h2>
          <p>${note.desc}</p>
        </div>
      `;
    }).join('');
}


updateHTML(); //update HTML from localstorage
