import { StorageAdapter, ThreeJsClientAdapter } from 'core';
import { initializeStorageAdapter } from './initializeStorageAdapter';
import { initializeThreeJsClientAdapter } from './initializeThreeJsClientAdapter';
import App from './App';

initializeStorageAdapter(StorageAdapter.instance);
initializeThreeJsClientAdapter(ThreeJsClientAdapter.instance);

export default App;
