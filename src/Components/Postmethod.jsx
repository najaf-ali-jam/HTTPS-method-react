import axios from 'axios';
import React, { useState } from 'react';

const PostMethod = () => {
  const [my_title, setTitle] = useState('');
  const [my_body, setBody] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('https://jsonplaceholder.typicode.com/posts', {
        title: my_title,
        body: my_body,
      })
      .then((response) => {
        console.log(response);
        setTitle('');
        setBody('');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className='bg-red-400 p-10 flex justify-center items-center'>
      <div className='max-w-lg w-full'>
        <h1 className='text-3xl font-bold text-red-200 text-center'>Post Method:</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 mt-5 text-2xl'>
          <label htmlFor='title' className='text-white'>Enter Title:</label>
          <input
            type='text'
            id='title'
            name='title'
            value={my_title}
            onChange={(e) => setTitle(e.target.value)}
            className='p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-300'
            required
          />
          <label htmlFor='body' className='text-white'>Enter Body:</label>
          <textarea
            id='body'
            name='body'
            value={my_body}
            onChange={(e) => setBody(e.target.value)}
            className='p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-300'
            required
            rows='4'
          />
          <input
            type='submit'
            value='Post'
            className='bg-yellow-300 p-2 rounded cursor-pointer transition duration-300 ease-in-out hover:bg-yellow-400'
          />
        </form>
      </div>
    </div>
  );
};

export default PostMethod;
