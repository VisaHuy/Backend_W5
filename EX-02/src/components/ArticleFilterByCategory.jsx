import { useEffect, useState } from "react";
import backendUrl from "./backendUrl";
import axios from "axios";

export default function ArticleFilterByCategory() {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [value, setValue] = useState()
  // Fetch all articles when component mounts
  useEffect(() => {
    fetchArticles();
    fetchCategories();
  }, []);

  const fetchArticles = async () => {
    // Fetch articles from the API
    await axios
      .get(backendUrl + "/articles")
      .then((res) => setArticles(res.data))
      .catch((err) => console.log(err));
  };

  const fetchCategories = async () => {
    // Fetch categories from the API'
    await axios
      .get(backendUrl + "/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err));
  };

  const handleSelectChange = (e) => {
    setValue(e.target.value)
  }

  const fetchArticlesByCategory = async (categoryId) => {
    await axios.get(backendUrl + `/categories/${categoryId}/articles`)
      .then(res => setArticles(res.data))
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <h2>Articles</h2>
      <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
        <label htmlFor="categoryFilter">Filter by Category:</label>
        <select id="categoryFilter" onChange={handleSelectChange} value={value}>
          <option value="">All Categories</option>
          {/* Options for categories */}
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        <button
          onClick={() => {
            // Logic to apply filters
            fetchArticlesByCategory(value)
          }}
        >
          Apply Filters
        </button>
        <button
          onClick={() => {
            // Logic to reset filters
            fetchArticles()
          }}
        >
          Reset Filters
        </button>
      </div>

      <ul>
        {articles.map((article) => (
          <li key={article.id}>
            <strong>{article.title}</strong> <br />
            <small>
              By Journalist #{article.journalistId} | Category #
              {article.categoryId}
            </small>
            <br />
            <button disabled>Delete</button>
            <button disabled>Update</button>
            <button disabled>View</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
