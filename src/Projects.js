import React from "react";
import "./projects.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { data } from "./projectData.js";

const Projects = () => {
  return (
    <>
      <h1 className="title">Projects</h1>
      <main className="main-view">
        {data.map((proj, index) => {
          return (
            console.log(proj.img),
            (
              <Card key={index} sx={{ maxWidth: 345 }}>
                <CardActionArea>
                  <Typography
                    m={1}
                    fontWeight="bold"
                    align="center"
                    gutterBottom
                    variant="h5"
                    component="div"
                  >
                    {proj.title}
                  </Typography>
                  <CardMedia
                    component="img"
                    height="140"
                    image={proj.img}
                    alt="pogdog"
                  />
                  <CardContent>
                    <Typography
                      align="center"
                      gutterBottom
                      variant="h5"
                      component="div"
                    >
                      Creation
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {proj.creation}
                    </Typography>
                    <Typography align="center" variant="h5">
                      Tech
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {proj.tech}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size="small" color="primary">
                    <a target="_blank" href={proj.hosted} rel="noreferrer">
                      Hosted App
                    </a>
                  </Button>
                  <Button size="small" color="primary">
                    <a target="_blank" href={proj.github} rel="noreferrer">
                      GitHub
                    </a>
                  </Button>
                </CardActions>
              </Card>
            )
          );
        })}
      </main>
    </>
  );
};

export default Projects;
