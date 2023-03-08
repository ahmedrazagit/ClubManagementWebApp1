declare const VERSION: string;
declare const SERVER_API_URL: string;
declare const DEVELOPMENT: string;
declare const I18N_HASH: string;

declare module '*.json' {
  const value: any;
  export default value;
}

/// <reference types="react-scripts" />
declare module '*.mp3'; // '*.wav' if you're using wav format
