import { GET_PHOTOS, ADD_PHOTOS, SELECT, SET_OFFSET } from '../constants/';

const initialState = {
  selected: null,
  searchPhrase: "",
  page: 1,
  scrollOffset: 0,
  list: []
}
export default function reducer (photos = initialState, action) {
  switch (action.type) {
    case GET_PHOTOS:{
      return {selected: null, 
              searchPhrase: action.searchPhrase, 
              page: 1,
              scrollOffset: 0, 
              list: action.list}
    }
    case ADD_PHOTOS: {
      return Object.assign( {}, photos, {list: photos.list.concat(action.list), 
                                         page: 1+photos.page, 
                                         scrollOffset: 0} 
                          )
    }
    case SELECT: {
      return Object.assign( {}, photos, action.photo ? 
                                          {selected: action.photo}
                                        : {selected: null} 
                          )
    }
    case SET_OFFSET: {
      return Object.assign( {}, photos, {scrollOffset: action.offset} )
    }
    default: return photos;
  }
}