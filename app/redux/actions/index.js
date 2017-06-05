import { GET_PHOTOS, ADD_PHOTOS, SELECT } from '../constants/';

export const get_photos = (list, searchPhrase) => {
  return {
    type: GET_PHOTOS,
    searchPhrase: searchPhrase,
    list: list
  }
}

export const add_photos = (list) => {
  return {
    type: ADD_PHOTOS,
    list: list
  }
}

export const select_ = (photo) => {
  return {
    type: SELECT,
    photo: photo
  }
}