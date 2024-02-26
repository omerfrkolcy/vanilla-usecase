function createCardElement({ author, title, date, image }) {
  const cardHTML = `
    <div class="col-4 u-equal-height">
        <div class="p-card--highlighted p-rule--highlight is-accent">
            <div class="p-card__content u-sv1">
                <span class="p-heading--4 p-text--small">CLOUD AND SERVER</span>
                <hr class="u-sv2 is-muted">    
            </div>
            <div class="p-card__content">
                <img alt="${title}" src="${image}" class="p-card__image">
            </div>
            <div class="p-card__content">
                <p class="p-heading--4" style="min-height: 7rem"><a href="#">${title}</a></p>
            </div>
            <div class="p-card__content">
                <em class="p-text--small">By <a href="#">${author}</a> on ${date}</em>
                <hr class="u-sv1 is-muted">
                <p class="p-text--small">Article</p>
            </div>
        </div>
    </div>`;

  return parseHTML(cardHTML);
}

function parseHTML(html) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  return doc.body.firstChild;
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

document.addEventListener('DOMContentLoaded', function () {
  fetch('https://people.canonical.com/~anthonydillon/wp-json/wp/v2/posts.json')
    .then((res) => res.json())
    .then((data) => {
      data.forEach((post) => {
        const card = createCardElement({
          author: post._embedded.author[0].name,
          date: formatDate(post.date),
          image: post.featured_media,
          title: post.title.rendered,
        });

        document.getElementById('container').appendChild(card);
      });
    });
});
