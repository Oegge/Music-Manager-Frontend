import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkUploadSongsComponent } from './bulk-upload-songs.component';

describe('BulkUploadSongsComponent', () => {
    let component: BulkUploadSongsComponent;
    let fixture: ComponentFixture<BulkUploadSongsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [BulkUploadSongsComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(BulkUploadSongsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
