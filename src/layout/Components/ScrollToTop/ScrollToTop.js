const {useEffect} = require("react");
const {useLocation} = require("react-router-dom");

const ScrollToTop = () => {
  const {pathname} = useLocation();
  useEffect(() => {
    window.scrollTo({top: 0, behavior: "auto"});
  }, [pathname]);
};

export default ScrollToTop;
