import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="fixed w-full grid grid-cols-3 h-24 z-10 items-center z-10">
      <div className="px-8 justify-self-start">Logo</div>
      <ul className="flex gap-10 justify-self-center">
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/images">Images</Link>
        </li>
        <li>
          <Link to="/home">Services</Link>
        </li>
        <li>
          <Link to="/home">Contact</Link>
        </li>
      </ul>
      <div className="px-8 justify-self-end">
        <div className="bg-pink-300 text-white px-8 py-3 rounded-full cursor-pointer">
          Get Start
        </div>
      </div>
    </nav>
  );
}
