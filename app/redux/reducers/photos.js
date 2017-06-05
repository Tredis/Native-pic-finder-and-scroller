import { GET_PHOTOS, ADD_PHOTOS, SELECT } from '../constants/';

const initialState = {
  selected: null,
  searchPhrase: "",
  page: 1,
  scroll: 0,
  list: []
}
export default function reducer (photos = initialState, action) {
  switch (action.type) {
    case GET_PHOTOS:{
      return {selected: null, 
              searchPhrase: action.searchPhrase, 
              page: 1,
              scroll: 0, 
              list: action.list}
    }
    case ADD_PHOTOS: {
      return Object.assign( {}, photos, {list: photos.list.concat(action.list), page: 1+photos.page})
    }
    case SELECT: {
      return Object.assign( {}, photos, action.photo ? 
                                        {selected: action.photo, scroll: action.photo}
                                       :{selected: null} )
    }
    default: return photos;
  }
}