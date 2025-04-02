import React from 'react'; 
import { Container, Typography, Box, Accordion, AccordionSummary, AccordionDetails, Divider } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function TangoDancersPage() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Influential Argentine Tango Dancers
      </Typography>
      
      <Box sx={{ mt: 4 }}>
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">1. Gustavo Naveira</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography paragraph>
              Gustavo Naveira is a pivotal figure in tango nuevo whose analytical approach revolutionized tango pedagogy. As one of the most influential dancers and teachers of his generation, Naveira systematically deconstructed tango movements, creating a comprehensive system for understanding and teaching the dance. His methodology broke down traditional movements into their component parts, allowing dancers to explore new possibilities within the tango framework.
            </Typography>
            <Typography paragraph>
              Together with Fabian Salas, Naveira pioneered the investigative approach to tango that led to the tango nuevo movement. His partnership with Giselle Anne has been particularly influential, and together they have taught workshops worldwide, profoundly shaping modern tango. Naveira&apos;s contributions extend beyond technique to a philosophical approach that emphasizes improvisation and the creative dialogue between partners.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">2. Mariano &apos;Chicho&apos; Frúmboli</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography paragraph>
              Mariano &apos;Chicho&apos; Frúmboli is a multifaceted artist—musician, composer, actor, and dancer—who has significantly influenced modern tango. He is renowned for his improvisational skills and musical interpretation, making him a central figure in the tango nuevo movement. His teaching emphasizes body awareness and the essence of musicality in dance.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">3. Carlitos Espinoza</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography paragraph>
              Carlitos Espinoza is a dynamic milonguero-style dancer from Argentina and Chile with over two decades of experience. He has instructed at hundreds of festivals and workshops worldwide, gaining a loyal following. His early training emphasized the importance of walking in tango, a foundation that has shaped his distinctive style.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">4. Jonathan Saavedra</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography paragraph>
              Jonathan Saavedra began his dance journey with Argentine folklore at the age of five. Before transitioning to tango in 2010, he was involved in various dance groups and festivals. His diverse dance background enriches his tango performances, characterized by a blend of traditional and contemporary elements.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">5. Gianpiero Galdi</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography paragraph>
              Introduced to tango at 12 through a project led by his father, Gianpiero Galdi fell in love with the dance during a trip to Buenos Aires at 15. He has studied with major maestros and began teaching and performing internationally at 18. His dedication has made him a respected figure in the tango community.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">6. Sebastián Achával</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography paragraph>
              Sebastián Achával discovered tango at 15 and moved to Buenos Aires to pursue a professional career. In 2005, he became the Tango de Salón World Champion. His dance is noted for elegance and precision, and he has partnered with Roxana Suárez since 2007.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">7. Alejandra Mantiñan</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography paragraph>
              Alejandra Mantiñan is celebrated for her exceptional technique and profound contributions to tango. Often referred to as having &quot;miraculous feet,&quot; she has set high standards in both performance and teaching. Her dedication has earned her titles such as angel, goddess, queen, and icon of tango.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">8. Aoniken Quiroga</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography paragraph>
              Aoniken Quiroga began dancing at seven, surrounded by prominent milongueros of Buenos Aires. By 12, he was already performing. His unique style and joyful expression have made him a sought-after performer in tango shows worldwide.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">9. Lorena Tarantino</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography paragraph>
              Lorena Tarantino started studying dance and ballet at five. At 17, she discovered tango through Gianpiero Galdi and quickly became passionate about its pedagogy and the care dedicated to students&apos; development. Under Gianpiero&apos;s guidance, she embarked on her professional tango journey.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">10. Clarisa Aragón</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography paragraph>
              Clarisa Aragón began her dance training at nine with classical ballet, later expanding to jazz, Argentine folklore, salsa, and contemporary dance. In 2009, she immersed herself in tango, studying with esteemed maestros. Her diverse background contributes to her expressive and musical dance style.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">11. Hernán Brizuela</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography paragraph>
              Hernán Brizuela is a tango dancer and teacher from Mendoza, Argentina. He began studying Argentine folklore dance at seven and received his first tango lesson from his mother at ten. Hernán has taught and performed at various festivals and studios worldwide, including in New York, Massachusetts, Australia, Canada, New Zealand, Ireland, and Argentina. He was a principal dancer in the off-Broadway dance play &quot;Let&apos;s Speak Tango&quot; and choreographed and starred in the short film &quot;Gardenias.&quot;
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">12. Ariadna Naveira</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography paragraph>
              Ariadna Naveira is one of the most respected female tango dancers of her generation. Born in Buenos Aires, she began her tango journey at a young age and quickly established herself as a distinguished performer and teacher. Known for her precise technique, musical interpretation, and elegant style, Naveira has performed and taught worldwide alongside her longtime dance partner Fernando Sanchez. Her contributions to tango include innovative choreography while maintaining deep respect for traditional elements. Naveira is particularly recognized for her expressive follower technique and has influenced countless female dancers through her workshops and master classes.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
      
      <Box sx={{ mt: 4 }}>
        <Typography variant="body1" paragraph>
          These artists have each made significant contributions to the evolution and dissemination of Argentine tango, blending tradition with innovation and inspiring dancers globally.
        </Typography>
      </Box>
    </Container>
  );
}