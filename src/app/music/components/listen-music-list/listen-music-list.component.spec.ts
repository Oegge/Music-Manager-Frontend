import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListenMusicListComponent } from './listen-music-list.component';

describe('ListenMusicListComponent', () => {
    let component: ListenMusicListComponent;
    let fixture: ComponentFixture<ListenMusicListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ListenMusicListComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ListenMusicListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
