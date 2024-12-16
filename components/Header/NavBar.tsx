import { AppBar, Box, Container } from "@mui/material"
import classes from './NavBar.module.css'
import Link from "next/link"
import SearchBar from "./SearchBar"
import Logout from "./Logout"


async function NavBar() {
  
  return (
    <AppBar position="fixed" className={classes.navbar} >
    <Container maxWidth="xl" className={classes.list} >
      <Box className={classes.listItem}>
        <Box className={classes.link}><Link href={'/'}>LOGO</Link></Box>
        <Box className={classes.link}><Link href={'/home'}>Home</Link></Box>
      </Box>
      <Box className={classes.listItem}>
        <Box ><SearchBar/></Box>
        <Logout/>
      </Box>
    </Container>
  </AppBar>
  )
}

export default NavBar