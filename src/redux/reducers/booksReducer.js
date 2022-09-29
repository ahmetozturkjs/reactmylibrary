const initialState = {
  start: false,
  success: false,
  books: [],
  fail: false,
  errorMassage: "",
};

const booksReducers = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_BOOKS_START":
      return {
        ...state,
        start: true,
      };
    case "FETCH_BOOKS_SUCCESS":
      return {
        ...state,
        start: false,
        success: true,
        books: action.payload,
      };
    case "FETCH_BOOKS_ERROR":
      return {
        ...state,
        fail: true,
        errorMassage: action.payload,
      };
    case "FETCH_BOOKS_DELETE":
      const filteredbooksdelete = state.books.filter((book) =>book.id != action.payload)
      return {
        ...state,
        books: filteredbooksdelete,
      };
    case "FETCH_BOOKS_ADD":
       
        return{
            ...state,
            books:[...state.books,action.payload]
        }
    case "FETCH_BOOKS_EDIT":
      const filteredbooksedit = state.books.filter((book) =>book.id != action.payload.id)
      return{
        ...state,
        books:[...filteredbooksedit,action.payload]

      }

    default:
      return state;
  }
};
export default booksReducers;
