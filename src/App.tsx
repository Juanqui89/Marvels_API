/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import md5 from "crypto-js/md5";

interface Characters {
  id: number;
  name: string;
  description: string;
  thumbnail: {
    path: string;
    extension: string;
  };
  comics: {
    items: { name: string }[];
  };
  series: {
    items: { name: string }[];
  };
  stories: {
    items: { name: string }[];
  };
  urls: {
    type: string;
    url: string;
  }[];
}

const App = () => {
  const [data, setData] = useState<Characters[]>([]);
  const apiKey = import.meta.env.VITE_REACT_PUBLIC_KEY;
  const privateKey = import.meta.env.VITE_REACT_PRIVATE_KEY;
  const timestamp = new Date().getTime().toString();
  const hash = md5(timestamp + privateKey + apiKey).toString();
  const [expandedCardId, setExpandedCardId] = useState<number | null>(null);

  const toggleText = (id: number) => {
    setExpandedCardId((prevId) => (prevId === id ? null : id));
  };

  const fetchMarvelData = async () => {
    try {
      const response = await axios.get(
        `https://gateway.marvel.com/v1/public/characters?ts=${timestamp}&apikey=${apiKey}&hash=${hash}`
      );
      console.log(response);
      const result = response.data.data.results;
      console.log(result);
      if (!data.length) {
        setData(result);
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };
  useEffect(() => {
    fetchMarvelData();
  }, [apiKey, timestamp, hash, data.length]);

  return (
    <>
      <h1 className="title">SuperHeroes</h1>
      <Container>
        <Row>
          <Col>
            <section className="characters">
              {Array.isArray(data) &&
                data.map((item) => (
                  <Card key={item.id} id="myCard">
                    <Card.Img
                      src={`${item.thumbnail.path}.${item.thumbnail.extension}`}
                      alt={item.name}
                    />
                    <Card.Body>
                      <Card.Title>{item.name}</Card.Title>

                      {item.description && (
                        <Card.Text>
                          {expandedCardId === item.id
                            ? item.description
                            : `${item.description.slice(0, 100)}...`}
                        </Card.Text>
                      )}

                      {item.description && (
                        <Card.Footer>
                          <button
                            className="toggle-btn"
                            onClick={() => toggleText(item.id)}
                          >
                            {expandedCardId === item.id
                              ? "Ver menos"
                              : "Ver más"}
                          </button>
                        </Card.Footer>
                      )}
                    </Card.Body>
                  </Card>
                ))}
            </section>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default App;
