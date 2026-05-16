import { Link } from 'react-router-dom';
import './NewsCard.css';

export default function NewsCard({ image, category, date, title, excerpt, author, slug, readTime }) {
  return (
    <article className="news-card">
      <Link to={`/news/${slug || '#'}`} className="news-card__img-wrap" tabIndex={-1} aria-hidden="true">
        {image ? (
          <img src={image} alt={title} className="news-card__img" loading="lazy" />
        ) : (
          <div className="news-card__img-placeholder"></div>
        )}
        {category && <span className="news-card__category">{category}</span>}
      </Link>

      <div className="news-card__body">
        <div className="news-card__meta">
          <time className="news-card__date" dateTime={date}>{date}</time>
          {readTime && <span className="news-card__read">{readTime} min read</span>}
        </div>
        <h3 className="news-card__title">
          <Link to={`/news/${slug || '#'}`}>{title}</Link>
        </h3>
        {excerpt && <p className="news-card__excerpt">{excerpt}</p>}
        <div className="news-card__footer">
          {author && <span className="news-card__author">By {author}</span>}
          <Link to={`/news/${slug || '#'}`} className="news-card__read-more">
            Read more
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}
