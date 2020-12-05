import React, { useState, useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import DashboardDrawer from "./DashboardDrawer";
import DashboardAppBar from "./DashboardAppBar";
import { getTechnicians } from "../../services/SolarFarmService";
import TechnicianMap from "../map/TechnicianMap";
import "./Dashboard.scss";

let techIndex = 0;

function Dashboard() {
  const [open, setOpen] = useState(true);
  const [technicianData, setTechnicianData] = useState({});

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getTechnicians(techIndex).then(data => {
      setTechnicianData(data);
      techIndex++;
    })
    setInterval(() => {
      getTechnicians(techIndex).then(data => {
        setTechnicianData(data);
        techIndex++;
      })
    }, 60000)

  }, []);

  // console.log('TECH_DATA: ', technicianData);

  return (
    <div className="root">
      <CssBaseline />
      <DashboardAppBar open={open} openDrawer={handleDrawerOpen} />
      <DashboardDrawer open={open} closeDrawer={handleDrawerClose} />

      <main className="content">
        <div className="app-bar-spacer" />
        <Container maxWidth="lg" className="container">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className="paper">
                <TechnicianMap data={technicianData}/>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
}

export default Dashboard;
