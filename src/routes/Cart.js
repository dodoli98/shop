import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateName, increaseCount, decreaseCount } from "../store";


function Cart() {

    // let state = useSelector((state) => { return state });
    let user = useSelector((state) => { return state.user });
    let stock = useSelector((state) => { return state.stock });

    // store.js에 요청을 보내주는 함수
    let dispatch = useDispatch()

    return (
        <div>
            {user} 의 장바구니
            <button onClick={() => {
                dispatch(updateName())
            }}>
                hi
            </button>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>상품명</th>
                        <th>수량</th>
                        <th>변경하기</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        stock.map(function (a, i) {
                            return (
                                <tr key={i}>
                                    <td>{i}</td>
                                    <td>{stock[i].name}</td>
                                    <td>{stock[i].count}</td>
                                    <td>
                                        <button onClick={() => {
                                            dispatch(increaseCount(i));
                                        }}>+</button>
                                        <button onClick={() => {
                                            dispatch(decreaseCount(i));
                                        }}>-</button>
                                    </td>
                                </tr>
                                // <List title={props.shoes[i].title} shoes={props.shoes} price={props.shoes[i].price} key={i} i={i} ></List>
                            )
                        })
                    }
                    {/* <tr>
                        <td>1</td>
                        <td>{state}</td>
                        <td>안녕</td>
                        <td>안녕</td>
                    </tr> */}
                </tbody>
            </Table>
        </div>
    )

}
export default Cart;