import Head from 'next/head'
import Image from 'next/image'
import React, { useState } from 'react'
import Teams from '../components/Teams'
import styles from '../../styles/Home.module.css'

export default function Home() {
  // react 'hooks' useState, useEffect
  const [teams, setTeams] = useState([]);
  const [player, setPlayer] = useState("Player Name");
  const [loading, setLoading] = useState(false);

  const loadPeople = async () => {
    setLoading(true);
    const req = await fetch(`/api/player/${player}`);
    const json = await req.json();
    setTeams(json);
    setLoading(false);
  }

  return (
    <div className={styles.main}>
      <Head>
        <title>Liam</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.container}>
        <div className={styles.headban}>
        <input value={player} onChange={(e) => setPlayer(e.target.value)} />
        <button onClick={() => loadPeople()}>Load</button>
        {
          loading && <div>LOADING</div>
        }
        </div>
        <div className={styles.layout}><Teams teams={teams} />
        </div>

      </main>
    </div>
  )
}
