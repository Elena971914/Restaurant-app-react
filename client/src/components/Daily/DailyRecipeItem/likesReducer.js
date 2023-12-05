export default function likesReducer (state, action) {
    switch (action?.type) {
        case 'LIKE':
            return state + 1
        case 'DISLIKE':
            return state - 1
    }
}