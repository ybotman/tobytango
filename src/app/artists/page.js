import React from 'react'; 
import { Container, Typography, Box, Accordion, AccordionSummary, AccordionDetails, Divider } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function TangoArtistsPage() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Legendary Tango Orchestras &amp; Directors
      </Typography>
      
      <Typography variant="body1" paragraph>
        The &quot;Golden Age&quot; of tango (1935-1955) produced the most influential orchestras and musical directors in tango history. These distinctive artists defined different styles that dancers still study and appreciate today. Here we explore the most important orchestras, their unique sounds, and their contribution to tango.
      </Typography>

      <Box sx={{ my: 3 }}>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Juan D&apos;Arienzo (1900-1976) - &quot;El Rey del Compás&quot;</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1" paragraph>
              Known as &quot;The King of Rhythm,&quot; D&apos;Arienzo revolutionized tango in the 1930s by returning to a faster, more rhythmic style after years of slower romantic tangos. His emphasis on marcato (marked beat) and staccato phrasing made his music highly danceable and helped revitalize tango&apos;s popularity. D&apos;Arienzo&apos;s orchestra featured driving piano rhythms, clear violin lines, and a strong 2/4 beat that dancers could easily follow. He recorded over 1,000 tangos between 1935-1975, with his most famous period featuring singer Héctor Mauré. D&apos;Arienzo&apos;s music is still played regularly at milongas worldwide for its infectious energy and reliable rhythm.
            </Typography>
            <Typography variant="body1">
              Notable recordings: &quot;La Cumparsita,&quot; &quot;El Choclo,&quot; &quot;La Puñalada,&quot; &quot;Don Juan&quot;
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Carlos Di Sarli (1903-1960) - &quot;El Señor del Tango&quot;</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1" paragraph>
              Known as &quot;The Lord of Tango,&quot; Di Sarli created one of the most elegant and sophisticated tango sounds. As both pianist and director, his orchestrations were characterized by a smooth, clean, and refined musical texture. Di Sarli&apos;s distinctive piano introductions, lyrical string sections, and carefully balanced arrangements created music that flows like silk. His early recordings (1928-1935) were more rhythmic, while his later style (1939-1958) evolved toward greater lyricism and elegance. Di Sarli rarely performed in public due to his extreme shyness and wore dark glasses because of a medical condition.
            </Typography>
            <Typography variant="body1">
              Notable recordings: &quot;Bahía Blanca,&quot; &quot;A la Gran Muñeca,&quot; &quot;Milonguero Viejo,&quot; &quot;Nobleza de Arrabal&quot;
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Osvaldo Pugliese (1905-1995) - &quot;The Left Hand of Tango&quot;</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1" paragraph>
              A revolutionary figure in tango, Pugliese developed a dramatic, intense style characterized by marcato in four, dramatic crescendos and decrescendos, and complex rhythmic variations. His innovative arrangements often featured intricate piano lines (played by Pugliese himself) and powerful, sometimes dissonant string sections. Pugliese&apos;s politics (he was a lifelong communist) led to his imprisonment during the Perón era, when his orchestra would symbolically place a red carnation on his empty piano. His tango &quot;La Yumba&quot; (1946) became his signature piece, with its distinctive marcato bass line mimicking the sound of a double bass being forcefully plucked and struck.
            </Typography>
            <Typography variant="body1">
              Notable recordings: &quot;La Yumba,&quot; &quot;Gallo Ciego,&quot; &quot;Recuerdo,&quot; &quot;La Beba&quot;
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Aníbal Troilo (1914-1975) - &quot;Pichuco&quot;</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1" paragraph>
              One of tango&apos;s most beloved bandoneón players and orchestra directors, Troilo balanced rhythmic and melodic elements to create a rich, full sound that epitomizes Golden Age tango. His orchestra maintained the perfect equilibrium between danceability and musical complexity. Troilo&apos;s arrangements featured rich harmonies, nuanced dynamics, and soulful bandoneón solos. His collaborations with arrangers like Astor Piazzolla added sophisticated musical elements while maintaining traditional structures. Troilo&apos;s larger-than-life personality and nickname &quot;Pichuco&quot; made him an iconic figure, and he worked with some of tango&apos;s greatest singers including Francisco Fiorentino and Roberto Goyeneche.
            </Typography>
            <Typography variant="body1">
              Notable recordings: &quot;Inspiración,&quot; &quot;Sur,&quot; &quot;Toda Mi Vida,&quot; &quot;La Trampera&quot;
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Miguel Caló (1907-1972) - &quot;El Señor del Bandoneón&quot;</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">
              Caló&apos;s orchestra produced a refined, melodic sound with impeccable musicianship. His most celebrated period (1942-45) featured the outstanding singers Raúl Berón and Alberto Podestá. Caló&apos;s arrangements blended melodic richness with clear rhythm, producing an elegant sound that was complex yet danceable. His subtle bandoneón playing and careful selection of musicians, including pianist Osmar Maderna, created a distinctive style that was never flashy but always musically sophisticated. Caló had a refined image, often photographed in formal attire, that matched his orchestra&apos;s elegant style.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Francisco Canaro (1888-1964) - Pioneer and Entrepreneur</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">
              One of tango&apos;s earliest successful orchestra leaders, Canaro recorded over 3,500 pieces across six decades, making him the most prolific tango recording artist. Born in Uruguay, he rose from poverty to become tango&apos;s greatest entrepreneur. Canaro&apos;s music evolved from the guardia vieja (Old Guard) style to adapt to each era, including the development of vals and milonga styles. While considered less dramatic than other Golden Age orchestras, his consistent, danceable rhythms and business acumen made him hugely influential. Canaro was instrumental in establishing royalty rights for musicians in Argentina and invested successfully in theater and film production.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Rodolfo Biagi (1906-1969) - &quot;Manos Brujas&quot;</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">
              Known as &quot;Magic Hands,&quot; Biagi was D&apos;Arienzo&apos;s pianist before forming his own orchestra. He developed a distinctive style characterized by staccato phrasing, dramatic pauses, and exceptional rhythmic precision. Biagi&apos;s piano playing featured rapid runs, sharp accents, and percussive effects that gave his orchestra a unique, energetic sound. His music has a playful quality, with sudden stops and starts, dynamic contrasts, and a driving rhythm that creates excitement on the dance floor. Biagi&apos;s arrangements often highlighted the piano as a central voice rather than just providing rhythmic accompaniment.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Ricardo Tanturi (1905-1973) - &quot;El Caballero del Tango&quot;</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">
              Known as &quot;The Gentleman of Tango,&quot; Tanturi led an orchestra that found the perfect balance between rhythmic drive and melodic expression. His most celebrated period featured singer Alberto Castillo, whose theatrical vocal style complemented Tanturi&apos;s dynamic arrangements. The orchestra maintained a strong rhythmic foundation while allowing space for melodic invention and vocal expression. Tanturi&apos;s style evolved throughout his career, moving from a more rhythmic approach to increasingly sophisticated arrangements. Though less frequently discussed than some other directors, his recordings remain highly valued by dancers for their clear musicality and emotional expressiveness.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Alfredo De Angelis (1910-1992) - Master of the Tango Vals</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">
              De Angelis created a rich orchestral sound that seamlessly balanced lyricism and rhythm. His orchestra is particularly celebrated for its masterful vals interpretations, featuring lush string arrangements and dynamic phrasing. De Angelis often employed dual singers (Carlos Dante and Julio Martel) whose harmonized voices created a distinctive sound. His arrangements used dramatic dynamics and tempo variations without losing danceability. Though he began recording in the early 1940s, De Angelis maintained his Golden Age style throughout his career, even as tango evolved around him. His consistency and musicality have made his recordings enduringly popular at milongas.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Enrique Rodríguez (1901-1971) - &quot;El Morocho del Abasto&quot;</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">
              Rodríguez led a unique orchestra that specialized in lighter, festive tangos as well as other dance music including foxtrots, pasodobles, and rancheras. His distinctive sound often incorporated the organ and featured cheerful, bright arrangements. While considered somewhat outside the mainstream of tango evolution, his orchestra&apos;s happy, energetic music provides a contrast to the more dramatic or melancholic tango orchestras. Rodríguez was versatile and commercial in his approach, creating music designed to please general audiences rather than tango purists. His tangos, milongas, and particularly his valses remain popular with dancers for their infectious joy and straightforward danceable rhythms.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Lucio Demare (1906-1974) - Composer and Director</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">
              Best known for composing the tango classic &quot;Malena,&quot; Demare was both a talented pianist and orchestra director who created atmospheric, textured arrangements. His orchestra produced a more intimate sound than many of his contemporaries, with thoughtful phrasing and nuanced emotion. Demare&apos;s background as a film composer influenced his tango arrangements, which often have a narrative quality and rich instrumental colors. Though his orchestra recorded less prolifically than others of the Golden Age, his contributions to tango are significant for their musicality and expressive depth. The velvety quality of Demare&apos;s orchestrations creates a sophisticated soundscape that rewards close listening.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Pedro Laurenz (1902-1972) - Bandoneón Virtuoso</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">
              After playing in the legendary Julio De Caro sextet in the 1920s, Laurenz formed his own orchestra that created sophisticated, complex music while maintaining danceability. His exceptional bandoneón playing was the centerpiece of arrangements that featured intricate counterpoint and rich textures. Laurenz&apos;s compositions, including &quot;Milonga de mis Amores&quot; and &quot;Amurado,&quot; have become tango standards. His orchestra had a distinctive walking rhythm that gave his tangos a unique feel, different from both the driving rhythm of D&apos;Arienzo and the lyricism of Di Sarli. Though he recorded less than many of his contemporaries, Laurenz&apos;s musical sophistication has made his work highly regarded by tango aficionados.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Angel D&apos;Agostino (1900-1991) - Collaboration with Vargas</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">
              D&apos;Agostino&apos;s piano-led orchestra is best known for its collaboration with singer Angel Vargas, creating a collection of tangos that perfectly balanced rhythm, melody, and lyrical expression. Their partnership (1940-1946) produced music that emphasized clear, crisp rhythms and Vargas&apos; distinctive vocal stylings. D&apos;Agostino&apos;s piano playing provided both rhythmic drive and melodic counterpoint to the vocals. The orchestra maintained a relatively small size, creating an intimate sound where each instrument could be clearly heard. Though less well-known than some larger orchestras, the D&apos;Agostino-Vargas recordings are prized by dancers and collectors for their musicality and authentic tango feeling.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Astor Piazzolla (1921-1992) - Revolutionary Innovator</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1" paragraph>
              Though primarily associated with Nuevo Tango rather than the Golden Age, Piazzolla&apos;s importance in tango&apos;s evolution cannot be overstated. After playing bandoneón in Troilo&apos;s orchestra, Piazzolla revolutionized tango by incorporating elements of jazz and classical music. His compositions expanded tango&apos;s harmonic and rhythmic vocabulary with dissonance, changing time signatures, and extended instrumental techniques. Initially controversial among tango traditionalists, Piazzolla&apos;s music was often considered for listening rather than dancing.
            </Typography>
            <Typography variant="body1">
              Notable works: &quot;Adiós Nonino,&quot; &quot;Libertango,&quot; &quot;Verano Porteño,&quot; &quot;Oblivion&quot;
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Horacio Salgán (1916-2016) - Modernist Composer</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">
              Pushing the boundaries of traditional tango, Salgán developed a highly sophisticated style characterized by complex rhythmic patterns, modern harmonies, and virtuosic arrangements. His piano playing featured percussive techniques, syncopation, and jazz-influenced phrasing that brought new textures to tango. The Quinteto Real, which he co-founded in 1960, showcased his innovative compositions in a chamber music format. Salgán&apos;s work bridged Golden Age tango and Piazzolla&apos;s innovations, maintaining connections to traditional tango while exploring new musical territories. His long life allowed him to influence multiple generations of tango musicians, and compositions like &quot;A Don Agustín Bardi&quot; and &quot;Don Horacio&quot; demonstrate his ability to honor tradition while embracing innovation.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Container>
  );
}