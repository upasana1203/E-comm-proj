import { CREATE_WISHLIST_RED, DELETE_WISHLIST_RED, GET_WISHLIST_RED, UPDATE_WISHLIST_RED } from "../Constant"
export default function WishlistReducer(state = [], action) {
    let index
    switch (action.type) {
        case CREATE_WISHLIST_RED:
            return [...state, action.payload]

        case GET_WISHLIST_RED:
            return action.payload

        case UPDATE_WISHLIST_RED:
            index = state.findIndex(x => x.id === action.payload.id)
            state[index] = { ...action.payload }
            return state

        case DELETE_WISHLIST_RED:
            return state.filter(x => x.id !== action.payload.id)

        default:
            return state
    }
}
