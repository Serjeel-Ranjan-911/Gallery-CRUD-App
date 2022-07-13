import {Link} from 'react-router-dom'

const Navbar = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/new">Add New</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar;