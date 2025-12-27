import { Pipe, PipeTransform } from '@angular/core';
import { Tag } from '../../objects/dto/base';

@Pipe({ name: 'tagNames', pure: true })
export class TagNamesPipe implements PipeTransform {
    transform(tags: readonly Tag[] | null | undefined): string {
        return (tags ?? []).map((t) => t.name).join(', ');
    }
}
