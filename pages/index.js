import { useState } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Home() {
  const categories = ['Nature', 'Photography', 'Relaxation', 'Vacation', 'Travel', 'Adventure'];
  
  const [posts] = useState([
    {
      id: 1,
      title: 'The Road Ahead',
      description: 'The road ahead might be paved - it might not be.',
      image: '/images/northern-lights.jpg',
      category: 'PHOTOGRAPHY',
      author: {
        name: 'Mat Vogels',
        image: '/images/author1.jpg'
      },
      date: 'September 25, 2015'
    },
    {
      id: 2,
      title: 'From Top Down',
      description: "Once a year, go someplace you've never been before.",
      image: '/images/lantern.jpg',
      category: 'ADVENTURE',
      author: {
        name: 'William Wong',
        image: '/images/author2.jpg'
      },
      date: 'September 25, 2015'
    }
  ]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Travel Blog</title>
        <meta name="description" content="Travel stories from around the world" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Let's do it together.</h1>
          <p>We travel the world in search of stories. Come along for the ride.</p>
          <button className={styles.viewLatest}>View Latest Posts</button>
        </div>
      </div>

      <nav className={styles.navigation}>
        {categories.map((category) => (
          <a key={category} href={`#${category.toLowerCase()}`} className={styles.navLink}>
            {category}
          </a>
        ))}
      </nav>

      <main className={styles.main}>
        <h2 className={styles.sectionTitle}>Featured Posts</h2>
        <div className={styles.grid}>
          {posts.map((post) => (
            <div key={post.id} className={styles.card}>
              <div className={styles.cardImageWrapper}>
                <span className={styles.category}>{post.category}</span>
                <img src={post.image} alt={post.title} className={styles.cardImage} />
              </div>
              <div className={styles.cardContent}>
                <h2>{post.title}</h2>
                <p>{post.description}</p>
                <div className={styles.cardFooter}>
                  <div className={styles.author}>
                    <img src={post.author.image} alt={post.author.name} className={styles.authorImage} />
                    <span>{post.author.name}</span>
                  </div>
                  <span className={styles.date}>{post.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
} 