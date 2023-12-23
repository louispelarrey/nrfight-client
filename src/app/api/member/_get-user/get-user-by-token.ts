export interface SportigoUser {
  status: string;
  member: Member;
  code?: number;
}

interface Reservation {
  id: number;
  type: string;
  eventId: string;
  waitingPosition: number | null;
  discipline: number;
  roomName: string;
  description: string;
  dateStart: string; // Or Date if you prefer Date objects
  dateEnd: string;   // Or Date if you prefer Date objects
  duration: string;  // Assuming duration is a string like "90", change to number if it's numeric
}


interface Member {
  id: number;
  appToken: string;
  reminderMail: boolean;
  domain: string;
  logoBlack: string;
  logoWhite: string;
  onlyQrcode: boolean;
  unreadNews: number;
  regulationUrl: string | null;
  hideName: boolean;
  scanAccess: boolean;
  certifMandatory: boolean;
  certifDate: string | null;
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
  birthdate: string;
  regDate: string;
  scankey: string;
  card: string | null;
  cards: string | null;
  wod: boolean;
  reservations: Reservation[];
  isCoach: boolean;
  programation: string | null;
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
