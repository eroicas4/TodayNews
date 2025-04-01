export default function PostCard({ post }) {
  return (
    <div className="card">
      <span className="category">{post.category}</span>
      <span className="date">{post.date}</span>
      <div className="emoji">{post.emoji}</div>
      <h2>{post.title}</h2>
      <p>{post.description}</p>
      <div className="author">
        <img src={post.author.image} alt={post.author.name} />
        <span>{post.author.name}</span>
      </div>
    </div>
  );
} 