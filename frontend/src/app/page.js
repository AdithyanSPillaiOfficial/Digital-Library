import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>CCET Digital Library</h1>
      <h2>Completed Pages</h2>
      <ul>
        <li><a href="./login">Login Page</a></li>
        <li><a href="./search">Search Page</a></li>
        <li><a href="./profile">Profile</a></li>
      </ul>
    </main>
  );
}
