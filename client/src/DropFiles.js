import "./DropFiles.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { solid, regular, brands, icon } from "@fortawesome/fontawesome-svg-core/import.macro"; // <-- import styles to be used;
import { useDropzone } from "react-dropzone";

import { useState, useEffect, useRef } from "react";
import Resizer from "react-image-file-resizer";
import Lottie from "lottie-web";
import { addImage } from "./redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DropFiles = () => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const settings = useSelector((state) => state.settings);
  const container = useRef(null);

  useEffect(() => {
    Lottie.loadAnimation({
      container: container.current,
      animationData: require("./loading.json"),
    });
  }, [loading]);


  const resizeFile = (file) =>

    new Promise((resolve) => {
      if (file.type.includes("png")) {
        Resizer.imageFileResizer(
          file,
          settings.resolution,
          settings.resolution,
          "png",
          settings.quality,
          0,
          (uri) => {
            resolve(uri);
          },
          "blob"
        );
      } else if (file.type.includes("jpg") || file.type.includes("jpeg")) {
        Resizer.imageFileResizer(
          file,
          settings.resolution,
          settings.resolution,
          "jpeg",
          settings.quality,
          0,
          (uri) => {
            resolve(uri);
          },
          "blob"
        );
      } else if (file.type.includes("webp")) {
        Resizer.imageFileResizer(
          file,
          settings.resolution,
          settings.resolution,
          "webp",
          settings.quality,
          0,
          (uri) => {
            resolve(uri);
          },
          "blob"
        );
      }
    });



  let compressedArray = [];


const convertToWebp = (file) => {};  

const { getRootProps, isDragActive, isDragReject, open, getInputProps } = useDropzone({ 
  
    noClick: true,
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/webp": [],
    },
    onDrop: (acceptedFiles) => {
      if (isDragReject) {
        toast("רק קבצי JPG ו-PNG בבקשה!", {
          position: toast.POSITION.BOTTOM_CENTER,
          closeButton: false,
          className: "toast-message-error",
        });

        setLoading(false);
      } else {
        setLoading(true);
      }
      acceptedFiles.forEach(async (item) => {
        if (settings.webp == true) {
          new Promise(function (resolve, reject) {
            let rawImage = new Image();

            rawImage.addEventListener("load", function () {
              resolve(rawImage);
            });
            rawImage.src = URL.createObjectURL(item);
          })
            .then(function (rawImage) {
              return new Promise(function (resolve, reject) {
                let canvas = document.createElement("canvas");
                let ctx = canvas.getContext("2d");

                canvas.width = rawImage.width;
                canvas.height = rawImage.height;
                ctx.drawImage(rawImage, 0, 0);

                canvas.toBlob(function (blob) {
                  resolve(URL.createObjectURL(blob));
                }, "image/webp");
              });
            })
            .then(function (imageURL) {
              return new Promise(async function (resolve, reject) {
                let blob = await fetch(imageURL).then((r) => r.blob());
                let image = await resizeFile(blob);
               
                let url = URL.createObjectURL(image);
                let obj = { 
                  image: url,
                  name: item.name.substring(0, item.name.indexOf('.')),
                  prevSize: item.size,
                  currentSize: image.size,
                  type: "webp"
                };
                resolve(compressedArray.push(obj));
                if (acceptedFiles.length === compressedArray.length) {
                  compressedArray.forEach((file) => {
                    dispatch(addImage(file));
                  });
                  setLoading(false);
                }
              });
            });
            
        } else {
          let image = await resizeFile(item);
          let url = URL.createObjectURL(image);
          let obj = {
            image: url,
            name: item.name.substring(0, item.name.indexOf('.')),
            prevSize: item.size,
            currentSize: image.size,
            type: image.type.substring(image.type.lastIndexOf('/') + 1)
          };
          compressedArray.push(obj);

        if (acceptedFiles.length === compressedArray.length) {
          compressedArray.forEach((file) => {
            dispatch(addImage(file));
          });

          setLoading(false);

          if (!isDragReject) {
            if (acceptedFiles.length <= 1) {
              toast("הקובץ עבר כיווץ בהצלחה!", {
                position: toast.POSITION.BOTTOM_CENTER,
                closeButton: false,
                className: "toast-message-success",
              });
            } else {
              toast("הקבצים עברו כיווץ בהצלחה!", {
                position: toast.POSITION.BOTTOM_CENTER,
                closeButton: false,
                className: "toast-message-success",
              });
            }
          }
        }
      }});
    },
  });






  return (

    <section className="main-drop-section">

      
    <div className="drop-section">
      
      <div className="border" {...getRootProps()}>
        {isDragActive ? (
          <div className="head-texts">
            <FontAwesomeIcon
              className="icon-drop"
              id="icon-active"
              icon={icon({ name: "download", style: "solid" })}
            />
            <span>כאן אתם שמים</span>
            <span>את כל הקבצים</span>
          </div>
        ) : (
          <div className="head-texts">
            <FontAwesomeIcon
              className="icon-drop"
              icon={icon({ name: "download", style: "solid" })}
            />
            <span>כאן אתם שמים</span>
            <span>את כל הקבצים</span>
          </div>
        )}
        <input {...getInputProps()} />
        <button onClick={open}>בחירת קבצים</button>
        <span>עד 20 קבצים במשקל כולל של 25 mb כל אחד</span>
        {loading ? <div className="container" ref={container}></div> : null}
        <ToastContainer />
      </div>
    </div>
    </section>
  );
};

export default DropFiles;
