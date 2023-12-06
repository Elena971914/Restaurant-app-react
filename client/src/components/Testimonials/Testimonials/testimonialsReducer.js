const reducer = (state, action) => {
    switch (action?.type) {
        case 'GET_ALL_TESTIMONIALS':
            return [...action.data];
        case 'ADD_TESTIMONIAL':
            return [...state, action.data];
        case 'DELETE_TESTIMONIAL':
            return state.filter(testimonial => testimonial._id !== action.id);
        default:
            return state;
    }
}

export default reducer;