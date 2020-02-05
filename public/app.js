const init = module => {
  let pallete = [];

  document.getElementById("btn-add-random").addEventListener("click", () => {
    const color = `#${Math.floor(Math.random() * 16777216).toString(16)}`;
    module.addColor(color);
    pallete = [...pallete, color];
  });

  document.getElementById("btn-save-color").addEventListener("click", () => {
    const color = document.getElementById("color-input").value;
    module.addColor(color);
    pallete = [...pallete, color];
  });

  document.getElementById("btn-save").addEventListener("click", () => {
    console.log("save");
  });

  document.getElementById("btn-load").addEventListener("click", () => {
    console.log("load");
  });

  document.getElementById("btn-new").addEventListener("click", () => {
    module.resetColors();
    const nameInput = document.getElementById("name-input");
    nameInput.value = "";
    nameInput.focus();
  });
};

// reusable stuff
const module = {
  addColor: color => {
    const li = document.createElement("li");
    li.setAttribute("style", `background-color: ${color};`);
    document.getElementById("pallete").append(li);
  },
  setError: error => {
    const p = document.createElement("p");
    p.setAttribute("style", `left: ${window.innerWidth / 2}px;`);
    p.append(error);
    const errorNode = document.getElementById("pallete-error");
    errorNode.innerText = "";
    errorNode.append(p);
  },
  resetColors: () => {
    document.getElementById("pallete").innerText = "";
  }
};

init(module);
