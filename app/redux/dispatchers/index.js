//import store from './app/native/containers/Root';
import { get_photos, add_photos, select_ } from '../actions/';
const API_KEY = '5525786-448a52042ee303672ab284d1e';

export const getPhotos = searchPhrase =>  dispatch => 
	fetch("https://pixabay.com/api/?key="+API_KEY+"&q="+encodeURIComponent(searchPhrase))
	.then(res => res.json())
	.then(photos => {
	  if (parseInt(photos.totalHits) > 0)
	    dispatch(get_photos(photos.hits))
	  else console.log('No hits')
	})
	.catch(err => console.error(err))
  

// export const addPhotos = searchPhrase => dispatch => 
	// fetch("https://pixabay.com/api/?key="+API_KEY+"&q="+encodeURIComponent(searchPhrase))
	// .then(res => res.json())
	// .then(photos => {
	//   if (parseInt(photos.totalHits) > 0)
	//     store.dispatch(get_photos(photos.hits))
	//   else console.log('No hits')
	// })
	// .catch(err => console.error(err))

export const select = index => {
	return select_(index)

}