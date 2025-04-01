import { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Home() {
  const categories = ['Nature', 'Photography', 'Relaxation', 'Vacation', 'Travel', 'Adventure'];
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
        const host = process.env.VERCEL_URL || 'localhost:3000';
        const response = await fetch(`${protocol}://${host}/api/posts`);
        const data = await response.json();
        
        if (data.status === 'success') {
          // 스프레드시트 데이터를 포스트 형식으로 변환
          const formattedPosts = data.data.map((item, index) => ({
            id: index + 1,
            title: item.prompt || 'No Title',
            description: item.result || 'No Description',
            category: item.category || 'GENERAL',
            emoji: item.emoji || '📝',
            date: new Date().toLocaleDateString(),
            author: {
              name: 'AI Writer',
              image: '/images/ai-avatar.png'
            }
          }));
          setPosts(formattedPosts);
        } else {
          setError('Failed to load posts');
        }
      } catch (err) {
        setError('Error fetching posts');
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>AI Blog Posts</title>
        <meta name="description" content="AI generated blog posts" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Let's do it together.</h1>
          <p>Explore AI-generated stories and insights.</p>
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
        {loading ? (
          <div className={styles.loading}>Loading posts...</div>
        ) : error ? (
          <div className={styles.error}>{error}</div>
        ) : (
          <div className={styles.grid}>
            {posts.map((post) => (
              <div key={post.id} className={styles.card}>
                <div className={styles.cardImageWrapper}>
                  <span className={styles.category}>{post.category}</span>
                  <div className={styles.emojiBackground}>
                    <span className={styles.emoji}>{post.emoji}</span>
                  </div>
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
        )}
      </main>
    </div>
  );
}

export async function getServerSideProps() {
  try {
    // 내부 API 엔드포인트 사용
    const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
    const host = process.env.VERCEL_URL || 'localhost:3000';
    const response = await fetch(`${protocol}://${host}/api/posts`);
    const data = await response.json();
    
    if (data.status === 'success') {
      const formattedPosts = data.data.map((item, index) => ({
        id: index + 1,
        title: item.prompt || 'No Title',
        description: item.result || 'No Description',
        category: item.category || 'GENERAL',
        emoji: item.emoji || '📝',
        date: new Date().toLocaleDateString(),
        author: {
          name: 'AI Writer',
          image: '/images/ai-avatar.png'
        }
      }));
      
      return {
        props: {
          initialPosts: formattedPosts,
          error: null
        }
      };
    }
    
    return {
      props: {
        initialPosts: [],
        error: 'Failed to load posts'
      }
    };
  } catch (err) {
    console.error('Fetch error:', err);
    return {
      props: {
        initialPosts: [],
        error: 'Error fetching posts'
      }
    };
  }
} 