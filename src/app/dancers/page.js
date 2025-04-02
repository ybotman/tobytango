import React from 'react'; 
import { Container, Typography, Box, Accordion, AccordionSummary, AccordionDetails, Divider } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function TangoDancersPage() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Influential Argentine Tango Dancers
      </Typography>
      
      <Typography variant="body1" paragraph sx={{ fontStyle: 'italic', mb: 3 }}>
        These are dancers that have moved and motivated us (my wife and I). We have explored and learned something fundamental from all of them—not just moves, but deeper insights into tango. With most or many of them, we have taken some sort of class or two, and with several, I have had many hours of lessons. Gustavo, Chicho, Alejandra Mantiñan, and of course Hernán are the tango mentors in my life.
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
            
            <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>Gustavo Naveira Videos:</Typography>
            <Box component="ul" sx={{ pl: 4 }}>
              <Box component="li" sx={{ mb: 1 }}>
                <a href="https://www.youtube.com/watch?v=2DDV9bIHCtw" target="_blank" rel="noopener noreferrer" style={{ color: "#4caf50" }}>
                  Gustavo Naveira & Ariadna Naveira - Oigo Tu Voz
                </a>
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                <a href="https://www.youtube.com/watch?v=kkzLWEVyMWs" target="_blank" rel="noopener noreferrer" style={{ color: "#4caf50" }}>
                  Gustavo Naveira & Giselle Anne – Fueron tres años
                </a>
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                <a href="https://www.youtube.com/watch?v=0n-2sg44S24" target="_blank" rel="noopener noreferrer" style={{ color: "#4caf50" }}>
                  Gustavo Naveira & Giselle Anne – Una fija
                </a>
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                <a href="https://www.youtube.com/watch?v=_IJs0n7wKJU" target="_blank" rel="noopener noreferrer" style={{ color: "#4caf50" }}>
                  Gustavo Naveira & Giselle Anne – Pobre flor
                </a>
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                <a href="https://www.youtube.com/watch?v=svNugnGE2wo" target="_blank" rel="noopener noreferrer" style={{ color: "#4caf50" }}>
                  Gustavo Naveira - Ultimate Tango 2017
                </a>
              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">2. Mariano &apos;Chicho&apos; Frúmboli & Juana Sepulveda</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography paragraph>
              Mariano &apos;Chicho&apos; Frúmboli is a multifaceted artist—musician, composer, actor, and dancer—who has significantly influenced modern tango. He is renowned for his improvisational skills and musical interpretation, making him a central figure in the tango nuevo movement. His teaching emphasizes body awareness and the essence of musicality in dance. Together with his partner Juana Sepulveda, they form one of the most dynamic and innovative tango partnerships, known for their precision, creativity, and beautiful synchronicity in movement.
            </Typography>
            
            <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>Chicho and Juana Videos:</Typography>
            <Box component="ul" sx={{ pl: 4 }}>
              <Box component="li" sx={{ mb: 1 }}>
                <a href="https://youtu.be/L8Wtum7sQeQ?si=MIOzr6TXJuxUAZSc" target="_blank" rel="noopener noreferrer" style={{ color: "#4caf50" }}>
                  &quot;El flete&quot; Bailemos Tango Festival 2021 in Kyiv, Ukraine
                </a>
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                <a href="https://youtu.be/A1TNjNqJCjs?si=JCynjYLmwSNM3kOh" target="_blank" rel="noopener noreferrer" style={{ color: "#4caf50" }}>
                  &quot;Loca&quot; Mediterranean Summer Tango Festival 2017 in Poreč, Croatia
                </a>
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                <a href="https://youtu.be/s9XdobkUgbk?si=Pv6n-GKIbcYV3isK" target="_blank" rel="noopener noreferrer" style={{ color: "#4caf50" }}>
                  Noelia Hurtado & Mariano Chicho Frumboli Dancing in Social Ronda
                </a>
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                <a href="https://youtu.be/MZqVTWnsrIk?si=I_QJUkkIMVHr_XrQ" target="_blank" rel="noopener noreferrer" style={{ color: "#4caf50" }}>
                  Jun 2023 Warsaw - Finale Astor Piazzolla
                </a>
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                <a href="https://youtu.be/sjRh64FrmOQ?si=AAJ-VvqNRgLIo07U" target="_blank" rel="noopener noreferrer" style={{ color: "#4caf50" }}>
                  Jan 2014: NYC, Milonga Para Una Harmonica
                </a>
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                <a href="https://youtu.be/GbLCAeT8Yu8?si=9Qfsvfw1U5U1TXwP" target="_blank" rel="noopener noreferrer" style={{ color: "#4caf50" }}>
                  TANGO TO ISTANBUL &apos;25 - Marcelo Perea El dia que me quieras
                </a>
              </Box>
            </Box>
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
            
            <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>Carlitos Espinoza Videos:</Typography>
            <Box component="ul" sx={{ pl: 4 }}>
              <Box component="li" sx={{ mb: 1 }}>
                <a href="https://www.youtube.com/watch?v=1S79X5yTT3A" target="_blank" rel="noopener noreferrer" style={{ color: "#4caf50" }}>
                  Carlitos Espinoza & Agustina Piaggio – Nueve puntos, Lisbon Tango Festival 2023
                </a>
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                <a href="https://www.youtube.com/watch?v=G_BjiEi7htY" target="_blank" rel="noopener noreferrer" style={{ color: "#4caf50" }}>
                  Carlitos Espinoza & Agustina Piaggio – El flete at Lisbon 2024
                </a>
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                <a href="https://www.youtube.com/watch?v=TslHieDSkgo" target="_blank" rel="noopener noreferrer" style={{ color: "#4caf50" }}>
                  Carlitos Espinoza & Noelia Hurtado – No mientas
                </a>
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                <a href="https://www.youtube.com/watch?v=qTcuxuMxNQs" target="_blank" rel="noopener noreferrer" style={{ color: "#4caf50" }}>
                  Carlitos Espinoza & Juana Sepulveda – Brussels 2016
                </a>
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                <a href="https://www.youtube.com/watch?v=a4VBF_NtdF0" target="_blank" rel="noopener noreferrer" style={{ color: "#4caf50" }}>
                  Carlitos Espinoza & Juana Sepulveda – Crete 2024 A los Amigos (and the Chicho walk!)
                </a>
              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">4. Facundo Piñero & Vanessa Villalba</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography paragraph>
              Facundo Piñero and Vanessa Villalba form a dynamic partnership known for their elegant style and emotional connection. Vanessa brings grace and expressiveness to her dancing, while Facundo contributes powerful technique and presence. Together, they have performed and taught worldwide, becoming known for both their stage performances and their accessible teaching approach that emphasizes the embrace, musicality, and authentic connection between partners.
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
            
            <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>Gianpiero Galdi Videos:</Typography>
            <Box component="ul" sx={{ pl: 4 }}>
              <Box component="li" sx={{ mb: 1 }}>
                <a href="https://www.youtube.com/watch?v=JaEsttvrXkY" target="_blank" rel="noopener noreferrer" style={{ color: "#4caf50" }}>
                  &quot;Ariele e Calibano&quot; by Sineterra, at Krakus Aires Tango Festival, 2019
                </a>
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                <a href="https://www.youtube.com/watch?v=fJd0UBfEdvA" target="_blank" rel="noopener noreferrer" style={{ color: "#4caf50" }}>
                  Tango for Her by Quinteto Beltango 2024
                </a>
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                <a href="https://www.youtube.com/watch?v=MHpOmz41sKI" target="_blank" rel="noopener noreferrer" style={{ color: "#4caf50" }}>
                  Vals Lagrimas y sonrisas with Sexteto Cristal
                </a>
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                <a href="https://www.youtube.com/watch?v=2sEr1QwdoUM" target="_blank" rel="noopener noreferrer" style={{ color: "#4caf50" }}>
                  El simpático 2022 in Sarajevo, Bosnia and Herzegovina
                </a>
              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">6. Alejandra Mantiñan</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography paragraph>
              Alejandra Mantiñan is celebrated for her exceptional technique and profound contributions to tango. Often referred to as having &quot;miraculous feet,&quot; she has set high standards in both performance and teaching. Her dedication has earned her titles such as angel, goddess, queen, and icon of tango.
            </Typography>
            <Typography paragraph>
              She has danced with various partners including Aoniken Quiroga, who began dancing at seven, surrounded by prominent milongueros of Buenos Aires. By 12, he was already performing. His unique style and joyful expression have made him a sought-after performer in tango shows worldwide.
            </Typography>
            
            <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>Alejandra Mantiñan Videos:</Typography>
            <Box component="ul" sx={{ pl: 4 }}>
              <Box component="li" sx={{ mb: 1 }}>
                <a href="https://www.youtube.com/watch?v=j5u267ZWla4" target="_blank" rel="noopener noreferrer" style={{ color: "#4caf50" }}>
                  Alejandra Mantiñan & Aoniken Quiroga – Flor de Monserrat
                </a>
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                <a href="https://www.youtube.com/watch?v=z4XFKTxFH1w" target="_blank" rel="noopener noreferrer" style={{ color: "#4caf50" }}>
                  Aoniken Quiroga - Berlin - 2022 Flor de Monserrat
                </a>
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                <a href="https://www.youtube.com/watch?v=yZ_C-3Ezwy4" target="_blank" rel="noopener noreferrer" style={{ color: "#4caf50" }}>
                  Alejandra Mantiñan with Alejandro Lazzaro
                </a>
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                <a href="https://youtu.be/eT-RwaHb6FA" target="_blank" rel="noopener noreferrer" style={{ color: "#4caf50" }}>
                  Interview with Pep Palazon - La Floreada 2018
                </a>
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                <a href="https://www.youtube.com/watch?v=Ii-yGKybn1E" target="_blank" rel="noopener noreferrer" style={{ color: "#4caf50" }}>
                  Ultimate Tango Wisdom - Why Tango?
                </a>
              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">7. Lorena Tarantino</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography paragraph>
              Lorena Tarantino started studying dance and ballet at five. At 17, she discovered tango through Gianpiero Galdi and quickly became passionate about its pedagogy and the care dedicated to students&apos; development. Under Gianpiero&apos;s guidance, she embarked on her professional tango journey.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">8. Sebastián Achával</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography paragraph>
              Sebastián Achával discovered tango at 15 and moved to Buenos Aires to pursue a professional career. In 2005, he became the Tango de Salón World Champion. His dance is noted for elegance and precision, and he has partnered with Roxana Suárez since 2007.
            </Typography>
            
            <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>Sebastián Achával Videos:</Typography>
            <Box component="ul" sx={{ pl: 4 }}>
              <Box component="li" sx={{ mb: 1 }}>
                <a href="https://www.youtube.com/watch?v=rqkOWVWuQeQ" target="_blank" rel="noopener noreferrer" style={{ color: "#4caf50" }}>
                  Sebastián Achával & Roxana Suárez - Oigo tu voz
                </a>
              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">9. Jonathan Saavedra & Clarisa Aragón</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography paragraph>
              Jonathan Saavedra began his dance journey with Argentine folklore at the age of five. Before transitioning to tango in 2010, he was involved in various dance groups and festivals. His diverse dance background enriches his tango performances, characterized by a blend of traditional and contemporary elements. Clarisa Aragón, his dance partner, began her training at nine with classical ballet, later expanding to jazz, Argentine folklore, salsa, and contemporary dance. In 2009, she immersed herself in tango, studying with esteemed maestros. Together, they create performances that showcase both technical precision and profound emotional expression.
            </Typography>
            
            <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>Jonathan Saavedra Videos:</Typography>
            <Box component="ul" sx={{ pl: 4 }}>
              <Box component="li" sx={{ mb: 1 }}>
                <a href="https://www.youtube.com/watch?v=LTpqm0Kpk98" target="_blank" rel="noopener noreferrer" style={{ color: "#4caf50" }}>
                  Jonathan Saavedra & Clarisa Aragón - De Floreo
                </a>
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                <a href="https://www.youtube.com/watch?v=GFpVGRCGGzg" target="_blank" rel="noopener noreferrer" style={{ color: "#4caf50" }}>
                  Jonathan Saavedra & Clarisa Aragón - Tierrita at Southern California 2023
                </a>
              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">10. Hernán Brizuela</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography paragraph>
              Hernán Brizuela is a tango dancer and teacher from Mendoza, Argentina. He began studying Argentine folklore dance at seven and received his first tango lesson from his mother at ten. Hernán has taught and performed at various festivals and studios worldwide, including in New York, Massachusetts, Australia, Canada, New Zealand, Ireland, and Argentina. He was a principal dancer in the off-Broadway dance play &quot;Let&apos;s Speak Tango&quot; and choreographed and starred in the short film &quot;Gardenias.&quot;
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">11. Ariadna Naveira</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography paragraph>
              Ariadna Naveira is one of the most respected female tango dancers of her generation. Born in Buenos Aires, she began her tango journey at a young age and quickly established herself as a distinguished performer and teacher. Known for her precise technique, musical interpretation, and elegant style, Naveira has performed and taught worldwide alongside her longtime dance partner Fernando Sanchez. Her contributions to tango include innovative choreography while maintaining deep respect for traditional elements. Naveira is particularly recognized for her expressive follower technique and has influenced countless female dancers through her workshops and master classes.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">12. Noelia Hurtado</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography paragraph>
              Noelia Hurtado is recognized for her elegant, musical dancing and warm teaching approach. She began dancing tango in her twenties and quickly rose to international prominence, becoming known for her connection to the music, her beautiful posture, and her ability to express emotion through movement. She has danced with several notable partners and is particularly admired for her clear, grounded technique and ability to communicate the essence of tango music through her movement. Noelia has influenced many followers with her distinctive approach that balances technical precision with emotional depth.
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