import { Box } from '@mui/material';
import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';

import { Overlay } from '../../components/overlay/Overlay';
import { useGetCurrentMap } from '../../hooks/data/maps/useGetCurrentMap';
import { getSetup } from '../../hooks/data/setup/useGetSetup';
import { AppNavigation } from '../../lib/navigation';

export async function getServerSideProps() {
  // Get the setup data from the database
  const setup = await getSetup();

  // Render normally if the server can't be reached
  if (!setup) return { props: {} };

  // Redirect to the setup page if the setup is not completed
  if (!setup.completed) return { redirect: { destination: AppNavigation.Setup } };

  return { props: {} };
}

const Canvas = dynamic(() => import('../../components/canvas/Canvas'), { ssr: false });

const MapId: NextPage = () => {
  const { data: map } = useGetCurrentMap();

  return (
    <>
      <Head>
        <title>{map ? `${map.name} · Tarrasque App` : 'Tarrasque App'}</title>
      </Head>

      <Box sx={{ position: 'fixed', top: 0, left: 0 }}>
        <Canvas />
        <Overlay />
      </Box>
    </>
  );
};

export default MapId;
