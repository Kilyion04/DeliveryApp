import axios from 'axios';

export const createArticle = async (articleData) => {
  try {
    const response = await axios.post('http://localhost:3010/api/ms_articles', articleData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateArticle = async (articleId, articleData) => {
  try {
    const response = await axios.put(`http://localhost:3010/api/ms_articles/${articleId}`, articleData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteArticle = async (articleId) => {
  try {
    const response = await axios.delete(`http://localhost:3010/api/ms_articles/${articleId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
