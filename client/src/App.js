import "./App.scss";
import Files from "./Files";
import DropFiles from "./DropFiles";
import { useState } from "react";
import "./fonts/Birzia-Light.woff";
import "./fonts/Birzia-Medium.woff";
import "./fonts/Birzia-Bold.woff";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro"; // <-- import styles to be used\

const App = () => {
  const [dataPic, setDataPic] = useState([]);
  const [switcherValue, setSwitcherValue] = useState(false);

  const data = (pictures) => {
    setDataPic(pictures);
  };

  const handleSwitcherCallBack = (switcher) => {
    setSwitcherValue(switcher);
  };

  return (
    <div className="main-component">

  
      <section className="hero">
        <div className="left-div">
          <Files pictures={dataPic} webpCallBack={handleSwitcherCallBack}></Files>

          <div className="why-compress">
            <div className="why-icon">
              <FontAwesomeIcon
                className="icon-question"
                icon={icon({ name: "circle-question", style: "solid" })}
              />
            </div>
            <div className="why-text">
              <h1>למה חשוב לדחוס קבצים?</h1>
              <p>
                לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית לורם איפסום
                דולור סיט אמט, קונסקטורר אדיפיסינג אלית. סת אלמנקום ניסי נון
                ניבאה. דס איאקוליס וולופטה דיאם.
              </p>
            </div>
          </div>
        </div>

        <div className="right-div">
          <DropFiles switcherValue={switcherValue} callback={data}></DropFiles>
        </div>
      </section>
    </div>
  );
};

export default App;
