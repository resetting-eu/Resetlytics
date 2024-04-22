import { Typography } from '@mui/material';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Resetlytics | Home',
	description: 'Resetlytics home page',
};

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h4
       className="head_text text-res_blue text-center">
        RESETTING
        &nbsp;
      </h4>
      <Typography variant="h6" gutterBottom sx={{ mx:6, my:2 }}>
        European Project supported by the European Union 
        for the Relaunch of European Smart and Sustainable Tourism 
        through Digitalization and Innovative Technologies.
      </Typography>
      
      <Typography align='justify' variant="h6" sx={{ mx:6, my:2 }}>
        Aims to improve the quality of the travel experience, support the decarbonization 
        of the tourism industry, and to promote more inclusive economic growth - not only for 
        small and medium enterprises but also for local people in the destinations.
        </Typography>
    </section>
  )
}

export default Home