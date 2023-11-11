export interface SportigoUser {
  status: string;
  member: Member;
  code?: number;
}

interface Member {
  id: number;
  appToken: string;
  reminderMail: boolean;
  domain: string;
  logoBlack: string;
  logoWhite: string;
  onlyQrcode: boolean;
  alerts: any[]; // Replace 'any' with a more specific type if possible
  unreadNews: number;
  regulationUrl: string | null;
  hideName: boolean;
  scanAccess: boolean;
  bluetoothDetect: boolean;
  qrcodeTurning: boolean;
  qrcodeTurningDelay: string | null;
  buy: boolean;
  showPart: boolean;
  name: string;
  firstname: string;
  lastname: string;
  picture: string;
  email: string;
  gender: string;
  address: string | null;
  phone: string;
}

export default async function getUserByToken(token: string): Promise<SportigoUser> {
  const res = await fetch(
    "https://nrfight.app.sportigo.fr/api/sportigo/member",
    {
      method: "GET",
      headers: { "Sportigo-Token": token },
    }
  );

  const data = await res.json();

  return data;
}
