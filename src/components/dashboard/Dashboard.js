import React, { useState, useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import DashboardDrawer from "./DashboardDrawer";
import DashboardAppBar from "./DashboardAppBar";
import { getTechnicians } from "../../services/SolarFarmService";
import {API_CALL_INTERVAL} from "../../utils/constants";
import TechnicianMap from "../map/TechnicianMap";
import {findCollisions} from "../../utils/utils";
import "./Dashboard.scss";

let techIndex = 0;

function Dashboard() {
  const [open, setOpen] = useState(false);
  const [technicianCollisions, setTechnicianCollisions] = useState([]);
  const [technicianData, setTechnicianData] = useState({});

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const loadData = () => {
    getTechnicians(techIndex).then(data => {
      const collisions = findCollisions(data.features);
      setTechnicianCollisions(collisions)
      setTechnicianData(data)
    })
    techIndex++;
  }

  useEffect(() => {
    loadData();
    setInterval(() => {
      if (techIndex <= 15) {loadData();}
    }, API_CALL_INTERVAL)
  }, []);

  return (
    <div className="root">
      <CssBaseline />
      <DashboardAppBar open={open} openDrawer={handleDrawerOpen} collisions={technicianCollisions} />
      <DashboardDrawer open={open} closeDrawer={handleDrawerClose} data={technicianData}/>
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
