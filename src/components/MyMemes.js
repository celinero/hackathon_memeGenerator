import React from 'react'
import { Container, Row, Image, Col } from "react-bootstrap";

import { getFromStorage } from "../useLocalStorage";

export function MyMemes() {
    const memes = getFromStorage();

    return (
        <div>
            <h1>Meme Generator</h1>
            <h2>Keep track of your previous memes</h2>
            <Container>
            <Row>
            {memes.map((meme) => (
                <Col xs={6} md={3} key={meme.url}>
                    <Image
                        src={meme.url}
                        rounded
                        style={{ width: "100px", marginTop:"5px" }}
                        alt={"meme"}
                    />
                    <p>{meme.name} | {meme.date}</p>
                </Col>
            ))}
            </Row>
        </Container>
        </div>
    )
}
