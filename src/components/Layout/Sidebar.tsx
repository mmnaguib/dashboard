import { Link } from "react-router-dom";

export const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <i className="fa-solid fa-home"></i>
          <Link to="/home">الصفحة الرئيسية</Link>
        </li>
        <li>
          <i className="fa-solid fa-home"></i>
          <Link to="/categories">الأقسام</Link>
        </li>
        <li>
          <i className="fa-solid fa-home"></i>
          <Link to="/products">المنتجات</Link>
        </li>
        <li>
          <i className="fa-solid fa-home"></i>
          <Link to="/banners">الصور الرئيسية</Link>
        </li>
      </ul>
    </div>
  );
};
