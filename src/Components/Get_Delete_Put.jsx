import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Get_Delete_Put = () => {
  const baseURL = 'https://jsonplaceholder.typicode.com/posts';
  const [my_data, setmy_data] = useState([]);

  const colorArray = [
    "#f8b400", "#03a9f4", "#8bc34a", "#ff5722", "#9c27b0",
    "#3f51b5", "#e91e63", "#00FFFF", "#7FFFD4", "#FFE4C4",
    "#0000FF", "#000000", "#040720", "#0C090A", "#34282C",
    "#3B3131", "#3A3B3C", "#454545", "#4D4D4F", "#413839",
    "#3D3C3A", "#463E3F", "#4C4646", "#504A4B", "#565051",
    "#52595D", "#5C5858", "#625D5D", "#666362", "#696969",
    "#686A6C", "#6D6968", "#726E6D", "#736F6E", "#757575",
    "#797979", "#837E7C", "#808080", "#848482", "#888B90",
    "#8C8C8C", "#8D918D", "#9B9A96", "#99A3A3", "#A9A9A9",
    "#F5F5F5", "#EEEEEE", "#E5E4E2", "#BCC6CC", "#98AFC7",
    "#838996", "#778899", "#708090", "#6D7B8D", "#657383",
    "#0000FF", "#B0CFDE", "#C9DFEC", "#D5D6EA", "#E3E4FA",
    "#DBE9FA", "#E6E6FA", "#EBF4FA", "#F0F8FF", "#F8F8FF",
    "#F0FFFF", "#E0FFFF", "#CCFFFF", "#9AFEFF", "#7DFDFE",
    "#57FEFF", "#00FFFF", "#0AFFFF", "#50EBEC", "#4EE2EC",
    "#16E2F5", "#8EEBEC", "#AFEEEE", "#CFECEC", "#B3D9D9",
    "#81D8D0", "#77BFC7", "#92C7C7", "#78C7C7", "#7BCCB5",
    "#66CDAA", "#93E9BE", "#AAF0D1", "#93FFE8", "#7FFFD4",
    "#01F9C6", "#40E0D0", "#46C7C7", "#43C6DB", "#00CED1",
    "#43BFC7", "#20B2AA", "#3EA99F", "#5F9EA0", "#3B9C9C",
    "#008B8B", "#00827F",
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(baseURL);
        setmy_data(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const deletePost = async (id) => {
    const choice = window.prompt("If you want to delete this post? Write! yes");
    if (choice === 'yes') {
      const updatedData = my_data.filter((item) => item.id !== id);
      setmy_data(updatedData);

      try {
        await axios.delete(`${baseURL}/${id}`);
        console.log('Deleted successfully');
      } catch (error) {
        console.error('Error deleting:', error);
      }
    } else {
      alert('Post not deleted.');
    }
  };

  const updatePost = async (id) => {
    const postToUpdate = my_data.find((item) => item.id === id);
    const updatedTitle = window.prompt("Update the title:", postToUpdate.title);
    const updatedBody = window.prompt("Update the body:", postToUpdate.body);

    if (updatedTitle !== null && updatedBody !== null) {
      const updatedPost = {
        ...postToUpdate,
        title: updatedTitle,
        body: updatedBody,
      };

      const updatedData = my_data.map((item) => (item.id === id ? updatedPost : item));
      setmy_data(updatedData);

      try {
        await axios.patch(`${baseURL}/${id}`, {
          title: updatedTitle,
          body: updatedBody,
        });
        console.log("Post updated successfully");
      } catch (error) {
        console.error("Error updating post:", error);
      }
    } else {
      alert("Update cancelled.");
    }
  };

  return (
    <div className="flex flex-wrap justify-center p-5">
      <h1 className="text-3xl font-bold w-full text-center">Get_Delete_Put Methods:</h1>
      {my_data.map((item, index) => {
        const { id, title, body } = item;
        const bgColor = colorArray[index % colorArray.length];
        return (
          <div
            className="flex flex-col gap-4 text-center w-72 p-8 border-2 rounded-md shadow-lg"
            key={id}
            style={{ backgroundColor: bgColor }}
          >
            <h1 className="text-yellow-300">{id}</h1>
            <h2 className="text-black">{title}</h2>
            <h3 className="text-white">{body}</h3>
            <div className="flex gap-4 justify-center">
              <button
                className="bg-green-800 text-red-400 p-2 rounded cursor-pointer"
                onClick={() => deletePost(id)}
              >
                DELETE
              </button>
              <button
                className="bg-pink-800 text-yellow-300 p-2 rounded cursor-pointer"
                onClick={() => updatePost(id)}
              >
                EDIT
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Get_Delete_Put;
