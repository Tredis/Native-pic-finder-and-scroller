import { GET_PHOTOS, ADD_PHOTOS, SELECT, SET_OFFSET, SET_DIM } from '../constants/';

export const get_photos = (list, searchPhrase) => ({
  type: GET_PHOTOS,
  searchPhrase: searchPhrase,
  list: list
})

export const add_photos = (list) => ({type: ADD_PHOTOS, list})

export const select_ = (photo) => ({type: SELECT, photo})

export const set_offset = (offset) => ({type: SET_OFFSET, offset})

export const set_dim = (layout) => ({type: SET_DIM, layout})
