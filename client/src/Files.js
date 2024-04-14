import "./Files.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro"; // <-- import styles to be used
import { saveAs } from "file-saver";
import { useSelector } from "react-redux";
import {
  deleteAll,
  getResValue,
  getQualityValue,
  getWebpValue,
} from "./redux/actions";
import { useDispatch } from "react-redux";
import Switch from "react-switch";
import { useState, useRef } from "react";

const Files = () => {
  const [settingShow, setSettingShow] = useState(false);
  const [webpSetting, setWebpSetting] = useState(false);
  const [displayPopup, setDisplayPopup] = useState(false)
  const [addAltImage, setAddAltImage] = useState("")
  const [altImageVal, setaltImageVal] = useState("")

  const refOne = useRef();
  const refTwo = useRef();

  const dispatch = useDispatch();
  const images = useSelector((state) => state.images);
  const settings = useSelector((state) => state.settings);


  const test = () => {

     alert(altImageVal)
  }


  const handleAltChange = (e) => {

     setaltImageVal(e.target.value)
  }


  document.addEventListener("click", (e) => {
  
    if (
      !refOne.current.contains(e.target) &&
      !refTwo.current.contains(e.target) &&
      settingShow == true
    ) {
      setSettingShow(!settingShow);
    }
  });

  const saveZip = async () => {
    if (images.length) {
      const JSZip = require("jszip");
      const zip = new JSZip();
      const img = zip.folder("images");

      images.forEach(async (item) => {
        const imageBlob = await fetch(item.image).then((response) =>
          response.blob()
        );

        const imgData = new File([imageBlob], item.name + "." + item.type);
        img.file(imgData.name, imgData, { base64: true });
      });

      setTimeout(() => {
        zip.generateAsync({ type: "blob" }).then(function (content) {
          saveAs(content, "CompressedFiles.zip");
        });
      }, 100);
    } else {
      console.log("No Data");
    }
  };

  const compressedPics = images.map((file, index) => {
    const getPercentageChange = (oldNumber, newNumber) => {
      var decreaseValue = oldNumber - newNumber;
      return (decreaseValue / oldNumber) * 100;
    };
  
    const decreasedPercentage = getPercentageChange(
      file.prevSize,
      file.currentSize
    ).toFixed(1);
  
    let name = file.name;
    if (file.name.length > 12) {
    name = `${file.name.substring(0, 12)}...`;
  }
    let prevSizeDisplay, currentSizeDisplay;
  
    if (file.prevSize >= 1000000) {
      prevSizeDisplay = `${(file.prevSize / 1048576).toFixed(2)} MB`;
    } else {
      prevSizeDisplay = `${(file.prevSize / 1024).toFixed(2)} KB`;
    }
  
    if (file.currentSize >= 1000000) {
      currentSizeDisplay = `${(file.currentSize / 1048576).toFixed(2)} MB`;
    } else {
      currentSizeDisplay = `${(file.currentSize / 1024).toFixed(2)} KB`;
    }


    return (
      <div className="picDiv" key={index}>

       
          <FontAwesomeIcon className="icon" icon={icon({ name: "check", style: "solid" })}/>
         <img id="file-pic" src={file.image} alt="file" />
       
        
        <div className="picDiv-details">
          {/* <FontAwesomeIcon
            className="pencil-icon"
            icon={icon({ name: "pencil", style: "solid" })}
            onClick={() => {

              setDisplayPopup(true)
              setAddAltImage(file.name)
              
            }}/> */}

               
          <FontAwesomeIcon
            className="download-icon"
            onClick={() => saveAs(file.image, file.name)}
            icon={icon({ name: "download", style: "solid" })}
          />

          <span className="file-percentage">{`${decreasedPercentage}%-`}</span>
          <div className="file-d">
            <span className="file-name">{name}</span>
            <span className="compressInfo-span">
            {prevSizeDisplay} &#8594;
            <span className="compressedImgSize"> {currentSizeDisplay}</span>
          </span>
            
          </div>
        </div>
      </div>
    );
  });


  const handleValueChange = (e) => {
    if (e.target.name === "resolution") {
      dispatch(getResValue(e.target.value));
      localStorage.setItem("resolution", e.target.value);
    } else if (e.target.name === "range") {
      dispatch(getQualityValue(e.target.value));
      localStorage.setItem("quality", e.target.value);
    }
  };

  const handleSwitcherChange = (checked) => {
    setWebpSetting(checked);
    dispatch(getWebpValue(checked));
  };



  return (
    <div className="files-section">
      <div className="texts" id="files-section-for-desktop">
        <h1>דוחס הקבצים <br /><span className="secondary-title">המקצועי ביותר</span> </h1>
        <p>
          לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית צש בליא, מנסוטו
          צמלח לביקו ננבי, צמוקו בלוקריה שיצמה ברורק.<br /> לורם איפסום דולור סיט אמט,
          קולהע צופעט למרקוח איבן איף, ברומץ כלרשט מיחוצים.
        </p>
      </div>

      <div className="controls">
        <div className="settings">
          <div>
            <FontAwesomeIcon
              onClick={() => setSettingShow(!settingShow)}
              className="icon"
              icon={icon({ name: "sliders", style: "solid" })}
              ref={refOne}
            />
            <span>אפשרויות</span>
          </div>
          <div>
            <FontAwesomeIcon
              className="icon"
              icon={icon({ name: "xmark", style: "solid" })}
              onClick={() => dispatch(deleteAll())}
            />
            <span>הסר הכל</span>
          </div>
          <div>
            <FontAwesomeIcon
              className="icon"
              onClick={saveZip}
              icon={icon({ name: "arrow-down", style: "solid" })}
            />
            <span>הורד הכל</span>
            
          </div>
        </div>
        <div
          className={`settings-box ${settingShow ? "active" : ""}`}
          ref={refTwo}
        >
          <label>
            הקלד רזיולוציה מקסימלית (PX)
            <input
              className="resolution"
              onChange={handleValueChange}
              type="text"
              name="resolution"
              placeholder="4000"
              defaultValue={`${
                localStorage.getItem("resolution")
                  ? `${localStorage.getItem("resolution")}`
                  : ""
              }`}
            />
          </label>
          <label>
            <div className="image-quality-label">
              איכות התמונות
              <span>
                %
                {`${
                  localStorage.getItem("quality")
                    ? `${localStorage.getItem("quality")}`
                    : "70"
                }`}
              </span>
            </div>
            <input
              type="range"
              name="range"
              min="0"
              max="100"
              onChange={handleValueChange}
              defaultValue={`${
                localStorage.getItem("quality")
                  ? `${localStorage.getItem("quality")}`
                  : ""
              }`}
            />
          </label>
          <div className="switcher">
            <span className="switcher-title">יצוא בפורמט WEBP</span>
            <Switch
              height={20}
              width={48}
              uncheckedIcon={false}
              checkedIcon={false}
              onColor="#86d3ff"
              onHandleColor="#2693e6"
              checked={webpSetting}
              onChange={handleSwitcherChange}
            />
          </div>
        </div>
      </div>
      <div className="files" style={compressedPics.length >= 4 ? {overflowY: "scroll"} : null }>{compressedPics}

      </div>
      

      {displayPopup ? <div className="popup"><div class="inner-popup">

<div class="poppup-cancel">

<FontAwesomeIcon
        className="icon" onClick={() => setDisplayPopup(false)}
        icon={icon({ name: "xmark", style: "solid" })}
       
      />

      </div>
   
   <span> הוסיפו ALT ל-<br/> <span>{addAltImage}</span></span>
   <input type="text" onChange={handleAltChange} placeholder="תכתבו כאן..."/>
   <button onClick={test}>הוסף</button>
   
  
  </div></div> : null }

    </div>
  );
};

export default Files;
