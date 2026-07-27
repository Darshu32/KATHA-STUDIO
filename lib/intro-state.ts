/* Session-scoped flag for the homepage intro "door".
 *
 * It lives in its own tiny module (rather than inside site-experience.tsx) so
 * interior pages can mark the intro as already seen — without pulling the heavy
 * homepage bundle. The flag survives client-side navigation, so returning to
 * "/" from anywhere inside the site skips the door and lands straight on the
 * carousel. It resets on a hard reload, so a genuine first arrival at the
 * homepage still gets the intro. */
let introSeen = false;

export function markIntroSeen() {
  introSeen = true;
}

export function hasIntroBeenSeen() {
  return introSeen;
}
