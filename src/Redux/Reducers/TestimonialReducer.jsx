import { CREATE_TESTIMONIAL_RED, DELETE_TESTIMONIAL_RED, GET_TESTIMONIAL_RED, UPDATE_TESTIMONIAL_RED } from "../Constant"
export default function TestimonialReducer(state = [], action) {
    let index
    switch (action.type) {
        case CREATE_TESTIMONIAL_RED:
            return [...state, action.payload]

        case GET_TESTIMONIAL_RED:
            return action.payload

        case UPDATE_TESTIMONIAL_RED:
            index = state.findIndex(x => x.id === action.payload.id)
            state[index] = { ...action.payload }
            return state

        case DELETE_TESTIMONIAL_RED:
            return state.filter(x => x.id !== action.payload.id)

        default:
            return state
    }
}
