import { FaBars, FaTimes } from "react-icons/fa";

export default function Mobile({ setMenuMobile, menuMobile }) {
    const handleClick = () => {
        setMenuMobile(prev => !prev);
        console.log("Menu Mobile:", !menuMobile); 
    };

    return (
        <section className="mobile">
            <p onClick={handleClick}>
                {menuMobile ? <FaTimes /> : <FaBars />} 
            </p>
        </section>
    );
}