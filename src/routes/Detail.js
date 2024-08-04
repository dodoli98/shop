import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Nav, TabContainer } from "react-bootstrap";
import { tab } from "@testing-library/user-event/dist/tab";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../store";

// styled-components
let YellowBtn = styled.button`
  background : ${props => props.bg};
  color : ${props => props.bg == "blue" ? "white" : "black"};
`

let BlackBox = styled.div`
  background : black;
  width : 50px;
  height : 50px;
`

function Detail(props) {

    let { id } = useParams();

    let findItem = props.shoes.find(function (x) {
        return x.id == id
    });

    
    useEffect(() => {
        let watched = localStorage.getItem('watched')
        watched = JSON.parse(watched)
        watched.push(findItem.id)
        localStorage.setItem('watched', JSON.stringify(watched))
    }, []);



    let [timerAlert, setTimerAlert] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimerAlert(false);
        }, 2000);

        return () => {
            clearTimeout(timer)
        };
    }, [])





    // 숫자 input
    let [inputNum, setInputNum] = useState(0);

    // 경고창
    let [isNum, setIsNum] = useState(true);


    useEffect(() => {
        return () => {
            // inNaN -> 숫자가 아니면 참
            if (isNaN(inputNum)) {
                setIsNum(false)
            } else {
                setIsNum(true)
            }

        };
    }, [inputNum])



    // 탭 변경 state
    let [tabClick, setTabClick] = useState(0);

    // 페이지 로드시 fade효과
    let [fade2, setFade2] = useState('')

    useEffect(() => {
        setFade2('end')
        return () => {
            setFade2('')
        }
    }, [])



    // 주문하기

    // store.js에 요청을 보내주는 함수
    let dispatch = useDispatch()

    let stock = useSelector((state) => { return state.stock });

    return (
        <div className={'container start ' + fade2}>

            {
                timerAlert == true
                    ? <div className="saleBox">
                        <p>2초이내 구매시 할인!</p>
                    </div>
                    : null
            }



            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <img src={`https://codingapple1.github.io/shop/shoes1.jpg`} width="100%" alt="Shoe" />
                    </div>
                    <div className="col-md-6">
                        <h4 className="pt-5">{findItem.title}</h4>
                        <p>{findItem.content}</p>
                        <p>{findItem.price}</p>
                        <button onClick={() => {
                            console.log(findItem.id);
                            console.log(findItem.title);
                            dispatch(addItem({ id: findItem.id, name: findItem.title, count: 1 }))
                        }} className="btn btn-danger">주문하기</button>
                    </div>
                </div>
            </div>


            {/* 
                input 태그안에 숫자만 입력해야함
                useEffect를 이용해 숫자가 아닌것이 입력되면 경고창을 보여주기
            */}
            <input onChange={
                e => setInputNum(e.target.value)
            }>
            </input>
            {
                // 숫자가 아니면 경고창 출력
                isNum == false
                    ? <div>
                        <p>!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!숫자만 입력해주세요!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!</p>
                    </div>
                    : null
            }




            <YellowBtn bg="yellow">a</YellowBtn>
            <YellowBtn bg="blue">a</YellowBtn>


            {/* 
                탭 UI 만들기
            */}
            <Nav variant="tabs" defaultActiveKey="link0">
                <Nav.Item>
                    <Nav.Link eventKey="link0" onClick={() => { setTabClick(0) }}>버튼0</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link1" onClick={() => { setTabClick(1) }}>버튼1</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link2" onClick={() => { setTabClick(2) }}>버튼2</Nav.Link>
                </Nav.Item>
            </Nav>
            <TabContent tabClick={tabClick} />
        </div>
    );
}


function TabContent({ tabClick }) {
    let [fade, setFade] = useState('');
    // tabClick이 변경될때마다 className = "end" 추가
    useEffect(() => {
        setTimeout(() => { setFade('end') }, 100);

        return () => {
            setFade('')
        }
    }, [tabClick])

    return (<div className={`start ${fade}`}>
        {[<div>내용 0</div>, <div>내용 1</div>, <div>내용 2</div>][tabClick]}
    </div>)
}


export default Detail;
