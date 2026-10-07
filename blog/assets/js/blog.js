(() => {
  const dialog = document.querySelector(".blog-search");
  if (!dialog) return;
  const input = dialog.querySelector("input");
  const results = dialog.querySelector(".search-results");
  const status = dialog.querySelector(".search-status");
  const indexUrl = new URL("../../search.json", document.currentScript.src);
  let articles;
  let loading;
  async function search() {
    const query = input.value.trim().toLowerCase();
    results.replaceChildren();
    if (!query) {
      status.textContent = "Start typing to search the archive.";
      return;
    }
    try {
      if (!loading)
        loading = fetch(indexUrl).then((response) => {
          if (!response.ok) throw new Error("Search unavailable");
          return response.json();
        });
      articles = await loading;
      if (query !== input.value.trim().toLowerCase()) return;
      const matches = articles.filter((article) =>
        `${article.title} ${article.tags || ''} ${article.description || ''}`
          .toLowerCase()
          .includes(query),
      );
      status.textContent = matches.length
        ? `${matches.length} article${matches.length === 1 ? "" : "s"} found.`
        : "No articles found. Try another search.";
      matches.slice(0, 30).forEach((article) => {
        const li = document.createElement("li");
        const link = document.createElement("a");
        link.textContent = article.title;
        link.href = article.url;
        li.append(link);
        if (article.shortdate) {
          const date = document.createElement("time");
          date.textContent = article.shortdate;
          li.append(date);
        }
        results.append(li);
      });
    } catch {
      loading = undefined;
      status.textContent =
        "Search is unavailable. Please try again or browse Articles.";
    }
  }
  document.querySelector(".search-trigger")?.addEventListener("click", () => {
    dialog.showModal();
    input.focus();
  });
  dialog
    .querySelector(".search-close")
    .addEventListener("click", () => dialog.close());
  dialog.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      dialog.close();
    }
  });
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
      const rect = dialog.getBoundingClientRect();
      if (
        event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom
      )
        dialog.close();
    }
  });
  input.addEventListener("input", search);
})();
