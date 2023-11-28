const reducer = (state, action) => {
    switch (action?.type) {
        case 'GET_ALL_TESTIMONIALS':
            return [...action.data];
        case 'ADD_TESTIMONIAL':
            return [...state, action.data];
        case 'EDIT_TESTIMONIAL':
            return state.map(c => c._id === action.data._id ? { ...c, text: action.data.text } : c)
        default:
            return state;
    }
}

export default reducer;