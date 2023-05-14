import BarChart from "./components/BarChart";
import LineChart from "./components/LineChart";
import PieChart from "./components/PieChart";

export function Graphe({Data,graph,titel}) {
    console.log(Data)
  const userData = {
    labels: Data.map((data) => data.Labl),
    datasets: [
      {
        label: titel,
        data: Data.map((data) => data.Numbere),
        backgroundColor: [
          "rgba(240,240,240,0.6)",
          "rgba(0,0,0,0.6)",
          "rgba(255,0,0,0.6)",
          "rgba(0,255,0,0.6)",
          "rgba(0,0,255,0.6)",
        ],
        borderColor: [
          "rgba(0,0,0,0.7)",
          "rgba(0,0,0,0.9)",
          "rgba(255,0,0,0.9)",
          "rgba(0,255,0,0.9)",
          "rgba(0,0,255,0.9)",
        ],
        borderWidth: 2,

      },
    ],
  };
  return (
    <div className="App">
      {graph==1?<div style={{ width: 700}}>
        <BarChart chartData={userData} />
      </div>:null}
      {graph==2?<div style={{ width: 700}}>
        <LineChart chartData={userData} />
      </div>:null}
      {graph==3?<div style={{ width: 500}}>
        <PieChart chartData={userData} />
      </div>:null}
    </div>
  );
}

