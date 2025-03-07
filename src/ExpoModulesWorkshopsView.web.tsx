import * as React from 'react';

import { ExpoModulesWorkshopsViewProps } from './ExpoModulesWorkshops.types';

export default function ExpoModulesWorkshopsView(props: ExpoModulesWorkshopsViewProps) {
  return (
    <div>
      <iframe
        style={{ flex: 1 }}
        src={props.url}
        onLoad={() => props.onLoad({ nativeEvent: { url: props.url } })}
      />
    </div>
  );
}
