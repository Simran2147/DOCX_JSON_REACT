import {Box,Button,Card,CardContent,CircularProgress,Container,Paper, Tab,Table,TableBody,TableCell,
TableContainer,TableRow,Tabs,Typography,} from "@mui/material";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

function Layout2() {
  const [data, setData] = useState(null);
  const [selectedTab, setSelectedTab] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/output.json")
      .then((res) => res.json())
      .then((jsonData) => setData(jsonData))
      .catch((err) => console.error("Failed to load data:", err));
  }, []);

  if (!data)
    return (
      <Box className="loading-container">
        <CircularProgress size={60} />
        <Typography className="loading-text">Loading...</Typography>
      </Box>
    );

  return (
    <Container>
      {/* Header Animation */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography variant="h3" className="title">
          Alternate Data View
        </Typography>
      </motion.div>

      {/* Tabs */}
      <Tabs
        value={selectedTab}
        onChange={(_, newValue) => setSelectedTab(newValue)}
        centered
        className="tabs"
      >
        <Tab label="Content" />
        <Tab label="Tables" />
      </Tabs>

      {/* Content Section */}
      {selectedTab === 0 && (
        <Box sx={{ mt: 2 }}>
          {Object.keys(data.content).map((key, index) => {
            const header = key === null || key === "null" ? "Data001" : key; // Replace null headers
            return (
              <motion.div
                key={header}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="content-card">
                  <CardContent>
                    <Typography variant="h5" className="section-title">
                      {header}
                    </Typography>
                    <Typography className="content-text">
                      {data.content[key]}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </Box>
      )}

      {/* Tables Section */}
      {selectedTab === 1 && (
        <Box sx={{ mt: 2 }}>
          {data.tables.map((table, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="table-card">
                <CardContent>
                  <Typography variant="h5" className="section-title">
                    {table.table_name}
                  </Typography>
                  <TableContainer component={Paper} className="custom-table">
                    <Table>
                      <TableBody>
                        {table.table_data.map((row, i) => (
                          <TableRow key={i}>
                            {row.map((cell, j) => (
                              <TableCell key={j}>{cell}</TableCell>
                            ))}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </Box>
      )}

      {/* Go Back Button */}
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/")}
        >
          Naah I like the first one
        </Button>
      </Box>
    </Container>
  );
}

export default Layout2;
