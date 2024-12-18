import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';
import { createTestimonial, getTestimonials, updateTestimonial, deleteTestimonial } from '../../../utils/db';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  switch (req.method) {
    case 'GET':
      try {
        const testimonials = await getTestimonials();
        return res.status(200).json(testimonials);
      } catch (error) {
        return res.status(500).json({ message: 'Error fetching testimonials' });
      }
    case 'POST':
      try {
        const { author, text, videoUrl } = req.body;
        const newTestimonial = await createTestimonial(author, text, videoUrl, session.user.id);
        return res.status(201).json(newTestimonial);
      } catch (error) {
        return res.status(500).json({ message: 'Error creating testimonial' });
      }
    case 'PUT':
      try {
        const { id, author, text, videoUrl } = req.body;
        const updatedTestimonial = await updateTestimonial(id, author, text, videoUrl);
        return res.status(200).json(updatedTestimonial);
      } catch (error) {
        return res.status(500).json({ message: 'Error updating testimonial' });
      }
    case 'DELETE':
      try {
        const { id } = req.body;
        const deletedTestimonial = await deleteTestimonial(id);
        return res.status(200).json(deletedTestimonial);
      } catch (error) {
        return res.status(500).json({ message: 'Error deleting testimonial' });
      }
    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
};
