import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box, Button,
    Card,
    CardContent,
    CircularProgress,
    Container,
    Paper,
    Tab,
    Table, TableBody, TableCell, TableContainer,
    TableRow,
    Tabs,
    Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
// import "./Layout1.css";

function Layout1() {
    const navigate = useNavigate(); // Hook for navigation
    const [data, setData] = useState(null);
    const [selectedTab, setSelectedTab] = useState(0);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("/output.json")
            .then((res) => res.json())
            .then((jsonData) => setData(jsonData))
            .catch((err) => {
                console.error("Failed to load data:", err);
                setError("Error loading data. Please try again later.");
            });
    }, []);

    if (error) return <Typography color="error">{error}</Typography>;
    if (!data) return <CircularProgress sx={{ mt: 4 }} />;

    return (
        <Container maxWidth="lg">
            <Typography variant="h4" sx={{ mt: 3, mb: 2, fontWeight: "bold" }}>
                JSON Data Viewer
            </Typography>

            <Tabs 
                value={selectedTab} 
                onChange={(_, newValue) => setSelectedTab(newValue)} 
                variant="fullWidth"
                sx={{ mb: 2 }}
            >
                <Tab label="Content" />
                <Tab label="Tables" />
            </Tabs>

            {selectedTab === 0 && (
                <Box sx={{ mt: 2 }}>
                    {Object.keys(data.content).map((key, index) => (
                        <Box key={key} sx={{ mb: 3 }}>
                            <Accordion>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography variant="h6" sx={{ fontWeight: index === 0 ? "Semi-bold" : "normal" }}>
                                        {index === 0 ? "Data001" : key}
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>{data.content[key]}</Typography>
                                </AccordionDetails>
                            </Accordion>
                        </Box>
                    ))}
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


            {/* Button to navigate to Layout2 */}
            <Button 
                variant="contained" 
                color="primary" 
                sx={{ mt: 3 }} 
                onClick={() => navigate("/another")} 
                fullWidth
            >
                I want to see a new one
            </Button>

        </Container>
    );
}

export default Layout1;
