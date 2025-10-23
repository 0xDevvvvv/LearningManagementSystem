import Sidenav from './(router)/_components/sidenav'
import Header from './(router)/_components/header'
export default function NotFound() {
  return (
    <div>
        <div className='sm:w-64 hidden sm:block fixed'>
            <Sidenav />
        </div>
        <div className='flex items-center justify-center h-screen'>
            <div className='flex flex-col items-center justify-center'>
            <h1 className="text-5xl font-bold mb-4">404</h1>
            <p className="text-lg mb-6">This page could not be found.</p>
            <a href="/" className="text-blue-600 hover:underline">
                Go back home
            </a>
            </div>
        </div>
    </div>
    
  );
}
