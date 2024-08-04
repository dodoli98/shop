import { useDispatch, useSelector } from "react-redux";
import main_banner from "../image/bg.png";
import { Container, Row, Col } from 'react-bootstrap';

function Home(props) {
     // store.js에 요청을 보내주는 함수
     let dispatch = useDispatch()


    return (
        <>
            <div className='main_banner' style={{ backgroundImage: 'url(' + main_banner + ')' }}>
                <div></div>
            </div>

            <Container>
                <Row>
                    {
                        props.shoes.map(function (a, i) {
                            return (
                                <List title={props.shoes[i].title} shoes={props.shoes} price={props.shoes[i].price} key={i} i={i} ></List>
                            )
                        })
                    }
                </Row>
            </Container>
        </>
    );
}

function List(props) {
    // console.log(props.shoes)
    return (
        <Col>
            <a href={`/detail/${props.shoes[props.i].id}`} style={{ display: "block", cursor: "pointer" }}>
                <img src={`https://codingapple1.github.io/shop/shoes${props.i + 1}.jpg`} width="80%" alt="Shoe" />
            </a>
            <h4>{props.title}</h4>
            <p>{props.price}</p>
        </Col>
    )
}

export default Home;