import { useEffect, useState } from 'react';
import './App.css';
import { Container, Nav, Navbar, Row, Col } from 'react-bootstrap';
import data from "./data"
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import axios from 'axios';

import Home from "./routes/Home"
import Detail from "./routes/Detail"
import Cart from "./routes/Cart"
import { useQuery } from 'react-query';



function App() {

    useEffect(() => {
        localStorage.setItem('watched', JSON.stringify([]))
    }, [])

    let [shoes, setShoes] = useState(data);

    let [moreStatus, setMoreStatus] = useState(true);



    const [clickCount, setClickCount] = useState(1);

    function handleClick() {

        if (clickCount < 3) {
            console.log(clickCount);
            axios.get(`https://codingapple1.github.io/shop/data${clickCount + 1}.json`)
                .then((result) => {
                    setShoes(prevShoes => [...prevShoes, ...result.data]);
                    setClickCount(clickCount + 1);

                })
                .catch(() => {
                    console.log("실패!");
                });

        }

        if (clickCount == 2) {
            setMoreStatus(false);
        }
    };

    // react-query
    let result = useQuery('name', () =>
        axios.get('https://codingapple1.github.io/userdata.json')
            .then((a) => { return a.data })
    )


    // 페이지이동을 도와주는 함수
    let navigate = useNavigate();
    return (
        <div className="App">
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="/">My shoe</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link onClick={() => {
                            navigate("/")
                        }}>Home</Nav.Link>
                        <Nav.Link onClick={() => {
                            navigate("/detail")
                        }}>Detail</Nav.Link>
                        <Nav.Link onClick={() => {
                            navigate("/about")
                        }}>About</Nav.Link>
                        <Nav.Link onClick={() => {
                            navigate("/event")
                        }}>Event</Nav.Link>
                        <Nav.Link onClick={() => {
                            navigate("/cart")
                        }}>Cart</Nav.Link>
                    </Nav>
                    <Nav className="me-auto">
                        <Nav.Link>
                            {result.isLoading && "로딩중"}
                            {result.error && "에러"}
                            {result.data && result.data.name}

                        </Nav.Link>
                    </Nav>
                </Container>
            </Navbar>


            <Routes>
                {/* home */}
                <Route path="/" element={
                    <Home shoes={shoes}></Home>
                } />

                {/* detail */}
                <Route path='/detail/:id' element={
                    <Detail shoes={shoes} />
                } />

                {/* 404 page */}
                <Route path='*' element={
                    <div>
                        없는 페이지!
                    </div>
                } />

                <Route path='/about' element={<About />}>
                    <Route path='member' element={<p>memvber</p>}></Route>
                    <Route path='location' element={<p>location</p>}></Route>
                </Route>

                <Route path='/event' element={<Event />}>
                    <Route path='one' element={<p>첫 주문시 양파즙 서비스!!!!!!!!!!!!!!!!!!!!</p>}></Route>
                    <Route path='two' element={<p>축 탄 생 기념 쿠포오오오오온 받아가시오.</p>}></Route>
                </Route>

                <Route path='/cart' element={
                    <Cart></Cart>
                } />

            </Routes>

            {/* 
            추가할 기능
            1.  더보기를 누를 때마다 url이 변경
            "https://codingapple1.github.io/shop/data3.json"
            "https://codingapple1.github.io/shop/data4.json"
            ...
            계속 data숫자가 늘어나게
            유저가 버튼을 누른 횟수 같은거를 저장하면 될듯
            
            2. 버튼을 3 번까지 누르면 버튼을 없애든가 더 이상 표시할 상품이 없다고 알리기
            
            3. 버튼을 누르면 로딩중 보이기 
                onclick 호출시 ui 보여주고 then,catch 가 끝날때 ui를 숨기면 됨
             */}
            {
                moreStatus == true
                    ? <button onClick={handleClick}>더보기</button> : null
            }



        </div>
    );
}


function About() {
    return (
        <>
            <div>About page</div>
            <Outlet></Outlet>
        </>
    );
}

function Event() {
    return (
        <>
            <div>오늘의 이벤또</div>
            <Outlet></Outlet>
        </>
    );
}

export default App;
