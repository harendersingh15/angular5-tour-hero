import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class MissionService {

    private missionAnnouncedSource = new Subject<string>();
    private missionConfirmedSource = new Subject<String>();

    missionAnnounced$ = this.missionAnnouncedSource.asObservable();
    missionConfirmed$ = this.missionConfirmedSource.asObservable();

    announceMission(mission: string): void {
        this.missionAnnouncedSource.next(mission);
    }

    confirmedMission(astronaut: string): void {
        this.missionConfirmedSource.next(astronaut);

    }
}
