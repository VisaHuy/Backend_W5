import axios from 'axios';
import { useEffect, useState } from 'react';
import backendUrl from './backendUrl';
import { useParams } from 'react-router-dom';

export default function UpdateArticleForm() {
  const { id } = useParams()
  const [form, setForm] = useState({
    title: '',
    content: '',
    journalistId: '',
    categoryId: '',
  });


  // Fetch to prefill a form and update an existing article
  useEffect(() => {
    axios.get(backendUrl + `/articles/${id}`)
      .then(res => setForm({
        title: res.data.title,
        content: res.data.content,
        journalistId: res.data.journalistId,
        categoryId: res.data.categoryId
      }))
      .catch(err => console.log(err))
  }, [id, setForm]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Update article with axios
    await axios.put(backendUrl + `/articles/${id}`, form)
    setForm({
      title: '',
      content: '',
      journalistId: '',
      categoryId: '',
    })
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Update Article</h3>
      <input name="title" value={form.title} onChange={handleChange} placeholder="Title" required /><br />
      <textarea name="content" value={form.content} onChange={handleChange} placeholder="Content" required /><br />
      <input name="journalistId" value={form.journalistId} onChange={handleChange} placeholder="Journalist ID" required /><br />
      <input name="categoryId" value={form.categoryId} onChange={handleChange} placeholder="Category ID" required /><br />
      <button type="submit">Update</button>
    </form>
  );
}
