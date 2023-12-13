import styles from "./AppLayout.module.css";
// import AppNav from "../compnents/AppNav";
import Sidebar from "../compnents/Sidebar/Sidebar";
import Map from "../compnents/Map/Map";
import User from "../compnents/User/User";

function AppLayout() {
  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
      <User />
    </div>
  );
}

export default AppLayout;
