import Carousel from "react-bootstrap/Carousel";
import axios from "axios";
import { useState, useEffect } from "react";
import md5 from "crypto-js/md5";
import { Col, Container, Row } from "react-bootstrap";

interface Marvel {
  id: number;
  name: string;
  thumbnail: {
    path: string;
    extension: string;
  };
}

const Navs = () => {
  const [imagenes, setImagenes] = useState<Marvel[]>([]);
  const apiKey = import.meta.env.VITE_REACT_PUBLIC_KEY;
  const privateKey = import.meta.env.VITE_REACT_PRIVATE_KEY;
  const timestamp = new Date().getTime().toString();
  const hash = md5(timestamp + privateKey + apiKey).toString();

  useEffect(() => {
    const fetchMarvelData = async () => {
      try {
        const response = await axios.get(
          `https://gateway.marvel.com/v1/public/characters?ts=${timestamp}&apikey=${apiKey}&hash=${hash}`
        );
        console.log(response);
        const result = response.data.data.results;
        console.log(result);
        if (!imagenes.length) {
          setImagenes(result);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchMarvelData();
  }, [apiKey, timestamp, hash, imagenes.length]);
  return (
    <Container>
        <Row>
          <Col>
        <header>
            <section className="slider">
              <Carousel>
                {imagenes.map((item) => (
                  <Carousel.Item key={item.id}>
                    <img
                      src={`${item.thumbnail.path}.${item.thumbnail.extension}`}
                      alt={item.name}
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
            </section>
    </header>
          </Col>
        </Row>
      </Container>
  );
};

export default Navs;
