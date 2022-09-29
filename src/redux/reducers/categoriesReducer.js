const initialState={
    start:false,
    success:false,
    categories:[],
    fail:false,
    errorMassage:""
}

const categoriesReducer=(state=initialState,action)=>{

    switch (action.type) {
        case "FETCH_CATEGORIES_START":            
            return{
                ...state,
                start:true
            }
            case "FETCH_CATEGORIES_SUCCESS":
                return{
                    ...state,
                    start:false,
                    success:true,
                    categories:action.payload
                }
            case "FETCH_CATEGORIES_ERROR":
            return{
                ...state,
                fail:true,
                errorMassage:action.payload
            }
        default:
            return state;
    }

}

export default categoriesReducer