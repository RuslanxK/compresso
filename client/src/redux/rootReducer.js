
const initialStore = {
  images: [],
  settings: {
    resolution: localStorage.getItem('resolution') ? `${localStorage.getItem('resolution')}` : '1920',
    quality: localStorage.getItem('quality') ? `${localStorage.getItem('quality')}` : '70',
    webp: false
  }
};

const compressedImages = (state = initialStore, action) => {
   if (action.type === "ADD") {
    return { ...state, images: [...state.images, { ...action.payload }] };
  } else if (action.type === "DELETE") {
    return { ...state, images: [] };
  } else if (action.type === "setRes") {
    return { ...state, images: [...state.images], settings: {...state.settings, resolution: action.payload}};
  } else if (action.type === "setQuality") {
    return { ...state, images: [...state.images], settings: {...state.settings, quality: action.payload}};
  } else if (action.type === "setWebp") {
    return { ...state, images: [...state.images], settings: {...state.settings, webp: action.payload}};
  } else {
    return state;
  }
};

export default compressedImages;
