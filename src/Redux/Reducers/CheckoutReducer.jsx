import { CREATE_CHECKOUT_RED, DELETE_CHECKOUT_RED, GET_CHECKOUT_RED, UPDATE_CHECKOUT_RED } from "../Constant"
export default function CheckoutReducer(state = [], action) {
    let index
    switch (action.type) {
        case CREATE_CHECKOUT_RED:
            return [...state, action.payload]

        case GET_CHECKOUT_RED:
            return action.payload

        case UPDATE_CHECKOUT_RED:
            index = state.findIndex(x => x.id === action.payload.id)
            state[index] = { ...action.payload }
            return state

        case DELETE_CHECKOUT_RED:
            return state.filter(x => x.id !== action.payload.id)

        default:
            return state
    }
}
