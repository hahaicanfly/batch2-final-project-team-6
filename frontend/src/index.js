import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './App'
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

// import { PostList, CreatePost } from './components'
import { Provider } from 'wagmi'


ReactDOM.render(
  <React.StrictMode>
    <>
      <Provider>
        <Router>
          <Routes>
            <Route path="/" element={<App />} />
            {/* <Route path="/posts" element={<PostList />} /> */}
            {/* <Route path="/post/create" element={<CreatePost />} /> */}
          </Routes>
        </Router>
      </Provider>
    </>
  </React.StrictMode>,
  document.getElementById('root')
)
