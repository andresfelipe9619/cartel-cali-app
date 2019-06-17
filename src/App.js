import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
const ROYALE_API = "https://api.royaleapi.com";
const ROYALE_TOKEN =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjNhZWZkODJkLTQxM2UtNGM5YS05NDMxLTg2MDY1MjdjNDdjMSIsImlhdCI6MTU1OTM0NjM3Miwic3ViIjoiZGV2ZWxvcGVyL2M3Yjc3YTdhLTFkNDYtNWRlOC1kMjI3LWQwOWJlYWM3N2ZjNCIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyIxOTAuMTU4LjE5OC4xMzAiXSwidHlwZSI6ImNsaWVudCJ9XX0.iqySBHasbBIPpqNUuIeU4jpF49f09DAiO2qZnLIYCYFujmKBR75npNvb4I4Cz2TLFLgL056zThgD84XbDYBOfQ";
const CLAN_TAG = "%2398V92JPU";
function App() {
  const [warLogs, setWarLogs] = useState([]);

  useEffect(() => {
    const getWarLogs = async () => {
      const options = {
        method: "GET",
        mode: "cors",
        headers: {
          auth:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjY0MywiaWRlbiI6IjIzNDczMjEzNjA2MDU1MTE2OCIsIm1kIjp7fSwidHMiOjE1NTkzNTUxNDMwMzN9.36xTN4RUeeogV-5iBJHrB9iFjiucBaoQ4qMTkNRBo7c"
        }
      };
      let response = await fetch(
        `${ROYALE_API}/clans/${CLAN_TAG}/warlog`,
        options
      );
      let logs = await response.json();
      setWarLogs(logs);
    };
    getWarLogs();
  }, []);
  const reducedLogs = warLogs.reduce((prev, log, i) => {
    const { participants } = log;
    participants.map(({ name, wins, numberOfBattles }) => {
      if (!prev[name]) {
        prev[name] = {
          wins,
          numberOfBattles
        };
      } else {
        prev[name].wins += wins;
        prev[name].numberOfBattles += numberOfBattles;
      }
      return null;
    });
    return prev;
  }, {});

  return (
    <div className="App">
      {Object.keys(reducedLogs).map((name, i) => (
        <div key={i}>
          <h4
            style={{
              color: "white",
              backgroundColor:
                reducedLogs[name].wins < reducedLogs[name].numberOfBattles / 2
                  ? "red"
                  : "green"
            }}
          >
            {name}
          </h4>
          <h5>Battles: {reducedLogs[name].numberOfBattles}</h5>
          <h5>Wins: {reducedLogs[name].wins}</h5>
        </div>
      ))}
    </div>
  );
}

export default App;
