import { Outlet } from "react-router-dom";
import NavBar from "../pages/shared/NavBar";
import Footer from "../pages/shared/Footer";
// import { motion, useScroll, useSpring } from "framer-motion";

const DefaultLayout = () => {
    // const location = useLocation();
    // const { scrollYProgress } = useScroll();
    // const scaleX = useSpring(scrollYProgress, {
    //     stiffness: 100,
    //     damping: 30,
    //     restDelta: 0.001
    // });

    return (
        <div>
            {/* {!location.pathname.includes('dashboard') && <motion.div className="progress-bar" style={{ scaleX }} />} */}
            <NavBar />
            <div className="min-h-[83vh]"><Outlet></Outlet></div>
            <Footer />
        </div>
    );
};

export default DefaultLayout;