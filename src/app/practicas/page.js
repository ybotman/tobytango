import React from 'react';
import { Container, Typography, Box, Paper, Divider, List, ListItem, ListItemIcon, ListItemText, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function PracticasPage() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Practicas: The Learning Space for Tango
      </Typography>
      
      <Typography variant="body1" paragraph sx={{ mb: 4 }}>
        The practica is a dedicated space for learning and practicing tango in a relaxed, supportive environment. It bridges the gap between classes and milongas, providing dancers with the opportunity to experiment and refine their skills.
      </Typography>
      
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          What is a Practica?
        </Typography>
        <Divider sx={{ mb: 3 }} />
        
        <Typography variant="body1" paragraph>
          A practica is a practice session for tango dancers where the focus is on learning and improvement rather than social dancing. Unlike milongas, practicas are designed to provide a space where dancers can:
        </Typography>
        
        <List>
          <ListItem alignItems="flex-start">
            <ListItemIcon>
              <SchoolIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary="Work on specific techniques or movements" 
              secondary="Dancers can isolate elements to refine them without the pressure of continuous dancing."
            />
          </ListItem>
          
          <ListItem alignItems="flex-start">
            <ListItemIcon>
              <SchoolIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary="Ask questions and receive feedback" 
              secondary="Unlike at milongas, it's appropriate to discuss dance elements and provide constructive feedback at practicas."
            />
          </ListItem>
          
          <ListItem alignItems="flex-start">
            <ListItemIcon>
              <SchoolIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary="Try new things without pressure" 
              secondary="Practicas provide a safe environment to experiment with new elements or ideas without the social expectations of a milonga."
            />
          </ListItem>
          
          <ListItem alignItems="flex-start">
            <ListItemIcon>
              <SchoolIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary="Dance with different partners for learning purposes" 
              secondary="Switching partners frequently is common in practicas to experience different connections and approaches."
            />
          </ListItem>
        </List>
      </Paper>
      
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Types of Practicas
        </Typography>
        <Divider sx={{ mb: 3 }} />
        
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Guided Practicas</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1" paragraph>
              • Led by an instructor or experienced dancer who provides guidance
            </Typography>
            <Typography variant="body1" paragraph>
              • May include mini-lessons or focus topics
            </Typography>
            <Typography variant="body1" paragraph>
              • Instructor circulates to offer feedback and answer questions
            </Typography>
            <Typography variant="body1">
              • Often structured with specific exercises or challenges
            </Typography>
          </AccordionDetails>
        </Accordion>
        
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Open Practicas</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1" paragraph>
              • Self-directed practice time without formal instruction
            </Typography>
            <Typography variant="body1" paragraph>
              • Dancers work on whatever elements they choose
            </Typography>
            <Typography variant="body1" paragraph>
              • Peer feedback is common and welcomed
            </Typography>
            <Typography variant="body1">
              • More casual atmosphere with mixed levels practicing together
            </Typography>
          </AccordionDetails>
        </Accordion>
        
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Post-Class Practicas</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1" paragraph>
              • Directly follows a class to reinforce that day&apos;s material
            </Typography>
            <Typography variant="body1" paragraph>
              • Focused primarily on implementing the class content
            </Typography>
            <Typography variant="body1" paragraph>
              • Instructor may be available for questions
            </Typography>
            <Typography variant="body1">
              • Shorter duration, typically 30-60 minutes
            </Typography>
          </AccordionDetails>
        </Accordion>
        
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Specialty Practicas</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1" paragraph>
              • Focus on specific elements like musicality, pivots, or embrace
            </Typography>
            <Typography variant="body1" paragraph>
              • Sometimes organized around specific orchestras or music styles
            </Typography>
            <Typography variant="body1" paragraph>
              • May include elements like slow-practice or practice with altered dynamics
            </Typography>
            <Typography variant="body1">
              • Creates dedicated space for deep focus on particular aspects
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Paper>
      
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom>
          Practica Etiquette
        </Typography>
        <Divider sx={{ mb: 3 }} />
        
        <Typography variant="body1" paragraph>
          While practicas are more relaxed than milongas, they still benefit from some general guidelines:
        </Typography>
        
        <List>
          <ListItem alignItems="flex-start">
            <ListItemIcon>
              <SchoolIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary="Ask before giving feedback" 
              secondary="Even in a learning environment, unsolicited advice can be unwelcome. Ask if someone would like feedback before offering it."
            />
          </ListItem>
          
          <ListItem alignItems="flex-start">
            <ListItemIcon>
              <SchoolIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary="Be mindful of other dancers' space" 
              secondary="Practicas are often less crowded than milongas, but spatial awareness is still important, especially when experimenting with new movements."
            />
          </ListItem>
          
          <ListItem alignItems="flex-start">
            <ListItemIcon>
              <SchoolIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary="Respect everyone's learning process" 
              secondary="Different dancers learn in different ways and at different paces. Be supportive and patient with everyone's journey."
            />
          </ListItem>
          
          <ListItem alignItems="flex-start">
            <ListItemIcon>
              <SchoolIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary="Take turns with popular practice partners" 
              secondary="In a learning environment, it's beneficial to practice with various partners. Be willing to rotate and share time with more experienced dancers."
            />
          </ListItem>
          
          <ListItem alignItems="flex-start">
            <ListItemIcon>
              <SchoolIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary="Balance practicing and dancing" 
              secondary="Find a good balance between focused practice on specific elements and integrated dancing to incorporate those elements into your overall dance."
            />
          </ListItem>
        </List>
        
        <Typography variant="body1" sx={{ mt: 3 }}>
          Practicas are one of the most valuable resources for tango improvement. Making them a regular part of your tango journey will accelerate your learning and deepen your understanding of the dance.
        </Typography>
      </Paper>
    </Container>
  );
}