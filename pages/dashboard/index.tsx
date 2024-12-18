import React, { useEffect, useState } from 'react';
import { useSession, getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Header from '../../components/layout/dashboard/Header';
import SideNavigation from '../../components/layout/dashboard/SideNavigation';
import MainArea from '../../components/layout/dashboard/MainArea';
import TestimonialsTable from '../../components/dashboard/TestimonialsTable';
import TestimonialForm from '../../components/dashboard/TestimonialForm';

const Dashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (status === 'loading') return; // Do nothing while loading
    if (!session) router.push('/'); // Redirect if not authenticated
  }, [session, status]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch('/api/testimonials');
        const data = await res.json();
        setTestimonials(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  const handleFormSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append('author', data.author);
      formData.append('text', data.text);
      if (data.video.length > 0) {
        formData.append('video', data.video[0]);
      }

      const res = await fetch('/api/testimonials', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        throw new Error('Error creating testimonial');
      }

      const newTestimonial = await res.json();
      setTestimonials((prevTestimonials) => [newTestimonial, ...prevTestimonials]);
    } catch (error) {
      setError(error);
    }
  };

  if (status === 'loading' || loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="flex">
      <SideNavigation />
      <div className="flex-1 flex flex-col">
        <Header />
        <MainArea>
          <h2 className="text-2xl font-bold mb-4">Testimonials</h2>
          <TestimonialsTable testimonials={testimonials} />
          <h2 className="text-2xl font-bold mb-4">Add Testimonial</h2>
          <TestimonialForm onSubmit={handleFormSubmit} />
        </MainArea>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

export default Dashboard;
