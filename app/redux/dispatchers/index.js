//import store from './app/native/containers/Root';
import { get_photos, add_photos, select_ } from '../actions/';
const API_KEY = '5525786-448a52042ee303672ab284d1e';

export const getPhotos = searchPhrase =>  dispatch => 
	fetch("https://pixabay.com/api/?key="+API_KEY+"&q="+encodeURIComponent(searchPhrase))
	.then(res => res.json())
	.then(photos => {
	  if (parseInt(photos.totalHits) > 0){
	    dispatch(get_photos(photos.hits, searchPhrase))
	  }else console.log('No hits')
	})
	.catch(err => console.error(err))
  

export const addPhotos = (searchPhrase, page) => dispatch => 
	fetch("https://pixabay.com/api/?key="+API_KEY+"&q="+encodeURIComponent(searchPhrase)+"&page="+page)
	.then(res => res.json())
	.then(photos => {
	  if (parseInt(photos.totalHits) > 0){
	    dispatch(add_photos(photos.hits))
	  }else console.log('No hits')
	})
	.catch(err => console.dir(err))


export const select = photo => {
	return select_(photo)

}