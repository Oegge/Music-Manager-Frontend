import {
    AfterViewInit,
    Component,
    ContentChild,
    EventEmitter,
    HostListener,
    Input,
    Output,
    Renderer2,
    TemplateRef,
    ViewContainerRef,
} from '@angular/core';

@Component({
    selector: 'modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.css'],
    standalone: false,
})
export class ModalComponent implements AfterViewInit {
    @ContentChild('trigger') triggerTemplate!: TemplateRef<any>;
    @ContentChild('content') contentTemplate!: TemplateRef<any>;
    @Output() close = new EventEmitter<void>();
    @Input() isOpen = false;
    @Input() modalStyle: { [key: string]: any } = {};
    @Input() modalClass: string | string[] = '';

    @Input()
    set decline(fn: () => void) {
        this._decline = () => {
            this.onClose();
            fn();
        };
    }

    private _decline!: () => void;

    constructor(
        private renderer: Renderer2,
        private viewContainerRef: ViewContainerRef,
    ) {}

    ngAfterViewInit(): void {
        // Render trigger template into the view
        if (this.triggerTemplate) {
            const view = this.viewContainerRef.createEmbeddedView(
                this.triggerTemplate,
            );

            // Wait a tick to ensure it's in DOM, then add click listener
            setTimeout(() => {
                const el = view.rootNodes.find((node) => node.nodeType === 1); // nodeType 1 = Element
                if (el) {
                    this.renderer.listen(el, 'click', () => {
                        this.isOpen = true;
                    });
                }
            });
        }
    }

    @HostListener('document:keydown.escape', ['$event'])
    handleEscape(event: KeyboardEvent) {
        if (this.isOpen) {
            this.onClose();
        }
    }

    onClose() {
        this.isOpen = false;
        this.close.emit();
        if (this._decline) {
            this._decline();
        }
    }
}
