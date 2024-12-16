import { Button } from "@mui/material";
import classes from "./HeroSection.module.css";


function HeroSection() {
  return (
    <section>
      <div className={classes.videobox}>
      <video
          className={classes.mainVideo}
          width="320"
          height="240"
          autoPlay
          muted
        >
          <source src="/video/cover.mp4" type="video/mp4" />
          Your browser does not support the videos.
        </video>
        <div className={classes.overlay}>
          <div className={classes.header}>
            <div className={classes.category}>action , thriller</div>
            <div className={classes.title}>Spider Man</div>
            <div className={classes.text}>Watch exclusive content from top creators and share your own cool videos. Stream anytime, anywhere</div>
            <div ><a href={'#trending'}><Button variant="contained" className={classes.btn}>View</Button></a>  </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
