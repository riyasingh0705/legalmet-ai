// Demo-only session helper. There is no backend; any credentials are accepted.
const KEY = 'legalmet_session';

export function isAuthed() {
  try {
    return sessionStorage.getItem(KEY) === '1';
  } catch {
    return false;
  }
}

export function login() {
  try {
    sessionStorage.setItem(KEY, '1');
  } catch {
    /* storage unavailable: session lasts only for this page load */
  }
}

export function logout() {
  try {
    sessionStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
}
