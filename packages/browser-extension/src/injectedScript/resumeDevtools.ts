import { THREE_DEVTOOLS_RESUME_EVENT_TYPE } from '../types';

// eslint-disable-next-line no-underscore-dangle
window.__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(THREE_DEVTOOLS_RESUME_EVENT_TYPE));
