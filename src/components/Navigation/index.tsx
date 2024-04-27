import { Link } from "react-router-dom";


const Navigtaion = () => {
    return (
        <nav className="flex">
        <div className="mb-4 mt-4 ml-4">
        <Link className="ml-2" to="/">Home</Link>
        <Link className="ml-2"to="/contexts">Contexts</Link>
        <Link className="ml-2"to="/files">Files</Link>
        </div>
        </nav>
    );
}

export default Navigtaion;