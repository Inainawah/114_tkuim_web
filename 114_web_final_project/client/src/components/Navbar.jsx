import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <header className="bg-gradient-to-r from-emerald-500 to-teal-600 shadow-lg top-0 z-50 sticky backdrop-blur-sm bg-opacity-95">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <Link to="/" className="flex items-center gap-2 group">
                    <span className="material-symbols-outlined text-white text-3xl group-hover:rotate-12 transition-transform duration-300">
                        fitness_center
                    </span>
                    <h1 className="text-2xl font-bold text-white tracking-wide group-hover:text-emerald-50 tracking-tight transition-colors">
                        運動夥伴
                    </h1>
                </Link>
                <nav>
                    <div className="text-white text-sm font-medium bg-white/20 px-4 py-2 rounded-full cursor-not-allowed opacity-80 backdrop-blur-md">
                        訪客模式
                    </div>
                </nav>
            </div>
        </header>
    )
}

export default Navbar
