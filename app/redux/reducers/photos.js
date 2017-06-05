import { GET_PHOTOS, ADD_PHOTOS, SELECT } from '../constants/';

const initialState = {
  selected: null,
  scroll: 0,
  page: 1,
  list: []
}
export default function reducer (photos = initialState, action) {
  switch (action.type) {
    case GET_PHOTOS:{
      return {selected: null, list: action.list, scroll: 0}
    }
    case ADD_PHOTOS: {
      return {selected: null, list: photos.list.concat(action.list), scroll: 0}
    }
    case SELECT: {
      return Object.assign( {}, photos, action.photo ? 
                                        {selected: action.photo, scroll: action.photo}
                                       :{selected: null} )
    }
    default: return photos;
  }
}