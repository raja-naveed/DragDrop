import { BrowserRouter, Route, Routes } from "react-router-dom"
import List from "./List"

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<List />} />
      {/* <Route path="/form" element={<Formm />} /> */}
    </Routes>
    
    </BrowserRouter>
  )

}

export default App
