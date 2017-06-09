import { SET_DIM } from '../constants/';

const initialState = {
  orientation: "portrait",
  columns: 1,
  width: 0,
  height: 0,
  x:0,
  y:0,
}
export default function reducer (layout = initialState, action) {
  switch (action.type) {
    case SET_DIM:{
      let dim = action.layout
      return Object.assign(
        {}, 
        layout, 
        dim,
        dim.width < dim.height ? {orientation: "portrait", columns: 1}
                               : {orientation: "landscape", columns: 2}
      )
    }

    default: return layout;
  }
}