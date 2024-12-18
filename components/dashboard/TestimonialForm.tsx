import React from 'react';
import { useForm } from 'react-hook-form';

interface TestimonialFormProps {
  onSubmit: (data: TestimonialFormData) => void;
}

interface TestimonialFormData {
  author: string;
  text: string;
  video: FileList;
}

const TestimonialForm: React.FC<TestimonialFormProps> = ({ onSubmit }) => {
  const { register, handleSubmit, reset } = useForm<TestimonialFormData>();

  const handleFormSubmit = (data: TestimonialFormData) => {
    onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div>
        <label htmlFor="author" className="block text-sm font-medium text-gray-700">
          Author
        </label>
        <input
          id="author"
          name="author"
          type="text"
          ref={register({ required: true })}
          className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label htmlFor="text" className="block text-sm font-medium text-gray-700">
          Text
        </label>
        <textarea
          id="text"
          name="text"
          ref={register({ required: true })}
          className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label htmlFor="video" className="block text-sm font-medium text-gray-700">
          Video
        </label>
        <input
          id="video"
          name="video"
          type="file"
          ref={register}
          className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
      </div>
      <div>
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default TestimonialForm;
