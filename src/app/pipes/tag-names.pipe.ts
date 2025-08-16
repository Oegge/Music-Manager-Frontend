import { Tag } from '../../dto/base';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'tagNames', pure: true })
export class TagNamesPipe implements PipeTransform {
    transform(tags: readonly Tag[] | null | undefined): string {
        return (tags ?? []).map((t) => t.name).join(', ');
    }
}
