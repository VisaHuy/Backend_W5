import axios from 'axios';
import { useEffect, useState } from 'react';
import backendUrl from './backendUrl';

export default function ArticleFilterByJournalist() {
  const [articles, setArticles] = useState([]);
  const [journalists, setJournalists] = useState([])
  const [value, setValue] = useState()
  // Fetch all articles when component mounts
  useEffect(() => {
    fetchArticles();
    fetchJournalists();
  }, []);

  const fetchArticles = async () => {
    // Fetch articles from the API
    await axios
      .get(backendUrl + "/articles")
      .then((res) => setArticles(res.data))
      .catch((err) => console.log(err));
  };

  const fetchJournalists = async () => {
    // Fetch journalists from the API
    await axios
      .get(backendUrl + "/journalists")
      .then((res) => setJournalists(res.data))
      .catch((err) => console.log(err));
  };
  
  const handleSelectChange = (e) => {
    setValue(e.target.value)
  }

  const fetchArticlesByJournalistId = async (journalistId) => {
    await axios.get(backendUrl + `/journalists/${journalistId}/articles`)
      .then(res => setArticles(res.data))
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <h2>Articles</h2>
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <label htmlFor="journalistFilter">Filter by Journalist:</label>
        <select id="journalistFilter" onChange={handleSelectChange} value={value}>
          <option value="">All Journalists</option>
          {/* Options for journalists */}
          {journalists.map(journalist => (
            <option key={journalist.id} value={journalist.id}>{journalist.name}</option>
          ))}
        </select>

        <button
          onClick={() => {
            // Logic to apply filters
            fetchArticlesByJournalistId(value)
          }}
        >Apply Filters</button>
        <button
          onClick={() => {
            // Logic to reset filters
            fetchArticles()
          }}
        >Reset Filters</button>
      </div>

      <ul>
        {articles.map(article => (
          <li key={article.id}>
            <strong>{article.title}</strong> <br />
            <small>By Journalist #{article.journalistId} | Category #{article.categoryId}</small><br />
            <button disabled>Delete</button>
            <button disabled>Update</button>
            <button disabled>View</button>
          </li>
        ))}
      </ul>
    </div>
  );
}