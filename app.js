function renderTree(root, withImages) {
  const host = document.getElementById("tree");
  host.replaceChildren(renderNode(root, 0, withImages));
}

function renderNode(node, depth, withImages) {
  const article = document.createElement("article");
  article.className = "node d" + Math.min(depth, 5);

  const title = document.createElement("h2");
  title.className = "node-title";
  title.textContent = node.title;
  article.appendChild(title);

  if (node.see) {
    article.appendChild(line("看见", node.see));
  }
  if (node.diff) {
    article.appendChild(line("差别", node.diff));
  }
  if (withImages && node.image) {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    img.src = node.image;
    img.alt = node.title;
    figure.appendChild(img);
    if (node.why) {
      const cap = document.createElement("figcaption");
      cap.textContent = node.why;
      figure.appendChild(cap);
    }
    article.appendChild(figure);
  }
  if (node.children && node.children.length) {
    const kids = document.createElement("div");
    kids.className = "kids";
    node.children.forEach(function (child) {
      kids.appendChild(renderNode(child, depth + 1, withImages));
    });
    article.appendChild(kids);
  }
  return article;
}

function line(label, text) {
  const p = document.createElement("p");
  p.className = "line";
  const b = document.createElement("b");
  b.textContent = label;
  p.appendChild(b);
  p.appendChild(document.createTextNode(text));
  return p;
}
