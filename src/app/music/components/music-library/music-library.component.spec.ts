import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicLibraryComponent } from './music-library.component';

describe('ListenMusicListComponent', () => {
    let component: MusicLibraryComponent;
    let fixture: ComponentFixture<MusicLibraryComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MusicLibraryComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(MusicLibraryComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
