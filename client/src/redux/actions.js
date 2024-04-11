const addImage = (Image) => {
  return {
    type: "ADD",
    payload: Image,
  };
};

const deleteAll = () => {
  return {
    type: "DELETE",
  };
};

const getResValue = (resValue) => {
  return {
    type: "setRes",
    payload: resValue,
  };
};

const getQualityValue = (qualityValue) => {
  return {
    type: "setQuality",
    payload: qualityValue,
  };
};

const getWebpValue = (webpValue) => {
  return {
    type: "setWebp",
    payload: webpValue,
  };
};
export { addImage, deleteAll, getResValue, getQualityValue, getWebpValue };
