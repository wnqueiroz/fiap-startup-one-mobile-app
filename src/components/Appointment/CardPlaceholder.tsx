import React from 'react';

import { Fade, Placeholder, PlaceholderLine } from 'rn-placeholder';

export const AppointmentCardPlaceholder: React.FC = () => (
  <Placeholder
    Animation={Fade}
  >
    <PlaceholderLine style={{ marginBottom: 20 }} />
    <PlaceholderLine width={80} />
    <PlaceholderLine />
    <PlaceholderLine width={30} />
    <PlaceholderLine width={80} height={48} style={{ alignSelf: 'center' }} />
  </Placeholder>
);
