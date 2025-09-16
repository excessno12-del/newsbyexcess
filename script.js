const API_KEY = '7ef3a788abe94aac86dfd09d52e55ed2';
const newsContainer = document.getElementById('news-container');
const searchInput = document.getElementById('search');
const categoryButtons = document.querySelectorAll('.categories button');

window.onload = () => {
  fetchNews();
};

searchInput.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    fetchNews(searchInput.value);
  }
});

categoryButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    fetchNews('', btn.dataset.category);
  });
});

function fetchNews(query = '', category = '') {
  let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;
  if (query) url += `&q=${query}`;
  if (category) url += `&category=${category}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => displayArticles(data.articles))
    .catch((err) => {
      console.error('Error fetching news:', err);
      newsContainer.innerHTML = '<p>Could not load news.</p>';
    });
}

function displayArticles(articles) {
  newsContainer.innerHTML = '';
  if (!articles.length) {
    newsContainer.innerHTML = '<p>No news found.</p>';
    return;
  }

  articles.forEach((article) => {
    const card = document.createElement('div');
    card.className = 'news-card';
    card.innerHTML = `
      <img src="${article.urlToImage || ''}" alt="News image" />
      <h3>${article.title}</h3>
      <p>${article.description || ''}</p>
      <a href="${article.url}" target="_blank">Read more</a>
    `;
    newsContainer.appendChild(card);
  });
}
