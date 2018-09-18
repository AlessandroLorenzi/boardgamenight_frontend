
export class Event {
      id: string;
      name: string;
      startdate: string;
      enddate: string;
      tables: Table[];
      org: string;
      image: string;
      place: string;
}

export class Table {
    id: string;
    game: string;
    event_id: string;
    gamers: Gamer[];
}

export class Gamer {
      id: string;
      username: string;
      password: string;
      email: string;
}

export class Notification {
      id: number;
      title: string;
      text: string;
      severity: string;
}
