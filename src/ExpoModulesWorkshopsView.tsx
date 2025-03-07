import { requireNativeView } from 'expo';
import * as React from 'react';

import { ExpoModulesWorkshopsViewProps } from './ExpoModulesWorkshops.types';

const NativeView: React.ComponentType<ExpoModulesWorkshopsViewProps> =
  requireNativeView('ExpoModulesWorkshops');

export default function ExpoModulesWorkshopsView(props: ExpoModulesWorkshopsViewProps) {
  return <NativeView {...props} />;
}
