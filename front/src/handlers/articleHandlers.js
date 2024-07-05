import { createArticle, updateArticle, deleteArticle } from './postArticles';
import { fetchArticles } from '../../src/scripts/rest/fetchArticles';

export const handleCreateArticle = async (event, articles, setArticles, closeArticleModal) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const articleData = {
    article_name: formData.get('name'),
    article_description: formData.get('description'),
    article_price: parseFloat(formData.get('price')),
    article_type: formData.get('type'),
    restaurant_id: 1 
  };

  try {
    await createArticle(articleData);
    closeArticleModal();
    setArticles([...articles, articleData]);
  } catch (error) {
    console.error('Error creating article:', error);
  }
};

export const handleUpdateArticle = async (event, currentArticle, articles, setArticles, closeEditArticleModal) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const updatedArticle = {
    ...currentArticle,
    article_name: formData.get('name'),
    article_description: formData.get('description'),
    article_price: parseFloat(formData.get('price')),
    article_type: formData.get('type')
  };

  try {
    await updateArticle(currentArticle._id, updatedArticle);
    closeEditArticleModal();
    setArticles(articles.map(article => (article._id === currentArticle._id ? updatedArticle : article)));
  } catch (error) {
    console.error('Error updating article:', error);
  }
};

export const handleDeleteArticle = async (articleId, articles, setArticles) => {
  try {
    await deleteArticle(articleId);
    setArticles(articles.filter(article => article._id !== articleId));
  } catch (error) {
    console.error('Error deleting article:', error);
  }
};
