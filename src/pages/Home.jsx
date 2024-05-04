import { Link } from "react-router-dom"


function Home() {
  return (
    <div className='overflow-hidden bg-page-bg min-h-screen'>
      <h1 className="text-4xl text-center mt-10 text-white">Welcome to the Home Page</h1>
      <p className="text-center mt-5  text-white">Click on the videos link in the navigation to view the videos page</p>
      <Link to="/videos" className="text-center mt-5 block text-pink-900 underline hover:text-pink-600">Go to Videos</Link>
    </div>
  )
}

export default Home