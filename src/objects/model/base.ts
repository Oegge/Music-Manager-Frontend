import { FormControl } from '@angular/forms';
import { Campaign } from '../dto/base';

export interface Song {
    file: File;
    title: string;
    selectedTagsControl: FormControl;
    tagSearchControl: FormControl;
    tags: string[];
    campaigns: Campaign[];
}
