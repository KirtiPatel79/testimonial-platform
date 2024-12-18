import React from 'react';

interface Testimonial {
  id: number;
  author: string;
  text: string;
  videoUrl: string;
  createdAt: string;
}

interface TestimonialsTableProps {
  testimonials: Testimonial[];
}

const TestimonialsTable: React.FC<TestimonialsTableProps> = ({ testimonials }) => {
  return (
    <table className="min-w-full bg-white">
      <thead>
        <tr>
          <th className="py-2">Author</th>
          <th className="py-2">Text</th>
          <th className="py-2">Video</th>
          <th className="py-2">Created At</th>
        </tr>
      </thead>
      <tbody>
        {testimonials.map((testimonial) => (
          <tr key={testimonial.id}>
            <td className="border px-4 py-2">{testimonial.author}</td>
            <td className="border px-4 py-2">{testimonial.text}</td>
            <td className="border px-4 py-2">
              {testimonial.videoUrl ? (
                <a href={testimonial.videoUrl} target="_blank" rel="noopener noreferrer">
                  View Video
                </a>
              ) : (
                'No Video'
              )}
            </td>
            <td className="border px-4 py-2">{new Date(testimonial.createdAt).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TestimonialsTable;
