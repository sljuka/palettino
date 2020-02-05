const init = module => {
  let palette = [];

  document.getElementById("btn-add-random").addEventListener("click", () => {
    const color = `#${Math.floor(Math.random() * 16777216).toString(16)}`;
    module.addColor(color);
    palette = [...palette, color];
  });

  document.getElementById("btn-save-color").addEventListener("click", () => {
    const color = document.getElementById("color-input").value;
    module.addColor(color);
    palette = [...palette, color];
  });

  document.getElementById("btn-save").addEventListener("click", () => {
    const name = document.getElementById("name-input").value;

    fetch("/paletts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        palette,
        name
      })
    })
      .then(r => r.json())
      .then(data => {
        if (data.error) {
          return module.setError(data.error);
        }
        module.setSuccess("Palette saved");
      })
      .catch(e => module.setError(`An error occured ${e.message}`));
  });

  document.getElementById("btn-load").addEventListener("click", () => {
    const name = document.getElementById("name-input").value;
    if (!name) return module.setError("Need name");

    fetch(`/palette/${name}`)
      .then(response => response.json())
      .then(data => {
        if (data.error) return module.setError(data.error);

        module.resetColors();
        palette = data.palette;
        palette.forEach(c => module.addColor(c));
      })
      .catch(e => module.setError(`An error occured ${e.message}`));
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
    document.getElementById("palette").append(li);
  },
  setError: error => {
    const p = document.createElement("p");
    p.setAttribute("style", `left: ${window.innerWidth / 2}px;`);
    p.append(error);

    const successNode = document.getElementById("palette-success");
    successNode.innerText = "";

    const errorNode = document.getElementById("palette-error");
    errorNode.innerText = "";
    errorNode.append(p);
  },
  setSuccess: message => {
    const p = document.createElement("p");
    p.setAttribute("style", `left: ${window.innerWidth / 2}px;`);
    p.append(message);

    const errorNode = document.getElementById("palette-error");
    errorNode.innerText = "";

    const successNode = document.getElementById("palette-success");
    successNode.innerText = "";
    successNode.append(p);
  },
  resetColors: () => {
    document.getElementById("palette").innerText = "";
  }
};

init(module);
