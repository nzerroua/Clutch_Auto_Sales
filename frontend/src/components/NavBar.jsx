import { useState, useEffect, useRef } from "react";
import { Menu, X, Phone, ChevronDown, ChevronUp } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import axios from "axios";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileInventoryOpen, setMobileInventoryOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [styles, setStyles] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleDropdown = () => setDropdownOpen((prev) => !prev);
  const toggleMobileInventory = () => setMobileInventoryOpen((prev) => !prev);

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    setIsLoggedIn(!!token);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchStyles = async () => {
      try {
        const res = await axios.get(
          "https://clutch-auto-sales.onrender.com/api/cars/filters"
        );

        setStyles(res.data.styles || []);
      } catch (err) {
        console.error("Error fetching styles:", err);
      }
    };
    fetchStyles();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav
      className={`h-20 fixed top-0 left-0 right-0 z-50 text-white transition duration-300 ${
        scrolled ? "bg-black/60 backdrop-blur-sm shadow-md" : "bg-black/90"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex justify-between items-center h-full">
          <Link to="/" className="flex items-center space-x-2">
            <img
              src="/images/logo02.png"
              alt="Clutch Auto Sales Logo"
              className="h-auto w-16"
            />
            <span className="text-2xl font-extrabold tracking-wide text-white hidden sm:inline">
              Clutch Auto Sales
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 items-center text-sm font-medium relative">
            <NavLink to="/">Home</NavLink>

            {/* Desktop Inventory Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={toggleDropdown}
                className="flex items-center gap-1 hover:text-red-500 transition"
              >
                Inventory <ChevronDown size={16} className="text-red-500" />
              </button>
              {dropdownOpen && (
                <div className="absolute top-full mt-2 bg-black/90 text-white border border-white/10 rounded shadow-lg z-50 w-48">
                  <button
                    onClick={() => {
                      navigate("/inventory");
                      setDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-red-600"
                  >
                    All Inventory
                  </button>
                  {styles.map((style) => (
                    <button
                      key={style}
                      onClick={() => {
                        navigate(`/inventory?style=${style.toLowerCase()}`);
                        setDropdownOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-red-600 capitalize"
                    >
                      {style}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <NavLink to="/financing">Financing</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/contact">Contact</NavLink>
            <a
              href="tel:+17656356059"
              className="flex items-center gap-1 text-white hover:text-red-500 transition"
            >
              <Phone className="w-4 h-4 text-red-500" />
              <span>(765) 635-6059</span>
            </a>
            {isLoggedIn && <LogoutButton />}
          </div>

          {/* Mobile Icons */}
          <div className="md:hidden flex items-center gap-3">
            <a
              href="tel:+1234567890"
              className="text-red-500 hover:text-red-400"
              aria-label="Call now"
            >
              <Phone size={24} />
            </a>
            <button onClick={toggleMenu} aria-label="Toggle menu">
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-black text-white px-4 pt-4 pb-2 space-y-1">
          <MobileNavLink to="/" toggleMenu={toggleMenu}>
            Home
          </MobileNavLink>

          {/* Collapsible Inventory */}
          <button
            onClick={toggleMobileInventory}
            className="flex items-center justify-between w-full py-2 hover:text-red-500 text-white text-sm"
          >
            <span>Inventory</span>
            {mobileInventoryOpen ? (
              <ChevronUp className="text-red-500 w-4 h-4" />
            ) : (
              <ChevronDown className="text-red-500 w-4 h-4" />
            )}
          </button>
          {mobileInventoryOpen && (
            <div className="pl-4 space-y-1">
              <button
                onClick={() => {
                  navigate("/inventory");
                  setMenuOpen(false);
                  setMobileInventoryOpen(false);
                }}
                className="block text-left w-full py-2 hover:text-red-500 text-sm"
              >
                All Inventory
              </button>
              {styles.map((style) => (
                <button
                  key={style}
                  onClick={() => {
                    navigate(`/inventory?style=${style.toLowerCase()}`);
                    setMenuOpen(false);
                    setMobileInventoryOpen(false);
                  }}
                  className="block text-left w-full py-2 hover:text-red-500 text-sm capitalize"
                >
                  {style}
                </button>
              ))}
            </div>
          )}

          <MobileNavLink to="/financing" toggleMenu={toggleMenu}>
            Financing
          </MobileNavLink>
          <MobileNavLink to="/about" toggleMenu={toggleMenu}>
            About
          </MobileNavLink>
          <MobileNavLink to="/contact" toggleMenu={toggleMenu}>
            Contact
          </MobileNavLink>

          <a
            href="tel:+1234567890"
            className="flex items-center gap-2 mt-3 text-sm hover:text-red-500 transition"
          >
            <Phone className="w-4 h-4 text-red-500" />
            <span>(123) 456-7890</span>
          </a>

          {isLoggedIn && (
            <div className="pt-3">
              <LogoutButton />
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

function NavLink({ to, children }) {
  return (
    <Link
      to={to}
      className="hover:text-red-500 text-white transition duration-150 ease-in-out"
    >
      {children}
    </Link>
  );
}

function MobileNavLink({ to, children, toggleMenu }) {
  return (
    <Link
      to={to}
      onClick={toggleMenu}
      className="block py-2 hover:text-red-500 text-white text-sm"
    >
      {children}
    </Link>
  );
}
