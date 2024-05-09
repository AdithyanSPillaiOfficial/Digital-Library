import Image from "next/image";
import styles from "./page.module.css";
import SidePanel from "./components/sidepanel/page";

export default function Home() {
  return (
    // <main className={styles.main}>
      <div className='main' style={{display: 'flex', flexDirection: 'row'}}>
        <SidePanel className='sidepanel' />
        <div className={styles.main} style={{width: '100%'}}>
          <h1>CCET Digital Library</h1>
          <h2>Completed Pages</h2>
          <ul>
            <li><a href="./login">Login Page</a></li>
            <li><a href="./search">Search Page</a></li>
            <li><a href="./profile">Profile</a></li>
          </ul>
        </div>
      </div>
    // </main>
  );
}
