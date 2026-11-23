# Changelog

## Unreleased

### Changed

- Login notices distinguish an unregistered UID, an invalid role, other authorization failures, and Google sign-in popup cancellations.
- Authorization now matches the authenticated Firebase UID against the `uid` field in `allowusers`.
- Firestore rules allow reads only for the matching authenticated UID and continue to deny client-side writes.
- Firebase CLI configuration now references `firestore.rules`.
- Login errors are logged to the browser console instead of appearing beside the Google sign-in button.
- The export page displays its header and options immediately, with a spinner during session authorization.

### Security

- Added ignore patterns for local Firebase Functions runtime configuration and private key/certificate files.

### Migration note

- Each authorized `allowusers` document must contain a `uid` string matching the corresponding Firebase Authentication user before UID-based authorization can succeed.
