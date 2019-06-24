import React, { Component } from "react";
import {
  VictoryPie,
  VictoryChart,
  VictoryLine,
  VictoryTheme,
  VictoryBar
} from "victory";

export default class index extends Component {
  render() {
    return (
      <div className="main-dashboard-container">
        <h3 className="page-title">Dashboard</h3>
        <div className="container-fluid">
          <div className="graph">
            <div className="graph-container">
              <p>Graph</p>
              <VictoryChart theme={VictoryTheme.material}>
                <VictoryLine
                  style={{
                    data: { stroke: "rgb(12,96,250)" },
                    parent: { border: "1px solid #ccc" }
                  }}
                  data={[
                    { x: 1, y: 2 },
                    { x: 2, y: 3 },
                    { x: 3, y: 5 },
                    { x: 4, y: 4 },
                    { x: 5, y: 7 }
                  ]}
                  animate={{
                    duration: 2000,
                    onLoad: { duration: 2000 }
                  }}
                />
              </VictoryChart>
            </div>
            <div className="graph-container">
              <p>Graph</p>
              <VictoryPie
                innerRadius={200}
                // style={{
                //     data: {
                //       fill: 'lightBlue'
                //     },
                //     labels: {
                //       display: 'none'
                //     }
                //   }}
                data={[
                  { x: 11, y: 35 },
                  { x: 11, y: 40 }
                  // { x: 11, y: 55 }
                ]}
                style={{
                  data: {
                    fill: ({ y }) =>
                      // y > 49 ? 'green'
                      y > 39 ? "rgb(95,153,252)" : "rgb(12,96,250)"
                  }
                }}
                animate={{
                  duration: 2000,
                  onLoad: { duration: 2000 }
                }}
              />
            </div>
            <div className="graph-container">
              <p>Graph</p>
              <VictoryChart theme={VictoryTheme.material}>
                <VictoryLine
                  style={{
                    data: { stroke: "rgb(12,96,250)" },
                    parent: { border: "1px solid #ccc" }
                  }}
                  data={[
                    { x: 1, y: 2 },
                    { x: 2, y: 3 },
                    { x: 3, y: 5 },
                    { x: 4, y: 4 },
                    { x: 5, y: 7 }
                  ]}
                  animate={{
                    duration: 2000,
                    onLoad: { duration: 2000 }
                  }}
                />
              </VictoryChart>
            </div>
            <div className="graph-container">
              <p>Graph</p>
              <VictoryPie
                innerRadius={200}
                // style={{
                //     data: {
                //       fill: 'lightBlue'
                //     },
                //     labels: {
                //       display: 'none'
                //     }
                //   }}
                data={[
                  { x: 11, y: 35 },
                  { x: 11, y: 40 }
                  // { x: 11, y: 55 }
                ]}
                style={{
                  data: {
                    fill: ({ y }) =>
                      // y > 49 ? 'green'
                      y > 39 ? "rgb(95,153,252)" : "rgb(12,96,250)"
                  }
                }}
                animate={{
                  duration: 2000,
                  onLoad: { duration: 2000 }
                }}
              />
            </div>
          </div>
          <div className="graph">
            <div className="graph-container-2">
              <p>Graph/Report </p>
              <VictoryChart
                theme={VictoryTheme.material}
                domainPadding={{ x: 10 }}
              >
                <VictoryBar
                  cornerRadius={10}
                  data={[
                    { x: 11, y: 35 },
                    { x: 12, y: 40 },
                    { x: 13, y: 55 },
                    { x: 14, y: 85 },
                    { x: 15, y: 95 },
                    { x: 16, y: 105 }
                  ]}
                  style={{
                    data: {
                      fill: ({ y }) =>
                        // y > 49 ? 'green'
                        y > 39 ? "rgb(95,153,252)" : "rgb(12,96,250)"
                    }
                  }}
                  animate={{
                    duration: 2000,
                    onLoad: { duration: 2000 }
                  }}
                />
              </VictoryChart>
            </div>
            <div className="graph-container-2">
              <p>Graph/Report</p>
              <VictoryChart
                theme={VictoryTheme.material}
                domainPadding={{ x: 10 }}
              >
                <VictoryBar
                  horizontal
                  cornerRadius={10}
                  data={[
                    { x: 11, y: 35 },
                    { x: 12, y: 40 },
                    { x: 13, y: 55 },
                    { x: 14, y: 85 },
                    { x: 15, y: 95 },
                    { x: 16, y: 105 }
                  ]}
                  style={{
                    data: {
                      fill: ({ y }) =>
                        // y > 49 ? 'green'
                        y > 39 ? "rgb(95,153,252)" : "rgb(12,96,250)"
                    }
                  }}
                  animate={{
                    duration: 2000,
                    onLoad: { duration: 2000 }
                  }}
                />
              </VictoryChart>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
