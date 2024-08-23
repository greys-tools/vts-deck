import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// dirname ends up coming from the build/server/chunks folder,
// we want the files folder to be the actual main folder of the interface 
const dir = `${__dirname}/../../..`;
console.log(dir);

export const FILES = dir;

export const apiName = 'VTubeStudioPublicAPI';
export const apiVersion = "1.0";

export const MessageTypes = {
	'auth-token': "AuthenticationTokenRequest",
	'auth': "AuthenticationRequest",
	'get-hotkeys': "HotkeysInCurrentModelRequest",
	'send-hotkeys': "HotkeyTriggerRequest"
}