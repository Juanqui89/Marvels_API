import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';



const Footer: React.FC = () => {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    const getYear = () => {
      const date = new Date();
      const year = date.getFullYear();
      setYear(year);
    };

    getYear();
  }, []);

  return (
    <footer>
      <article>
        <p>&copy; Derechos Reservados {year}</p>
        <button type="button" className="upbtn">
            <a href="#">
              <i className="bi bi-arrow-up-circle-fill fs-4 arrow"></i>
            </a>
          </button>
      </article>
    </footer>
  );
};

export default Footer;
