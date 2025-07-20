import React, { useState, useEffect } from 'react';

import Layout from '../components/Layout/Layout';
import Container from '../components/Container';
import * as styles from './board.module.css';

const BoardPage = () => {
  const [posts, setPosts] = useState([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('boardPosts');
    if (stored) {
      setPosts(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('boardPosts', JSON.stringify(posts));
  }, [posts]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) {
      return;
    }
    const newPost = {
      name: name || 'Anonymous',
      message,
      date: new Date().toISOString(),
    };
    setPosts([newPost, ...posts]);
    setMessage('');
  };

  return (
    <Layout>
      <Container size={'medium'}>
        <h1>Bulletin Board</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <textarea
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit">Post</button>
        </form>
        <ul className={styles.postList}>
          {posts.map((post, index) => (
            <li key={index} className={styles.post}>
              <div className={styles.postHeader}>
                <strong>{post.name}</strong> -
                {` ${new Date(post.date).toLocaleString()}`}
              </div>
              <p>{post.message}</p>
            </li>
          ))}
        </ul>
      </Container>
    </Layout>
  );
};

export default BoardPage;
