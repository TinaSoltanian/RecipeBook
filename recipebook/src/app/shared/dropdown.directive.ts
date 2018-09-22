import { Directive,
    ElementRef,    
    OnInit,
    Renderer2,
    HostListener,
    HostBinding
 } from '@angular/core';
@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective implements OnInit {
    @HostBinding('class.open') isOpen = false;

    constructor(private elRef: ElementRef, private renderer: Renderer2) {}

    ngOnInit() {}

    @HostListener('click') onDropDownClick(){
        this.isOpen = !this.isOpen;        
        // if (this.elRef.nativeElement.classList.contains('open')){
        //     this.renderer.removeClass( this.elRef.nativeElement, 'open' );
        // }
        // else{
        //     this.renderer.addClass( this.elRef.nativeElement, 'open' );
        // }
    }
}