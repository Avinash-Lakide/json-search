import "./App.css";
import axios from "axios";
import React, { useEffect, useState } from "react";

function App() {
  const [posts, setPosts] = useState([]);
  const [seacrhinput, setSeacrhinput] = React.useState("");
  console.log("Test");

  useEffect(() => {
    fetchPosts();
  }, []);

  function filterJsonData() {
    setPosts(
      posts.filter(
        (val) =>
          val.author.toLowerCase().includes(seacrhinput.toLowerCase()) ||
          val.series.toLowerCase().includes(seacrhinput.toLowerCase()) ||
          val.title == seacrhinput.toLowerCase()
        //|| val.title.includes(seacrhinput)
      )
    );
    console.log("Clicked Data: " + seacrhinput.toLowerCase());
    console.log(posts);
  }

  async function fetchPosts() {
    setSeacrhinput("");
    let header = new Headers({
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "multipart/form-data",
    });
    let sendData = {
      mode: "cors",
      header: header,
    };
    try {
      let res = await axios.get(
        `https://avinash-jsonsearch-dbserver.herokuapp.com/booklist`,
        sendData
      );
      res.data = JSON.parse(
        JSON.stringify(res.data).split('"name":').join('"title":')
      );
      console.log(res.data);
      setPosts(res.data);
    } catch (e) {
      handleErrors(e);
    }
  }

  function handleErrors(response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
  }

  return (
    <div className="App">
      <h1>JSON Search</h1>
      <table width="50%">
        <tbody>
          <tr>
            <td>Click on seacrh button to filter the data</td>
            <td>
              <input
                type="text"
                width="100%"
                height="200px"
                placeholder="Enter book-title/author-name"
                onChange={(e) => setSeacrhinput(e.target.value)}
                value={seacrhinput}
              ></input>
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
              <button onClick={filterJsonData}>Search</button>
              <button onClick={fetchPosts}>Reset</button>
            </td>
          </tr>
        </tbody>
      </table>

      <>
        <>
          {posts &&
            Array.isArray(posts) &&
            posts.length > 0 &&
            posts.map((post, id) => (
              <div key={id}>
                <div sx={{ maxWidth: 400, marginTop: 5 }}>
                  <div>
                    <div sx={{ fontSize: 14 }} color="text.primary">
                      {id} - {post.author}
                    </div>
                    <div>{post.series}</div>
                    <div>{post.title}</div>
                  </div>
                </div>
              </div>
            ))}
        </>
        <div>
          {posts && Array.isArray(posts) && posts.length == 0 && (
            <h2>No data found..</h2>
          )}
        </div>
      </>
    </div>
  );
}

export default App;
