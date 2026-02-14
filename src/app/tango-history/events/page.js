"use client";

import React, { useEffect, useRef } from 'react';
import {
  Container, Typography, Box, Paper, Button, Chip
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';
import Script from 'next/script';

// TimelineJS3 event data - enriched with full descriptions and images
const timelineData = {
  "title": {
    "text": {
      "headline": "Tango History Events",
      "text": "<p>Key moments that shaped tango — shows, films, recordings, political events, and the passing of the masters.</p>"
    }
  },
  "eras": [
    {
      "start_date": { "year": "1880" },
      "end_date": { "year": "1920" },
      "text": { "headline": "Guardia Vieja" }
    },
    {
      "start_date": { "year": "1920" },
      "end_date": { "year": "1935" },
      "text": { "headline": "Guardia Nueva" }
    },
    {
      "start_date": { "year": "1935" },
      "end_date": { "year": "1955" },
      "text": { "headline": "Época de Oro" }
    },
    {
      "start_date": { "year": "1955" },
      "end_date": { "year": "1983" },
      "text": { "headline": "Decadencia" }
    },
    {
      "start_date": { "year": "1983" },
      "end_date": { "year": "1995" },
      "text": { "headline": "Renacimiento" }
    },
    {
      "start_date": { "year": "1995" },
      "end_date": { "year": "2010" },
      "text": { "headline": "Investigación" }
    },
    {
      "start_date": { "year": "2010" },
      "end_date": { "year": "2030" },
      "text": { "headline": "Neo-Traditional" }
    }
  ],
  "events": [
    {
      "start_date": { "year": "1906" },
      "text": {
        "headline": "First Recordings",
        "text": "<p>Between 1905 and 1910, tango leapt from the streets of Buenos Aires onto wax cylinders and shellac discs. The pivotal figure was <a href='https://en.wikipedia.org/wiki/%C3%81ngel_Villoldo'>Ángel Villoldo</a> (1861–1919), a former typographer, tram driver, and circus clown who became 'the father of tango song.' His iconic <a href='https://en.wikipedia.org/wiki/El_Choclo'>El Choclo</a> (1903) was first recorded no later than 1906 by the Victor Argentine Orchestra in Philadelphia — because at that time, there were no recording studios in Argentina.</p><p>These first recordings were transformative. Before the phonograph, tango existed only in the moment — played by flute, guitar, and violin trios in port neighborhoods, often in bars and brothels. Once captured on disc, the music could cross oceans. Within a few years, 'El Choclo' was being performed across Europe and North America.</p>"
      },
      "media": {
        "url": "https://upload.wikimedia.org/wikipedia/commons/f/f8/El_choclo.jpg",
        "credit": "\"El Choclo\" sheet music cover. Photo by Schorle, 2008. Wikimedia Commons, CC BY-SA 3.0."
      },
      "group": "Recording"
    },
    {
      "start_date": { "year": "1912" },
      "end_date": { "year": "1914" },
      "text": {
        "headline": "Paris Tangomania",
        "text": "<p>By 1912, tango had exploded from Buenos Aires into the salons of Paris, igniting what the press dubbed 'Tangomania.' <em>Tango Teas</em> and <em>Tango Cafés</em> opened across Paris, London, Berlin, and Shanghai. The craze spawned an entire fashion industry: tango corsets, tango shoes, tango-orange as a fashionable color, and slit skirts designed for dramatic leg movements.</p><p>The backlash was fierce: in 1913, Pope Pius X declared tango immoral. Kaiser Wilhelm II forbade officers to dance it in uniform, Queen Mary expressed disapproval, and the Archbishop of Paris banned tango teachers. The scandal only fueled popularity — the forbidden fruit effect was powerful. World War I eventually cooled the fever, but tango had permanently embedded itself in European culture.</p>"
      },
      "media": {
        "url": "https://upload.wikimedia.org/wikipedia/commons/4/4e/Le_tango_argentin_-_chanson_danse_chant%C3%A9_et_dans%C3%A9_par_Mme_Mad_Brenda_et_Monsieur_Carlus_%C3%A0_l%27Olympia_%28illustration_L%C3%A9on_Pousthomis%29_%28M%C3%A9diHAL_510952%29.jpg",
        "credit": "\"Le tango argentin\" — sheet music cover illustrated by Léon Pousthomis, c. 1913. Wikimedia Commons, public domain."
      },
      "group": "Cultural"
    },
    {
      "start_date": { "year": "1935", "month": "6", "day": "24" },
      "text": {
        "headline": "Carlos Gardel Dies",
        "text": "<p>On June 24, 1935, a Ford Trimotor carrying <a href='https://en.wikipedia.org/wiki/Carlos_Gardel'>Carlos Gardel</a> collided with another plane during takeoff at Medellín, Colombia. Gardel — just 44 and at the zenith of his career — was killed, along with his lyricist <a href='https://en.wikipedia.org/wiki/Alfredo_Le_Pera'>Alfredo Le Pera</a> and several others. The news paralyzed Latin America. Millions went into mourning. His body was transported through New York and Rio de Janeiro, drawing tens of thousands to his funeral in Buenos Aires.</p><p>Born in Toulouse, France, in 1890, Gardel arrived in Buenos Aires as a toddler and grew up in Abasto. His 1917 recording of <em>Mi noche triste</em> is widely considered the birth of the tango-canción. His warm baritone, dramatic phrasing, and charisma made him a superstar from Buenos Aires to Paris. His most famous songs — <a href='https://en.wikipedia.org/wiki/El_d%C3%ADa_que_me_quieras_(song)'>El día que me quieras</a>, <a href='https://en.wikipedia.org/wiki/Volver_(song)'>Volver</a>, <a href='https://en.wikipedia.org/wiki/Por_una_cabeza'>Por una cabeza</a> — remain staples nearly a century later. The Argentine saying <em>'Gardel cada día canta mejor'</em> ('Gardel sings better every day') captures how his legend has only grown.</p>"
      },
      "media": {
        "url": "https://upload.wikimedia.org/wikipedia/commons/9/99/Carlos_Gardel_Rubias_de_New_York.JPG",
        "credit": "Carlos Gardel during filming of Rubias de New York, c. 1934. Wikimedia Commons, public domain."
      },
      "group": "Death"
    },
    {
      "start_date": { "year": "1935" },
      "text": {
        "headline": "D'Arienzo Revolution",
        "text": "<p>After Gardel's death, complex orchestral tango meant for listening was drifting away from the dance floor. Young people dismissed it as 'music for old people.' Enter <a href='https://en.wikipedia.org/wiki/Juan_d%27Arienzo'>Juan D'Arienzo</a> (1900–1976), who would be crowned 'El Rey del Compás' — The King of the Beat. In 1935, pianist <a href='https://en.wikipedia.org/wiki/Rodolfo_Biagi'>Rodolfo Biagi</a> suggested shifting to the driving 2/4 rhythm of the old-guard milonga. The effect was electrifying. D'Arienzo's staccato, percussive style was impossible to sit still to.</p><p>D'Arienzo's revolution saved social tango dancing itself. His approach brought young people streaming back to the milongas and united all social classes on the dance floor. His success directly catalyzed tango's Golden Age (1935–1955), inspiring Troilo, Di Sarli, and Pugliese to keep the dance rhythm alive. Today, his recordings remain essential in every tango DJ's collection.</p>"
      },
      "group": "Music"
    },
    {
      "start_date": { "year": "1955", "month": "9" },
      "text": {
        "headline": "Perón Overthrown",
        "text": "<p>On September 16, 1955, the <a href='https://en.wikipedia.org/wiki/Revolución_Libertadora'>Revolución Libertadora</a> toppled President <a href='https://en.wikipedia.org/wiki/Juan_Per%C3%B3n'>Juan Domingo Perón</a>, bringing an abrupt end to Argentina's Golden Age of Tango. The coup followed the devastating <a href='https://en.wikipedia.org/wiki/Bombing_of_Plaza_de_Mayo'>bombing of Plaza de Mayo</a> on June 16 that killed over 300 civilians.</p><p>Under Perón, tango had experienced an extraordinary golden age — he promoted tango as authentic Argentine expression. The new junta reversed all of this: tango songs with Peronist sympathies or <a href='https://en.wikipedia.org/wiki/Lunfardo'>lunfardo</a> lyrics were censored. Laws banning minors from nightclubs were selectively applied to milongas while rock clubs stayed open. As one historian noted: 'If you were 18 in 1955, you probably learned tango well. If you were 13, not at all.' The mentor system was dismantled, and tango was driven underground for nearly three decades.</p>"
      },
      "media": {
        "url": "https://upload.wikimedia.org/wikipedia/commons/4/4c/Plaza-Mayo-bombardeo-1955.JPG",
        "credit": "Aftermath of the 1955 bombing of Plaza de Mayo, Buenos Aires. Wikimedia Commons, public domain."
      },
      "group": "Political"
    },
    {
      "start_date": { "year": "1976" },
      "end_date": { "year": "1983" },
      "text": {
        "headline": "Dirty War / Guerra Sucia",
        "text": "<p>On March 24, 1976, a military junta launched the <a href='https://en.wikipedia.org/wiki/Dirty_War'>Dirty War</a>. The regime 'disappeared' an estimated 22,000 to 30,000 people — kidnapped, tortured, and killed. Curfews (often 10 p.m.), bans on gatherings, and pervasive fear ruled Argentina until 1983.</p><p>For tango, the Dirty War was existentially devastating — though never formally 'banned.' Curfews killed nightlife, prohibition on gatherings made milongas impossible. The roughly 200 milongas at tango's peak were reduced to a handful of clandestine gatherings. The <a href='https://en.wikipedia.org/wiki/Mothers_of_the_Plaza_de_Mayo'>Mothers of the Plaza de Mayo</a> became the most powerful symbol of resistance. By the time the dictatorship fell, an entire generation had grown up without tango.</p>"
      },
      "media": {
        "url": "https://upload.wikimedia.org/wikipedia/commons/b/bd/M%C3%A3es_da_Pra%C3%A7a_de_Maio2.JPG",
        "credit": "Mothers of the Plaza de Mayo demonstrating in Buenos Aires. Wikimedia Commons, CC BY 3.0."
      },
      "group": "Political"
    },
    {
      "start_date": { "year": "1983", "month": "11", "day": "11" },
      "text": {
        "headline": "'Tango Argentino' Paris Premiere",
        "text": "<p>On November 11, 1983, at the Théâtre du Châtelet during the <a href='https://en.wikipedia.org/wiki/Festival_d%27Automne'>Festival d'Automne</a> in Paris, <em>Tango Argentino</em> took the stage and changed tango history forever. Created by <a href='https://en.wikipedia.org/wiki/Claudio_Segovia'>Claudio Segovia</a> and Héctor Orezzoli, the cast was extraordinary: <a href='https://en.wikipedia.org/wiki/Juan_Carlos_Copes'>Juan Carlos Copes</a> and <a href='https://en.wikipedia.org/wiki/Mar%C3%ADa_Nieves'>María Nieves</a>, Virulazo and <a href='https://en.wikipedia.org/wiki/Elvira_Santamar%C3%ADa'>Elvira Santamaría</a>, young Pablo Verón, and the <a href='https://en.wikipedia.org/wiki/Sexteto_Mayor'>Sexteto Mayor</a>.</p><p>The impact cannot be overstated. By 1983, tango was all but dead as social dance in Buenos Aires. As poet Enrique Cadícamo said, 'Tango in 1983 was a memory.' The show single-handedly ignited a worldwide renaissance. Cast members began teaching in cities where it toured — Robert Duvall and Mikhail Baryshnikov became students. Milongas sprang up in London, Tokyo, Berlin. If today tango is danced from Verona to Alaska, it is because of <em>Tango Argentino</em>.</p>"
      },
      "media": {
        "url": "https://upload.wikimedia.org/wikipedia/commons/1/14/Tango_au01.JPG",
        "credit": "Tango dancers in San Telmo, Buenos Aires. Photo by Anandajoti, public domain, via Wikimedia Commons."
      },
      "group": "Show"
    },
    {
      "start_date": { "year": "1983", "month": "12" },
      "text": {
        "headline": "Democracy Returns",
        "text": "<p>On October 30, 1983, <a href='https://en.wikipedia.org/wiki/Ra%C3%BAl_Alfons%C3%ADn'>Raúl Alfonsín</a> won Argentina's first free elections in a decade. Inaugurated December 10, 1983 (now Argentina's Democracy Day), civilian government brought immediate end to curfews, gathering bans, and the culture of fear. That same autumn, just weeks before Alfonsín's election, <em>Tango Argentino</em> premiered in Paris — a historic coincidence.</p><p>The simultaneous return of democracy and <em>Tango Argentino</em>'s success ignited a tango renaissance. Surviving milongueros — many now in their 60s and 70s, having danced only in secret for decades — began to emerge and dance publicly again. A younger generation sought them out, hungry to reclaim stolen cultural heritage. The Alfonsín government established cultural programs supporting tango's revival as part of rebuilding Argentine national identity.</p>"
      },
      "media": {
        "url": "https://upload.wikimedia.org/wikipedia/commons/e/e3/Argentina.RaulAlfonsin.01.jpg",
        "credit": "President Raúl Alfonsín. Photo by Roosewelt Pinheiro/Agência Brasil, CC BY 3.0 BR."
      },
      "group": "Political"
    },
    {
      "start_date": { "year": "1985" },
      "text": {
        "headline": "'Tango Argentino' Broadway",
        "text": "<p>The show transferred to <a href='https://en.wikipedia.org/wiki/Tango_Argentino_(musical)'>Broadway</a> at the Mark Hellinger Theatre on October 9, 1985, running for 199 performances and earning three Tony nominations including Best Musical. The show toured the world for over 15 years and had a Broadway revival in 1999–2000.</p><p>America discovered authentic Argentine tango — nothing like the rose-in-teeth ballroom caricature. The demand for authentic instruction exploded. In 2011, the Argentine Congress officially honored Claudio Segovia 'for his contribution to the dissemination and permanence of tango.'</p>"
      },
      "group": "Show"
    },
    {
      "start_date": { "year": "1987", "month": "5", "day": "11" },
      "text": {
        "headline": "Finito Dies",
        "text": "<p>Ramón 'Finito' Rivera died on May 11, 1987, at approximately 55 years of age. Born in La Paternal, Finito began dancing at Club Floreal and became one of the most admired social dancers of his era. He danced with his wife María Teresa and appeared in two films: <em>Tango, Bayle Nuestro</em> and <em>Tango Bar</em>. Robert Duvall was so dazzled watching him dance that he proposed featuring Finito in an upcoming film — but when Duvall called to confirm, he learned Finito had already passed.</p><p>Finito was widely considered the best social dancer of the 1980s revival. Carlos Estévez 'Petróleo' described his art: <em>'His dance was a conjunction of forms in search of beauty... He was a great one without intending to be, because he dominated spaces without showy displays.'</em> Oscar Coria noted that <em>'Finito's style was lost; now there is no one who dances like him.'</em> As Finito himself said: <em>'Tango has to give you goosebumps, brother; if not, it doesn't work.'</em></p>"
      },
      "group": "Death"
    },
    {
      "start_date": { "year": "1994" },
      "text": {
        "headline": "Graciela's Followers Technique",
        "text": "<p>Graciela González creates the first systematic 'Followers Technique' seminar — a pedagogical revolution that recognized the follower's role as an art form requiring its own dedicated training.</p>"
      },
      "group": "Cultural"
    },
    {
      "start_date": { "year": "1994" },
      "end_date": { "year": "1997" },
      "text": {
        "headline": "Tete & Pina Bausch",
        "text": "<p>Legendary German choreographer <a href='https://en.wikipedia.org/wiki/Pina_Bausch'>Pina Bausch</a> invited Tete Rusconi to dance in her Tanztheater Wuppertal production <em>Nur Du</em> (Only You). He performed for three consecutive years and was invited for the 25th anniversary, where he danced with Pina herself. Bausch reportedly told colleagues that Tete had 'an orchestra in his head.'</p>"
      },
      "group": "Show"
    },
    {
      "start_date": { "year": "1996", "month": "4", "day": "29" },
      "text": {
        "headline": "Pepito Avellaneda Dies",
        "text": "<p>José Domingo Monteleone, known as 'Pepito Avellaneda,' died on April 29, 1996, at age 65. Born in <a href='https://en.wikipedia.org/wiki/Avellaneda,_Buenos_Aires'>Avellaneda</a>, he was self-taught — sneaking from his family's pizza shop at age 12 to dance milonga at local carnivals. He taught internationally across Europe, Canada, and the US.</p><p>Pepito earned the title <em>'The King of the Milonga'</em> — referring to the fast, rhythmic <a href='https://en.wikipedia.org/wiki/Milonga_(dance)'>milonga dance</a>, which he elevated to art. His style was <em>orillero</em> — the playful tango of outer neighborhoods. <em>'I'm the creator of all the steps I play,'</em> he said. <em>'They spring out from me.'</em> A milonga event named in his honor keeps his memory alive in Buenos Aires. He was colorful and tireless: <em>'Dancing is everything for me. I feed on it. I dance and I am nurtured.'</em></p>"
      },
      "group": "Death"
    },
    {
      "start_date": { "year": "1997" },
      "text": {
        "headline": "'The Tango Lesson' Released",
        "text": "<p><em><a href='https://en.wikipedia.org/wiki/The_Tango_Lesson'>The Tango Lesson</a></em> (1997) is a semi-autobiographical drama by British filmmaker <a href='https://en.wikipedia.org/wiki/Sally_Potter'>Sally Potter</a>, who also stars. The film follows Sally, a filmmaker struggling with a screenplay, who discovers a tango performance by Pablo Verón in Paris. She asks him for lessons, and their partnership develops into a complex negotiation of art, ego, and control. Sally travels to Buenos Aires, studying with <a href='https://en.wikipedia.org/wiki/Gustavo_Naveira'>Gustavo Naveira</a> and Fabián Salas (both appearing in the film).</p><p>The film brought tango to mainstream art-house audiences. Its portrayal of the milonga world — the cabeceo, the codes, the debates about leading and following — introduced countless viewers to authentic tango culture beyond clichés. It brought real tango figures to international attention, and Verón became one of the most sought-after performers worldwide.</p>"
      },
      "group": "Film"
    },
    {
      "start_date": { "year": "1998" },
      "text": {
        "headline": "Carlos Saura's 'Tango'",
        "text": "<p>Spanish-Argentine film brings visual splendor to tango on the big screen, further cementing tango's cultural legitimacy in global cinema.</p>"
      },
      "group": "Film"
    },
    {
      "start_date": { "year": "2001" },
      "end_date": { "year": "2002" },
      "text": {
        "headline": "Argentine Economic Crisis",
        "text": "<p>In December 2001, Argentina's economy imploded in <a href='https://en.wikipedia.org/wiki/1998%E2%80%932002_Argentine_great_depression'><em>La Crisis</em></a>. The government froze bank accounts, limiting withdrawals to $250/week. On December 19–20, massive <a href='https://en.wikipedia.org/wiki/December_2001_riots_in_Argentina'>riots erupted</a> — 39 killed as police clashed with crowds banging pots in the famous <em>cacerolazos</em>. President de la Rúa fled by helicopter. Argentina defaulted on $93 billion — then the largest sovereign default in history. Unemployment soared above 23%.</p><p>The crisis paradoxically transformed tango. Many of Buenos Aires' best teachers — unable to earn a living with the peso at 4:1 — emigrated to teach in Europe, the US, and Japan, seeding communities worldwide. When conditions stabilized, the devalued peso made Buenos Aires astonishingly cheap, sparking a boom in tango tourism. This cycle — teachers spreading tango globally, then students pouring into Buenos Aires — created the worldwide ecosystem that exists today.</p>"
      },
      "media": {
        "url": "https://upload.wikimedia.org/wikipedia/commons/4/4e/Cacerolazo_Argentina_2001-2002.jpg",
        "credit": "Cacerolazo protests during 2001 Argentine economic crisis. Wikimedia Commons, GNU FDL / CC BY-SA 3.0."
      },
      "group": "Political"
    },
    {
      "start_date": { "year": "2003" },
      "text": {
        "headline": "First Campeonato Mundial",
        "text": "<p>In 2003, Buenos Aires launched the first <a href='https://en.wikipedia.org/wiki/World_tango_dance_tournament'>Campeonato Mundial de Baile de Tango</a> (World Tango Championship). Two categories remain today: <strong>Tango de Pista</strong> (couples dance simultaneously to unfamiliar music, maintaining embrace, moving counterclockwise as in a traditional milonga) and <strong>Tango Escenario</strong> (solo choreographed routines with lifts and theatrical expression). In 2013, rules expanded to allow same-gender couples.</p><p>Many traditional milongueros viewed the competition as antithetical to tango's essence — improvisation over scores, connection over judges. Despite tensions, the Mundial has profoundly shaped global tango. Winning opens doors to international careers. By 2024, over 750 couples from 53 countries competed. Qualifying rounds are held worldwide — Tokyo, Moscow, London, New York, Istanbul — creating a truly global infrastructure.</p>"
      },
      "media": {
        "url": "https://upload.wikimedia.org/wikipedia/commons/e/e3/Buenos_Aires_Festival_y_Mundial_de_Tango.jpg",
        "credit": "Buenos Aires Festival y Mundial de Tango. Photo by Gobierno de la Ciudad de Buenos Aires, CC BY 2.0."
      },
      "group": "Cultural"
    },
    {
      "start_date": { "year": "2005", "month": "7", "day": "1" },
      "text": {
        "headline": "Carlos Gavito Dies",
        "text": "<p>Carlos Eduardo Gavito (April 27, 1942 – July 1, 2005) grew up in Avellaneda, attending tango <em>prácticas</em> where older men practiced with young boys. His rise to fame came when he joined <a href='https://en.wikipedia.org/wiki/Forever_Tango'><em>Forever Tango</em></a>, opening on Broadway in 1997 and seen by more than five million people. Dancing with Marcela Durán, Gavito became the show's breakout star. He died of cancer in Buenos Aires, buried at <a href='https://en.wikipedia.org/wiki/La_Chacarita_Cemetery'>La Chacarita Cemetery</a>.</p><p>Gavito's style was famously minimalist: dramatic pauses and slow movements to let music breathe. He compared savoring each step to a child licking ice cream slowly to make it last. His philosophy: tango is not about steps but connection — 'a three-minute commitment.' He taught that the man who doesn't make the woman look like a queen will never be king. <em>Forever Tango</em> introduced millions to Argentine tango and inspired a generation.</p>"
      },
      "media": {
        "url": "https://upload.wikimedia.org/wikipedia/commons/d/d4/Gavito_and_Plazaola%2C_Stockholm_Workshop%2C_2004-08-27_b.jpg",
        "credit": "Carlos Gavito at a Stockholm workshop, August 27, 2004. Wikimedia Commons."
      },
      "group": "Death"
    },
    {
      "start_date": { "year": "2006", "month": "5", "day": "21" },
      "text": {
        "headline": "Ricardo Vidort Dies",
        "text": "<p>Ricardo Vidort (August 30, 1929 – May 21, 2006) was known as 'The Last Compadrito' — a title from Rick McGarrey of <a href='https://www.tangoandchaos.org/'>Tango and Chaos</a>. The <em>compadrito</em> was a distinctly porteño figure: street-smart, sharply dressed, from the <em>arrabal</em>, whose identity was wrapped up in milonga codes — elegance, bravado, unshakeable commitment to the dance. He died of cancer in Santa Fe, New Mexico, with his partner Ewa Kiełczewska caring for him to the end.</p><p>Vidort's style was 'walking with feeling.' He emphasized that the walk (<em>el caminar</em>) was tango's most essential element. His embrace was close and intimate. He famously said: 'No one can teach you feeling. I can show how to be better through movement, but you dance your way, your feeling, and your thoughts. You can copy my steps but you can't copy what I feel.' When he entered a milonga in his sharp suit and jaunty stride, everyone knew they were in a real milonga.</p>"
      },
      "group": "Death"
    },
    {
      "start_date": { "year": "2007", "month": "6", "day": "2" },
      "text": {
        "headline": "Gerardo Portalea Dies",
        "text": "<p>Gerardo Portalea (August 27, 1928 – early June 2007) was a pillar of the <a href='https://en.wikipedia.org/wiki/Argentine_tango'>Villa Urquiza style</a> — elegant, upright posture; smooth, precise walking; a closed embrace that opens slightly for turns. A gravedigger at San Martín cemetery by trade, he described himself simply as a <em>bailarín de patio</em> (courtyard dancer).</p><p>He had stayed away from milongas for seventeen years during severe depression, returning only on a psychiatrist's advice — and his comeback anticipated tango's own resurgence. He rarely taught formally and refused to dance professionally, saying he would only dance when an orchestra truly inspired him. His <em>cadencia</em> (rhythmic flow) was legendary: Pupi Castello himself said Portalea 'does not have a great variation of steps, but he has an impressive <em>cadencia</em>.'</p>"
      },
      "group": "Death"
    },
    {
      "start_date": { "year": "2007", "month": "7", "day": "23" },
      "text": {
        "headline": "Pupi Castello Dies",
        "text": "<p>Ernesto Norberto 'Pupi' Castello (c. 1935 – July 23, 2007) was another pillar of Villa Urquiza, dying just weeks after Portalea. A charismatic night-owl — warm, funny, voice raspy from cigarettes and late hours — he had danced since age 15, partnered with Graciela González for 19 years, and appeared in the 2005 BBC documentary <em>La Confitería Ideal: The Tango Salon</em>.</p><p>An anecdote recounts that even during his final hospital stay, Pupi was teaching tango to the doctors and nurses. Known as 'El Maestro de los Maestros,' his students became the next generation of masters. Losing both him and Portalea within weeks was a devastating blow, severing yet another living link to tango's golden-age roots in the <em>barrios</em>.</p>"
      },
      "group": "Death"
    },
    {
      "start_date": { "year": "2009", "month": "9", "day": "30" },
      "text": {
        "headline": "UNESCO Heritage",
        "text": "<p>On September 30, 2009, in Abu Dhabi, <a href='https://en.wikipedia.org/wiki/UNESCO'>UNESCO</a> inscribed tango on the <a href='https://ich.unesco.org/en/RL/tango-00258'>Representative List of the Intangible Cultural Heritage of Humanity</a>. The inscription was a joint nomination by Argentina and Uruguay — two nations that had disputed tango's origins but united to protect their shared treasure. The recognition encompassed the full 'symbolic universe': music, dance, poetry, song, social customs, codes (like the <em>cabeceo</em>), and oral traditions.</p><p>The recognition was a watershed moment. It formally acknowledged that tango embodies 'diversity and cultural dialogue,' practiced in traditional Buenos Aires halls while adapting worldwide. Both countries committed to safeguarding plans, including training centers. The recognition gave tango communities — musicians, dancers, composers, teachers — formal status as cultural bearers. It bolstered cultural tourism, strengthened tango education, and raised global awareness that tango is living heritage reflecting the soul of the Río de la Plata.</p>"
      },
      "media": {
        "url": "https://upload.wikimedia.org/wikipedia/commons/4/49/Buenos_Aires_-_Tango_dancers_in_Sunderland_Club_-_7090.jpg",
        "credit": "Tango dancers at the Sunderland Club, Buenos Aires. Photo by Jorge Royan, CC BY-SA 3.0."
      },
      "group": "Cultural"
    },
    {
      "start_date": { "year": "2010", "month": "1", "day": "7" },
      "text": {
        "headline": "Tete Rusconi Dies",
        "text": "<p>Pedro Alberto 'Tete' Rusconi (January 9, 1936 – January 7, 2010) passed away just two days before his 74th birthday. Born in Pompeya and living his final years in Almagro, Tete was a towering figure in social tango. With partner Silvia Ceriani, he became one of the first to teach close-embrace tango in the US around 1993–94. <a href='https://en.wikipedia.org/wiki/Milonguero_style'>Susana Miller</a> coined 'milonguero style' while working as his assistant.</p><p>Tete's significance cannot be overstated. He was 'THE milonguero for many generations of social dancers.' His style was full of charisma, mischief, and deep musicality. He famously said: <em>'Dance the music. Because the music is the tango.'</em> In a letter distributed at milongas, he urged organizers to 'bring the best dancers and teachers to teach as tango ought to be taught. Without the music, the cadence, posture, and balance, the steps are nothing.' <a href='https://en.wikipedia.org/wiki/Pina_Bausch'>Pina Bausch</a> said he had 'an orchestra in his head.'</p>"
      },
      "group": "Death"
    },
    {
      "start_date": { "year": "2018", "month": "11", "day": "21" },
      "text": {
        "headline": "Roberto Segarra Dies",
        "text": "<p>Roberto Segarra dies at 98. One of the last milongueros who danced through the Golden Age, Decline, and Revival — a living bridge across tango's entire modern history.</p>"
      },
      "group": "Death"
    },
    {
      "start_date": { "year": "2020", "month": "3" },
      "end_date": { "year": "2022" },
      "text": {
        "headline": "COVID-19 Pandemic",
        "text": "<p>On March 8, 2020, Buenos Aires' milongas closed as Argentina imposed one of the world's strictest COVID-19 lockdowns. For tango — defined by the <em>abrazo</em> (embrace) and intimate contact — the pandemic was an existential threat. Argentina's borders sealed, milongas barred for 18 months. Of approximately 200 milongas, 40-50 closed permanently. Of roughly 40 tango shoe companies, only about 12 survived.</p><p>The human toll was profound. 'Many older people in the tango milieu have died of sadness more than of COVID, for not being able to dance,' said milonguera María Campos. <a href='https://en.wikipedia.org/wiki/Juan_Carlos_Copes'>Juan Carlos Copes</a> — who had starred in the 1983 <em>Tango Argentino</em> that sparked the worldwide revival — died of COVID-19 on January 16, 2021. The community adapted: online classes, virtual championships, defiant outdoor dancing at the Obelisco. As venue owner Daniel Rezk described hearing tango through his loudspeakers again: 'It was like feeling alive.' The post-pandemic world is rebuilding, but what was lost — the elders, the venues, the continuity — can never be fully restored.</p>"
      },
      "group": "Political"
    }
  ]
};

export default function EventsTimelinePage() {
  const timelineRef = useRef(null);
  const [timelineLoaded, setTimelineLoaded] = React.useState(false);

  useEffect(() => {
    if (timelineLoaded && timelineRef.current && window.TL) {
      new window.TL.Timeline('timeline-embed', timelineData, {
        hash_bookmark: true,
        initial_zoom: 2,
        scale_factor: 2,
        timenav_position: 'bottom',
        optimal_tick_width: 100
      });
    }
  }, [timelineLoaded]);

  return (
    <>
      {/* TimelineJS CSS */}
      <link
        rel="stylesheet"
        href="https://cdn.knightlab.com/libs/timeline3/latest/css/timeline.css"
      />

      {/* TimelineJS Script */}
      <Script
        src="https://cdn.knightlab.com/libs/timeline3/latest/js/timeline.js"
        onLoad={() => setTimelineLoaded(true)}
      />

      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Button component={Link} href="/tango-history" startIcon={<ArrowBackIcon />} sx={{ mb: 2 }}>
          Back to Timeline
        </Button>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h3" component="h1" gutterBottom sx={{ color: '#e91e63' }}>
            Key Events in Tango History
          </Typography>
          <Typography variant="h5" color="text.secondary" gutterBottom>
            Eventos Importantes en la Historia del Tango
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Navigate through the defining moments — scroll horizontally or use the timeline below.
          </Typography>
        </Box>

        {/* Event type legend */}
        <Box sx={{ mb: 3, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          <Chip label="Show" size="small" sx={{ bgcolor: '#9c27b0', color: 'white' }} />
          <Chip label="Film" size="small" sx={{ bgcolor: '#2196f3', color: 'white' }} />
          <Chip label="Music" size="small" sx={{ bgcolor: '#ff9800', color: 'white' }} />
          <Chip label="Political" size="small" sx={{ bgcolor: '#f44336', color: 'white' }} />
          <Chip label="Cultural" size="small" sx={{ bgcolor: '#4caf50', color: 'white' }} />
          <Chip label="Death" size="small" sx={{ bgcolor: '#607d8b', color: 'white' }} />
          <Chip label="Recording" size="small" sx={{ bgcolor: '#795548', color: 'white' }} />
        </Box>

        {/* TimelineJS Container */}
        <Paper sx={{ overflow: 'hidden', mb: 4 }}>
          <div
            id="timeline-embed"
            ref={timelineRef}
            style={{ width: '100%', height: '600px' }}
          />
          {!timelineLoaded && (
            <Box sx={{ p: 4, textAlign: 'center' }}>
              <Typography>Loading timeline...</Typography>
            </Box>
          )}
        </Paper>

        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>Related Pages</Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            <Button component={Link} href="/tango-history/dancers" variant="outlined">
              Dancers Timeline
            </Button>
            <Button component={Link} href="/tango-history/argentina" variant="outlined">
              Argentina Timeline
            </Button>
            <Button component={Link} href="/tango-history" variant="outlined">
              All Timelines
            </Button>
          </Box>
        </Paper>
      </Container>
    </>
  );
}
