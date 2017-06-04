import { GET_PHOTOS, ADD_PHOTOS, SELECT } from '../constants/';

const initialState = {
  selected: null,
  list: []
}
export default function reducer (photos = initialState, action) {
  switch (action.type) {
    case GET_PHOTOS:{
      return ({selected: null, list: action.list})
    }
    case ADD_PHOTOS: {
      return ({selected: null, list: concat(photos.list, action.list)})
    }
    case SELECT: {
      console.log
      return Object.assign({}, photos, {selected: action.i})
    }
    default: return photos;
  }
}