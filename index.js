const init = async () => {
  const countries = await fetch("/countries.json").then((r) => r.json());
  const countriesTable = buildCountriesTable(countries);
  document.getElementById("root").append(countriesTable);
};

function create(tag, innerText, children = [], props = {}) {
  const elem = document.createElement(tag);
  if (innerText) {
    elem.innerText = innerText;
  }

  if (children && children.length) {
    elem.append(...children);
  }

  for (const prop of Object.entries(props)) {
    elem[prop[0]] = prop[1]; 
  }

  return elem;
}

const buildCountriesTable = (countries) => {
  const table = create("table");
  const tbody = create("tbody");
  const thead = create("thead");

  table.append(thead, tbody);

  /**
   *      table
   *        |
   *        |
   * thead --- tbody
   */

  const thTr = create("tr", null, [
    create("th", "Name"),
    create("th", "Langs"),
    create("th", "Flag"),
    create("th"),
  ]);
  
  thead.append(thTr);

  /**
   *      table
   *        |
   *        |
   * thead --- tbody
   *   |
   *   |
   *   tr
   *   |
   *   |
   * th   th      th  th
   * |     |      |   |
   * Name  Langs  ..  ..
   */

  for (const country of countries) {
    let langs = "";
    if (country.languages) {
      langs = Object.values(country.languages).join(",");
    }

    const name = country.name.common;
    const flag = country.flag;

    const tr = create('tr');
    tbody.append(tr);

    const nameTd = create("td", name);
    const langsTs = create("td", langs);
    const flagTd = create("td", flag);
    const detailsTd = create('td');
    const detailsButton = create("button", "Details");
    detailsButton.className = "details";

    detailsTd.append(detailsButton);
    
    detailsButton.addEventListener('click', () => {
      console.log(country);
      tr.querySelectorAll('td').forEach((td) => {
        td.style.backgroundColor = "red";
      })
    });
    
    tr.append(nameTd, langsTs, flagTd, detailsTd);
  }

  /**
   *      table
   *        |
   *        |
   * thead ---       tbody 
   *   |        |            |
   *   |        |            |
   *   tr       tr           tr
   *   |         |           |
   *   |       td td td td   td td td td
       | 
  * th   th      th  th
   * |     |      |   |
   * Name  Langs  ..  ..
   */

  return table;
};

init();
