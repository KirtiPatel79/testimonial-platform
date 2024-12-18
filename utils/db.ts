import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const query = (text: string, params?: any[]) => pool.query(text, params);

export const createTestimonialsTable = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS testimonials (
      id SERIAL PRIMARY KEY,
      author TEXT,
      text TEXT,
      videoUrl TEXT,
      createdAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      userId UUID
    );
  `;
  await query(queryText);
};

export const getTestimonials = async () => {
  const res = await query('SELECT * FROM testimonials ORDER BY createdAt DESC');
  return res.rows;
};

export const getTestimonialById = async (id: number) => {
  const res = await query('SELECT * FROM testimonials WHERE id = $1', [id]);
  return res.rows[0];
};

export const createTestimonial = async (author: string, text: string, videoUrl: string, userId: string) => {
  const res = await query(
    'INSERT INTO testimonials (author, text, videoUrl, userId) VALUES ($1, $2, $3, $4) RETURNING *',
    [author, text, videoUrl, userId]
  );
  return res.rows[0];
};

export const updateTestimonial = async (id: number, author: string, text: string, videoUrl: string) => {
  const res = await query(
    'UPDATE testimonials SET author = $1, text = $2, videoUrl = $3 WHERE id = $4 RETURNING *',
    [author, text, videoUrl, id]
  );
  return res.rows[0];
};

export const deleteTestimonial = async (id: number) => {
  const res = await query('DELETE FROM testimonials WHERE id = $1 RETURNING *', [id]);
  return res.rows[0];
};
