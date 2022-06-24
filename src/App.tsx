import { useEffect } from "react"


function App() {
  useEffect(() => {
    window.location.href = "/";
  }, [])
  return (
    <div></div>
  )
}

export default App