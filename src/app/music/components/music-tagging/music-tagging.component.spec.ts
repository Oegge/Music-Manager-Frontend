import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicTaggingComponent } from './music-tagging.component';

describe('MusicListComponent', () => {
    let component: MusicTaggingComponent;
    let fixture: ComponentFixture<MusicTaggingComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MusicTaggingComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(MusicTaggingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
