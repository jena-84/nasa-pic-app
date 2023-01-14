import '../App.css';
import { useState } from 'react';
import { Link } from "react-router-dom";
import {AppBar,Toolbar, Container,Hidden, List, ListItem ,SwipeableDrawer ,IconButton,Divider} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

//import {Close, MenuOutlined} from '@material-ui/icons'

export default function Navbar(){

  const navigationLinks = [
    {name: 'Home' , path: '/'},
    {name: 'Gallery' , path: '/gallery'},
    {name: 'Upload' , path: '/upload'},
    {name: 'About' , path: '/about'}];
      
    const [open, setOpen] = useState(false);

    return (

      <AppBar position='sticky' className='h-32 p-5 app-bar'>
        <Container className='w-full' >
          <Toolbar disableGutters>
             <div className='mr-auto'>
               <img alt='logo' src='/nasa.jpg' style={{ width :'100%', height:'30px', layout:"fill",objectFit:"cover"}}/>
             </div>
            
           <Hidden xsDown>
             {navigationLinks.map((item,id) => 
               <Link key={id} to={item.path} className="text-lg uppercase font-medium mr-10">{item.name}</Link> 
              )}
           </Hidden>
    
          <Hidden smUp>
            <IconButton>
              <MenuIcon className='text-white' onClick={()=>setOpen(true)}></MenuIcon>
            </IconButton>
          </Hidden>
          
         </Toolbar>
         </Container>
         
         <SwipeableDrawer anchor='right' open={open} onOpen={()=>setOpen(true)} onClose={()=>setOpen(false)}>
          <div>
            <IconButton >
            <ChevronRightIcon onClick={()=>setOpen(false)}/>
            </IconButton>
          </div>
          <Divider/>
          <List>
            {navigationLinks.map((item,id) => 
            <ListItem key={id}>
            <Link to={item.path} key={id} className="text-lg font-medium mr-10">{item.name}</Link> 
            </ListItem>
           )}
           </List>
          </SwipeableDrawer>
      </AppBar>
     )
}