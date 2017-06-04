import { GET_PHOTOS, ADD_PHOTOS, SELECT } from '../constants/';

const initialState = {
  selected: null,
  scroll: 0,
  list: []
}
export default function reducer (photos = initialState, action) {
  switch (action.type) {
    case GET_PHOTOS:{
      return {selected: null, list: action.list, scroll: 0}
    }
    case ADD_PHOTOS: {
      return {selected: null, list: concat(photos.list, action.list), scroll: 0}
    }
    case SELECT: {
      return Object.assign({}, photos, action.i == null ? 
                                        {selected: null} 
                                       :{selected: action.i, scroll: action.i})
    }
    default: return photos;
  }
}