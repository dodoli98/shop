import { configureStore, createSlice } from '@reduxjs/toolkit'
import { act } from 'react'

let user = createSlice({
    name: 'user',
    initialState: 'Kim',
    reducers: {
        updateName(state) {
            console.log('Previous state:', state); // 상태 변경 전의 값 로그

            return 'john ' + state
        }
    }
})
export let { updateName } = user.actions

let stock = createSlice({
    name: 'stock',
    initialState: [
        { id: 0, name: 'White and Black', count: 2 },
        { id: 2, name: 'Grey Yordan', count: 1 }
    ],
    reducers: {
        increaseCount(state, action) {
            state[action.payload].count++
        },
        decreaseCount(state, action) {
            state[action.payload].count--
        },

        addItem(state, action) {
            state.push(action.payload)
        }


    }
})
export let { increaseCount, decreaseCount, addItem } = stock.actions





export default configureStore({
    reducer: {
        user: user.reducer,
        stock: stock.reducer,
    }
}) 