import { SUID_CHANGE } from '../constants';

export function changeSUID(suid) {
	return {
		type: SUID_CHANGE,
		payload: suid
	}
}