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
    <section className="main">
    
          <Files pictures={dataPic} webpCallBack={handleSwitcherCallBack}></Files>
          <DropFiles switcherValue={switcherValue} callback={data}></DropFiles>
    
    </section>
  );
};

export default App;
