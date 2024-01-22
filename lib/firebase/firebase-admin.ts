import "server-only";

import { cookies } from "next/headers";

import { initializeApp, getApps, cert } from "firebase-admin/app";
import { SessionCookieOptions, UserRecord, getAuth } from "firebase-admin/auth";
import { User } from "firebase/auth";

export const firebaseApp =
  getApps().find((it) => it.name === "firebase-admin-app") ||
  initializeApp(
    {
      credential: cert(
        "lib/my-projects-a1aa5-firebase-adminsdk-mjxsj-b7a30e6ae0.json"
      ),
    },
    "firebase-admin-app"
  );
export const auth = getAuth(firebaseApp);

export async function isUserAuthenticated(
  session: string | undefined = undefined
) {
  const _session = session ?? (await getSession());
  if (!_session) return false;

  try {
    const isRevoked = !(await auth.verifySessionCookie(_session, true));
    return !isRevoked;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export const formatAuthUser = (user: UserRecord) => ({
  uid: user.uid,
  email: user.email,
  photoUrl: user.photoURL,
  displayName: user.displayName,
  emailVerified: user.emailVerified,
});

export interface CUser {
  uid: string;
  email: string | null;
  photoUrl: string | null;
  displayName: string | null;
  emailVerified: boolean;
}

export async function getCurrentUser() {
  const session = await getSession();

  if (!(await isUserAuthenticated(session))) {
    return null;
  }

  const decodedIdToken = await auth.verifySessionCookie(session!);
  const currentUser = await auth.getUser(decodedIdToken.uid);

  return formatAuthUser(currentUser);
}

async function getSession() {
  try {
    return cookies().get("session")?.value;
  } catch (error) {
    return undefined;
  }
}

export async function createSessionCookie(
  idToken: string,
  sessionCookieOptions: SessionCookieOptions
) {
  return auth.createSessionCookie(idToken, sessionCookieOptions);
}

export async function revokeAllSessions(session: string) {
  const decodedIdToken = await auth.verifySessionCookie(session);

  return await auth.revokeRefreshTokens(decodedIdToken.sub);
}
