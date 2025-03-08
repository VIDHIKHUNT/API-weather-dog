import { Provider } from "react-redux"
import { store } from "./store/store"
import Weather from "./components/Weather"
import Dog from "./components/Dog"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import MovieSearch from "./components/MovieSearch"
import './styles.css';


function App() {
  return (
    <>
      <Provider store={store}>
       
        <Router>
            <Routes>
                <Route path="/" element={<Weather />} />
                <Route path="/dog" element={<Dog />} />
                <Route path="/movie" element={<MovieSearch />} />
            </Routes>
        </Router>
      </Provider>
    </>
  )
}

export default App
