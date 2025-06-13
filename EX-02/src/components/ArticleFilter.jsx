import { useEffect, useState } from 'react';
import axios from 'axios'
import backendUrl from './backendUrl';

export default function ArticleFilter() {
  const [articles, setArticles] = useState([]);
  const [journalists, setJournalists] = useState([])
  const [categories, setCategories] = useState([])
  const [selectCategory, setSelectCategory] = useState()
  const [selectJournalist, setSelectJournalist] = useState()
  // Fetch all articles when component mounts
  useEffect(() => {
    fetchArticles();
    fetchJournalists();
    fetchCategories();
  }, []);

  const fetchArticles = async () => {
    // Fetch articles from the API
  await axios.get(backendUrl + '/articles')
    .then(res => setArticles(res.data))
    .catch(err => console.log(err))
  };
  
  const fetchJournalists = async () => {
    // Fetch journalists from the API
    await axios.get(backendUrl + '/journalists')
      .then(res => setJournalists(res.data))
      .catch(err => console.log(err))
  };
    
  const fetchCategories = async () => {
    // Fetch categories from the API
    await axios.get(backendUrl + '/categories')
        .then(res => setCategories(res.data))
        .catch(err => console.log(err))
  }

  const handleSelectCategory = (e) => {
    setSelectCategory(e.target.value)
  }

  const handleSelectJournalist = (e) => {
    setSelectJournalist(e.target.value)
  }

  const fetchArticlesByCategoryAndJournalist = async (categoryId, journalistId) => {
    await axios.get(backendUrl + '/articles', { params: { categoryId: categoryId, journalistId: journalistId } })
            .then(res => setArticles(res.data))
            .catch(err => console.log(err))
  }

  return (
    <div>
      <h2>Articles</h2>
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <label htmlFor="journalistFilter">Filter by Journalist:</label>
        <select id="journalistFilter" onChange={handleSelectJournalist} value={selectJournalist}>
          <option value="">All Journalists</option>
          {/* Options for journalists */}
          {journalists.map(journalist => (
            <option key={journalist.id} value={journalist.id}>{journalist.name}</option>
          ))}
        </select>

        <label htmlFor="categoryFilter">Filter by Category:</label>
        <select id="categoryFilter" onChange={handleSelectCategory} value={selectCategory}>
          <option value="">All Categories</option>
          {/* Options for categories */}
          {categories.map(category => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </select>

        <button
          onClick={() => {
            // Logic to apply filters
            fetchArticlesByCategoryAndJournalist(selectCategory, selectJournalist)
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
        {articles ? (articles.map(article => (
          <li key={article.id}>
            <strong>{article.title}</strong> <br />
            <small>By Journalist #{article.journalistId} | Category #{article.categoryId}</small><br />
            <button disabled>Delete</button>
            <button disabled>Update</button>
            <button disabled>View</button>
          </li>
        ))) : (<li>Not Found</li>)}

      </ul>
    </div>
  );
}