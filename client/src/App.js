import Files from "./Files";
import DropFiles from "./DropFiles";
import { useState } from "react";
import "./fonts/Birzia-Light.woff";
import "./fonts/Birzia-Medium.woff";
import "./fonts/Birzia-Bold.woff";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro"; // <-- import styles to be used\
import { useSelector } from "react-redux";
import { useEffect, useRef} from "react";

const App = () => {

  const [dataPic, setDataPic] = useState([]);
  const [switcherValue, setSwitcherValue] = useState(false);
  const showFilesRef = useRef(null);

  const images = useSelector((state) => state.images);


  const data = (pictures) => {
    setDataPic(pictures);
  };

  const handleSwitcherCallBack = (switcher) => {
    setSwitcherValue(switcher);
  };


  useEffect(() => {
    if (showFilesRef.current) {
      showFilesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [images]);

  return (
    <section className="main">
    

          <div ref={showFilesRef} className={ images.length ? null:  "showFiles" } style={{width: "100%"}}>
          <Files pictures={dataPic} webpCallBack={handleSwitcherCallBack}></Files>
          </div>
          <DropFiles switcherValue={switcherValue} callback={data}></DropFiles>

          <div className="files-section" id="files-section-main">
       <div className="texts">
        <h1>דוחס הקבצים <br /><span className="secondary-title">המקצועי ביותר</span> </h1>
        <p>
          לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית צש בליא, מנסוטו
          צמלח לביקו ננבי, צמוקו בלוקריה שיצמה ברורק.<br /> לורם איפסום דולור סיט אמט,
          קולהע צופעט למרקוח איבן איף, ברומץ כלרשט מיחוצים.
        </p>
       </div>
       </div>
    
    </section>
  );
};

export default App;
