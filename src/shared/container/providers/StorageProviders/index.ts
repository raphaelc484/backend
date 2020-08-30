import { container } from 'tsyringe';

import IStorageProviders from './models/IStorageProviders';

import DiskStorageProvider from './implementations/DiskStorageProvider';

const providers = {
  disk: DiskStorageProvider,
};

container.registerSingleton<IStorageProviders>(
  'StorageProvider',
  providers.disk,
);
