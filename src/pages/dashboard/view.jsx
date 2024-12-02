import { Helmet } from 'react-helmet-async';

import Dashboard from 'src/sections/dashboard/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>

      <Dashboard />
    </>
  );
}